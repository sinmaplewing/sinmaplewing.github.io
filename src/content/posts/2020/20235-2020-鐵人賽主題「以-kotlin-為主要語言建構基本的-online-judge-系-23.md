---
id: 20235
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 23：批改系統網頁 (5) - 利用 styled-components
  與 Bootstrap 美化網頁'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-23
date: '2020-09-23T10:35:52+08:00'
lastmod: '2020-09-23T10:37:59+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- CSS
- 2020鐵人賽
- Kotlin
- styled-components
- Bootstrap
featured_image: /uploads/2020/09/23fb.png
permalink: /2020/09/23/20235/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-23/
wp_status: publish
wp_type: post
---

![Day 23：批改系統網頁 (5) - 利用 styled-components 與 Bootstrap 美化網頁](/uploads/2020/09/23fb.png)

昨天我們成功地從資料管理系統拉取了資料放在網頁上顯示，但由於目前的網頁實在還是太醜，再繼續將其他資料抓下來之前，就讓我們先來將網頁美化一下吧！

## CSS 語言

為了要美化網頁，最基本可以使用的方式就是利用 CSS 語言來進行美化的工作。這裡舉個簡單的例子，例如如果我們希望讓 `<section>` 標籤內的背景顏色呈現為黑色的話，可以像下面這樣的寫法：

```css
section {
  background: black;
}
```

CSS 語法以 `[CSS 選擇器] { [要調整的樣式屬性名1]: [要調整的樣式屬性的值1]; [要調整的樣式屬性名2]: [要調整的樣式屬性的值2]; ...... }` 的格式來對某個特定標籤進行樣式的調整。大括弧前面的是 `CSS 選擇器`，用來選擇要套用樣式的標籤有哪些，而大括弧內則是樣式表的描述。像上面的例子就是要將所有的 `<section>` 標籤的背景 `background` 屬性設定為黑色 `black`。

如果你不想讓所有 `<section>` 標籤的背景都改成黑色的話，可以在想要變更其樣式的標籤上，填入一個 `class` 的屬性值，像是 `<section class="bgblack">` 程式碼這樣。填完以後你就可以透過這個 `class` 屬性的值，去對要變更樣式的標籤進行選擇。使用 CSS 語法做這件事的程式碼如下所示：

```css
.bgblack {
  background: black;
}
```

在選擇器的部分，於名稱前面加上 `.`，即代表要選擇套用此樣式表的標籤為其 `class` 屬性值為 `.` 後面的字串。故上面的例子就是讓 `class` 屬性值為 `bgblack` 的標籤，套用背景為黑色的樣式表。

CSS 語言中有很多可以選擇標籤的方法，以及可以修改顯示樣式的屬性，這裡就不詳細去談了，可以參考 [MDN 的文件](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)去了解該怎麼使用它們。

## styled-components & Bootstrap

![styled-components 的 Logo（來自官網）](/uploads/2020/09/atom.png)

![Bootstrap 的 Logo（來自官網）](/uploads/2020/09/68747470733a2f2f76352e676574626f6f7473747261702e636f6d2f646f63732f352e302f6173736574732f6272616e642f626f6f7473747261702d6c6f676f2d736861646f772e706e67.png)

在這個專案裡面，我們並不會直接使用 CSS 語言來對標籤進行美化，而是使用 styled-components 和 Bootstrap 兩個套件去處理樣式美化的工作。styled-components 是一套可以與 React 良好結合的美化套件，其可以直接對 React 裡面 Virtual DOM 的節點去進行樣式的設定；而 Bootstrap 則是一套已經寫好很多常用 UI 的樣式表與邏輯的集合，我們只要在想要套用 Bootstrap 樣式的標籤，改變其 `class` 值為 Bootstrap 已設定好的值，就可以輕鬆的將 Bootstrap 已經製作好的樣式表套用上去，非常方便。

安裝 styled-components 的方式與以往相同，在 `build.gradle.kts` 裡面的 `dependencies` 內填入下面這行即可安裝：

```kotlin
implementation("org.jetbrains:kotlin-styled:1.0.0-pre.110-kotlin-1.4.0")
```

而 Bootstrap 的安裝則是使用原生的套用方式。於網頁 `index.html` 的內容裡面，使用 `<link>` 標籤來嵌入 CSS 樣式表，並利用 `<script>` 標籤來嵌入 Bootstrap 的 UI 邏輯 JavaScript 程式碼，整體套用到 `src/main/resources/index.html` 內後的內容如下所示：

```kotlin
<!DOCTYPE html>
<html lang="zh-tw">
<head>
    <meta charset="UTF-8">
    <title>Knight Online Judge</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>
<body>
    <div id="root"></div>
    <script src="[專案名稱].js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>
</html>
```

