---
id: 15328
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 7：資料管理伺服器 (5) - RESTful
  API 錯誤處理與 HTTP Status Code'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-7
date: '2020-09-07T07:33:44+08:00'
lastmod: '2020-09-12T23:54:59+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- HTTP status code
featured_image: /uploads/2020/09/07.png
permalink: /2020/09/07/15328/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-7/
wp_status: publish
wp_type: post
---

![Day 7：資料管理伺服器 (5) - RESTful API 錯誤處理與 HTTP Status Code](/uploads/2020/09/07.png)

繼昨天成功可以對 RESTful API 進行測試了以後，我列舉了以下兩種不正確的操作行為，但是伺服器卻沒有正確地處理掉：

1. 呼叫增加題目的 API，但參數部分亂寫，結果沒有任何內容被丟回來。
2. 連續呼叫兩次增加編號 `103` 題目的 API，雖然題目 `id` 都相同，結果會新增兩筆相同 `id` 的題目。

今天就讓我們來處理一下這些問題吧！

## 錯誤處理

先來處理「呼叫增加題目的 API，但參數部分亂寫，結果沒有任何內容被丟回來」的問題。大家在測試這個情境的時候，應該會得到下圖的結果：雖然回傳的內容沒有東西，但是會發現紅圈的部分跟之前不一樣，那這個東西是什麼呢？就是之前在說明 HTTP response 當中有提到的 `HTTP Status Code`。

![發生錯誤](/uploads/2020/09/截圖-2020-09-05-下午5.03.39.png)

伺服器在回應 HTTP request 時所產生的 HTTP response 會帶上這次回應處理時的狀態，也就是利用 `HTTP Status Code`（HTTP 狀態碼）來表示。狀態碼基本上由 3 位數字組成，依第一位數字來對這些狀態碼進行分類，底下稍微說明一下比較常見的 `HTTP Status Code`，想知道更多可以在參考文件處連結到 wiki 的介紹頁面查看：

* `2xx` 代表的是成功。像昨天我們測試 API 成功時，都是回傳 `200 OK` 這個狀態碼。
* `3xx` 代表的是轉向。通常是在原 API 的 `URI` 已換位址，所以用 `3xx` 開頭告知，通常也會帶要轉去哪裡的 `URI` 內容。
* `4xx` 代表的是客戶端的錯誤。像是在瀏覽網頁的時候，不小心打錯網址讓伺服器找不到網頁時，就會收到 `404 Not Found` 這個狀態碼。
* `5xx` 代表的是伺服器端的錯誤。例如：當伺服器在處理 HTTP request 出錯時，就會回傳 `500 Internal Server Error`。

而 Ktor 在預設的情況下，如果在處理 HTTP request 的路由時，找不到該處理區塊就會回傳 `404 Not Found`；而如果是處理過程中，程式丟出 `Exception` 的話，就會回傳 `500 Internal Server Error`。在上面的例子中，我們亂丟了內容讓 `call.receive<Problem>()` 直接轉成 `Problem` 這個類型的物件，結果在轉的過程中使用 `ktor-jackson` 發現無法轉換，所以丟出了 `com.fasterxml.jackson.core.JsonParseException`（如果你是隨便亂丟一份 JSON 格式的內容的話，則可能會是`com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException`），也就導致回傳回來的 HTTP response 帶上了 `500 Internal Server Error`。

不過這樣的結果其實是有問題的，因為這個錯誤的產生其實是客戶端帶的參數有問題，所以理論上應該要告知是客戶端錯誤才對，而不是伺服器端的錯誤，那該怎麼在 Ktor 中自定義 Exception 的處理機制呢？在伺服器過程中增加功能的行為要使用的函式，我想大家都不陌生了，就是使用 `install()` 這個函式，那裡面帶的參數又是哪一個呢？這次我們要使用的是 `StatusPages`，這個功能是用來設定 Exception 該怎麼處理，以及在遇到各種不同的 `HTTP Status Code` 該回傳些什麼的區塊，在這裡我們很簡單的就讓伺服器在遇到 `com.fasterxml.jackson.core.JsonParseException` 以及 `com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException`時，回傳 `400 Bad Request`（代表客戶端的要求有問題的 `status code`）吧！寫法如底下的程式碼：

```kotlin
install(StatusPages) {
    exception<Throwable> {
        call.respond(HttpStatusCode.InternalServerError)
    }

    exception<com.fasterxml.jackson.core.JsonParseException> {
        call.respond(HttpStatusCode.BadRequest)
    }

    exception<com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException> {
        call.respond(HttpStatusCode.BadRequest)
    }
}
```

Ktor 裡面有定義一個叫做 `HttpStatusCode` 物件，讓你可以方便找到你想要回傳的 `HTTP Status Code`，而 `exception<T>` 區塊則是用來定義遇到哪一種 Exception 該怎麼處理它。這裡我們定義了三個處理設定，下面兩個是上面所提到的 `ktor-jackson` 丟出來的例外，而上面第一個則是讓其他的 Exception 還是照常丟 `500 Internal Server Error`。寫完重新啟動伺服器，重新再丟一次我們的 HTTP request，就會得到 `400 Bad Request`了。

