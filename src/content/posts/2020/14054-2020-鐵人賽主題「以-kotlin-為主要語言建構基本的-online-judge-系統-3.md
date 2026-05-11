---
id: 14054
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 3：資料管理伺服器 (1) – 使用 Ktor
  建立 HTTP Server'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-3
date: '2020-09-03T08:13:23+08:00'
lastmod: '2020-09-13T15:54:36+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- HTTP request
- HTTP response
- HTTP server
featured_image: /uploads/2020/09/03.png
permalink: /2020/09/03/14054/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-3/
wp_status: publish
wp_type: post
---

![資料管理伺服器 (1) – 使用 Ktor 建立 HTTP Server](/uploads/2020/09/03.png)

介紹完了系列題目中所提到的 Online Judge 系統以及 Kotlin 程式語言後，接著就要開始來進行專案的開發了。底下附上了之前有給大家看過的架構構想圖，首先我們會先從資料的管理伺服器開始進行，也就是底下紅色圈圈所圈起來的部分。這個伺服器必須要負責幾個工作，第一個是提供 API 讓客戶端（在這裡主要是使用瀏覽器）可以透過 HTTP 協定的方式去進行溝通，讓資料可以被客戶端讀取、修改、寫入和刪除；第二個則是要能夠與資料庫溝通，將資料儲存在資料庫中。那在使用 Kotlin 程式語言的前提下，我們該怎麼建立起這個伺服器呢？在這裡就來介紹一下 Ktor 這個框架，讓這個框架幫助我們去開發這個伺服器吧！

![資料管理伺服器架構圖部分](/uploads/2020/09/dataserver.png)

## Ktor 介紹與使用

