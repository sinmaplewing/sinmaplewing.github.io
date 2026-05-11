---
id: 19517
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 20：批改系統網頁 (2) - 使用 Kotlin-React
  進行專案開發'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-20
date: '2020-09-20T13:25:44+08:00'
lastmod: '2020-09-20T15:15:57+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- DOM
- Virtual DOM
- React
featured_image: /uploads/2020/09/20fb.png
permalink: /2020/09/20/19517/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-20/
wp_status: publish
wp_type: post
---

![Day 20：批改系統網頁 (2) - 使用 Kotlin-React 進行專案開發](/uploads/2020/09/20fb.png)

昨天我們成功地建立了一個基本的 Kotlin/JS 專案，今天就讓我們開始來安裝前端常使用的套件 React 的 Kotlin 包裝版吧！

## React 介紹與安裝

![React 的 Logo（來自 https://logos-download.com/9747-react-logo-download.html）](/uploads/2020/09/React_logo_wordmark.png)

在前端為了能夠模組化視覺元件以及為了讓視覺元件與邏輯能夠有更直覺的處理方式，我們會選擇使用一些前端基礎建設套件來處理這件事情，而在這方面目前最有名的三個套件分別是 AngularJS、Vue.js 以及我們在這裡即將要使用的 React。React 是 Facebook 公司所製作的 JavaScript 套件，專門用來處理網頁視覺元件相關資料與邏輯的事情。由於 Kotlin 目前對於 JavaScript 部分預設的教學專案是使用 React 來製作的，故如果我們也跟著使用 React 的話，在使用過程中比較不會出現遇到問題不知道該怎麼解決的情況，所以我們在這裡也就跟著使用 React 來進行開發。如果有興趣去接觸一下 AngularJS 和 Vue.js 的話，可以去找找看它們有沒有被包裝成 Kotlin 語言的版本喔！

安裝套件的過程，相信在開發了兩個專案後已經很熟悉了。基本上就是在 Gradle 中處理即可，不過這次我們要增加一些可以供我們 Gradle 下載的倉庫列表，在 `build.gradle.kts` 的 `repositories` 區塊內，我們將裡面的倉庫列表更新成下面的樣子：

```kotlin
repositories {
    maven("https://kotlin.bintray.com/kotlin-js-wrappers/")
    mavenCentral()
    jcenter()
}
```

增加了更多可以下載套件的倉庫位置後，我們就增加關於 `Kotlin-React` 所需要的套件吧！在 `dependencies` 的區塊部分增加底下四個套件：

```kotlin
implementation("org.jetbrains:kotlin-react:16.13.1-pre.110-kotlin-1.4.0")
implementation("org.jetbrains:kotlin-react-dom:16.13.1-pre.110-kotlin-1.4.0")
implementation(npm("react", "16.13.1"))
implementation(npm("react-dom", "16.13.1"))
```

上面兩筆是跟我們下載一般 Kotlin 函式庫一樣的規格定義方式，屬於 Kotlin 語言這裡的函式庫。而下面兩筆的地方多使用了一個 `npm` 函式去進行下載套件的動作，`npm` 是 JavaScript 相關套件的管理程式，我們在這裡是請求它幫我們灌入原生的 `react` 和 `react-dom` 兩個套件，藉以讓我們上方的兩筆 Kotlin 包裝版 `kotlin-react` 和 `kotlin-react-dom` 能夠運作起來。

在安裝完後，如果你還在用 Kotlin 1.4 以下的版本有可能會遇到下面的 Bug：

```
Unable to build Kotlin project configuration

org.gradle.internal.operations.BuildOperationQueueFailure: There was a failure while populating the build operation queue: Could not resolve all dependencies for configuration ':npm'.
......
```

如果仔細看錯誤的話，大概會知道原因是專案裡面使用的兩個內建套件 `jsIr-runtime` 和 `jsLegacy-runtime` 似乎對於要安裝的套件互相衝突到了，而 Kotlin 1.4 版以上它會知道要選擇哪一邊來使用，但是 Kotlin 1.4 版以下的版本並不知道，故解決方法只有升級 Kotlin 或是使用 [Workaround](https://youtrack.jetbrains.com/issue/KT-40226) 方式去處理。關於如何升級或是怎麼使用 Workaround 的部分這裡就先不詳談了，如果有碰到問題的話可以在底下留言讓我知道，我再說明詳細的過程。（這邊是建議更新上最新版後，重開一個專案會比較好）

成功安裝完後，就來嘗試看看 React 吧！首先先將 `index.html` 中的 `<body>` 內容替換成如下所示：

```html
<body>
    <div id="root"></div>
    <script src="[專案名稱].js"></script>
</body>
```

裡面內容變成了兩個標籤，一個是 `<div>` 標籤，此標籤代表的是「這裡是一個區塊」的意思，我們給這個區塊屬性 `id` 一個可以用來辨識此區塊的名稱 `root`。在 `<div>` 標籤的下面是 `<script>` 標籤，這個標籤是用來嵌入 JavaScript 程式碼用的，其 `src` 屬性代表的是要嵌入的 JavaScript 檔案的所在位置。而我們的專案在將 Kotlin 程式碼編譯成 JavaScript 後，會產生一個以專案名稱命名的 `.js` 檔，故上方程式碼中，`[專案名稱]` 的部分就請填入你開此專案時的名稱即可。

HTML 檔案設定好後，就可以在 `src/main/kotlin` 資料夾內，創一個新的 Kotlin 程式碼檔案 `main.kt` 來開始寫程式，裡面內容詳細如下：

```kotlin
import react.dom.*
import kotlinx.browser.document

fun main() {
    render(document.getElementById("root")) {
        h1 {
            +"歡迎光臨！"
        }
    }
}
```

填寫完後執行看看，應該就會看到一個斗大的「歡迎光臨！」的標題在網頁上了。

![第一個 React 網頁截圖](/uploads/2020/09/截圖-2020-09-20-上午11.36.51.png)

接下來就讓我們來講解一下 `render()` 這個函式，不過為了要能夠了解函式裡面的運作，這裡必須要先解釋一下什麼是 DOM 以及什麼是 Virtual DOM。

## DOM & Virtual DOM

DOM (Document Object Model) 是一種可以將 XML 或是 HTML 這類文件以樹狀方式結構來呈現其文件結構的方式，以我們昨天的範例來說，以 DOM 來表示的話就會如下圖所示：

![網頁的 DOM 結構](/uploads/2020/09/DOM.png)

整個 Document 以 `<html>` 為根節點，裡面分成屬性 `lang`、`<head>` 和 `<body>` 三個節點，而 `<head>` 底下又有 `<meta>` 和 `<title>` 兩個節點......等等這樣樹狀結構的方式去表示這份 HTML 文件。而在網頁程式碼的部分就可以利用這個 DOM 的樹狀結構去操作 HTML 文件的結構內容，以對網頁內容去進行變動。

而為了避免每次對 DOM 操作都會直接對畫面上的顯示進行改變，React 引入了 Virtual DOM 的概念，可以建立一個虛擬的 DOM 結構，並綁定該結構的根節點到實際 HTML 文件的某個節點上，我們僅操作 Virtual DOM 去進行我們想要對文件的改動，而 React 就會比較兩者的差異後，才把有差別的地方更新上去。

在我們的範例中，我們利用 `render([HTML DOM 節點], [Virtual DOM 結構])` 這個函式就可以對 React 表示實際 DOM 的哪個節點要與後面生成的 Virtual DOM 進行連接，並且開始更新其差異。HTML DOM 的節點我們利用 `document.getElementById()` 可以透過標籤上面所標註的屬性 `id` 字串去抓出位於文件中的 DOM 節點，而後面的 `h1 { ...... }` 則是 Kotlin 語言利用像是我們之前在 Ktor 裡面定義 `Router` 般的方式來定義 DOM 結構。`h1` 代表的就是 `<h1>` 標籤所形成的節點，而 `<h1>` 標籤是用來標示此為一級標題用的標籤，裡面的 `1` 可以替換從 1 到 6 的六個數字，數字越大所代表的標題重要性就越小，常用的標題大概最高就到三級標題左右。而在 `<h1>` 標籤內的 `+"歡迎光臨！"` 則是 Kotlin 語言利用 `+` 號來建立文字節點的意思，所以整個 DOM 結構所代表的其實就是 `<h1>歡迎光臨！</h1>` 的意思。其最終形成的效果如下圖所示：

![Virtual DOM 與實際 DOM 的連結](/uploads/2020/09/VirtualDOM-2.png)

## 單篇網頁的結構

了解了該怎麼處理文件結構後，我們就可以來看一下一個基本的網頁結構大概會分成哪幾個部分，底下是網頁結構的概念圖：

![HTML5 網頁結構概念圖](/uploads/2020/09/html5structure.png)

整個網頁會被一個 `<div>` 區塊給包住，其 `id` 叫做 `container`，裡面分成頭部 `<header>`、主要部分 `<main>` 和尾部 `<footer>`。頭部一般會放導覽列，也就是 `<nav>`。主要部分又可以分成主要文章內容的部分 `<article>` 以及旁邊的工具列 `<aside>`，而主要文章內容通常又分成一區一區的 `<section>` 去對內容進行區塊分割，以表示文章內不同區塊的內容。

在這樣定義完後，基本的網頁結構大概就建構出來了。雖然這裡是這麼定義一個基本的網頁結構，你也還是可以根據你的需求去變更它。例如說你希望尾部也能有一個導覽列，那你也可以在 `<footer>` 的部分增加一塊 `<nav>`；又像是我們在這裡實在還想不到 `<aside>` 的部分要放什麼，所以在整個結構中，就可以先將 `<aside>` 拿掉，寫成程式碼的話就會像下方程式碼的樣子：

```kotlin
import react.dom.*
import kotlinx.browser.document
import kotlinx.html.id

fun main() {
    render(document.getElementById("root")) {
        div {
            attrs.id = "container"

            header {
                +"這是標頭部分"
                nav {
                    +"這是選項"
                }
            }

            article {
                section {
                    +"一個區域"
                }
            }

            footer {
                +"這是尾巴的部分"
            }
        }
    }
}
```

程式碼中有使用到 `attrs` 這個成員變數，可以利用它來變更所在標籤的屬性值，這裡我們將最外層的 `div` 的 `id` 屬性加上了 `container` 的值。除此之外的其他部分就是與上面的網頁結構圖相同的架構，只是 `<aside>` 的部分我目前就先忽略不使用它。到這裡我們就可以來執行看看這個程式了，目前大概只會看到每一段文字照順序顯示出來而已，並不會讓你特別覺得整個文件有一個一個區塊的感覺，關於如何美化這些區塊的部分，就是之後交給 `CSS` 來處理了，今天就先將結構寫出來就可以了。

![網頁結構畫面的截圖](/uploads/2020/09/截圖-2020-09-20-下午12.51.44.png)

## 總結

今天我們利用 React 將整個網頁結構的 Virtual DOM 定義出來，並且可以更新到瀏覽器畫面上。但其實我們還沒真正見識到 React 強大的地方，明天就讓我們繼續來使用 React 更多的功能去輔助我們開發這個批改系統的網頁吧！

## 參考資料
* [React – A JavaScript library for building user interfaces](https://reactjs.org)
* [React – Logos Download](https://logos-download.com/9747-react-logo-download.html)
* [Document Object Model - Wikipedia](https://en.wikipedia.org/wiki/Document_Object_Model)
* [Virtual DOM and Internals – React](https://reactjs.org/docs/faq-internals.html)
* [html - HTML5 Page Structure: Section and Article correct placement - Stack Overflow](https://stackoverflow.com/questions/51609208/html5-page-structure-section-and-article-correct-placement)
