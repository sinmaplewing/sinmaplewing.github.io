---
id: 20598
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 24：批改系統網頁 (6) - 會員登入狀態確認與會員登入頁面'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-24
date: '2020-09-24T21:16:24+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- CORS
featured_image: /uploads/2020/09/24.png
permalink: /2020/09/24/20598/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-24/
wp_status: publish
wp_type: post
---

![Day 24：批改系統網頁 (6) - 會員登入狀態確認與會員登入頁面](/uploads/2020/09/24.png)

昨天我們美化了網頁的各個元件，讓它們看起來不再是那麼醜醜的了。在美化完網頁後，我們可以先來把網站的會員系統銜接進來，藉以讓我們方便去處理其他的資料顯示與操作用的介面。

## 登入狀態的確認

首先，先讓我們在資料管理系統上，新增一個新的路由 `/users/check`，以方便我們對目前使用者登入狀態的確認。

```kotlin
route("/users") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME, optional = true) {
        get("/check") {
            val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
    
            if (userIdAuthorityPrincipal == null) {
                call.respond(UserCheckDTO(null))
            } else {
                val userId = userIdAuthorityPrincipal.userId.toInt()
                var authority = userIdAuthorityPrincipal.authority.toInt()
                var name = ""
    
                transaction {
                    val userData = UserTable.select { UserTable.id.eq(userId) }.first()
                    name = userData[UserTable.name]
                    authority = userData[UserTable.authority]
                    call.sessions.set(
                        SESSION_LOGIN_DATA_NAME,
                        UserIdAuthorityPrincipal(userId.toString(), authority.toString())
                    )
                }
    
                call.respond(UserCheckDTO(userId, name, authority))
            }
        }
    }
}
```

利用 `authenticate()` 先對使用者進行驗證，並利用 `optional = true` 的引數讓這條路由不會因為使用者沒登入就發生認證失敗的錯誤。接著藉由取得 Session 內的資料來判斷使用者是否登入，沒有登入的話就回傳代表沒有登入的 `null`，而有登入的話就從資料庫重新拉出使用者的狀態，更新 Session 內的資料，並回傳使用者的 ID、名稱以及權限大小。

這裡定義了 `UserCheckDTO` 作為回傳的參數型態，詳細程式碼如下所示：

```kotlin
data class UserCheckDTO (
    val userId: Int? = null,
    val name: String = "",
    val authority: Int = 0
)
```

有了這個 API 之後，我們就可以在前端網頁上判斷使用者是否登入，藉以讓使用者可以看到登入前或是登入後的資訊，並且讓資料管理伺服器能夠重新更新 Session 的資料，以避免 Session 內的資料過舊。

在批改系統網頁的部分，我們一樣設計一個可以創建使用 `/users/check` 這個路由獲得資料的 `Fetcher` 物件，如下程式碼所示：

```kotlin
data class UserCheckDTO (
    val userId: Int? = null,
    val userName: String = "",
    val authority: Int = 0
)

class Fetcher<T>(val path: String) {
    companion object {
        /* ...... 其餘的 create 函式內容 ...... */

        fun createUserCheckFetcher() = Fetcher<UserCheckDTO>("$DATA_URL/users/check")
    }
    
    /* ...... fetch() 函式的內容 ...... */
}
```

在這裡我們設計了可以與資料管理系統對接資料的 `UserCheckDTO` 類別，並且設計了 `createUserCheckFetcher()` 去生出實際與 API `/users/check` 拉取資料的 `Fetcher` 物件。

有了這個 `Fetcher` 後，我們就可以試著在網頁的右上角新增一個登入與登出用的按鈕元件，創建一個新的 component `LoginStatus` 來處理這個事情，程式碼如下：

