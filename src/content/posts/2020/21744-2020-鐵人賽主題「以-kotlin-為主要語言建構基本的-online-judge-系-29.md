---
id: 21744
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 29：批改系統網頁 (11) – 重新審核程式碼功能與其他雜項'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-29
date: '2020-09-29T10:19:12+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- React
featured_image: /uploads/2020/09/29fb.png
permalink: /2020/09/29/21744/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-29/
wp_status: publish
wp_type: post
---

![Day 29：批改系統網頁 (11) – 重新審核程式碼功能與其他雜項](/uploads/2020/09/29fb.png)

昨日基本上我們已經完成了大致的 Online Judge 系統，剩下基本上就是看你打算要怎麼設計你的 Online Judge 系統來決定該怎麼打造你前端網頁的架構了。今天我們就稍微將尚未完成的重新審核程式碼功能以及一些其他地方補足起來，剩下的就是讓你自行透過這幾天所嘗試的內容自行發揮了！

## 重新審核程式碼的功能

為了要能夠知道目前的使用者是否能夠進行重新審核程式碼的動作，首先先在資料管理系統的 API 部分，讓傳回來的程式碼列表資料中，順便也帶回整體程式碼是否可以被使用者重新審核的權限，以及個別程式碼是否可以被重新審核的權限這些資訊，如下所示：

```kotlin
route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME, optional = true) {
        get {
            var userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
            var submissions: List<Map<String, Any>>? = null

            transaction {
                submissions = (SubmissionTable innerJoin ProblemTable innerJoin UserTable)
                    .slice(
                        SubmissionTable.id,
                        UserTable.id,
                        UserTable.name,
                        ProblemTable.id,
                        ProblemTable.title,
                        SubmissionTable.language,
                        SubmissionTable.result,
                        SubmissionTable.executedTime
                    ).selectAll()
                    .orderBy(SubmissionTable.id, SortOrder.DESC)
                    .map {
                        mapOf(
                            "id" to it[SubmissionTable.id].toString(),
                            "name" to it[UserTable.name],
                            "problemId" to it[ProblemTable.id],
                            "title" to it[ProblemTable.title],
                            "language" to it[SubmissionTable.language],
                            "result" to it[SubmissionTable.result],
                            "executedTime" to it[SubmissionTable.executedTime],
                            
                            // 增加下面這筆欄位
                            "isRefreshable" to (userIdAuthorityPrincipal != null &&
                                it[UserTable.id].toString() == userIdAuthorityPrincipal.userId)
                        )
                    }
            }

            call.respond(
                mapOf(
                    "data" to submissions,

                    // 增加下面這筆欄位
                    "isRefreshable" to (userIdAuthorityPrincipal != null && userIdAuthorityPrincipal.authority.toInt() > 1)
                )
            )
        }
    }

    /* ...... 其他的程式碼部分 ...... */
}
```

在 `GET /submissions` 的 API 部分，我們修改成會對使用者進行驗證的行為，接著就是個別程式碼資料的欄位部分以及整體的欄位部分新增一個 `isRefreshable` 的欄位，去代表使用者可否對程式碼進行重新審核操作的布林值欄位。根據之前我們的定義，能夠重新審核個別筆程式碼的只有當初遞交該程式碼的使用者，而能夠對全部未審核的程式碼進行重新審核的使用者則只有超級管理員而已。

在資料管理系統有了這筆資料後，接著就來讓我們把網頁專案這邊，承接其資料的類別也可以去讀取這個欄位的資料，如下程式碼所示：

```kotlin
data class SubmissionsData(
    val data: Array<SubmissionData>,
    val isRefreshable: Boolean
)

data class SubmissionData(
    val id: String,
    val name: String,
    val problemId: String,
    val title: String,
    val language: String,
    val result: String,
    val executedTime: String,
    val isRefreshable: Boolean
)
```

接著就根據這個欄位的資料，在程式碼總列表的頁面上增加「重新審核」的按鈕，整體程式碼如下所示：

