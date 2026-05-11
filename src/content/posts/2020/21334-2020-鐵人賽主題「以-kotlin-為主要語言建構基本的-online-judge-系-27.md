---
id: 21334
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 27：批改系統網頁 (9) – 製作取得資料相關頁面'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-27
date: '2020-09-27T16:34:43+08:00'
lastmod: '2020-09-27T16:44:21+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- React
- Fetch API
featured_image: /uploads/2020/09/27fb.png
permalink: /2020/09/27/21334/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-27/
wp_status: publish
wp_type: post
---

![Day 27：批改系統網頁 (9) – 製作取得資料相關頁面](/uploads/2020/09/27fb.png)

昨天我們完成了登入與登出相關的操作，接下來就讓我們一步一步完成接下來的頁面吧！

## 題目總列表頁面

首先先讓我們從獲得題目總列表的資料來顯示的頁面開始吧！雖然我們已經在前面的天數中完成了題目總列表的頁面，但是我們還會希望在看題目總列表的時候，能夠順便顯示目前這個題目是否已經有被遞交程式碼過，甚至是有被解成功過，那該怎麼做呢？可以修改資料管理系統中的程式碼，在其與資料庫抓取題目資料後，另外將相對應題目的遞交程式碼資料找出來，查找是否有該使用者的遞交紀錄，並且是否其中有一筆紀錄的結果字串中出現了 `Accepted` 的字樣，就讓我們來改寫一下資料管理系統中的 `GET /problems` 的回傳內容吧！

```kotlin
route("/problems") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME, optional = true) {
        get {
            val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
            var problems: List<Map<String, Any>>? = null

            transaction {
                val problemContents = ProblemTable.selectAll().map {
                    mutableMapOf(
                        "id" to it[ProblemTable.id].toString(),
                        "title" to it[ProblemTable.title]
                    )
                }

                if (userIdAuthorityPrincipal == null) {
                    problems = problemContents
                } else {
                    val problemIds = problemContents.mapNotNull { it?.get("id")?.toInt() }
                    val minProblemId = problemIds.min()
                    val maxProblemId = problemIds.max()

                    if (minProblemId != null && maxProblemId != null) {
                        val distinctIdCount = SubmissionTable.id.countDistinct()
                        val acceptedResultSum = SubmissionTable.result.like("Accepted%")
                            .castTo<Int>(IntegerColumnType())
                            .sum()

                        val submissions = SubmissionTable
                            .slice(
                                SubmissionTable.problemId,
                                distinctIdCount,
                                acceptedResultSum
                            ).select {
                                SubmissionTable.problemId.lessEq(maxProblemId).and(
                                    SubmissionTable.problemId.greaterEq(minProblemId)
                            )}.groupBy(SubmissionTable.problemId)
                            .forEach { row ->
                                val problemElement = problemContents.first {
                                    it?.get("id") == row[SubmissionTable.problemId].toString()
                                }
                                val acceptedResultSum = row[acceptedResultSum]
                                problemElement["isSubmitted"] = (row[distinctIdCount] > 0).toString()
                                problemElement["isAccepted"] = (acceptedResultSum != null && acceptedResultSum > 0).toString()
                            }
                    }
                    problems = problemContents
                }
            }

            call.respond(
                mapOf(
                    "data" to problems
                )
            )
        }
    }

    /* ...... 其餘的內容 ...... */
}
```

這裡我們增加了驗證機制，在驗證到使用者有登入的情況，就會多做查找其遞交程式碼的紀錄。在這些紀錄中，我們利用 `groupBy()` 函式讓資料庫以題目編號去群組起來這些資料，並算出提交的程式碼筆數 `SubmissionTable.id.countDistinct()` 與 AC 的程式碼筆數 `SubmissionTable.result.like("Accepted%").castTo<Int>(IntegerColumnType()).sum()`。透過這兩筆計算，我們就可以在回傳的資料裡面多回傳是否有遞交過 `isSubmitted` 與是否有 AC 過的 `isAccepted` 這兩項資料欄位。

接著在批改系統網頁專案的 `ProblemData` 裡，增加可以接受資料管理系統回傳的 `isSubmitted` 與 `isAccepted` 這兩筆欄位的資料，如下程式碼所示：