```kotlin
import kotlinx.coroutines.*
import kotlinx.html.classes
import react.*
import react.dom.*
import react.router.dom.routeLink

external interface LoginStatusState: RState {
    var needCheck: Boolean
    var userCheckDTO: UserCheckDTO
}

class LoginStatus: RComponent<RProps, LoginStatusState>() {
    override fun LoginStatusState.init() {
        needCheck = true
        userCheckDTO = UserCheckDTO()

        val mainScope = MainScope()
        mainScope.launch {
            val remoteUserCheckDTO = Fetcher.createUserCheckFetcher().fetch()
            setState {
                needCheck = false
                userCheckDTO = remoteUserCheckDTO
            }
        }
    }

    override fun RBuilder.render() {
        div {
            attrs.classes = setOf("ml-md-auto")

            if (!state.needCheck) {
                if (state.userCheckDTO.userId != null) {
                    div {
                        attrs.classes = setOf("navbar-text")

                        +"歡迎光臨，${state.userCheckDTO.userName}！"
                    }
                    routeLink("/logout", className = "btn btn-primary") {
                        +"登出"
                    }
                } else {
                    div {
                        attrs.classes = setOf("navbar-text")

                        +"歡迎光臨，訪客！"
                    }
                    routeLink("/login", className = "btn btn-primary") {
                        +"登入"
                    }
                }
            }
        }
    }
}

fun RBuilder.loginStatus(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(LoginStatus::class, handler)
```

程式碼與我們在 `ProblemsArticle` 的部分看到的差不多，基本上就是建立一個專屬於這個 component 可以用的 state 類別 `LoginStatusState`，在裡面記錄兩個值，一個是紀錄是否需要與資料管理系統確認資料的變數，另外一個是透過資料管理系統回傳回來的 `UserCheckDTO` 物件。接著在 `LoginStatus` 的 component 裡面，先對 `LoginStatusState.Init()` 去做 state 的初始化，並利用 `Fetcher.createUserCheckFetcher()` 去獲得使用者的會員資料，更新進 state 中。

接著 `RBuilder.render()` 的部分，我們利用了 `ml-md-auto` 這個 Bootstrap 預設的 `class` 讓整個元件會位於最右側。透過 state 去判斷要回傳什麼樣的內容給使用這個 component 的元件，如果在已經不用跟資料管理系統確認的情況下，就會根據目前的狀態是否為已經登入的狀態，去回傳「登入」或是「登出」所要輸出的內容。裡面使用 `navbar-text` 這個 `class` 去調整裡面的文字顏色，並在 `routeLink()` 上使用 `btn` 去讓它變成一個按鈕的樣子，並用 `btn-primary` 設定好它的顏色。最後，就是將可以方便使用此 component 的擴充函式定義完，基本上這個 component 就定義好了。

我們將這個 component 放到 `Header` 的部分來使用，如下程式碼所示：

```kotlin
class Header: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        header {
            nav {
                /* ...... 其餘的導覽列內容 ...... */

                // 增加此行
                loginStatus { }
            }
        }
    }
}
```

加完後，執行起來後就可以看到這個 component 出現在網頁上了，如下圖所示。

![登入狀態元件的顯示截圖](/uploads/2020/09/截圖-2020-09-24-上午9.15.52.png)

## 登入頁面的處理

在上面登入狀態元件的程式碼部分，我們會讓登入和登出分別被導向到不同的路由設定去，分別是 `/login` 和 `/logout` 兩個路徑。首先，我們先來處理登入頁面 `/login` 的實作。

之前有提過批改系統網頁和資料管理系統由於位於不同的網域，其兩者之間的連線都必須要符合 CORS 守則。為了要讓登入時傳送的帳密資料能夠成功地被傳遞到資料管理系統，並且能夠讓資料管理系統回傳的 `Set-Cookie` 能夠正常運作，資料管理系統這邊需要先設定哪些 HTTP Method 被允許、哪些網域可以發送 HTTP request 過來、是否可以接受 JSON 格式的內容以及是否會需要利用 Cookie 進行驗證......等等的事情，如下程式碼所示：

```kotlin
install(Sessions) {
    cookie<UserIdAuthorityPrincipal>(
        SESSION_LOGIN_DATA_NAME,
        storage = SessionStorageMemory()
    ) {
        cookie.path = "/"
        cookie.extensions["SameSite"] = "None"
        cookie.extensions["Secure"] = "true"
    }
}

install(CORS) {
    method(HttpMethod.Get)
    method(HttpMethod.Post)
    method(HttpMethod.Put)
    method(HttpMethod.Delete)
    method(HttpMethod.Options)
    anyHost()

    allowCredentials = true
    allowNonSimpleContentTypes = true
}
```

Cookie 的部分我們需要先設定 `SameSite` 為 `None`，表示會需要設定或使用到的 Cookie 並非處在同個網域之中。`Secure` 參數則要設定 `true` 進去，讓伺服器能夠告知這個 Cookie 是經由安全的加密管道傳送的。但是目前就算你設定任何值進 `Secure` 的欄位中，其實都不會有什麼實質的用途，因為我們實際傳送 Cookie 的方式並不是真的經由安全的加密管道做傳輸的，關於這點我們在後面會再詳述。