```kotlin
external interface SubmissionsArticleState: RState {
    var submissionsData: List<SubmissionData>
    var isRefreshable: Boolean
}

class SubmissionsArticle: RComponent<RProps, SubmissionsArticleState>() {
    override fun SubmissionsArticleState.init() {
        submissionsData = listOf()
        isRefreshable = false

        val mainScope = MainScope()
        mainScope.launch {
            val remoteSubmissionsData = Fetcher.createSubmissionsFetcher().fetch()
            setState {
                submissionsData = remoteSubmissionsData.data.toList()
                isRefreshable = remoteSubmissionsData.isRefreshable
            }
        }
    }

    override fun RBuilder.render() {
        mainArticle {

            // 改變標題的部分，增加「重新審核未審核的程式碼」按鈕
            div {
                attrs.classes = setOf("row")
                h1 {
                    attrs.classes = setOf("col")
                    +"遞交程式碼列表"
                }

                if (state.isRefreshable) {
                    div {
                        attrs.classes = setOf("col-md-2")

                        routeLink("/submissions/restart", className = "btn btn-primary") {
                            +"重新審核未審核的程式碼"
                        }
                    }
                }
            }

            // 在最後一欄增加「重新審核」的按鈕欄位
            val isDisplayRefreshableColumn = state.submissionsData.any { it.isRefreshable }
            table {
                attrs.classes = setOf("table", "table-bordered", "table-striped")

                thead {
                    attrs.classes = setOf("thead-dark")

                    tr {
                        th { +"編號" }
                        th { +"使用者名稱" }
                        th { +"題目名稱" }
                        th { +"使用程式語言" }
                        th { +"審核結果" }
                        th { +"執行時間（秒）" }

                        if (isDisplayRefreshableColumn) {
                            th { +"操作" }
                        }
                    }
                }
                tbody {
                    for (item in state.submissionsData) {
                        tr {
                            td { +item.id }
                            td { +item.name }
                            td { routeLink("/problems/${item.problemId}") { +item.title } }
                            td { +item.language }
                            td { +item.result }
                            td { +item.executedTime }

                            if (isDisplayRefreshableColumn) {
                                td {
                                    if (item.isRefreshable) {
                                        routeLink("/submissions/${item.id}/restart", className = "btn btn-primary") {
                                            +"重新審核"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

有了連結按鈕後，接著就要來建置會發送重新審核程式碼需求的 component 了。首先先將會發送這個需求的 `Fetcher` 定義好，如下程式碼所示：

```kotlin
fun createSubmissionsRestartFetcher() = Fetcher<JustFetch>("$DATA_URL/submissions/restart")
fun createSubmissionRestartFetcher(id: Int) = Fetcher<JustFetch>("$DATA_URL/submissions/$id/restart")
```

接著設計會去使用上面這兩個 `Fetcher` 的 `RestartSubmissionComponent`。這個元件裡面可以透過 props 是否有傳入特定程式碼編號，來判斷看看究竟要使用上面兩個 `Fetcher` 中的哪一個 `Fetcher`，整體程式碼如下所示：

```kotlin
external interface RestartSubmissionComponentProps: RProps {
    var submissionId: Int?
}

external interface RestartSubmissionComponentState: RState {
    var isRestart: Boolean
    var onRestart: (Int?) -> Unit
}

class RestartSubmissionComponent: RComponent<RestartSubmissionComponentProps, RestartSubmissionComponentState>() {
    override fun RestartSubmissionComponentState.init() {
        isRestart = false;

        onRestart = {
            val mainScope = MainScope()
            mainScope.launch {
                if (it == null) {
                    Fetcher.createSubmissionsRestartFetcher().fetch("POST")
                } else {
                    Fetcher.createSubmissionRestartFetcher(it).fetch("POST")
                }

                setState {
                    isRestart = true
                }
            }
        }
    }

    override fun RBuilder.render() {
        if (!state.isRestart) {
            state.onRestart(props.submissionId)
        } else {
            redirect(to = "/submissions")
        }
    }
}

fun RBuilder.restartSubmissionComponent(handler: RElementBuilder<RestartSubmissionComponentProps>.() -> Unit): ReactElement =
    child(RestartSubmissionComponent::class, handler)
