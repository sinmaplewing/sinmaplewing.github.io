---
id: 19691
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 21：批改系統網頁 (3) - 模組化視覺元件與單頁路由處理'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-21
date: '2020-09-21T10:19:30+08:00'
lastmod: '2020-09-28T10:54:57+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- React
- React Router
featured_image: /uploads/2020/09/21fb.png
permalink: /2020/09/21/19691/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-21/
wp_status: publish
wp_type: post
---

![Day 21：批改系統網頁 (3) - 模組化視覺元件與單頁路由處理](/uploads/2020/09/21fb.png)

昨天我們將 React 套件導入了專案中，並且完成了一頁完整網頁的結構。今天我們要嘗試將這個結構模組化，並且利用 React Router 來進行前端網頁的路徑路由處理。

## React Component

首先先來讓我們回顧一下原本我們寫在 `main.kt` 內的 Virtual DOM 的內容，如下程式碼所示：

```kotlin
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
```

整個頁面總共分成三個部分，分別是 `header` 區塊、`article` 區塊和 `footer` 區塊。在這裡我們可以利用 React 提供的 Component 方式去模組化這三個區塊，以 `header` 為例，在 Kotlin 內建立 React 的 Component 的寫法如下所示：

```kotlin
// header.kt
import react.*
import react.dom.*

class Header: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        header {
            +"這是標頭部分"
            nav {
                +"這是選項"
            }
        }
    }
}
```

建立一個類別繼承 `RComponent` 這個類別，後面接著兩個類別參數 `RProps` 和 `RState` 分別是要給該 Component 的屬性參數 props 以及該 Component 自身的狀態 state，這兩個類別可以自行定義去代入，不過在這裡我們還不需要使用所以就先用預設的就好。

在類別裡面，我們覆寫掉原本對 `RBuilder.render()` 的實作，在裡面就是對 `RBuilder` 物件去建立這個 Component 所要建立的 Virtual DOM 內容即可，所以就是把 `header` 區塊整個搬過來就是我們要的樣子。

那相同的道理我們也可以將 `article` 區塊和 `footer` 區塊給建立出來，如下所示：

```kotlin
// MainArticle.kt
import react.*
import react.dom.*

class MainArticle: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        article {
            section {
                +"一個區域"
            }
        }
    }
}

// Footer.kt
import react.*
import react.dom.*

class Footer: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        footer {
            +"這是尾巴的部分"
        }
    }
}
```

接著我們將整個 `<div id="containter">` 的區塊也隔成一個 Component，其組成就是上面已經定義好的三個 Component。如何在 Component 內將其他的 Component 塞進 Virtual DOM 中呢？可以利用 `child()` 函式即可，如下程式碼所示：

```kotlin
// App.kt
import kotlinx.html.id
import react.*
import react.dom.*

class App: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        div {
            attrs.id = "container"

            child(Header::class) {}
            child(MainArticle::class) {}
            child(Footer::class) {}
        }
    }
}
```

`child()` 函式內要代入 Component 所在的類別當作參數，利用 `[類別名稱]::class` 即可把該類別當成參數傳進去，而後面的大括弧可以繼續去定義其 Component 形成的節點裡面還要掛哪些節點，在這裡由於我們都已經在 Component 內定義好了，故就不再放入任何東西了。

由於用 `child()` 函式建立節點的做法與其他像是 `h1`、`div`.....等等這類增加節點的方式不同，我們可以利用擴充 `RBuilder` 類別的方式來讓我們的 Component 增加節點的方式與其他人看起來一致，寫法如下：

```kotlin
fun RBuilder.websiteHeader(handler: RProps.() -> Unit): ReactElement =
    child(Header::class) {
        attrs(handler)
    }

fun RBuilder.mainArticle(handler: RProps.() -> Unit): ReactElement =
    child(MainArticle::class) {
        attrs(handler)
    }

fun RBuilder.websiteFooter(handler: RProps.() -> Unit): ReactElement =
    child(Footer::class) {
        attrs(handler)
    }

fun RBuilder.app(handler: RProps.() -> Unit): ReactElement =
    child(App::class) {
        attrs(handler)
    }
```

形式大概就是擴充 `RBuilder` 一個相對應的函式名稱，然後可以代入一個匿名函式，這個匿名函式其實就像是我們在建立 `<h1>` 標籤節點的函式 `h1 { ...... }` 時的區塊內容部分，這個部分我們就會交給實際建構出來的 Component 的屬性去使用，所以就帶給回傳的 `child()` 函式區塊內的 `attrs` 屬性設定的函式內，在這裡我們暫時還不會用到它。最後整個函式會回傳一個 `ReactElement`，也就是最後我們建構出來的 Component 節點。