至於 CORS 區塊，我們將預期接下來會使用到的 `POST`、`PUT` 和 `DELETE` 三個方法都放上去，並且多放了一個 `OPTIONS` 方法。這個 `OPTIONS` 方法是做什麼用的呢？主要是作為 CORS preflight 的時候使用。當進行跨網域連線時，如果連線不是一般常見的連線需求（例如：傳遞 JSON 格式資料、使用 `PUT` 方法連線......等等），就會預先發送一個 `OPTIONS` 方法的 HTTP request 去確認伺服器是否允許等等即將要發送的實際 HTTP request。

最後則是將 `allowCredentials` （允許認證機制）以及 `allowNonSimpleContentTypes` （允許內容為非簡單型態，例如 JSON 格式內容就不是簡單型態）設定為 `true` 即可。

回到批改系統網頁專案，我們一樣先設計一個函式，讓它可以產生出與資料管理系統中的 `/users/login` API 進行溝通的 `Fetcher` 物件。由於目前 `Fetcher` 只支援 `GET` 方法，所以我們先擴充它的功能，讓它可以代入想要使用的 HTTP Method 去做抓取資料的動作，程式碼如下所示：

```kotlin
class Fetcher<T>(val path: String) {
    /* ...... create 相關函式的程式碼部分 ...... */

    fun createHeaders(method: String): Headers {
        val headers = Headers()
        if (method == "POST") {
            headers.append("Content-Type", "application/json")
        }
        return headers
    }

    suspend fun fetch(method: String = "GET", data: Any? = null): T =
        window.fetch(path, RequestInit(
            method,
            mode = RequestMode.CORS,
            credentials = RequestCredentials.INCLUDE,
            headers = createHeaders(method),
            body = if (data != null) JSON.stringify(data) else null
        )).await()
            .json().await()
            .unsafeCast<T>()
}
```

首先，先讓 `fetch()` 可以傳入兩個值，分別是 `method` 和 `data`，分別代表的是要傳遞使用的 HTTP Method 為何，以及要帶入的資料為何。由於要帶入的資料有很多不同的格式，所以這裡使用 `Any?` 來代替，讓它可以去存入各種不同的物件資料。

接著在呼叫 `window.fetch()` 的時候，代入第二個引數部分 `RequestInit()` 物件，其內部可以填入 HTTP Method、HTTP request 的模式、認證機制的使用方式、HTTP request 的 header 部分以及 HTTP request 的 body 內容部分。為了要能夠進行跨網域請求，`mode` 的引數部分需要代入 `RequestMode.CORS` 這個值。而為了要能夠進行跨網域的 Cookie 設定，則必須要要將 `credentials` 設定成 `RequestCredentials.INCLUDE`。HTTP request 的 header 部分則與之前在 Postman 測試的時候一樣，由於要帶 JSON 格式資料過去給伺服器，故需要增加 `Content-Type: application/json` 這個值在 HTTP request 上，而 body 內容的部分則根據是不是有帶值來決定是否填入內容進去，填入的時候要利用 `JSON.stringify()` 函式去將物件轉成 JSON 格式的字串。

在這裡可以看到為了處理跨網域連線我們加了很多東西進去，我在這個部分只大概提了一下每一行程式碼加入的原因，有興趣了解詳細流程的話可以看看 [MDN 文件上關於 CORS 的章節](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)。

`fetch()` 函式擴充完後，我們就可以製作出與 `/users/login` API 連線的 `Fetcher` 了！如下程式碼所示：

```kotlin
class Fetcher<T>(val path: String) {
    companion object {
        /* ...... 其餘的 create 函式內容 ...... */
        fun createUserLoginFetcher() = Fetcher<FetchResult>("$DATA_URL/users/login")
    }

    /* ...... fetch() 函式內容 ...... */
}

data class UserLoginDTO (
    val username: String,
    val password: String
)

data class FetchResult(
    val OK: Boolean?
)
```

為了因應要給 `/users/login` 的內容，以及其回傳回來的結果，這裡新增了 `UserLoginDTO` 和 `FetchResult` 兩個類別來處理兩者之間傳遞用的資料。

能夠跟資料管理系統溝通登入資料後，我們就來建立登入的頁面吧！建立一個新的 component `LoginForm`，如下程式碼所示：