```kotlin
data class ProblemData(
    val id: String,
    val title: String,
    val isSubmitted: String? = null,
    val isAccepted: String? = null
)
```

最後就可以在 `ProblemArticle` 中，根據這兩筆資料去顯示每道題目的狀態，如下所示：

```kotlin
tbody {
    for (item in state.problemsData) {
        tr {
            if (item.isAccepted == "true") {
                attrs.classes = setOf("table-success")
            } else if (item.isSubmitted == "true") {
                attrs.classes = setOf("table-danger")
            }

            td { +item.id }
            td {
                routeLink("/problems/${item.id}") {
                    +item.title
                }
            }
        }
    }
}
```

在 `tbody` 裡顯示各筆題目資料的部分，我們透過判斷各筆題目是否有遞交過以及是否 AC 過的狀態，來對該行題目資料代入不同的 Boostrap 表格樣式，就可以藉此顯示這道題目目前的狀態為何。實作完後，應該就可以看到如下的結果了：

![題目資料狀態的呈現](/uploads/2020/09/截圖-2020-09-27-下午1.11.45.png)

## 題目詳細資料頁面

實作完題目總列表頁面後，接著就要去獲取每題題目的詳細資料並將之顯示出來了。首先，先將題目詳細資料的 `Fetcher` 產生函式寫出來吧！如下程式碼所示：

```kotlin
fun createProblemDetailFetcher(id: Int) = Fetcher<ProblemDetailWrapperData>("$DATA_URL/problems/$id")

data class ProblemDetailWrapperData(
    val data: ProblemDetailData
)

data class ProblemDetailData(
    val id: String,
    val title: String,
    val description: String
)
```

有了 `Fetcher` 後，將相對應要去顯示題目詳細資料的 component 給製作出來，底下是其 component `ProblemDetailArticle` 的程式碼內容：

```kotlin
external interface ProblemDetailArticleProps: RProps {
    var problemId: Int
}

external interface ProblemDetailArticleState: RState {
    var problemDetailData: ProblemDetailData?
    var onLoad: (Int) -> Unit
}

class ProblemDetailArticle: RComponent<ProblemDetailArticleProps, ProblemDetailArticleState>() {
    override fun ProblemDetailArticleState.init() {
        problemDetailData = null

        onLoad = {
            val mainScope = MainScope()
            mainScope.launch {
                val remoteProblemDetailData = Fetcher.createProblemDetailFetcher(it).fetch()
                setState {
                    problemDetailData = remoteProblemDetailData.data
                }
            }
        }
    }

    override fun RBuilder.render() {
        mainArticle {
            val problemDetailData = state.problemDetailData
            if (problemDetailData == null || problemDetailData.id != props.problemId.toString()) {
                state.onLoad(props.problemId)
            } else {
                h1 {
                    +"${problemDetailData.id}. ${problemDetailData.title}"
                }

                pre {
                    +problemDetailData.description
                }
            }
        }
    }
}

fun RBuilder.problemDetailArticle(handler: RElementBuilder<ProblemDetailArticleProps>.() -> Unit): ReactElement =
    child(ProblemDetailArticle::class, handler)
```

我們讓這個元件可以透過 props 來知道要顯示的題目編號為多少，接著就利用 state 定義中的 `onLoad()` 函式在尚未拿到資料 `state.problemDetailData` 時，會去與資料管理系統進行抓取資料的動作。抓到資料後，就會更新其內容為抓到的資料。

資料管理系統的部分，要注意我們不可以讓使用者得知該筆題目有哪些測資，故要將回傳的資料中帶有 `TestCase` 的部分拿掉。由於之後要進行題目修改的時候，我們可能還是會需要這些測試資料，故我們先把原本的路由部分換成 `GET /problems/:id/all`，而再來實作新的 `GET /problem/:id`，如下所示：