```

最後在 `App` 的地方加上路由即可完成。

```kotlin
route("/submissions/restart", exact = true) {
    restartSubmissionComponent {  }
}
route<IdProps>("/submissions/:id/restart") {
    restartSubmissionComponent {
        attrs.submissionId = it.match.params.id
    }
}
```

重新執行網頁專案後，就可以在程式碼總列表的地方看到「重新審核」的按鈕了，如下所示：

![重新審核程式碼按鈕的截圖](/uploads/2020/09/截圖-2020-09-28-下午11.41.45.png)

不過如果你按下單筆程式碼的重新審核的話，可能會發現它沒有什麼變化，要等一陣子之後才會看到有變化，這是因為我們在重新審核單筆程式碼的時候，不會將原本程式碼的結果給洗掉，關於這點就看你有沒有打算設計成會洗掉原本結果的形式。

## 首頁設計

我們完成了大部分麻煩的頁面，但好像一直沒有去製作首頁的部分。基本上首頁可以自己自由地去決定該怎麼做，這裡利用 Bootstrap 常見的 Jumbotron 樣式來進行製作，整個 `IndexArticle` component 程式碼如下所示：

```kotlin
class IndexArticle: RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        mainArticle {
            div {
                attrs.classes = setOf("jumbotron")
                h1 {
                    attrs.classes = setOf("display-4")
                    +"歡迎光臨 Knight Online Judge"
                }
                p {
                    attrs.classes = setOf("lead")
                    +"快點來解些題目吧！"
                }
            }
        }
    }
}

fun RBuilder.indexArticle(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(IndexArticle::class, handler)
```

在路由的部分將根目錄換成使用 `IndexArticle` 即可。

```kotlin
route("/", exact = true) { indexArticle {  } }
```

這樣就可以看首頁稍微有點花樣了。

![首頁截圖](/uploads/2020/09/截圖-2020-09-28-下午11.49.26.png)

## Fetcher 的錯誤處理

最後，就讓我們來談一談怎麼處理 `Fetcher` 傳回來的錯誤吧！以 `/problems/:id` 為例，假設使用者現在輸入了一個不存在的 `id`，則以我們目前 component 的設計，它就會不斷地去查詢題目詳細資料，造成無止境的錯誤發生，非常危險。這裡可以簡單利用 `try-catch` 的方式去將 `fetch()` 所丟出來的例外給接住，並在該 componenet 的 state 去紀錄已經錯誤的訊息，最後在 `render()` 的部分遇到錯誤就顯示錯誤資訊即可，整體程式碼如下所示：

```kotlin
external interface ProblemDetailArticleState: RState {
    /* ...... 其餘資料 ...... */

    // 增加已經錯誤的欄位
    var isError: Boolean
}

class ProblemDetailArticle: RComponent<ProblemDetailArticleProps, ProblemDetailArticleState>() {
    override fun ProblemDetailArticleState.init() {
        problemDetailData = null
        isError = false // 初始化為 false

        onLoad = {
            val mainScope = MainScope()
            mainScope.launch {
                // 利用 try-catch 的方式接住錯誤
                try {
                    val remoteProblemDetailData = Fetcher.createProblemDetailFetcher(it).fetch()
                    setState {
                        problemDetailData = remoteProblemDetailData.data
                    }
                } catch(e: Throwable) {
                    // 接到錯誤後設定 state 為 true
                    setState {
                        isError = true
                    }
                }
            }
        }
    }

    override fun RBuilder.render() {
        mainArticle {

            // 收到錯誤後直接顯示錯誤訊息即可
            if (state.isError) {
                div {
                    attrs.classes = setOf("alert", "alert-danger")
                    +"找不到題目資訊。"
                }

                return@mainArticle
            }
            /* ...... 其餘的程式碼內容 ...... */
        }
    }
}
```

這樣實作完後，我們就可以隨意在網址列的 `/problems` 後面隨意輸入一個數字，即可看到錯誤訊息了。

![錯誤訊息頁面的截圖](/uploads/2020/09/截圖-2020-09-28-下午11.56.56.png)

## 總結

今天將重新審核程式碼、首頁以及如何處理 `Fetcher` 回傳回來的錯誤該怎麼處理給大致上帶過了，基本上都是運用我們這幾天所嘗試過的技巧，接著下來就是利用這些技巧去設計一個屬於你自己的 Online Judge 系統吧！明天最後一天會稍微給大家一些接下來還可以進行哪些事情的想法，以及最後我對於整個 30 天的內容下來的感想。感謝各位追隨這個系列到了今天，明天終於能夠有個 Happy Ending 了！

## 參考資料

* [Jumbotron · Bootstrap](https://getbootstrap.com/docs/4.1/components/jumbotron/)
