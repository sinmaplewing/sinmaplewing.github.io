---
id: 20994
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 26：批改系統網頁 (8) – 利用 Redux
  來進行元件之間的狀態變更'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-26
date: '2020-09-26T09:02:54+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- React
- Redux
- React Redux
featured_image: /uploads/2020/09/26fb.png
permalink: /2020/09/26/20994/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-26/
wp_status: publish
wp_type: post
---

![Day 26：批改系統網頁 (8) – 利用 Redux 來進行元件之間的狀態變更](/uploads/2020/09/26fb.png)

昨天我們建立了 HTTPS 連線，藉以讓使用者可以登入網站。不過雖然已經可以登入網站了，但是卻還是有登入後各個元件之間狀態無法同步資料的問題，究竟我們該如何解決這個問題呢？

## Redux 的原理

首先，我們先從網頁的 Virtual DOM 結構圖來找出我們碰到的問題發生在哪裡，底下是這個網頁目前的 Virtual DOM 結構圖：

![網站 Virtual DOM 結構圖](/uploads/2020/09/WebsiteComponents.png)

我們想要做的事情是，在 `LoginForm` 登入後能夠通知 `LoginStatus` 重新去確認使用者的登入狀態，其資料傳遞的過程如下圖紅線所標示之處：

![傳遞登入資訊給其他的 Component 示意圖](/uploads/2020/09/NotifyFlow.png)

你會發現在圖中，`LoginForm` 必須要在登入完後，利用一些方式（例如：在 props 裡面放入一個可以回傳資料回來的函式）來將已經登入的資訊傳到上層的上層 `App` 中，`App` 又要再將這個資訊傳給下層的下層 `LoginStatus` 裡面，其流程非常的複雜，而且寫成程式也不好維護。那究竟有沒有一個比較好的作法呢？