```kotlin
// Problem.kt
data class ProblemDetailData(
    val id: String,
    val title: String,
    val description: String
)

// Application.kt
get {
    val requestId = call.parameters["id"]?.toInt() ?:
        throw BadRequestException("The type of Id is wrong.")
    var responseData: ProblemDetailData? = null

    transaction {
        val requestProblem = ProblemTable.select {
            ProblemTable.id.eq(requestId)
        }.first()

        responseData = ProblemDetailData(
            id = requestProblem[ProblemTable.id].toString(),
            title = requestProblem[ProblemTable.title],
            description = requestProblem[ProblemTable.description]
        )
    }

    call.respond(mapOf("data" to responseData))
}
```

最後讓我們在批改系統網頁專案的路由區塊改成如下程式碼所示的樣子：

```kotlin
route<IdProps>("/problems/:id") { problemDetailArticle {
    attrs.problemId = it.match.params.id
}}
```

這樣應該就可以看到題目內容了！

![題目詳細內容頁面的截圖](/uploads/2020/09/截圖-2020-09-27-下午2.25.27.png)

## 使用者列表頁面

有了上面的實作經驗後，基本上另外兩種資料的總列表頁面應該就可以隨之做出來了。首先先來實作使用者列表頁面，讓使用者列表資料可以從資料管理系統取得，如下所示：

```kotlin
route("/users") {
    get {
        var users: List<Map<String, Any>>? = null

        transaction {
            val userContents = UserTable.selectAll().map {
                mutableMapOf(
                    "id" to it[UserTable.id].toString(),
                    "name" to it[UserTable.name]
                )
            }

            val solvedProblemCount = mutableMapOf<Int, Int>()
            val acPairs = SubmissionTable
                .slice(SubmissionTable.userId, SubmissionTable.problemId)
                .select {
                    SubmissionTable.result.like("Accepted%")
                }.groupBy(SubmissionTable.userId, SubmissionTable.problemId)
                .forEach {
                    val userId = it[SubmissionTable.userId]
                    solvedProblemCount[userId] = solvedProblemCount.getOrDefault(userId, 0) + 1
                }

            for (userContent in userContents) {
                val userContentId = userContent["id"]
                if (userContentId != null) {
                    userContent["solvedProblemCount"] = solvedProblemCount.getOrDefault(
                        userContentId.toInt(),
                        0
                    ).toString()
                }
            }
            
            users = userContents
        }

        call.respond(
            mapOf(
                "data" to users
            )
        )
    }
}
```

除了使用者的編號與名稱外，我們讓使用者列表會順便回傳其解成功的題目數量。透過與資料庫進行遞交程式碼的查詢，利用 `userId` 與 `problemId` 兩者進行群組的動作，最後再算每個使用者有解了幾題即可。實作完後，接著一樣在網頁專案中設計可以把上面回傳的資料給接下來的 `Fetcher` 與資料型態：

```kotlin
fun createUsersFetcher() = Fetcher<UsersData>("$DATA_URL/users")

data class UsersData(
    val data: Array<UserData>
)

data class UserData(
    val id: String,
    val name: String,
    val solvedProblemCount: String
)
```

然後設計出可以顯示使用者列表資料的 component，大體內容與 `ProblemsArticle` 相同，這裡就不再贅述了，程式碼如下：

```kotlin
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import kotlinx.html.classes
import react.*
import react.dom.*
import react.router.dom.routeLink

external interface UsersArticleState: RState {
    var usersData: List<UserData>
}

class UsersArticle: RComponent<RProps, UsersArticleState>() {
    override fun UsersArticleState.init() {
        usersData = listOf()

        val mainScope = MainScope()
        mainScope.launch {
            val remoteUsersData = Fetcher.createUsersFetcher().fetch()
            setState {
                usersData = remoteUsersData.data.toList()
            }
        }
    }

    override fun RBuilder.render() {
        mainArticle {
            h1 {
                +"使用者列表"
            }

            table {
                attrs.classes = setOf("table", "table-bordered", "table-striped")

                thead {
                    attrs.classes = setOf("thead-dark")

                    tr {
                        th { +"編號" }
                        th { +"名稱" }
                        th { +"解題數" }
                    }
                }
                tbody {
                    for (item in state.usersData) {
                        tr {
                            td { +item.id }
                            td { +item.name }
                            td { +item.solvedProblemCount }
                        }
                    }
                }
            }
        }
    }
}

fun RBuilder.usersArticle(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(UsersArticle::class, handler)
```