![400 Bad Request](/uploads/2020/09/截圖-2020-09-05-下午6.34.09.png)

## 自定義 Exception 進行處理

那當然你也可以自訂自己的 Exception 來處理錯誤。如果要處理「連續呼叫兩次增加編號 103 題目的 API，但 id 都相同，結果會新增兩筆相同 id 的題目」的問題，可以自己定義一個 `IdAlreadyExistedException` 來讓程式可以丟，底下是定義 `IdAlreadyExistedException` 的程式碼：

```kotlin
// File: src/IdAlreadyExistedException.kt
class IdAlreadyExistedException(message: String? = "Id is already existed") : Exception(message)
```

定義完後，就在 `install(StatusPages)` 去處理 `IdAlreadyExistedException` 這個錯誤，並讓新增題目的時候會先檢查 `id` 是否重複，如果會的話就丟出 `IdAlreadyExistedException`，底下是程式碼：

```kotlin
install(StatusPages) {
    // ...... 其他的錯誤處理 .......

    exception<IdAlreadyExistedException> {
        call.respond(HttpStatusCode.BadRequest)
    }
}

routing {
    route("/problems") {
        // ...... 其他的區塊 ......

        post {
            val newProblem = call.receive<Problem>()

            // 檢查是否已經有相同題目編號的題目
            if (testProblems.any { it.id == newProblem.id }) {
                throw IdAlreadyExistedException()
            }

            testProblems += newProblem

            call.respond(mapOf(
                "OK" to true
            ))
        }

        // ...... 其他的區塊 ......
    }
}
```

那怎麼處理其他錯誤的部分可以自己來想想看，我這邊還多處理了「指定編號的題目找不到」的問題，底下是整體程式碼，可以觀察看看我改動了哪些地方去處理「指定編號的題目找不到」的問題。

```kotlin

install(StatusPages) {
    exception<Throwable> {
        call.respond(HttpStatusCode.InternalServerError)
    }

    exception<com.fasterxml.jackson.core.JsonParseException> {
        call.respond(HttpStatusCode.BadRequest)
    }

    exception<com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException> {
        call.respond(HttpStatusCode.BadRequest)
    }

    exception<NotFoundException> {
        call.respond(HttpStatusCode.NotFound)
    }

    exception<IdAlreadyExistedException> {
        call.respond(HttpStatusCode.BadRequest)
    }
}

routing {
    get("/") {
        call.respond(mapOf("OK" to true))
    }

    route("/problems") {
        get {
            val problems = testProblems.map {
                mapOf(
                    "id" to it.id,
                    "title" to it.title
                )
            }

            call.respond(mapOf(
                "data" to problems
            ))
        }

        post {
            val newProblem = call.receive<Problem>()
            if (testProblems.any { it.id == newProblem.id }) {
                throw IdAlreadyExistedException()
            }

            testProblems += newProblem

            call.respond(mapOf(
                "OK" to true
            ))
        }

        route("/{id}") {
            get {
                val requestId = call.parameters["id"]
                val requestProblem = testProblems.firstOrNull() {
                    it.id == requestId
                };

                call.respond(
                    mapOf(
                        "problem" to (requestProblem ?: throw NotFoundException())
                    )
                )
            }

            put {
                val requestId = call.parameters["id"]
                if (!testProblems.removeIf { it.id == requestId }) {
                    throw NotFoundException()
                }

                val updateProblemContent = call.receive<Problem>()
                testProblems += updateProblemContent
                call.respond(mapOf(
                    "OK" to true
                ))
            }

            delete {
                val requestId = call.parameters["id"]
                if (!testProblems.removeIf { it.id == requestId }) {
                    throw NotFoundException()
                }

                call.respond(mapOf(
                    "OK" to true
                ))
            }
        }
    }
}
```

## 總結

今天我們利用丟 `Exception` 的方式以及 `install(StatusPages)` 去解決「當 RESTful API 遇到錯誤之後該怎麼辦」的情況，但這樣處理完後你可能還有發現幾個問題：

1. 我們希望新增的題目編號不要重複，那麼這個題目編號是否應由伺服器自動產生會比較正確？不然客戶端新增題目的時候就要一直猜哪些編號還沒用過。
2. 我們利用新增題目資料的 API 去新增題目，但這些資料只要重開伺服器後就不見了。

關於這些問題，我們可以透過資料庫來進行處理。第一個問題可以利用資料庫增加資料時自動為資料產生新的編號來處理，第二個問題則是因為我們只將資料儲存在記憶體的陣列中，只要將資料儲存進資料庫就可以永久保存下來。所以，就讓我們明天開始來使用資料庫吧！

## 參考資料
* [Status Pages - Servers - Ktor](https://ktor.io/servers/features/status-pages.html)
* [List of HTTP status codes - Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