```kotlin
external interface LoginFormState: RState {
    var isChecked: Boolean
    var isSuccess: Boolean
    var username: String
    var password: String
}

class LoginForm: RComponent<RProps, LoginFormState>() {
    override fun LoginFormState.init() {
        isChecked = false
        isSuccess = false
        username = ""
        password = ""
    }
    /* ...... render() 的部分 ...... */
}
```

與之前的程式碼結構大致相同，利用 `LoginFormState` 紀錄登入的狀態，並讓 `LoginForm` component 去使用。裡面記錄了 `isChecked` 代表已經確認跟伺服器確認過了、`isSuccess` 代表登入是否成功、`username` 代表輸入的帳號為何、`password` 代表輸入的密碼為何。

而至於 `LoginForm` 的 `RBuilder.render()` 的部分，則整體視覺結構如下所示：

```kotlin
override fun RBuilder.render() {
    styledDiv {
        css {
            width = LinearDimension("80%")
            margin = "30px auto"
        }

        if (state.isChecked && state.isSuccess) {
            /* ...... 導向回首頁 ...... */
        }
        else {
            form {
                div {
                    attrs.classes = setOf("form-group")

                    label {
                        attrs.htmlFor = "usernameInput"
                        +"帳號"
                    }

                    input {
                        attrs.type = InputType.text
                        attrs.id = "usernameInput"
                        attrs.classes = setOf("form-control")
                    }
                }
                div {
                    attrs.classes = setOf("form-group")

                    label {
                        attrs.htmlFor = "passwordInput"
                        +"密碼"
                    }

                    input {
                        attrs.type = InputType.password
                        attrs.id = "passwordInput"
                        attrs.classes = setOf("form-control")
                    }
                }

                button {
                    attrs.type = ButtonType.submit
                    attrs.classes = setOf("btn", "btn-primary")
                    +"登入"
                }
            }
        }
    }
}
```

整體結構由一個 `<div>` 標籤所包住，裡面在尚未登入或是尚未登入成功前，會輸出一個以 `<form>` 標籤為根目錄標籤的 Virtual DOM 結構。`<form>` 標籤代表的是表單的意思，在裡面會放置表單內容的結構。在這裡的 `<form>` 標籤內，我們放了三組東西在裡頭，分別是兩個 `<div class="form-group">` 來表示表單內兩組不同的輸入欄位，以及在表單填寫完後，用來讓使用者可以遞交表單用的按鈕 `<button>` 標籤。每一組 `<div class="form-group">` 中，主要是由一個 `<label>` 標籤表示輸入的內容涵義為何，以及一個 `<input>` 讓使用者可以輸入東西的文字輸入框。輸入框部分利用 `type` 屬性來展現不一樣的輸入效果，「帳號」的部分使用的是一般常見的文字輸入類型 `InputType.text`，而「密碼」的部分使用的是會遮蔽輸入內容的 `InputType.password` 輸入類型。