![Ktor 的 Logo（來自 https://kotlinexpertise.com/kotlinktorwebdevelopment/ktor/）](/uploads/2020/09/ktor.png)

Ktor 為 Kotlin 的設計公司 JetBrains 所設計出來的 Web 開發框架，可以讓你快速且方便地去架設一個 HTTP Server。Kotlin 與 Ktor 的關係就類似於 Ruby 之於 Rails、Python 之於 Django、Node.js 之於 Express、Rust 之於 Rocket 一般，如果之前有用過這些語言與框架的話，要上手 Ktor 應該會容易許多，不過我們在這裡還是一步一步開始來進行開發吧！ 

首先，我們要來安裝 Ktor 這個套件。打開 IntelliJ IDEA，在歡迎介面的右下角有個 `Configure`，點開後裡面有個選項叫做 `Plugins`，點下去之後會出現外掛管理介面。

![安裝 Plugins 的選項](/uploads/2020/09/截圖-2020-09-03-下午9.30.25.png)

在外掛管理介面上搜尋 `Ktor`，會看到有 Ktor 的套件選項，點下去後點擊右邊的 `Install` 進行安裝。

![安裝 Ktor 外掛的頁面](/uploads/2020/09/ktor1.png)

安裝完後，在打開新專案時就會出現 Ktor 專案的選項，點擊下去後，先照著官方教學上面所說明的方式開新專案即可，也就是下圖所示的設定。

![開新 Ktor 專案的設定](/uploads/2020/09/截圖-2020-09-03-下午9.34.35.png)

後面名稱的部分可自行定義，一切都做完後就會看到預設的專案了。

## 利用 Ktor 架設基本 HTTP 伺服器

預設的專案內，主要的程式碼位於 `src/Application.kt` 的檔案裡面，由於在開專案的時候有選擇 `HTML DSL` 和 `CSS DSL` 的關係，裡面有一些相關的 Code ，如果去除掉的話就會長成下面的樣子：

```kotlin
package com.example

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.html.*
import kotlinx.html.*
import kotlinx.css.*
import io.ktor.client.*
import io.ktor.client.engine.apache.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    val client = HttpClient(Apache) {
    }

    routing {
        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }
    }
}
```

## Routing & HTTP request & HTTP response

這個 Code 裡面有很多東西，那很多部分其實都是 Ktor 幫我們處理掉的事情，比較詳細的解釋我留在備註裡面，有興趣可以看看，那主要我們會需要修改的地方就是 `Application.module` 這個函式的區塊，我們先來了解一下這個函式裡面的 `routing` 區塊。

```
routing {
    get("/") {
        call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
    }
}
```

`routing` 區塊，顧名思義就是在進行路由的工作。客戶端在與伺服器利用 HTTP 協定進行溝通的時候，會發送一個名叫 HTTP request 的請求，去跟伺服器要一個回應，也就是 HTTP response。而 HTTP request 中有帶了很多設定參數，其中有兩項參數會在這裡被 `routing` 用來做路由判斷使用，一個叫做 `Method` ，另外一個則是 `URI`（主要會是客戶端連線時所帶的網址路徑，通常判斷時會去除掉自身根目錄網址的部分，僅留後綴）。例如裡面定義的 `get("/")` 即代表如果該 HTTP request 帶的 `Method` 參數是 `GET` 且 `URI` 參數為網址根目錄時，則會執行大括弧內的內容，而這邊所執行的就是對於這個 `call`（主要是抽象化包裝此次連線會用到的 `HTTP request` 和 `HTTP response`，類別名稱為`ApplicationCall`）去回應一段 `HELLO WORLD!` 文字。

![HTTP request 與 HTTP response 之間的關係圖](/uploads/2020/09/HTTPrequest.png)

上圖展示了在上一段所描述的 HTTP request 和 HTTP response 之間的關係，一個 HTTP request 的部分通常會簡寫成其第一行內容 `[Method] [URI] HTTP/1.1` 去代表這個請求，這行內容的前面就是上面所提到的 `Method` 和 `URI`，最後面則為 HTTP 協定所使用的版本為何，通常預設為 `HTTP/1.1`。而對於 `Method` 的部分除了 `GET` 外還有哪些參數可以使用的部分，會等我們要開始設計詳細的 API 的階段再來詳細描述。

而一個 HTTP response 的部分通常也會簡寫成其第一行內容 `HTTP/1.1 [HTTP Status Code] [該 HTTP Status Code 的英文名稱]` 去代表這個回應， HTTP response 的 `HTTP Status Code` 通常代表著對於該請求能夠回應的狀態為何，關於這點在這裡就先不多說，之後要開始處理伺服器碰到的各種狀態後，再來詳細描述對於這些狀況我們可以回傳哪些 `HTTP Status Code` 回去給客戶端。

實際上， HTTP request 和 HTTP response 的內容不只有上面所寫的這些，也包含了其他參數設定的部分（通常將包含這些參數的部分稱之為 `header` 區塊）以及其內容為何（通常稱之為 `body` 區塊），例如我們所使用的 `call.respondText()` 即是可以在 HTTP response 的 `body` 內容裡面填寫文字，不過在這裡就不多加描述了，如果有興趣的話可以多搜尋一些資料來看看。

我們接著來試著實作個功能是「當 HTTP request 為 `GET /problems HTTP/1.1` 時，回傳 `這裡還沒有題目` 的字串」。我們先依樣畫葫蘆，在裡面多定義一個 `URI` 參數判斷為網址根目錄後接上 `problems` 這個字串（也就是在 `get()` 內填入 `/problems`） 時，會回應一段 `這裡還沒有題目` 的字串，看看效果會如何，則程式碼如下：

```
routing {
    // ...
    // 上面的程式碼 get("/") 部分 
    // ...
    
    get("/problems") {
        call.respondText("這裡還沒有題目", contentType = ContentType.Text.Plain)
    }
}
```

接著我們就試著讓伺服器執行起來吧！首先，在視窗的右側，有一個 `Gradle` 的頁籤，主要定義了可以對這個專案做哪些動作（關於 `Gradle` 這個東西的詳細部分會在之後再做說明），在裡面有一個 `Tasks > Application > Run`，對它點擊兩下即可執行這個伺服器程式。

![執行 Gradle 設定裡的 Run 指令](/uploads/2020/09/截圖-2020-09-01-下午11.19.54.png)

開始執行這個伺服器程式後，會在下方看到它正在執行伺服器程式的過程，最後會出現該伺服器在這台機器所監聽的 IP 與 Port 在哪裡（預設為 `http://0.0.0.0:8080`），直接點擊該連結即可用瀏覽器對這個伺服器進行 HTTP Request 得到內容。

![執行 Run 後，成功架設伺服器的截圖](/uploads/2020/09/截圖-2020-09-01-下午11.23.03.png)

由於我們直接連結到這個伺服器， `URI` 後面並沒帶除了伺服器網址本身以外的東西，故可以看到 `HELLO WORLD!` 這個字串。如果我們在網址列輸入 `http://0.0.0.0:8080/problems` 即可看到剛剛加入的 `這裡還沒有題目` 字串了！（透過此操作也可以暸解到，直接使用瀏覽器對該網址做 HTTP request 就會預設使用 `GET` 作為 `Method` 的參數）

![伺服器回應的內容截圖](/uploads/2020/09/20129798kYlAcxwAzQ.png)

## 總結
​
今天成功建立了 HTTP 伺服器後，明天就會開始來談談該怎麼定義資料型態，以及該怎麼做一些假資料以 JSON 格式的方式去回應 HTTP request。

## 備註
### 程式的進入點所呼叫的 `io.ktor.server.netty.EngineMain.main` 是什麼意思？

Ktor 本身這個框架在底層實作的部分也是使用了別的 Server 框架來實作，在這裡我們使用的是它將 netty 這個 Server 框架包裝起來的 Engine，所以 `io.ktor.server.netty.EngineMain` 其實就是這個 Ktor 使用 netty 所實作的一個 Engine 類別，而要啟動這個 Engine 就是去呼叫它的 `main()` 函式即可，故這個程式的進入點就是直接呼叫它所包裝的這個 Engine 的 `main()` 函式。

### `Application.module` 是什麼意思？

這個 `Application.module` 函式的定義實際上是一個擴充函式的定義，它讓 `Application` 這個類別擴充出了一個名叫 `module()` 的函式，而擴充出來的函式可以使用其類別內的成員屬性和成員函式，故裡面呼叫的 `routing` 即為 `Application.routing()`，去設定這個 `Application` 的路由該長什麼樣子。

而 Engine 在啟動的過程之中會生成出 `Application` 物件，並會去尋找它需要載入哪些 Module 進 Engine 中，載入以後它就去呼叫這些 Module，Module 的定義你可以在專案的 `resources/application.conf` 裡面找到，這是一個 Server 會去讀取的設定檔，在 `application { modules = [....]}` 中你可以看到 `xxx.xxx.ApplicationKt.module`，這個 `ApplicationKt.module` 就是你在 `Application.kt` 這個檔案裡面定義的 `Application.module()`，所以你其實是可以自己定義 Module 的名稱的，例如你可以把函式叫做 `Application.myModule()`，那麼 `resources/application.conf` 裡面 Module 的部分就可以改成 `xxx.xxx.ApplicationKt.myModule` 了。

至於為什麼 `Application.module()` 會變成 `xxx.xxx.ApplicationKt.module` 呢？這是因為 Kotlin 會將程式碼轉譯成 JVM 可以執行的語言，而 JVM 是根據 Java 語言來設計的，所以在 Java 中，一個類別其實前面會加上你的專案 ID，也就是 `xxx.xxx` 的部分。那另外，由於 Java 本身是一個純物件導向語言，所以 Kotlin 為了能夠配合它，會將在全域所定義的函式包進以該檔案名稱加上 `Kt` 的類別內，由於 `Application.module()` 本身是個擴充函式，擴充函式的做法是在編譯後變成一個全域的函式，並且第一個參數為其擴充的類別物件，且這個全域函式在 `Application.kt` 內，所以就成為了 `xxx.xxx.ApplicationKt.module` 了。

## 參考資料
* [Ktor - asynchronous Web framework for Kotlin](https://ktor.io)
* [kotlin-ktor-jetbrains-web-logo - Kotlin Expertise Blog](https://kotlinexpertise.com/kotlinktorwebdevelopment/ktor/)
* [HTTP API - Quick Start - Ktor](https://ktor.io/quickstart/guides/api.html)
* [In Introduction to HTTP Basics](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html)
* [Calls - Servers - Ktor](https://ktor.io/servers/calls.html)
* [Ionicons: The premium icon pack for Ionic Framework (Server Logo)](https://ionicons.com)
* [Application - Servers - Ktor](https://ktor.io/servers/application.html)

> 本篇文章最早發表於 `第 12 屆 iT 邦幫忙鐵人賽`: https://ithelp.ithome.com.tw/articles/10233771