這裡是直接使用 Bootstrap 官方放在網路上的 CSS 與 JS 程式碼檔案，如果你希望在離線的情況下也可以使用，則可以將檔案從[官網](https://getbootstrap.com)下載下來再嵌入進去即可。

安裝完上述兩個套件後，就讓我們開始來裝飾網頁吧！

## Header 區塊美化

首先先來將 Header 的部分進行美化。 Header 的部分主要有一個導覽列，我們利用 Bootstrap 預設的導覽列 Navbar 樣式來進行美化，程式碼如下：

```kotlin
class Header: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        header {
            nav {
                attrs.classes = setOf("navbar", "navbar-expand-xl", "navbar-dark", "bg-dark")

                routeLink("/", className = "navbar-brand") {
                    +"Knight Online Judge"
                }

                ul {
                    attrs.classes = setOf("navbar-nav")

                    li {
                        attrs.classes = setOf("nav-item")
                        routeLink("/", className = "nav-link") { +"首頁" }
                    }
                    li {
                        attrs.classes = setOf("nav-item")
                        routeLink("/problems", className = "nav-link") { +"問題列表" }
                    }
                    li {
                        attrs.classes = setOf("nav-item")
                        routeLink("/submissions", className = "nav-link") { +"遞交程式碼列表" }
                    }
                    li {
                        attrs.classes = setOf("nav-item")
                        routeLink("/users", className = "nav-link") { +"使用者列表" }
                    }
                }
            }
        }
    }
}
```

為了要讓標籤能夠套用 Bootstrap 預設的 CSS 樣式表效果，我們要在標籤上填入指定的 `class` 名稱。在 Kotlin 語言的 React 套件中，我們可以利用標籤區塊內的 `attrs.classes` 去指定其 `class` 名稱有哪些。每一個標籤可以套用多個 `class` 名稱去套用多個不同的樣式表，像是在上面的程式碼中，最外層的 `nav` 區塊就套用了 `navbar`、`navbar-expand-xl`、`navbar-dark` 和 `bg-dark` 這四個 `class` 名稱，分別對此 `nav` 區塊套用了四種不同的樣式效果。另外在上面的程式碼中，`routeLink()` 這個輔助函式要套用 `class` 名稱的方式與預設的方式不太相同，它套用的方式是在函式內代入 `class` 名稱當引數即可，如果有多個 `class` 名稱要放入的話，中間需利用空白隔開。

底下稍微介紹一下每一個套用的 `class` 名稱主要的功能是什麼：

* **navbar**：表示此為導覽列根目錄的樣式。
* **navbar-expand-xl**：表示此導覽列的大小樣式，後頭的 `-xl` 部分有四種大小可以填入，分別為 `-sm`、`-md`、`-lg` 和 `-xl`。
* **navbar-dark**：表示此導覽列的顏色樣式為何，有 `-dark` 和 `-light` 可以選擇，主要會指定裡面所顯示的文字顏色為何。
* **bg-dark**：表示此導覽列的背景要什麼樣的顏色，這裡選用暗色系的顏色。
* **navbar-brand**：用來在導覽列的地方顯示網站名稱或廠牌名稱的樣式。
* **navbar-nav**：表示導覽列連結所在的列表樣式。
* **nav-item**：表示導覽列連結列表的各個項目的樣式。
* **nav-link**：表示導覽列連結文字的樣式。

其餘還有很多不同的樣式可以使用，詳情可以查閱 [Bootstrap 的文件](https://getbootstrap.com/docs/4.5/components/navbar/)。

在套用了 Bootstrap 所提供的樣式表後，我們可以直接執行看看效果如何，應該就會看到如下圖的結果了：

![Header 區塊的美化結果](/uploads/2020/09/截圖-2020-09-23-上午8.15.38.png)

## Footer 區塊美化

在 Header 部分美化完後，接著就讓我們先來美化可以比較簡單處理的 Footer 吧！Footer 的部分就比較沒什麼規範，這裡就讓它寫個 Copyright 常見的文字即可，程式碼如下所示：

```kotlin
class Footer: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        styledFooter {
            css {
                fontSize = LinearDimension("small")
            }

            hr { }
            div {
                attrs.classes = setOf("text-center")
                +"© 2020 Copyright: Maplewing"
            }
        }
    }
}
```

我們讓 `footer` 區塊改成使用 styled-components 專用的區塊定義方式，在 `footer` 前面加上 `styled`，藉以讓裡面可以利用 `css` 區塊去定義 `footer` 區塊的 CSS 樣式。在 `css` 區塊裡面，我們設定了 `fontSize` 讓文字稍微變小了一點。接著利用 `hr` 區塊所代表的 `<hr>` 標籤定義了一條水平分隔線，然後用一個 `div` 區塊配合 `class` 名稱為 `text-center` 去讓文字能夠置中，並填入 `© 2020 Copyright: Maplewing` 這幾個文字。定義完後應該就可以看到如下圖所顯示的結果了：

![Footer 區塊的美化結果](/uploads/2020/09/截圖-2020-09-23-上午8.38.01.png)

## 內容部分美化

最後要來處理的是內容部分的美化，首先我們先回頭看一下之前定義的 `MainArticle` Component 在使用上有什麼與別人不同的地方：

```kotlin
mainArticle { content = "這裡是首頁" }
```

我們定義的擴充函式好像在區塊內只能代入 `attrs` 要填入的值而已，而不能像是其他 Component 一樣，在區塊內繼續填入 Virtual DOM 的結構。主要原因是因為我們的擴充函式目前定義的參數函式型態不足夠做這件事情，所以我們將定義改成如下程式碼所示：

```kotlin
fun RBuilder.mainArticle(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(MainArticle::class, handler)
```

參數函式的型態從代入 `MainArticleProps.() -> Unit` 變成代入 `RElementBuilder<RProps>.() -> Unit`。利用將 Receiver Type 換成 `RElementBuilder<RProps>` 藉以符合 `child()` 函式能夠代入 Virtual DOM 結構的需求，進而讓你在使用的時候就可以繼續撰寫內部的 Virtual DOM 結構長怎樣。而之所以將 `MainArticleProps` 換回 `RProps`，主要原因是因為既然已經可以繼續放 Virtual DOM 結構，那我也就不用再利用 props 去傳遞內容為何了。

改寫完擴充函式後，接著讓 `MainArticle` 能夠決定代入的 Virtual DOM 結構要放在哪裡吧！程式碼如下所示：

```kotlin
class MainArticle: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        article {
            section {
                children()
            }
        }
    }
}
```

利用 `children()` 函式就可以將代入的 Virtual DOM 結構放在你想要放的位置上，這樣就可以讓使用的人從 `mainArticle { content = "這裡是首頁" }` 改成如下所示的用法：

```kotlin
mainArticle { +"這裡是首頁" }
```

而 `App` Component 裡面整體的程式碼就會改成如下所示：

```kotlin
class App: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        hashRouter {
            div {
                attrs.id = "container"

                websiteHeader { }
                switch {
                    route("/", exact = true) { mainArticle { +"這裡是首頁" } }
                    route("/problems", exact = true) { problemsArticle {  } }
                    route<IdProps>("/problems/:id") {
                        val id = it.match.params.id
                        mainArticle {
                            +"這裡是第 $id 題題目詳細資料"
                        }
                    }

                    route("/submissions", exact = true) { mainArticle { +"這裡是總遞交程式碼列表" } }
                    route<IdProps>("/submissions/:id") {
                        val id = it.match.params.id
                        mainArticle {
                            +"這裡是第 $id 個程式碼詳細資料"
                        }
                    }

                    route("/users", exact = true) { mainArticle { +"這裡是總使用者列表" } }
                    route<IdProps>("/users/:id") {
                        val id = it.match.params.id
                        mainArticle {
                            +"這裡是第 $id 編號使用者詳細資料"
                        }
                    }
                }
                websiteFooter { }
            }
        }
    }
}
```

如此一來 `MainArticle` 就可以代入更多東西在其內部，藉以讓我們可以更方便地去使用這個 Component。至於其餘的 `websiteHeader()` 或是 `websiteFooter()` 要不要換成這樣可以由你自己去做決定，因為這兩個區塊比較沒有需要代入不同值去做顯示的需求，所以維持原狀就可以了。那之所以這邊我會想要將 `MainArticle` 做這樣的改動，是因為我希望能夠將 `MainArticle` 內的 `article` 和 `section` 所使用的大小與位置利用 styled-components 和 Bootstrap 中的 Grid 樣式去做調整，並讓 `ProblemsArticle` 能夠直接使用這個調整好的 Component 去做其內容上的顯示，如下程式碼所示：

```kotlin
// MainArticle.kt
class MainArticle: RComponent<RProps, RState>() {
    override fun RBuilder.render() {

        styledArticle {
            css {
                width = LinearDimension("80%")
                margin = "30px auto"
            }

            attrs.classes = setOf("row")

            section {
                attrs.classes = setOf("col")
                children()
            }
        }
    }
}

// ProblemsArticle.kt
class ProblemsArticle: RComponent<RProps, ProblemsArticleState>() {
    /* ...... 資料抓取的區塊 ...... */

    override fun RBuilder.render() {
        mainArticle {
            h1 {
                +"題目列表"
            }
            for (data in state.problemsData) {
                div {
                    +"${data.id} - ${data.title}"
                }
            }
        }
    }
}
```

我們利用 Bootstrap 的 Grid 樣式去配置其標籤所佔的大小與位置，利用 `row` 來分隔出橫排的部分，接著每個橫排可以利用 `col` 來分隔出欄位的部分。但由於在這裡我們僅用了一個區塊，所以其實這樣切下來與沒切並不會有太多的差異，但未來如果有要加入其他區塊的話，只要遵守這個規則就可以讓版面配置地更好看。詳細可以怎麼利用 Grid 樣式去切割區塊可以查閱 [Bootstrap 官網關於 Grid 樣式的文件](https://getbootstrap.com/docs/4.0/layout/grid/)。

在 `MainArticle` 的 `article` 部分，我們換成了 `styledArticle` 來讓裡面可以填寫一些 CSS 的樣式。其中 `width` 是用來調整標籤元素的寬度，而 `margin` 則是用來調整標籤與標籤之間的距離。`width` 調整成 `80%` 代表其寬度要為其所在的親代元素的寬度的 80%；而 `margin` 代入的值 `30px auto` 則表示這個標籤與上下兩個標籤之間的距離要相隔 30 像素高，而左右則是 `auto` 自動調整成置中的形式。

最後在 `ProblemsArticle` 的部分，我們就直接使用 `mainArticle` 作為基礎，繼續追加題目列表的內容即可，最後會長成下圖所示的樣子：

![問題總列表的頁面截圖](/uploads/2020/09/截圖-2020-09-23-上午9.30.49.png)

題目目前顯示的樣子還是有點不太好看，我們可以利用 HTML 當中的 `<table>` 標籤來用表格去表示這群題目資料，如下所示：

```kotlin
table {
    attrs.classes = setOf("table", "table-bordered", "table-striped")

    thead {
        attrs.classes = setOf("thead-dark")

        tr {
            th { +"編號" }
            th { +"標題" }
        }
    }
    tbody {
        for (item in state.problemsData) {
            tr {
                td { +item.id }
                td {
                    routeLink("/problems/${item.id}") {
                        +item.title
                    }
                }
            }
        }
    }
}
```

表格的使用方式為，先使用根標籤 `<table>`，並在其內部區分兩個部分，分別是表格標題所在的 `<thead>` 與表格內容所在的 `<tbody>`。接著利用 `<tr>` 標籤來分隔成一個一個的橫排，然後利用 `<th>` 標籤或是 `<td>` 標籤來分隔所在橫排中的欄位。`<th>` 標籤指的是標題欄位，而 `<td>` 標籤指的是一般欄位。

我們在 `<thead>` 標籤中定義一個橫排，裡面有兩欄，兩欄分別是 `編號` 與 `標題` 這兩個代表下面欄位資料的表格標題文字。接著在 `<tbody>` 的部分，則利用 `for` 迴圈去將資料一筆一筆地生成一排一排的橫排，然後填入其資料所帶的編號與標題即可。那為了要讓標題能夠有超連結連結至相對應的題目詳細內容，這裡就用 `routeLink()` 去生成超連結標籤，讓使用者可以點擊題目標題進入詳細題目資料的頁面。

定義完表格的結構後，利用 Bootstrap 所預設的 `Table` 樣式表去美化整個表格。作法與之前相同，將 Bootstrap 所使用的 `class` 名稱一個一個代入給相對應的標籤即可。底下稍微解釋一下這些 `class` 名稱代表的涵意為何：

* **table**：代表此為表格根目錄的樣式。
* **table-bordered**：代表表格之間要用線隔開。
* **table-striped**：代表奇數橫排和偶數橫排要用不同的背景顏色隔開。
* **thead-dark**：代表表格標題要用暗色系的樣式來呈現。

其餘還有很多不同的表格樣式可以使用，詳情可以查閱 [Bootstrap 的文件](https://getbootstrap.com/docs/4.0/content/tables/)。

將原本利用 `<div>` 標籤呈現的資料替換成 `<table>` 後，執行起來就可以看到如下圖的結果：

![題目列表的美化結果頁面截圖](/uploads/2020/09/截圖-2020-09-23-上午9.51.56.png)

## 總結

今天我們利用了 styled-components 和 Bootstrap 去幫我們在 React 中對其內部的節點套用了樣式上去，讓網頁可以看起來更漂亮。由於如何設計版面與套用樣式本身也是一個很深的學問，這裡僅對有使用到的部分進行說明，如果有興趣的話可以再找一些相關的教學，讓你可以把網頁弄得更漂亮。

## 參考資料
* [styled-components](https://styled-components.com)
* [Introduction · Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Welcome to Kotlin hands-on](https://play.kotlinlang.org/hands-on/Building%20Web%20Applications%20with%20React%20and%20Kotlin%20JS/06_More_Components)
