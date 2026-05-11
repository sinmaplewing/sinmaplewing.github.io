---
id: 14778
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 6：資料管理伺服器 (4) - RESTful
  API 測試：使用 Postman'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-6
date: '2020-09-06T08:39:57+08:00'
lastmod: '2020-09-07T07:40:47+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- HTTP status code
featured_image: /uploads/2020/09/06.png
permalink: /2020/09/06/14778/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-6/
wp_status: publish
wp_type: post
---

![Day 6：資料管理伺服器 (4) - RESTful API 測試：使用 Postman](/uploads/2020/09/06.png)

在前一天我們將一個可以管理題目資料的 RESTful API 給設計出來了，但是卻遇到了不知道該如何測試的問題，究竟我們該怎麼對這組 API 去進行測試呢？這時候就該來介紹一下 Postman 這個軟體了。

## Postman

![Postman](/uploads/2020/09/pm-orange-logo-horiz.png)

Postman，用於輔助開發 API 的軟體，有非常多不錯的功能可以使用。在這裡我們主要要使用的功能，是把它當作客戶端來對 API 發送 HTTP request 去進行測試。除此之外，這軟體其實還可以將曾經發送過的 HTTP request 設定給儲存起來，下次可以直接使用儲存起來的設定發送一樣的 HTTP request，而對於這些設定還可以進行分組管理，並且可以將這些設定產生成你的 API 的文件，甚至自動化利用這個設定去進行 API 測試，不過太深入的功能這裡就暫時先不提了，有興趣的話可以到[官網](https://www.postman.com/)上或是尋找教學來更深入了解這個軟體。

為了要能夠使用這個軟體，首先要先到[官網的下載頁面](https://www.postman.com/downloads/)進行下載，下載完後打開會有需要登入帳號的頁面，這邊就自行註冊一個帳號，接著就會看到如下所示的畫面，其中紅圈部分就是可以設定 HTTP request 中的 `Method` 與 `URI` 的地方。

![Postman App](/uploads/2020/09/截圖-2020-09-04-上午9.15.12.png)

首先先來測試看看 `GET` 的部分吧！回憶一下我們所設計的 API：

```
GET /problems        => 讀取全部的題目列表
POST /problems       => 創建題目
GET /problems/{id}   => 讀取編號為 `id` 的題目
PUT /problems/{id}   => 更新編號為 `id` 的題目 
DELETE /problems/{id} => 刪除編號為 `id` 的題目
```

有兩個使用到 `GET` 的 API，一個是用來獲得全部的題目列表，一個是用來獲得題目的內容。為了要測試這兩個的功能，我們先將伺服器跑起來，接著在 Postman 中使用 `GET`，並在欲傳送到的網址部分輸入 `http://0.0.0.0:8080/problems`，輸入完後按下旁邊的 `Send`，接著就可以在下方看到回傳回來的結果。

![Postman result](/uploads/2020/09/截圖-2020-09-04-上午9.38.38.png)

那可以看到結果就是如我們預期的一份題目列表，並且每個題目僅有其 `id` 和 `title` 欄位的值。

```json
{
    "data": [
        {
            "id": "101",
            "title": "A + B Problem"
        },
        {
            "id": "102",
            "title": "A + B + C Problem"
        }
    ]
}
```

接著可以嘗試看看將網址換成 `http://0.0.0.0:8080/problems/101`，那麼我們就可以得到 `id` 為 `101` 的題目內容。

```json
{
    "problem": {
        "id": "101",
        "title": "A + B Problem",
        "description": "輸入兩數，將兩數加總。",
        "testCases": [
            {
                "input": "3 4",
                "expectedOutput": "7",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "input": "2147483646 1",
                "expectedOutput": "2147483647",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            }
        ]
    }
}
```

接著來測試看看使用到 `POST` 的 API 吧！在實作的時候，我們曾經說過，會希望使用者在丟 `POST` 的 HTTP request 時能夠在 `body` 帶 JSON 格式的題目內容，那這要怎麼在 Postman 中去執行呢？在網址列的下方尋找 `Body` 頁籤（下圖最上方紅圈），接著選擇內容為 `raw`，並且格式為 `JSON`（下圖紅色框），最後在下面的編輯區填上一筆新題目的資料（下圖綠色框，以及下方程式碼區塊），就可讓 HTTP request 的 `body` 代入我們希望增加的 JSON 格式的題目資料了。

![Postman HTTP request body](/uploads/2020/09/截圖-2020-09-05-上午10.37.22.png)

```json
{
    "id": "103",
    "title": "A + B + C + D Problem",
    "description": "輸入四數，將四數加總。",
    "testCases": [
        {
            "input": "3 4 5 6",
            "expectedOutput": "18",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        },
        {
            "input": "2147483646 1 -1 -1",
            "expectedOutput": "2147483645",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        }
    ]
}
```

填完以後將上方的 `Method` 換成 `POST`，網址列填上 `http://0.0.0.0:8080/problems`，按下 `Send` 按鈕，即會得到 `{ "OK": true }` 的回應。得到回應後可以再試試看 `GET /problems` 或是 `GET /problems/103` 就會看到這筆新資料，底下是個別的結果：

```json
// GET /problems 的結果
{
    "data": [
        {
            "id": "101",
            "title": "A + B Problem"
        },
        {
            "id": "102",
            "title": "A + B + C Problem"
        },
        {
            "id": "103",
            "title": "A + B + C + D Problem"
        }
    ]
}

// GET /problems/103 的結果
{
    "problem": {
        "id": "103",
        "title": "A + B + C + D Problem",
        "description": "輸入四數，將四數加總。",
        "testCases": [
            {
                "input": "3 4 5 6",
                "expectedOutput": "18",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "input": "2147483646 1 -1 -1",
                "expectedOutput": "2147483645",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            }
        ]
    }
}
```

了解了上面部分，那麼要來測試 `PUT /problems/{id}` 就比較容易了，我們來更新剛剛加入的編號 `103` 的問題，將 `title` 的地方改成 `四數相加`。那作法與上面雷同，給予你想要更改的題目內容（下方程式碼），然後對 `https://0.0.0.0:8080/problems/103` 打出 `PUT` 的 HTTP request 即可。

```json
{
    "id": "103",
    "title": "四數相加",
    "description": "輸入四數，將四數加總。",
    "testCases": [
        {
            "input": "3 4 5 6",
            "expectedOutput": "18",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        },
        {
            "input": "2147483646 1 -1 -1",
            "expectedOutput": "2147483645",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        }
    ]
}
```

送出得到 `{ "OK": true }` 後，可以在打 `GET /problems/103` 確認看看結果，會看到題目的內容確實被修正了。

```json
// GET /problems/103 的結果
{
    "problem": {
        "id": "103",
        "title": "四數相加",
        "description": "輸入四數，將四數加總。",
        "testCases": [
            {
                "input": "3 4 5 6",
                "expectedOutput": "18",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "input": "2147483646 1 -1 -1",
                "expectedOutput": "2147483645",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            }
        ]
    }
}
```

最後的刪除功能 `DELETE /problems/{id}` 就不需要再帶內容了，只要在 `URI` 處指定要刪除的文章 `id` 即可，所以我們就來送出 `DELETE /problems/103` 將剛剛加入的編號 `103` 的文章刪掉，這樣就完成了上述 API 的基本測試了。底下是刪除後，打出 `GET /problems` 確認列表內目前題目的結果。

```json
{
    "data": [
        {
            "id": "101",
            "title": "A + B Problem"
        },
        {
            "id": "102",
            "title": "A + B + C Problem"
        }
    ]
}
```

## 另外一個測試方式：直接使用 IntelliJ IDEA 去發送 HTTP request

如果你用的是訂閱版本完整功能的 IntelliJ IDEA 的話，在執行伺服器的時候可以對專案點選右鍵新增 `HTTP Request`，這樣就會多一個用來描述 HTTP request 檔案可以讓你來設定要發送怎麼樣的 HTTP request 出去。

![HTTP Request File](/uploads/2020/09/截圖-2020-09-05-下午11.35.12.png)

點擊開來這個檔案後，就可以在裡面填寫多個你想發送的 HTTP request，例如如果我們要測試新增題目並查看新增的題目內容的話，可以如下方所寫的方式寫進檔案內。

```
POST http://0.0.0.0:8080/problems
Content-Type: application/json

{
  "id": "103",
  "title": "四數相加",
  "description": "輸入四數，將四數加總。",
  "testCases": [
    {
      "input": "3 4 5 6",
      "expectedOutput": "18",
      "comment": "",
      "score": 50,
      "timeOutSeconds": 10.0
    },
    {
      "input": "2147483646 1 -1 -1",
      "expectedOutput": "2147483645",
      "comment": "",
      "score": 50,
      "timeOutSeconds": 10.0
    }
  ]
}

###

GET http://0.0.0.0:8080/problems/103
```

解釋一下上面檔案內容的格式：

* 一個 HTTP request 的第一行為要傳遞的 `Method` 和 `URI` 參數為何。
* 第二行則可填入 `Content-Type` 參數的值，這裡要填的就是你的 body 內容是什麼樣的格式的意思，格式的描述用的是 MIME types 的描述方式，MIME types 是一個定義格式如何描述的標準，而 JSON 格式在 MIME Types 的描述裡是 `application/json`，如果想知道其餘格式是什麼樣的 MIME types 的話，可以在 [MDN 的文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)裡面查看。
* 第二行之後用空白行隔開的內容是 `body` 的部分，也就是 HTTP request 要帶的內容。
* 接著用 `###` 隔開的地方則是表示這一個 HTTP request 結束，換下一個 HTTP request 的意思。

填寫完後，點擊上方的 `Run All Requests in File`（下圖最上方的紅圈），即會依序執行檔案裡面所寫的 HTTP request，得到相對應的 HTTP response（下圖下方的紅色方框），而 IntelliJ IDEA 會將收到的內容放入 `.json` 檔案內，你可以再點開來看裡面的內容（下圖方框內的紅圈處），應該就會跟你用 `Postman` 看到的結果是一樣的。

![結果](/uploads/2020/09/截圖-2020-09-05-下午11.46.02.png)

以上就是使用 IntelliJ IDEA 去發送 HTTP request 的流程。這個方式有個好處，就是這些用來測試而發送的 HTTP request 的設定就可以跟著專案檔一起保存下來，那麼未來只要有專案檔，就可以了解每一個 API 要怎麼去使用，在開發上就會相對的方便。不過由於要能夠讓它在 IntelliJ IDEA 中執行起來的話是會需要花錢的，所以在本次的 30 天挑戰中還是會先以 Postman 去測試為主，但未來如果你覺得 Kotlin 語言真的很適合你的開發的話，不妨也可以訂閱一下 IntelliJ IDEA，相信它可以輔助你在使用 Kotlin 語言開發的過程上呢！

## 總結

總結一下，今天我們終於可以利用軟體來測試我們設計的 API。除了上面我所設計好的測試以外，各位其實也可以自行隨意用不同的參數去測試看看，看看是不是都能得到與你預期相符的結果。不過今天我所設計好的測試情境都是正確使用 API 的情況下，各位可以試著執行下面的動作看看：

* 呼叫增加題目的 API，但參數部分亂寫，結果沒有任何內容被丟回來。
* 連續呼叫兩次增加編號 `103` 題目的 API，雖然 `id` 都相同，結果會新增兩筆相同 `id` 的題目。

這些動作都造成了伺服器與我們預期的行為不符，或甚至發生了錯誤，這些狀況又該怎麼處理呢？這點就讓我留到明天再來跟大家說說吧！

## 備註
### Ktor 是怎麼知道要用哪種格式處理輸入進來的資料與要輸出什麼格式的資料呢？

其實客戶端發送的 HTTP request 設定裡面，有兩個參數是用來設定這件事情的，一個是 `Accept`，用於告訴伺服器端說客戶端接受什麼格式的資料；另外一個則是 `Content-Type`，用於告訴伺服器端說客戶端所送的 HTTP request 的內容是什麼格式。

那伺服器端關於這方面的處理，其實就相關於輸入輸出內容格式的部分，也就是之前提到過的  `ContentNegotiation` 這個地方。在這個區塊中，其實你可以註冊各種不同格式的輸入輸出方式，用 `register()` 這個函式就可以了。像是我們在裡面呼叫的 `jackson()`，實際上也可以改寫成比較通用的方式變成下面這樣：

```kotlin
install(ContentNegotiation) {
    register(ContentType.Application.Json, JacksonConverter(
        jacksonObjectMapper().enable(SerializationFeature.INDENT_OUTPUT)
    ))
}
```

語法是 `register([你想接受或傳送的內容型態],[如何處理該型態資料的物件])`，`如何處理該型態的物件` 其類別必須要繼承 `ContentConverter` 這個 Interface，這個 Interface 裡面有兩個需要實作的函式 `convertForSend` 和 `convertForReceive`，分別進行傳送和接收該型態資料時所呼叫的函式，詳細怎麼實作在這裡就先不提了，有興趣自己實作看看的話可以看這邊的[文件](https://ktor.io/servers/features/content-negotiation.html)。

那原本在這裡是利用了 `jackson()` 這個函式幫我們方便的註冊相對應資料型態的轉換物件，並且利用區塊方式讓我們方便定義像是 `美化輸出` 的功能。如果用一般的 `register` 方式的話，就要自己先將該設定的部分都設定好，再將設定丟給該資料型態的轉換物件去生出來，才能再把物件丟給註冊的函式。前面的寫法比較讓你看起來像是在定義事情，而後面的寫法則比較像是在進行程式流程，這個部分到底哪個寫法比較好可以自行決定。

那舉個例子好了，如果我希望能夠處理 `plain/text` 這種型態呢？那就是在 `install(ContentNegotiation)` 區塊裡面加入 `register(ContentType.Plain.Text, [可處理 plain/text 型態資料的物件])` 即可，只是說這個 `可處理 plain/text 型態資料的物件` 沒那麼好實作就是了 Orz.....

最後補充一下，註冊完了資料轉換物件以後，伺服器端就可以根據 `Content-Type` 和 `Accept` 這兩個值去處理輸入輸出資料格式的部分。那另外你有可能會注意到 `call.respond()` 的時候沒有特別指定要使用哪個型態，而如果你點開 Postman 的 `header` 設定的話會發現我們丟的 `Accept` 其實型態都是 `*/*` （意思就是什麼格式都接受的意思），那 Ktor 怎麼決定要使用哪個型態輸出呢？它會選擇可以使用的型態裡面比較早註冊的方式來傳送，所以如果在 `jackson()` 前面還有註冊其他資料型態的處理方式的話，伺服器就會用定義比較前面的方式與格式來傳遞我們要回傳的資料，如果有用多個格式在處理輸出資料的話，要多注意一下這個區塊裡面註冊的順序喔！

## 參考資料
* [Postman | The Collaboration Platform for API Development](https://www.postman.com)
* [HTTP API - Quick Start - Ktor](https://ktor.io/quickstart/guides/api.html)
* [Common MIME types - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

> 本篇文章最早發表於 `第 12 屆 iT 邦幫忙鐵人賽`: https://ithelp.ithome.com.tw/articles/10234403