表單本身在 Bootstrap 中也有一些預設的樣式可以設定，這裡我就直接打在程式碼上了，如果想知道詳情的話，可以看看 [Bootstrap 的文件](https://getbootstrap.com/docs/4.5/components/forms/)。

視覺部分處理好後，接著要來處理輸入元件的邏輯部分。首先先讓「帳號」與「密碼」的輸入標籤會改變 state 裡面的輸入內容，我們可以在這兩個輸入框的 `onChangeFunction` 事件上掛上我們要在內容改變時觸發的動作為何，如下程式碼所示：

```kotlin
override fun RBuilder.render() {
    styledDiv {
        /* ...... 中間的內容 ...... */
                    input {
                        attrs.type = InputType.text
                        attrs.id = "usernameInput"
                        attrs.classes = setOf("form-control")

                        // 利用 onChangeFunction 來修改 state 的值
                        attrs.onChangeFunction = {
                            val target = it.target as HTMLInputElement
                            setState {
                                username = target.value
                            }
                        }
                    }

        /* ...... 中間的內容 ...... */

                    input {
                        attrs.type = InputType.password
                        attrs.id = "passwordInput"
                        attrs.classes = setOf("form-control")

                        // 利用 onChangeFunction 來修改 state 的值
                        attrs.onChangeFunction = {
                            val target = it.target as HTMLInputElement
                            setState {
                                password = target.value
                            }
                        }
                    }
                }

        /* ...... 中間的內容 ...... */
    }
}
```

在兩個輸入框分別於 `onChangeFunction` 掛上會修改相對應內容的匿名函式，利用代入的事件發生相關參數裡的 `target` 去抓出事件發生所在的標籤物件，轉成正確的型態後，利用其標籤內所含的值去更新 state 的內容。這樣輸入框內容一有變更，網頁就會自動修正 state 中的值了。同理，我們在按下按鈕後要進行登入的動作也可以利用 `<form>` 標籤的 `onSubmitFunction` 來實作，如下程式碼所示：

```kotlin
form {
    attrs.onSubmitFunction = {
        it.preventDefault()

        val mainScope = MainScope()
        mainScope.launch {
            val loginFetchResult = Fetcher.createUserLoginFetcher().fetch(
                "POST",
                UserLoginDTO(state.username, state.password)
            )

            setState {
                isChecked = true
                isSuccess = loginFetchResult?.OK != null && loginFetchResult.OK
            }
        }
    }
    
    /* ...... form 的內容 ...... */
}
```

首先利用事件發生相關參數中的 `preventDefault()` 將事件原本預設要發生的事情停止住，這裡就是將原本表單送出後會跳頁的過程給停止住。接著將使用者輸入的帳號密碼，透過 `Fetcher` 物件傳遞給資料管理系統，最後將回傳回來的結果更新到 state 上。拿到結果了以後，我們就可以在這個網頁如果登入行為已經完成，就導向到首頁去，如下程式碼所示：

```kotlin
override fun RBuilder.render() {
    styledDiv {
        /* ...... 樣式內容 ...... */        

        if (state.isChecked && state.isSuccess) {
            // 利用 redirect 去導向回首頁
            redirect(to = "/")
        }
        else {
            /* ...... 表單內容 ...... */
        }
    }
}
```

利用 React Router 中的 `redirect()` 函式在使用者登入後，會導向回 `/` 首頁的地方，這樣這個登入頁面的 component 就完成了！

在 `App` component 的地方，將路由到 `/login` 路徑上的內容輸出 `LoginForm` 這個 component，如下程式碼所示：

```kotlin
// LoginForm.kt
fun RBuilder.loginForm(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(LoginForm::class, handler)

// App.kt
route("/login") { mainArticle { loginForm { } } }
```

執行網頁後，就可以點擊右上方的「登入」按鈕，進到登入頁面了！

![登入頁面截圖](/uploads/2020/09/截圖-2020-09-24-上午10.32.33.png)

## 總結

今天我們將登入狀態的確認元件以及登入頁面給完成了，但是如果你有使用看看的話，就會發現在輸入正確的帳號密碼後，雖然確實有導回到首頁，但不管怎麼重整網頁卻都是未登入狀態，到底是怎麼回事呢？

![錯誤訊息截圖](/uploads/2020/09/截圖-2020-09-24-上午10.41.24.png)

如果你有用 Chrome 的開發者工具，應該就可以看到在設定 Cookie 中的 `Secure` 欄位，會有一段訊息表示雖然有 `Secure` 參數，但這個兩者之間溝通用的連線並非是一段真正安全的連線，所以 `Set-Cookie` 的動作就會被擋下來。這就是在上面我們增加 Cookie 中的 `Secure` 參數時我所說的沒有用的意思，我們還是必須要建立一個安全的連線才行，那到底該怎麼做呢？敬請期待明天的內容吧！

## 參考資料
* [kotlin - Ktor: How to check authentication inside a route handler? - Stack Overflow](https://stackoverflow.com/questions/50708255/ktor-how-to-check-authentication-inside-a-route-handler)
* [fetch documentation](https://github.github.io/fetch/)
* [和 CORS 跟 cookie 打交道. CORS 與 cookie 在前端是個蠻重要的問題，不過在開發的時候，前後端的… | by 愷開 | De-Magazine | Medium](https://medium.com/d-d-mag/和-cors-跟-cookie-打交道-dd420ccc7399)
* [kotlin-wrappers/kotlin-react-router-dom at master · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react-router-dom)
* [in the input , how to capture the on change event and assign the event.target.value to state.text? · Issue #15 · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/issues/15)
* [WindowOrWorkerGlobalScope.fetch() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
* [CORS - Help | Ktor 1.4.0](https://ktor.io/docs/cors.html#advanced)
* [Cross-Origin Resource Sharing (CORS) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
* [Forms · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/components/forms/)
