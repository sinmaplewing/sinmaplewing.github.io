---
id: 14369
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 5：資料管理伺服器 (3) - RESTful
  API 設計'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-5
date: '2020-09-05T07:35:55+08:00'
lastmod: '2020-09-16T10:02:48+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- REST
- RESTful API
featured_image: /uploads/2020/09/05.png
permalink: /2020/09/05/14369/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-5/
wp_status: publish
wp_type: post
---

![資料管理伺服器 (3) – RESTful API 設計](/uploads/2020/09/05.png)

接續前一天的內容，我們定義了題目的資料其結構為何，並且可以透過 `ktor-jackson` 將其資料以 JSON 格式回傳回去。那接下來如果我們希望能夠透過 HTTP request 對伺服器說明我們想要對這些資料進行更多的操作，也就是一般在提到資料處理上最常見的四種操作方式：Create（創建）、Read（讀取）、Update（更新）和 Delete（刪除），簡稱 `CRUD`，該如何進行呢？

如果用直覺的方式去想，我們可以根據每個不同的操作，利用 `URI` 去對伺服器進行操作請求，例如像下面所列的方式：

```
/problems/read              => 讀取全部的題目列表
/problems/create            => 創建題目
/problems/{id}/read          => 讀取編號為 `id` 的題目
/problems/{id}/update        => 更新編號為 `id` 的題目 
/problems/{id}/delete        => 刪除編號為 `id` 的題目
```

但是定義完後，會發現我們想要對資料進行的操作與資料本身的類型全部混在 `URI` 參數中，我們有沒有辦法讓操作和資料可以分開來被定義呢？這時就要來介紹一下在定義這類 API 時最常用的規範，也就是 RESTful API（或稱 REST API）了。

## RESTful API 設計

RESTful API，指的就是符合 REST 的原則去定義出來的 API 形式。REST（Representational state transfer）核心主要定義了六個原則：

1. Client-server architecture
2. Statelessness
3. Cacheability
4. Layered system
5. Uniform interface
6. Code on demand (optional)

在這裡如果對每個原則都去細談的話，大概這篇的篇幅就會直接爆表，而且也不是現在的重點。在這些原則裡面， REST 定義了該怎麼讓客戶端去溝通處理資源的方式：主要會利用一段 `URI` 來代表你所要處理的某一類資源（以這邊的例子就是讓題目資源被 `/problems` 來代表），並且使用 HTTP request 中的 `Method` 參數去代表要進行什麼操作。一般會用 `Method` 中的 `GET` 代表 Read 的操作、`POST` 代表 Create 的操作、`PUT` 或是 `PATCH` 代表 Update 的操作、`DELETE` 代表 Delete 的操作。最後統整出來我們就可以將上方的定義方式中，操作的部分從 `URI` 去掉，以 `Method` 來代替，成為下方的樣子：

```
GET /problems        => 讀取全部的題目列表
POST /problems       => 創建題目
GET /problems/{id}   => 讀取編號為 `id` 的題目
PUT /problems/{id}   => 更新編號為 `id` 的題目 
DELETE /problems/{id} => 刪除編號為 `id` 的題目
```

## 實作程式碼

設計完了關於題目資料最後的路由格式，我們就來將它實作進程式裡面吧！主要在程式中的架構會是這樣：

```
routing {
    route("/problems") {
        get {
            // 讀取全部的題目列表
        }

        post {
            // 創建題目
        }

        route("/{id}") {
            get {
                // 讀取編號為 `id` 的題目
            }

            put {
                // 更新編號為 `id` 的題目
            }

            delete {
                // 刪除編號為 `id` 的題目
            }
        }
    }
}
```

`route()` 這個定義方式可以讓你對同一段 `URI` 去進行回應操作，在裡面可以直接指定路由 `Method` 的區塊，像是 `get{ ... }` 和 `post{ ... }` 這兩個區塊就是分別處理 `Method` 參數為 `GET` 和 `POST` 時要做的事情。而 `URI` 的部分也可以巢狀定義，可以看到我在 `route("/problems")` 裡面定義了 `route("/{id}")`，內層的 `route("/{id}")` 實際上判斷的 `URI` 就是巢狀 `route()` 連接起來後的結果，也就是 `/problems/{id}`。那 `route("/{id}")` 裡面一樣有路由 `Method` 的區塊，像是 `get{ ... }`、`put{ ... }` 和 `delete{ ... }` 就是分別處理 `GET`、`PUT` 和 `DELETE` 的 `Method` 參數時要做的事情。

