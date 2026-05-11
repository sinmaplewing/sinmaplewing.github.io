---
id: 14199
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 4：資料管理伺服器 (2) - 題目資料定義與
  JSON 序列化回傳資料'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-4
date: '2020-09-04T07:19:33+08:00'
lastmod: '2020-09-14T21:13:13+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- Gradle
- Jackson
featured_image: /uploads/2020/09/04.png
permalink: /2020/09/04/14199/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-4/
wp_status: publish
wp_type: post
---

![資料管理伺服器 (2) - 題目資料定義與 JSON 序列化回傳資料](/uploads/2020/09/04.png)

接續昨天的文章內容，我們接下來要來讓這個伺服器可以開始操作題目的資料，今天就讓我們先來定義題目的資料結構，並能夠以 JSON (JavaScript Object Notation，一種資料傳遞格式，由於其寫法是從 JavaScript 定義 Object 的語法而來的，所以命名成此名稱) 的格式將題目資料透過 API 輸出回來吧！

## 題目資料定義

在專案的 `src` 目錄中，我們新增一個檔案叫做 `Problem.kt`，用來定義 `Problem` 類別，讓我們可以利用這個類別所產生出來的物件來存放我們的題目資料，底下是 `Problem` 的定義內容：

```kotlin
data class Problem(
    val id: String,
    val title: String,
    val description: String,
    val testCases: List<TestCase>
)
```

解釋一下 `Problem` 內的欄位， `id` 為可以用來辨識題目用的編號， `title` 則為題目的標題， `description` 則為題目的詳細內容，接著可以看到 `testCases` ，這個欄位是一個 `TestCase` 類別的集合，其抽象含義上即為該題目測資的集合，那麼 `TestCase` 這個類別裡面又是怎麼定義的呢？底下是位於 `src/TestCase.kt` 中的 `TestCase` 的定義：

```kotlin
data class TestCase(
    val input: String,
    val expectedOutput: String,
    val comment: String,
    val score: Int,
    val timeOutSeconds: Double
)
```

解釋一下 `TestCase` 內的欄位， `input` 為該筆測試資料的輸入內容， `expectedOutput` 則為預期中的輸出內容， `comment` 即是可以用來標注該筆測資有什麼特別地方用的字串， `score` 則是這筆測資佔了幾分， `timeOutSeconds` 則為程式運行最多不能超過多久。

定義完成題目的資料結構後，我們就可以在 `src/Application.kt` 先宣告一份測試用的假題目資料，底下是其定義程式碼：

```kotlin
val testProblems = Collections.synchronizedList(mutableListOf(
    Problem(
        "101",
        "A + B Problem",
        "輸入兩數，將兩數加總。",
        listOf(
            TestCase(
                "3 4",
                "7",
                "",
                50,
                10.0
            ),
            TestCase(
                "2147483646 1",
                "2147483647",
                "",
                50,
                10.0
            )
        )
    ),
    Problem(
        "102",
        "A + B + C Problem",
        "輸入三數，將三數加總。",
        listOf(
            TestCase(
                "3 4 5",
                "12",
                "",
                50,
                10.0
            ),
            TestCase(
                "2147483646 1 -1",
                "2147483646",
                "",
                50,
                10.0
            )
        )
    )
))
```

上面總共定義了兩道題目的假資料，每一道題目裡面都各有兩筆簡單的測資，用來測驗使用者的程式是否有達到該道題目所要求的目標。假資料的集合利用 `Collections.synchronizedList` 包住，避免因為伺服器平行處理個別 HTTP request 時，同時去對該集合進行修改所造成的平行處理錯誤。

接著我們希望能夠讓伺服器在接收到 HTTP request 的 URI 為 `/problems` 時，能夠將問題集合的資料以 JSON 的格式回傳回去，那該如何做呢？

## Jackson API 與 ktor-jackson 套件

首先，要先在專案裡面安裝一個叫做 `ktor-jackson` 的套件。此套件利用常在 Java 語言中，用來處理 JSON 的 Jackson API 幫助我們方便地將程式資料轉換成 JSON 的格式。

那該如何安裝這個套件呢？我們在建立專案的時候，其實有選擇專案會使用什麼方式來進行管理，如下方圖片所示的位置。

![專案 Gradle 設定欄位](/uploads/2020/09/截圖-2020-09-03-下午9.48.37.png)

而我們在開設新專案的時候，使用的是 `GradleKotlinDsl`，其與上面圈起來的 `Gradle` 一樣，都是使用 Gradle 這個工具來管理，差別只在於設定檔案裡面的語法，`Gradle` 使用的是原生 Gradle 所使用的設定語言，而 `GradleKotlinDsl` 則是使用 Kotlin 語言來進行設定。