最後讓網頁的路由能夠顯示其內容即可。

```kotlin
route("/users", exact = true) { usersArticle {  } }
```

重新執行網頁專案，點選「使用者列表」，應該就可以看到結果了。

![使用者列表頁面截圖](/uploads/2020/09/截圖-2020-09-27-下午3.43.51.png)

## 遞交程式碼列表頁面

剩下最後一個遞交程式碼列表頁面的做法也與上述相同，先做出相對應的資料管理系統 API：

```kotlin
route("/submissions") {
    get {
        var submissions: List<Map<String, Any>>? = null

        transaction {
            submissions = (SubmissionTable innerJoin ProblemTable innerJoin UserTable)
                .slice(
                    SubmissionTable.id,
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
                        "executedTime" to it[SubmissionTable.executedTime]
                    )
                }
        }
}
```

這裡為了要讓 `SubmissionTable` 中所記錄的 `userId` 和 `problemId` 可以變成其名稱，故我們就將 `SubmissionTable`、`UserTable` 和 `ProblemTable` 利用 Join 去結合起來，並且由於一般遞交程式碼顯示的排序都是由新到舊，所以這裡就將查詢的結果依照編號由大到小排序，利用 `orderBy(SubmissionTable.id, SortOrder.DESC)` 即可得到此效果。

實作完 API 後，接著就在批改系統網頁專案中實作可以接取此資料的 `Fetcher`，如下所示：

```kotlin
fun createSubmissionsFetcher() = Fetcher<SubmissionsData>("$DATA_URL/submissions")

data class SubmissionsData(
    val data: Array<SubmissionData>
)

data class SubmissionData(
    val id: String,
    val name: String,
    val problemId: String,
    val title: String,
    val language: String,
    val result: String,
    val executedTime: String
)
```

接著實作會將抓取資料結果顯示的 component `SubmissionsArticle`，如下程式碼所示：

```kotlin
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import kotlinx.html.classes
import react.*
import react.dom.*
import react.router.dom.routeLink

external interface SubmissionsArticleState: RState {
    var submissionsData: List<SubmissionData>
}

class SubmissionsArticle: RComponent<RProps, SubmissionsArticleState>() {
    override fun SubmissionsArticleState.init() {
        submissionsData = listOf()

        val mainScope = MainScope()
        mainScope.launch {
            val remoteSubmissionsData = Fetcher.createSubmissionsFetcher().fetch()
            setState {
                submissionsData = remoteSubmissionsData.data.toList()
            }
        }
    }

    override fun RBuilder.render() {
        mainArticle {
            h1 {
                +"遞交程式碼列表"
            }

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
                        }
                    }
                }
            }
        }
    }
}

fun RBuilder.submissionsArticle(handler: RElementBuilder<RProps>.() -> Unit): ReactElement =
    child(SubmissionsArticle::class, handler)
```

最後讓路由可以顯示其內容即可。

```kotlin
route("/submissions", exact = true) { submissionsArticle { } }
```

重新執行網頁專案，應該就可以看到遞交程式碼的列表了。

![遞交程式碼列表截圖](/uploads/2020/09/截圖-2020-09-27-下午4.41.56.png)

## 總結

今天我們完成了與資料管理系統獲取資料相關操作的頁面顯示。由於使用者與遞交程式碼的詳細資料顯示部分，以目前存在資料庫的資料來說，似乎就沒有其他一定要丟出來給別人看的資料欄位，故這裡就忽略不實作了。如果你覺得欄位上還有其他詳細資料可以顯示出來的話，也可以自己試著實作看看，基本上都是同樣的步驟去處理就可以了。那麼明天就讓我們繼續將其他的操作頁面完成吧，敬請期待！

## 參考資料
* [JetBrains/Exposed: Kotlin SQL Framework](https://github.com/JetBrains/Exposed)
* [SQL INNER JOIN Keyword](https://www.w3schools.com/sql/sql_join_inner.asp)
* [Tables · Bootstrap](https://getbootstrap.com/docs/4.1/content/tables/)