這裡順便說明一下，這些 routing、route、get、post、put 和 delete 實際上都是一個一個的函式，只是因為其最後一個參數吃的是一個 Function Type，並且我們直接給予該參數一個 Lambda Function，所以就讓這些呼叫函式的動作看起來很像是在定義事情；另外，這些函式雖然看起來像是全域函式，但實際上並不是，它們是利用之前曾經提到過的 Receiver Type 的方式去呼叫其省略掉的參數的成員函式的，在 IDE 中其參數的型態其實會被標出來，如下圖所示。也就是因為這兩個特性，我在第二天才會說明「Kotlin 可以很好被拿來做為設計各種不同應用領域的 DSL」這件事情，像在這個範例中，明明是照順序呼叫函式的一個程式流程，但抽象化的語法卻看起來像在定義一個路由的結構，透過這幾天的操作應該會慢慢感受到 Kotlin 做為定義事情功能上的強大。

![程式碼中的 Receiver Type 標註圖](/uploads/2020/09/截圖-2020-09-03-上午9.39.12.png)

接下來個別定義每個區塊要怎麼操作吧！`GET /problems` 的區塊希望能夠回傳題目列表，那我們就先將題目資料個別提取出 `id` 和 `title`，再將這個資料回傳回去即可，程式碼如下：

```
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
```

`POST /problems` 則是要新增一筆題目。預期上，當 HTTP request 丟 `POST /problems` 過來時，我們會希望其 `body` 內容為一筆題目資料，這個資料以什麼格式傳來都可以，只要是能夠溝通的格式就好，在這裡我們定義其為 JSON 格式。

那麼如何在程式碼裡面拿到這筆題目資料呢？我們可以利用 `call.receive()` 來獲取，甚至更強的是它可以直接代入資料的類別為何，自動幫我們將資料轉成該類別的物件，所以我們可以使用 `call.receive<Problem>()` 去獲得這筆資料所產生的物件。獲取該物件後，就可以將該物件接在目前資料的後面，那由於僅僅只是進行一個操作，並不會需要回傳任何內容，所以我們操作完後就讓伺服器回傳一個 `OK` 就好，最後程式碼如下：

```
post {
    val newProblem = call.receive<Problem>()
    testProblems += newProblem

    call.respond(mapOf(
        "OK" to true
    ))
}
```

那最後是關於 `GET /problems/{id}`、`PUT /problems/{id}` 和 `DELETE/problems/{id}` 該怎麼處理，在 `route()` 的地方我們寫了 `{id}`，用大括弧表示了這個 `id` 並不是 `id` 這兩個字，而是一個不固定的值，並且想要將其內容裝進名為 `id` 的變數。在這裡我們可以利用 `call.parameters` 去獲得這個值，`call.parameters` 會裝載起這些不固定的值，並可以利用你的命名來獲取你想拿到的值，像現在我們想得到 `id` 的值，使用 `call.parameters["id"]` 就可以拿到了。

拿到了 `id` 的值後，我們就可以對資料進行查找，接著就將資料回傳、更新或是刪除就可以了，程式碼如下：
```
route("/{id}") {
    get {
        val requestId = call.parameters["id"]
        val requestProblem = testProblems.firstOrNull() {
            it.id == requestId
        };

        call.respond(
            mapOf(
                "problem" to (requestProblem ?: throw NotFoundException()),
                "OK" to true
            )
        )
    }

    put {
        val requestId = call.parameters["id"]
        testProblems.removeIf { it.id == requestId }

        val updateProblemContent = call.receive<Problem>()
        testProblems += updateProblemContent

        call.respond(mapOf(
            "OK" to true
        ))
    }

    delete {
        val requestId = call.parameters["id"]
        testProblems.removeIf { it.id == requestId }

        call.respond(mapOf(
            "OK" to true
        ))
    }
}
```

## 總結

寫完了以後，雖然我們想要來測試看看有沒有什麼問題，但會發現如果我們直接打網址進瀏覽器內，永遠都只能用 `GET` 的 `Method` 去對伺服器進行請求，究竟該怎麼更換 `Method` 參數呢？如果有寫過 HTML 當中的 `<form>` 的話，應該會知道可以利用這個 `<form>` 來進行更換，但是這樣有點太麻煩了，所以明天我們會來介紹測試目前寫出來的 RESTful API 操作方法的方式，敬請期待吧！

## 參考資料
* [HTTP API - Quick Start - Ktor](https://ktor.io/quickstart/guides/api.html)
* [What is REST - REST API Tutorial](https://restfulapi.net)
* [Ruby on Rails 實戰聖經 | RESTful 應用程式](https://ihower.tw/rails/restful.html)
* [Representational state transfer - Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)

> 本篇文章最早發表於 `第 12 屆 iT 邦幫忙鐵人賽`: https://ithelp.ithome.com.tw/articles/10234215