有了上面的定義後，整個 `App` 類別中的定義就可以如下方程式碼的方式去定義：

```kotlin
class App: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        div {
            attrs.id = "container"

            websiteHeader { }
            mainArticle { }
            websiteFooter { }
        }
    }
}
```

看起來就跟原生的節點宣告方式差不多了。最後我們的主程式 `main.kt` 就會變成直接使用 `App` 這個 Component 就可以了，程式碼如下：

```kotlin
fun main() {
    render(document.getElementById("root")) {
        app { }
    }
}
```

## 網站整體結構與 React Router

能夠模組化視覺元件後，接著就讓我們來構思一下網站的整體架構吧！先不論修改、新增和刪除等等對資料進行修改的操作，僅考慮顯示內容的部分的話，大概可以畫成如下的架構圖：

![網站整體架構圖](/uploads/2020/09/WebsiteStructure.png)

大體上此網站架構圖就是對應我們在資料管理系統中所管理的三類資料「題目」、「遞交的程式碼」與「使用者」的總列表與詳細資料的顯示。在資料管理系統的時候我們使用了 `Router` 的方式來對 HTTP Request 所傳來的路徑進行剖析，藉以回傳正確的內容回去。那在這個前端網頁專案的部分，我們可以怎麼去處理它呢？

![React Router 的 Logo（來自 https://tkssharma.gitbook.io/react-training/day-05/next-stop-react-router-or-spa）](/uploads/2020/09/05dca500-f010-11e9-9588-a96554294e4e.png)

一種方式是我們可以直接在 `Resources` 資料夾內，對應相對的路徑去建立 HTML 檔案即可。不過既然我們都使用了 React，那我們也可以使用相容於 React 套件的 React Router 套件來處理。React Router 基本上是利用 React 的 Component 形式去讓單一個檔案可以對不同的路徑產生不一樣的內容，其 Kotlin 語言的包裝版名稱叫做 `kotlin-react-router-dom`。就讓我們先來安裝它吧！

安裝的方式與以往相同，在 Gradle 的設定檔 `build.gradle.kts` 的 `dependencies` 的區塊內，增加下面的這行以進行安裝：

```kotlin
implementation("org.jetbrains:kotlin-react-router-dom:5.1.2-pre.116-kotlin-1.4.10")
```

安裝完後，我們就可以來嘗試使用它進行路由的工作了。首先先讓我們的 `MainArticle` 能夠代入參數以用來變更內容，這裡繼承了原有的 `RProps` 介面去填入想代入給 `MainArticle` 的資訊，目前我們希望能夠代入一段內容文字讓 `MainArticle` 顯示，如下程式碼所示：

```kotlin
external interface MainArticleProps: RProps {
    var content: String // 一段內容文字
}
```

接著在 `MainArticle` 類別所繼承的類別 `RComponent<RProps, RState>` 中預設的 `RProps` 替換成我們另外定義的 `MainArticleProps`，藉以讓我們可以透過它傳入參數給 `MainArticle` 這個 Component，並透過成員變數 `props` 去取出參數內的值，如下程式碼所示：

```kotlin
class MainArticle: RComponent<MainArticleProps, RState>() {
    override fun RBuilder.render() {
        article {
            section {
                +props.content
            }
        }
    }
}

fun RBuilder.mainArticle(handler: MainArticleProps.() -> Unit): ReactElement =
    child(MainArticle::class) {
        attrs(handler)
    }
```

我們讓 `MainArticle` 改為繼承了 `RComponent<MainArticleProps, RState>`，這樣內部的成員變數 `props` 的類別就會變成 `MainArticleProps`，我們就可以透過它拿到傳遞進來的 `content`。而 `mainArticle()` 這個擴充函式所代入的參數變數，也就跟著從 `RProps.() -> Unit` 改為 `MainArticleProps.() -> Unit`，讓我們可以透過傳入的 handler 來將內容傳給 `MainArticle` 了。

再來就是在 `App` 這個 Component 去進行路由的工作。利用 React Router 中的 `hashRouter` 來開始進行路由，而裡面對於要變換的內容部分，利用 `switch` Component 來表示這裡會根據路由結果來更改內容，而詳細路徑與 Component 的對應就使用 `route` Component 即可。程式碼如下所示：

```kotlin
class App: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        hashRouter {
            div {
                attrs.id = "container"

                websiteHeader { }
                switch {
                    route("/", exact = true) { mainArticle { content = "這裡是首頁" } }
                    route("/problems", exact = true) { mainArticle { content = "這裡是問題總列表" } }
                    route("/submissions", exact = true) { mainArticle { content = "這裡是總遞交程式碼列表" } }
                    route("/users", exact = true) { mainArticle { content = "這裡是總使用者列表" } }
                }
                mainArticle { }
                websiteFooter { }
            }
        }
    }
}
```

在這裡我們僅僅只對 `mainArticle` 的部分進行內容的代換。在 `route()` 的函式內，我們多代入了一個引數 `exact = true`，主要原因是因為像是題目列表所定義的路徑 `/problems` 其實也是位於根路徑 `/` 之下所延展出來的子路徑，所以如果不使用 `exact = true` 的話，那麼只要是在 `/` 之下的所有網域就都會被導到 `route("/")` 之中，你可以在測試的時候試著拔掉 `exact = true` 看看是不是啟動後所有路徑都只會使用第一個路由結果來顯示內容。

`route()` 函式的區塊內則是填入要輸出的 Virtual DOM 結構，在這裡我們四個部分都使用了 `mainArticle` 這個 Component，僅僅只是我們給予其中的 `MainArticleProps` 的 `content` 內容不同而已，藉以讓我們可以測試看看路由是否有正常運作。

總列表路由完成後，接著要來路由詳細資料的部分，這個部分會在路徑上代入一個 `id` 的值。首先一樣要先定義要傳給 `route` Component 的參數長什麼樣子，在這裡我們定義了 `IdProps` 來作為要傳給 `route` Component 的 props 類別。

```kotlin
external interface IdProps : RProps {
    var id: Int
}
```

有了這個參數類別後，我們就可以在路徑上加上要從路徑剖析給 props 的內容為何，在路徑上使用 `:[props 類別內所使用的變數名稱]` 來做定義。也就是說，如果我們要從路徑剖析給 `IdProps` 的內容的話，那麼要在路徑上使用 `:id` 來標明，如下程式碼所示：

```kotlin
route("/") { mainArticle { content = "這裡是首頁" } }
route("/problems", exact = true) { mainArticle { content = "這裡是問題總列表" } }
route<IdProps>("/problems/:id") {
    val id = it.match.params.id
    mainArticle {
        content = "這裡是第 $id 題題目詳細資料"
    }
}

route("/submissions", exact = true) { mainArticle { content = "這裡是總遞交程式碼列表" } }
route<IdProps>("/submissions/:id") {
    val id = it.match.params.id
    mainArticle {
        content = "這裡是第 $id 個程式碼詳細資料"
    }
}

route("/users", exact = true) { mainArticle { content = "這裡是總使用者列表" } }
route<IdProps>("/users/:id") {
    val id = it.match.params.id
    mainArticle {
        content = "這裡是第 $id 編號使用者詳細資料"
    }
}
```

在各個原有的路徑下方都增加了一個其詳細資料的顯示路由，在 `route()` 函式代入要剖析的 props 的類別為何，在這裡就是代入 `IdProps`。接著在路徑的地方使用 `:id` 來標示 `IdProps.id` 在路徑中的位置，這樣就可以成功讓 `route` 利用路徑生出一個相對應的 `RouteResultProps<IdProps>` 物件交給後面的區塊使用。而從 `RouteResultProps<IdProps>` 物件抓出 `id` 的方式，就是利用其底下的 `match.params.id` 的變數即可。`match` 裡面裝的是路徑比對後的結果，而 `params` 就是剖析出來的參數，由於我們代入了 `IdProps` 給 `route()` 函式，故其型態就為 `IdProps`，接著取出裡面的 `id` 即是我們要的結果。

最後，讓我們將網頁頭部的導覽列區塊加上可以移到其他頁面的超連結列表，如下程式碼所示：

```kotlin
class Header: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        header {
            +"這是標頭部分"
            nav {
                ul {
                    li { routeLink("/") { +"首頁" } }
                    li { routeLink("/problems") { +"問題列表" } }
                    li { routeLink("/submissions") { +"遞交程式碼列表" } }
                    li { routeLink("/users") { +"使用者列表" } }
                }
            }
        }
    }
}
```

`ul` 是指 `<ul>` 標籤所形成的 DOM 節點，`<ul>` 標籤是用來表示一個無順序列表的意思，其 `ul` 二字即為 `unordered list` 的縮寫，而裡面的每一項內容則是使用 `<li>` 標籤來表示。在這裡我們使用了四個 `<li>` 各表示一個可以連結到剛剛我們所定義的路徑的連結。`routeLink` 則是可以根據它所被包含在的路由方式內，來產生相對應的超連結標籤 `<a>` ，讓我們能夠透過產生出來的超連結去連結到正確的路徑上。我們在 `App` 的部分使用了 `hashRouter` 來定義路由，其實另外還有一個方式是使用 `browserRouter` 來定義，那兩者之間有什麼不同的地方呢？底下是一個對照表：

路徑定義 | hashRouter | browserRouter
-|-|-
route("/") | /#/ | /
route("/problems") | /#/problems | /problems
route("/submissions") | /#/submissions | /submissions
route("/users) | /#/users | /users

你會發現 `hashRouter` 比 `browserRouter` 的路徑前面多了一個 `#`，相較之下 `browserRouter` 的方式似乎比較簡潔，也比較像平常瀏覽網頁時所看到的路徑，那為什麼我們在這裡不使用 `browserRouter` 呢？利用之前在 Ktor 實作 `Router` 方式去思考，如果要使用 `browserRouter` 的話，就表示在這些路徑以 HTTP request 丟過來的時候，伺服器都必須回傳相同的 `index.html` 當作 HTTP response 的內容，但在目前這個前端專案我很難去特別對伺服器設定成我想要的路徑形式，故我在這裡使用 `hashRouter`。`hashRouter` 是利用了路徑後面接上 `#` 還是會讓伺服器回傳同一個頁面的方式來進行路由，藉以讓你的專案可以在各種不同的伺服器路由設定下，依然能夠正常運作。不過這也讓你要使用超連結標籤去連結其他頁面的時候，不能直接使用路徑當作 `<a>` 標籤用來表示連結網址的 `href` 屬性值，路徑前面必須要加上 `#` 才可。當然，直接寫死路徑的話，未來就比較難換成別種路由方式了，所以我們使用 `routeLink()` 函式來幫助我們組建出正確的超連結路徑與其 `<a>` 標籤節點即可。

## 實作測試

讓我們來測試看看剛剛所設定好的路由吧！啟動伺服器後，跳進了首頁頁面，會發現上方的網址列從 `https://localhost:8080` 變成了 `https://localhost:8080/#/`。內容的部分則會顯示剛剛定義的超連結列表以及首頁的內容，如下圖所示：

![首頁畫面的截圖](/uploads/2020/09/截圖-2020-09-21-上午8.57.10.png)

那可以嘗試點擊任何一個超連結看看，應該都可以看到相對應的內容，這裡示範一下點擊「問題列表」後的頁面：

![問題列表畫面的截圖](/uploads/2020/09/截圖-2020-09-21-上午9.18.47.png)

可以看到上面的內容處被換成了「這裡是問題總列表」的字樣。接著可以嘗試在網址後面填寫一個數字，例如：「13」。那麼應該就可以看到如下的結果：

![第 13 題題目的詳細資料截圖](/uploads/2020/09/截圖-2020-09-21-上午9.30.19.png)

看到了裡面的內容變成了「這裡是第 13 題題目詳細資料」後，就表示目前我們的路由設定應該就差不多沒什麼問題了。

## 總結

今天我們利用 React Component 模組化了各個部分的元件，並且使用 React Router 對路徑進行路由判斷去輸出內容，將網站整體結構建立了出來。接著明天我們就要在這個結構上，與資料管理系統要求資料，並將內容顯示上去了。就請各位敬請期待明天的內容囉！

## 參考資料
* [Welcome to Kotlin hands-on](https://play.kotlinlang.org/hands-on/Building%20Web%20Applications%20with%20React%20and%20Kotlin%20JS/04_Making_It_React)
* [React Router: Declarative Routing for React.js](https://reactrouter.com)
* [Next Stop - React Router | SPA - React Training](https://tkssharma.gitbook.io/react-training/day-05/next-stop-react-router-or-spa)
* [kotlin-wrappers/ReactRouterDom.kt at master · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/blob/master/examples/src/main/kotlin/example/ReactRouterDom.kt)
* [kotlin-wrappers/kotlin-react-router-dom at master · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react-router-dom)