![Gradle 的 Logo（來自官網）](/uploads/2020/09/Gradle_logo.png)

Gradle 是一個用來處理專案建置的輔助工具，它會利用設定檔來定義這個專案使用了哪些外掛、依賴了哪些套件、該執行哪些事情來進行專案建置⋯⋯等等專案建置相關的事情，因此如果我們要安裝 `ktor-jackson` 這個套件，只需要在 Gradle 設定檔 `build.gradle.kts` 中（下圖左方紅圈的位置），依賴套件的部分（也就是 `dependencies` 的區塊，下圖中間正方框的位置）加入 `ktor-jackson` 這個套件 `implementation("io.ktor:ktor-jackson:$ktor_version")`（下圖正方框中紅圈的位置），存檔後點擊右上角一個 Gradle 重整的圖示按鈕（如下圖右上角黃圈所示），則 Gradle 就會幫我們安裝好 `ktor-jackson` 這個套件。

![在 build.gradle.kts 檔案增加新套件的方式](/uploads/2020/09/截圖-2020-09-04-下午11.22.56.png)

安裝完套件後，接著要在 `src/Application.kt` 中，讓伺服器可以套用上 `ktor-jackson` 這個套件去對回應回去的資料做 JSON 序列化，底下展示了該如何增加程式碼去進行這件事情：

```kotlin
fun Application.module(testing: Boolean = false) {
    val client = HttpClient(Apache) {
    }

    // 增加這個區塊
    install(ContentNegotiation) {
        jackson {
            enable(SerializationFeature.INDENT_OUTPUT) // 開啟美化輸出出來的 JSON 的功能
        }
    }
    
    // ...... routing 區塊省略
}
```

`install` 可以對伺服器處理 HTTP request 和 HTTP response 的流程中，插入你想要使用的套件，而參數的 `ContentNegotiation` 即表示是對內容輸入以及輸出轉換格式的技術方面去進行設定，裡面我們使用了 `jackson` 區塊去表示要對內容輸入以及輸出的部分利用 `ktor-jackson` 套件去做處理。另外，在 `jackson` 區塊內，我們 `enable` 了一個可以美化輸出出來的 JSON 的功能。

最後在底下 `get("/problems")` 的回應部分，改成回應上面我們定義的假資料即可。

```kotlin
get("/problems") {
    call.respond(
        mapOf(
            "data" to testProblems
        )
    )
}
```

執行伺服器後，我們輸入 `https://0.0.0.0:8080/problems` 來看看，即可得到我們剛剛設計的測試資料：

```
{
  "data" : [ {
    "id" : "101",
    "title" : "A + B Problem",
    "description" : "輸入兩數，將兩數加總。",
    "testCases" : [ {
      "input" : "3 4",
      "expectedOutput" : "7",
      "comment" : "",
      "score" : 50,
      "timeOutSeconds" : 10.0
    }, {
      "input" : "2147483646 1",
      "expectedOutput" : "2147483647",
      "comment" : "",
      "score" : 50,
      "timeOutSeconds" : 10.0
    } ]
  }, {
    "id" : "102",
    "title" : "A + B + C Problem",
    "description" : "輸入三數，將三數加總。",
    "testCases" : [ {
      "input" : "3 4 5",
      "expectedOutput" : "12",
      "comment" : "",
      "score" : 50,
      "timeOutSeconds" : 10.0
    }, {
      "input" : "2147483646 1 -1",
      "expectedOutput" : "2147483646",
      "comment" : "",
      "score" : 50,
      "timeOutSeconds" : 10.0
    } ]
  } ]
}
```

## 總結

完成了輸出假資料後，明天我們就要來設計一套完整的 RESTful API，讓我們可以對這個假資料陣列去進行修改，就請大家期待一下明天的內容吧！

## 參考資料
* [Ktor QuickStart](https://ktor.io/quickstart/guides/api.html)
* [Jackson - Servers - Ktor](https://ktor.io/servers/features/content-negotiation/jackson.html)
* [Jackson (API) - Wikipedia](https://en.wikipedia.org/wiki/Jackson_(API))
* [Gradle - Wikipedia](https://en.wikipedia.org/wiki/Gradle)
* [Features - Servers - Ktor](https://ktor.io/servers/features.html)

> 本篇文章最早發表於 `第 12 屆 iT 邦幫忙鐵人賽`: https://ithelp.ithome.com.tw/articles/10234037