![Redux 的 Logo（來自 https://github.com/reduxjs/redux/tree/master/logo）](/uploads/2020/09/logo-title-dark.png)

這時候就要來介紹一下 Redux 這個套件啦！Redux 是一個用來處理資料、邏輯與視覺元件之間連接關係的框架，它利用單向流的方式來解決這三者之間交錯複雜的關係。除此之外，Redux 也可以利用 React Redux 這個銜接套件去與 React 良好的結合在一起使用。那 Redux 的架構到底長什麼樣子呢？以上面的例子來說，用 Redux 的架構就會變成如下所示的樣子：

![Redux 架構的網頁結構圖](/uploads/2020/09/Redux.png)

首先，`LoginForm` 會在登入後發送 `Action` 通知要重新確認會員登入狀態的動作請求，這個 `Action` 會被 `Dispatcher` 接收，並執行相對應的工作，接著 `Dispatcher` 就會將剛執行的 `Action` 告訴用來存放整個網頁狀態資料的 `Store` 內的 `Reducer`，讓 `Reducer` 可以透過 `Action` 以及目前的狀態 `State` 去產生下一個狀態，並存放回 `Store` 中。最後，由於 `Store` 中的狀態被改變，這時就會通知位於 `View` 中的 `LoginStatus`，讓它重新更新目前登入的狀態。

在這個架構之中，你不用擔心某兩個元件之間如果需要互相影響該怎麼辦。所有元件要進行變更時，都是透過丟出 `Action` 去更新 `Store` 中的 `State`，而與該 `State` 相關的元件就可以直接根據 `Store` 中的 `State` 的變更去顯示不一樣的內容，這樣也就解決了在一個複雜的 Virtual DOM 架構中，元件與元件之間互相溝通的複雜資料流問題。

## 導入 Redux 進專案中

了解了 Redux 的原理後，就讓我們先在專案中安裝 Redux 和 React Redux 吧！在 `build.gradle.kts` 的 `dependencies` 區塊中，增加下面兩行來進行安裝：

```kotlin
implementation("org.jetbrains:kotlin-redux:4.0.0-pre.117-kotlin-1.4.10")
implementation("org.jetbrains:kotlin-react-redux:5.0.7-pre.117-kotlin-1.4.10")
```

安裝完以後，就讓我們一步一步把登入會員流程導入 Redux 吧！首先先從整個網站的 `State` 開始定義，目前因為只有登入會員的部分，所以我們就先從會員資料的狀態開始定義，如底下程式碼所示：

```kotlin
// 定義 Fetcher 結束後的狀態
enum class FetchState {
    Pending, Rejected, Fulfilled
}

// 定義會員資料的狀態
data class UserDataState (
    val fetchState: FetchState,
    val userCheckDTO: UserCheckDTO
)

// 定義整個網頁專案的狀態
data class AppState(
    val userDataState: UserDataState
)

// 幫助產生預設狀態的函式
fun createAppState() = AppState(UserDataState(FetchState.Pending, UserCheckDTO()))
```

首先先定義了整個網頁專案狀態的類別 `AppState`，接著在裡面放入一個用來記得會員相關資料狀態的類別 `UserDataState`，裡面包含了從 `Fetcher` 物件回傳的結果狀態與代表回傳內容的 `UserCheckDTO` 物件。`Fetcher` 回傳的狀態在這裡定義有三個不同的值，分別是需要傳送的 `Pending`、被拒絕的 `Rejected` 和已經完成的 `Fulfilled`。定義完這些狀態類別後，我們就再定義一個可以用來產生預設狀態的函式 `createAppState()`，讓我們可以方便在一開始的時候就能產生出初始狀態出來。

有了 `State` 以後，接著要來定義 `Reducer` 的部分。由於 `Reducer` 會吃要進行的 `Action` 以及目前狀態 `State` 的值，去產生下一個 `State` 狀態出來，故我們就一併將 `Action` 的類別也一起定義出來，如下程式碼所示：

```kotlin
import redux.RAction

class CheckUserAction: RAction
class UpdateUserAction(val userCheckDTO: UserCheckDTO): RAction

fun reducer(state: AppState, action: RAction) =
    when (action) {
        is CheckUserAction ->
            AppState(UserDataState(FetchState.Pending, state.userDataState.userCheckDTO))
        is UpdateUserAction ->
            AppState(UserDataState(FetchState.Fulfilled, action.userCheckDTO))
        else -> state
    }
``` 

在這裡我們定義了兩個 `Action`，分別是「要求確認用戶資料」的 `CheckUserAction` 以及「更新用戶資料狀態」的 `UpdateUserAction`。每一個 `Action` 都必須繼承 `RAction` 這個類別，藉以讓 Redux 知道這是有可能發生的 `Action`。

而 `Reducer` 的部分則是透過目前的 `State` 和上述的兩個 `Action` 去決定下一個 `State` 會長什麼樣子。如果 `Reducer` 收到「要求確認用戶資料」的動作 `CheckUserAction` 的話，則就將會員資料狀態中的 `fetchState` 改成 `Pending`，其餘狀態不變，產生一個新的 `AppState` 物件回傳回來讓 `Store` 更新。而如果 `Reducer` 收到「更新用戶資料狀態」的動作 `UpdateUserAction` 的話，則就將 `fetchState` 改成已完成的 `Fulfilled`，並將需要更新的資料更新進 `State` 內，一樣產生出一個新的 `AppState` 物件回傳回來讓 `Store` 更新。

有了 `State` 和 `Reducer` 後，我們就可以利用這兩個東西生出網頁要用來存放 `State` 的 `Store` 了。在 `main()` 函式中，我們需要生成一個新的 `Store`，並將這個 `Store` 利用 `Provider` 這個 component 將產生出來的 `Store` 物件與我們的 `App` component 進行綁定的動作，如下程式碼所示：

```kotlin
fun main() {
    val store = createStore(::reducer, createAppState(), rEnhancer())
    render(document.getElementById("root")) {
        provider(store) {
            app { }
        }
    }
}
```

## 修改登入流程

做完了前置作業後，接著就可以讓我們來將登入流程修改成會透過 `Action` 和 `Store` 來更新狀態吧！首先，先將 `LoginStatus` 原本利用 React 的 state 來做變更的部分，改成只透過傳遞進來的參數進行狀態變更的 props，其 props 的資料定義如下所示：

```kotlin
external interface LoginStatusProps: RProps {
    var isFetchPending: Boolean
    var userCheckDTO: UserCheckDTO
    var onFetchPending: () -> Unit
}
```

裡面三個值分別是目前會員資料拉取的狀態是否為 `Pending`、使用者的會員資料以及當會員資料拉取狀態為 `Pending` 時要呼叫的函式。有了這個 props 後，我們的 `LoginStatus` 就可以改成如下的形式：

```kotlin
class LoginStatus: RComponent<LoginStatusProps, RState>() {
    override fun RBuilder.render() {
        div {
            attrs.classes = setOf("ml-md-auto")

            if (props.isFetchPending) {
                props.onFetchPending()
            } else {
                if (props.userCheckDTO.userId != null) {
                    div {
                        attrs.classes = setOf("navbar-text")

                        +"歡迎光臨，${props.userCheckDTO.name}！"
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

fun RBuilder.loginStatus(handler: RElementBuilder<LoginStatusProps>.() -> Unit): ReactElement =
    child(LoginStatus::class, handler)
```

`LoginStatus` 不再吃 state 去變更資料，而是利用 props 來改變其元件內容的值。與上次不同的部分除了 state 換成了 props 以外，也多了一個動作是「如果目前會員資料的拉取狀態為 `Pending` 的話，要呼叫 props 中的 `onFetchPending` 函式」。

有了這樣的 component 後，我們就要來讓這個 component 中使用的 props 資料能夠被 Redux 變更。我們必須要先將 props 裡的變數分成兩類：一類是當 Redux 的 `Store` 中所使用的 `State` 出現變更時，我們要跟著隨之改變的 props 內容值；而另外一類則是當 component 中需要發送 `Action` 時，要利用該 props 的內容值（通常是函式）去將 `Action` 發給 `Dispatcher`。在我們的例子中，可以分成下面程式碼所示的兩類 props：

```kotlin
internal interface LoginStatusStateProps: RProps {
    var isFetchPending: Boolean
    var userCheckDTO: UserCheckDTO
}

internal interface LoginStatusDispatchProps: RProps {
    var onFetchPending: () -> Unit
}
```

`isFetchPending` 和 `userCheckDTO` 都是要代給 `LoginStatus` 的 props 參數，而 `onFetchPending` 則是要讓 `LoginStatus` 可以呼叫去發送 `Action` 給 `Dispacther` 的 props 參數，故上面的兩類參數就各自分進 `LoginStatusStateProps` 以及 `LoginStatusDispatchProps` 中就分類完成了。

有了這兩類 props 後，我們就可以利用 Redux 提供的 `rConnect()` 函式將這兩類資料該怎麼改的函式以及 `LoginStatus` 給綁定起來，並生出一個新的 component，如下程式碼所示：

```kotlin
val connectedLoginStatus: RClass<LoginStatusProps> =
    rConnect<AppState, RAction, WrapperAction, RProps, LoginStatusStateProps, LoginStatusDispatchProps, LoginStatusProps>({
        state, _ ->
            isFetchPending = state.userDataState.fetchState == FetchState.Pending
            userCheckDTO = state.userDataState.userCheckDTO
    }, {
        dispatch, _ ->
            onFetchPending = {
                val mainScope = MainScope()
                mainScope.launch {
                    val remoteUserCheckDTO = Fetcher.createUserCheckFetcher().fetch()
                    dispatch(UpdateUserAction(remoteUserCheckDTO))
                }
            }
    })(LoginStatus::class.rClass)
``` 

程式碼看起來有點複雜，但你可以先不要去管那長長的類別參數 `<AppState, ......>`。基本上 `connectedLoginStatus` 就是利用 `rConnect()` 代入兩個匿名函式後所產生的物件，去綁定原有的 component 而產生出來的新 component。兩個匿名函式分別代表的是 `State` 怎麼去改變剛剛分類出來的 `LoginStatusStateProps` 裡的參數，以及如何讓 component 對 `Dispatcher` 發送 `Action` 的 `LoginStatusDispatchProps` 裡的參數。最後將綁定好函式的物件再與 `LoginStatus` 的類別進行綁定即可。至於 `rConnect` 與 `connectedLoginStatus` 所要填的類別參數 `<AppState, ......>` 就根據你要做的事情填入正確的類別參數即可。`WrapperAction` 和 `RProps` 為預設 `rConnect()` 會使用到的類別參數，由於我們沒有用到這兩者，故就放預設類別即可。

在 `rConnect()` 設定的函式裡面，`isFetchPending` 的值就是根據 `State` 中的會員資料狀態的 `fetchState` 是否為 `Pending` 去做判斷。而 `userCheckDTO` 則是 `State` 中的會員資料狀態裡，來自資料管理系統回傳回來的值。最後 `onFetchPending` 函式就是讓 `LoginStatus` 能夠呼叫 `Fetcher` 去抓取目前會員登入的資料，並在抓到資料後對 `Dispatcher` 發送要更新會員資料狀態的 `Action` 去更新 `Store` 中的資料，這樣就改完 `LoginStatus` 的部分了。

相同的道理，我們也可以來將 `LoginForm` 綁定 Redux 架構，整體程式碼如下所示：

```kotlin
external interface LoginFormState: RState {
    var username: String
    var password: String
}

external interface LoginFormProps: RProps {
    var isUserIdExisted: Boolean
    var onSubmit: (String, String) -> Unit
}

internal interface LoginFormStateProps: RProps {
    var isUserIdExisted: Boolean
}

internal interface LoginFormDispatchProps: RProps {
    var onSubmit: (String, String) -> Unit
}

val ConnectedLoginForm: RClass<LoginFormProps> =
    rConnect<AppState, RAction, WrapperAction, RProps, LoginFormStateProps, LoginFormDispatchProps, LoginFormProps>({
        state, _ ->
            isUserIdExisted = state.userDataState.userCheckDTO.userId != null
    }, {
        dispatch, _ ->
            onSubmit = { username, password ->
                val mainScope = MainScope()
                mainScope.launch {
                    Fetcher.createUserLoginFetcher().fetch(
                        "POST",
                        UserLoginDTO(username, password)
                    )
                    dispatch(CheckUserAction())
                }
            }
    })(LoginForm::class.rClass)

class LoginForm: RComponent<LoginFormProps, LoginFormState>() {
    override fun LoginFormState.init() {
        username = ""
        password = ""
    }

    override fun RBuilder.render() {
        styledDiv {
            css {
                width = LinearDimension("80%")
                margin = "30px auto"
            }

            if (props.isUserIdExisted) {
                redirect(to = "/")
            }
            else {
                form {
                    attrs.onSubmitFunction = {
                        it.preventDefault()
                        props.onSubmit(state.username, state.password)
                    }
                    
                    /* ...... 輸入框的部分 ...... */
                }
            }
        }
    }
}

fun RBuilder.loginForm(handler: RElementBuilder<LoginFormProps>.() -> Unit): ReactElement =
    child(LoginForm::class, handler)
```

與上面 `LoginStatus` 比較不一樣的地方在於，我們在這個 component 中並沒有完全捨棄 state。由於輸入框輸入資料的更新並不會特別去影響到別的元件上的顯示，故我們還是可以讓輸入框的更新僅只更新自己的 state 即可，就不用再特別去利用 Redux 架構更新其值。

`LoginForm` 所使用的 props 總共有兩個值，分別是「確認資料內使用者 ID 是否存在的狀態」以及「表單遞交時要呼叫的函式」。「確認資料內使用者 ID 是否存在的狀態」會根據 `Store` 中存放的會員資料狀態裡，是否有已經登入會員後所得到的會員 ID 來做判斷。在 `LoginForm` 中如果發現狀態中已有會員 ID 的話，就表示用戶已經登入過了，所以就直接跳轉到首頁就好。而「表單遞交時要呼叫的函式」則就是將使用者輸入的帳密，透過 `Fetcher` 丟給資料管理系統，並在登入完後利用 `CheckUserAction` 讓網頁重新檢查登入狀態一次。如果在發送 `CheckUserAction` 後，檢查發現用戶已經確實成功登入了，那麼網頁就會透過上面的「確認資料內使用者 ID 是否存在的狀態」判斷而跳轉到首頁的位置去。

在設定好這兩個元件後，就讓我們將這兩個綁定好的元件換掉原本用在 `Header` 和 `App` 中的 `LoginStatus` 以及 `LoginForm` 元件吧！如下程式碼所示：

```kotlin
// Header.kt
connectedLoginStatus { } // 將 loginStatus { } 換掉

// App.kt
route("/login") { mainArticle { connectedLoginForm { } } } // 將 loginForm { } 換掉
```

換完後，將網站重新執行起來，並重新登入看看。應該就可以在登入後，看到右上角的登入狀態元件會即時的切換了！

![登入後的網頁截圖](/uploads/2020/09/截圖-2020-09-26-上午1.05.05.png)

## 登出元件

能夠登入後就讓我們來寫登出元件吧！與前面的方式相同，我們可以定義出 `LogoutComponent` 以及綁定 Redux 的 `connectedLogoutComponent`，如下所示：

```kotlin
external interface LogoutComponentProps: RProps {
    var isUserIdExisted: Boolean
    var onLogout: () -> Unit
}

private interface LogoutStateProps: RProps {
    var isUserIdExisted: Boolean
}

private interface LogoutDispatchProps: RProps {
    var onLogout: () -> Unit
}

val connectedLogoutComponent: RClass<LogoutComponentProps> =
    rConnect<AppState, RAction, WrapperAction, RProps, LogoutStateProps, LogoutDispatchProps, LogoutComponentProps>({
        state, _ ->
            isUserIdExisted = state.userDataState.userCheckDTO.userId != null
    }, {
        dispatch, _ ->
            onLogout = {
                val mainScope = MainScope()
                mainScope.launch {
                    Fetcher.createUserLogoutFetcher().fetch("POST")
                    dispatch(CheckUserAction())
                }
            }
    })(LogoutComponent::class.rClass)

class LogoutComponent: RComponent<LogoutComponentProps, RState>() {
    override fun RBuilder.render() {
        if (props.isUserIdExisted) {
            props.onLogout()
        } else {
            redirect(to = "/")
        }
    }
}

fun RBuilder.logoutComponent(handler: RElementBuilder<LogoutComponentProps>.() -> Unit): ReactElement =
    child(LogoutComponent::class, handler)
```

`LogoutComponent` 所使用的 props 僅有兩個值，一個是與 `LoginForm` 相同的 `isUserIdExisted`，用來確認會員是否已經登入；另外一個則是用來進行登出動作用的函式。`LogoutComponent` 內容則非常單純，如果使用者已登入，就呼叫登出函式；如果使用者已登出，就導向到首頁即可。登出函式的部分就利用登出的 `Fetcher` 去對資料管理系統發出登出的請求，登出完一樣發送需要重新檢查會員登入狀態的 `CheckUserAction` 即可。登出用的 `Fetcher` 創建函式如下程式碼所示：

```kotlin
fun createUserLogoutFetcher() = Fetcher<FetchResult>("$DATA_URL/users/logout")
```

最後就是在 `App` 增加登出的路由即可，如下所示：

```kotlin
route("/logout") { mainArticle { connectedLogoutComponent { } }}
```

重新執行網頁專案，在登入後點選登出按鈕，即可看到右上角的元件又再度變回「歡迎光臨，訪客！」的樣子了。

![登出後的頁面截圖](/uploads/2020/09/截圖-2020-09-26-上午1.13.04.png)

## 登入錯誤的處理

最後，就讓我們稍微來處理一下登入錯誤的話該怎麼辦吧！

首先先讓資料管理系統在遇到登入錯誤的時候，會回傳 `{"OK": false}` 的結果，如下所示：

```kotlin
post("/login") {
    try {
        /* ...... 原本的登入流程 ...... */
        call.respond(mapOf("OK" to true))
    } catch (e: Exception) {
        call.respond(mapOf("OK" to false))
    }
}
```

我們很簡單的利用 `try-catch` 的方式在出錯的時候直接 catch 起來回傳 `OK` 的值為 `false` 即可。這個部分當然你可以做得更細緻一點，例如你可以將究竟發生什麼錯誤給回傳回來，讓使用者更了解他在操作上發生了什麼錯誤，但這裡由於文章篇幅的關係，就先用這個簡單的方式去處理了。

接著讓我們在 `UserDataState` 中新增一個代表登入失敗的值：

```kotlin
data class UserDataState (
    /* ...... 其餘的資料 ...... */
    val isLoginError: Boolean = false
)
```

並新增兩個新的 `Action` 以及其在 `Reducer` 中要怎麼產生新 `State` 的流程：

```kotlin
class ResetLoginUserStateAction: RAction
class LoginUserErrorAction: RAction

fun reducer(state: AppState, action: RAction) =
    when (action) {
        /* ...... 其餘的 Action ...... */
        is ResetLoginUserStateAction ->
            AppState(UserDataState(state.userDataState.fetchState, state.userDataState.userCheckDTO, false))
        is LoginUserErrorAction ->
            AppState(UserDataState(state.userDataState.fetchState, state.userDataState.userCheckDTO, true))
        else -> state
    }
``` 

`ResetLoginUserStateAction` 是讓登入失敗的狀態被重設回去的 `Action`，而 `LoginUserErrorAction` 則是在使用者登入錯誤後，將 `State` 改成登入失敗的狀態用的 `Action`。

定義完這些要給 Redux 使用的部分後，接著就要來修改我們的 component 的部分。首先，在 `LoginForm` 所使用的 props 中，新增一個 `isError` 代表登入是否錯誤的狀態值：

```kotlin
external interface LoginFormProps: RProps {
    /* ...... 其他的值 ...... */
    var isError: Boolean
}

internal interface LoginFormStateProps: RProps {
    /* ...... 其他的值 ...... */
    var isError: Boolean
}
```

多了這個 `isError` 的值後，接著就來修改要給 `rConnect` 綁定的函式內的內容，如下程式碼所示：

```kotlin
val connectedLoginForm: RClass<LoginFormProps> =
    rConnect<AppState, RAction, WrapperAction, RProps, LoginFormStateProps, LoginFormDispatchProps, LoginFormProps>({
        state, _ ->
            isError = state.userDataState.isLoginError
            /* ...... 其他的內容 ...... */
    }, {
        dispatch, _ ->
            onSubmit = { username, password ->
                dispatch(ResetLoginUserStateAction())

                val mainScope = MainScope()
                mainScope.launch {
                    val result = Fetcher.createUserLoginFetcher().fetch(
                        "POST",
                        UserLoginDTO(username, password)
                    )
                    if (result?.OK == true) {
                        dispatch(CheckUserAction())
                    } else {
                        dispatch(LoginUserErrorAction())
                    }
                }
            }
    })(LoginForm::class.rClass)
```

props 內的 `isError` 的值直接利用 `Store` 中所存的是否登入錯誤的狀態來更新即可，而在 `onSubmit` 遞交表單動作的函式內，則在一開始先重設登入錯誤的狀態，接著再用 `Fetcher` 進行登入動作後，判斷其結果是否成功。如果成功的話就照舊發送 `CheckUserAction` 重新確認使用者的登入狀態；而如果失敗的話就發送 `LoginUserErrorAction` 讓 `Store` 變更登入錯誤的狀態為 `true`。

邏輯的部分做完後，最後就是在 `LoginForm` component 中，放置表單的地方的前面新增一個顯示錯誤用的區塊，如下所示：

```kotlin
override fun RBuilder.render() {
    styledDiv {
        /* ...... 前面的程式碼部分 ...... */
            if (props.isError) {
                div {
                    attrs.classes = setOf("alert", "alert-danger")
                    +"登入失敗！請確認您輸入的帳號密碼是否正確。"
                }
            }
       /* ...... 表單的程式碼部分 ...... */
    }
}
```

在這裡我們判斷了 props 中的 `isError` 的值是否為 `true`，如果是 `true` 的話，就顯示一個 `div` 區塊，裡面含有登入失敗的錯誤訊息，並且利用 Bootstrap 的 Alert 樣式去美化它。

完成後，應該就可以在登入失敗的時候看到如下的畫面了：

![登入失敗的畫面截圖](/uploads/2020/09/截圖-2020-09-26-上午1.32.21.png)

如果你希望在登入失敗的時候輸入框還能夠留住之前輸入的值的話，可以在 `input` 區塊裡面修改其 `attrs.value` 值為 state 所記錄下來的值，如下程式碼是記住帳號資料於輸入框的方式：

```kotlin
input {
    attrs.value = state.username
}
```

## 總結

今天我們利用 Redux 和 React Redux 去解決了複雜的元件與元件間互相更新資訊的資料流問題。有了這樣的結構後，我們就可以繼續來寫完其他資料的抓取與顯示內容的部分，就請各位繼續期待明天的內容囉！

## 參考資料
* [React/Redux: pitfalls and best practices | Antoine Caron](https://slashgear.github.io/react-redux-pitfalls-and-best-pratices/)
* [kotlin-wrappers/kotlin-redux at master · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-redux)
* [kotlin-wrappers/kotlin-react-redux at master · JetBrains/kotlin-wrappers](https://github.com/JetBrains/kotlin-wrappers/tree/master/kotlin-react-redux)
* [Alerts · Bootstrap](https://getbootstrap.com/docs/4.0/components/alerts/)
