---
id: 16308
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 9：資料管理伺服器 (7) - 使用 Exposed
  套件與資料庫銜接'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-9
date: '2020-09-09T07:41:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- PostgreSQL
- Exposed
featured_image: /uploads/2020/09/09.png
permalink: /2020/09/09/16308/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-9/
wp_status: publish
wp_type: post
---

![Day 9：資料管理伺服器 (7) - 使用 Exposed 套件與資料庫銜接](/uploads/2020/09/09.png)

昨天我們架設了 PostgreSQL 資料庫系統，今天就讓我們來讓專案可以將資料儲存進這個資料庫內吧！

## Exposed：Kotlin SQL Framework

![Exposed Logo: https://github.com/JetBrains/Exposed](/uploads/2020/09/logo.png)

關於如何利用 Kotlin 語言去進行 SQL 資料庫的操作，在這裡主要我們會使用 Exposed 這個框架，而為了要使用 Exposed 這個框架，我們會需要下面三個套件：

1. PostgreSQL JDBC Driver：用來與 PostgreSQL 進行連接。
2. Exposed：由 JetBrains 推出的 Kotlin SQL 框架，可以讓你方便使用 Kotlin 語法去對 SQL 資料庫進行資料操作。
3. HikariCP：可以管理與 PostgreSQL 連接的相關設定，並且可以將此連接轉成一個可供 Exposed 使用的 `DataSource`（資料來源）物件。

因此我們就要先在專案中安裝此三個套件。之前有提過，如果要在專案中安裝套件，我們可以利用 `Gradle` 來安裝。在 `bundle.gradle.kts` 的 `dependencies` 區塊中，增加下面三行以進行套件安裝：

```
implementation("com.zaxxer:HikariCP:3.4.5")
implementation("org.jetbrains.exposed:exposed:0.17.7")
implementation("org.postgresql:postgresql:42.2.16")
```

套件安裝好後，先在 `pgAdmin` 裡面新建一個空的 `Database`，但這次我們不會直接用圖形介面來創建 `Table`，而是會直接從程式碼中建立 `Table`。

![創建資料庫的畫面截圖](/uploads/2020/09/截圖-2020-09-08-下午8.12.51.png)

## 連接資料庫

創建好一個空的資料庫後，首先先來撰寫資料庫連線用的設定檔，讓我們的專案可以利用這個設定檔丟給 HikariCP 這個套件去跟資料庫連線，底下是位於 `resources/hikari.properties` 的內容：

```
dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
dataSource.user=postgres
dataSource.password=<你的密碼>
dataSource.databaseName=onlinejudge
dataSource.portNumber=5432
dataSource.serverName=localhost
```

解釋一下上面出現的欄位，`dataSourceClassName` 是要用來創建 `DataSource` 的類別是哪一個，這裡使用的是來自於 PostgreSQL JDBC Driver 所提供的 `org.postgresql.ds.PGSimpleDataSource` 類別來進行資料庫的連接與創建 `DataSource` 物件的方式。

而 `dataSource.user` 和 `dataSource.password` 則是登入資料庫所用的帳號與密碼，這裡使用的是超級管理員 `postgres` 的帳號與密碼。如果你不希望專案握有資料庫太大的權限，可以另外在資料庫內創建一個新 User，讓這個 User 只能操作剛剛建立的 `Database`。

最後三項 `dataSource.databaseName`、`dataSource.portNumber` 和 `dataSource.serverName` 則分別是 `Database` 的名稱、資料庫系統監聽的 `port` 號碼以及資料庫系統所在的位址。由於所在位址是在自己的主機上，所以可以使用 `127.0.0.1` 或是 `localhost` 代表自己的主機。

建立好設定檔後，就可以來寫初始化資料庫的函式了。基本上就是利用 HikariCP 讀入此設定檔建立一個 `HikariConfig`，之後對 `HikariConfig` 代入你想要操作的 `schema` 為何，接著利用此設定建立一個 `HikariDataSource`，再將這個 `DataSource` 交給 Exposed 去進行資料庫連線即可，整體的程式碼如下：

```kotlin
fun initDatabase() {
    val config = HikariConfig("/hikari.properties")
    config.schema = "public"
    val dataSource = HikariDataSource(config)
    Database.connect(dataSource)
}

fun Application.module(testing: Boolean = false) {
    initDatabase()
    // ...... 後面的程式碼 ......
}
```

## 資料表的定義與創建

接下來我們要利用程式碼來建立跟昨天一樣的表格，建立的方式是先定義出資料表的結構，再利用 `SchemaUtils.create()` 去建立這些表格。那首先是 `ProblemTable` 的程式碼定義，你可以將它與 `Problem` 的類別寫在一起，以方便管理：

```kotlin
object ProblemTable : Table() {
    val id = integer("ProblemId").autoIncrement().primaryKey()
    val title = text("Title")
    val description = text("Description")
}
```

這裡出現了我們之前沒看過的語法， `object` 這個關鍵字是用在如果你要定義的 `class` 只會生出一個物件的話，你可以直接用 `object` 簡寫即可，最後宣告出來的結果會類似於其他語言中的 `static class` 的使用方式，可以直接將該類別當成一個物件來使用。後面 `: Table()` 即是類別的繼承，讓這個 `ProblemTable` 繼承 `Table` 類別，並在創建這個物件時，會呼叫其繼承之類別的建構子。

再來是物件內部的部分，裡面的欄位內容就是定義表格的欄位資料類型，像是 `integer()` 和 `text()` 就跟我們之前在 SQL 裡面看到的一樣，是定義該欄位可以存哪種類型的資料，裡面代入的參數即是該欄位在資料庫中的名稱。而如果該欄位有其他的屬性，例如：自動累加或是 Primary Key 的話，則繼續接在後面呼叫即可。

接著來看 `TestCaseTable` 的程式碼：

```kotlin
object TestCaseTable : Table() {
    val id = integer("TestCaseId").autoIncrement().primaryKey()
    val input = text("TestInput")
    val expectedOutput = text("ExpectedOutput")
    val comment = text("Comment")
    val score = integer("Score")
    val timeOutSeconds = double("TimeOutSeconds")

    val problem = integer("ProblemId") references ProblemTable.id
}
```

基本上跟 `ProblemTable` 的定義方式類似，只差在 Foreign Key 的部分，使用了 `references` 這個函式去決定要去參考另外哪個 `Table` 中的哪個值。關於這個 `references`，各位可能有觀察到，它在程式碼的寫法上還蠻特殊的，它的呼叫方式居然是介在兩個值之間，這是 Kotlin 的一種叫做 `Infix Notation` 的函式定義法。底下有個簡單的範例可以讓你稍微了解一下這個 `Infix Notation` 如何定義以及怎麼使用，而 `references` 在這裡只是用了相同的方式定義而已。

```kotlin
infix fun Int.add(b: Int) = this + b

// Infix Notation
val c = 30 add 100
// 也可以寫成一般形式
val d = 30.add(100)
```

那定義完了上面兩個資料表後，就讓我們在 `initDatabase()` 加入創建這些資料表的步驟吧！

```kotlin
fun initDatabase() {
    val config = HikariConfig("/hikari.properties")
    config.schema = "public"
    val dataSource = HikariDataSource(config)
    Database.connect(dataSource)

    // 加入這個部分
    transaction {
        SchemaUtils.create(ProblemTable, TestCaseTable)
    }
}
```

所有對資料庫的操作都必須在 `transaction` 區塊，每一個 `transaction` 區塊會保證只有這個區塊的所有動作全部做完，資料庫的內容才會有所變動，如果 `transaction` 在執行途中出錯，則資料庫會回朔到還沒執行 `transaction` 區塊內的任何一個指令的狀態。在 transaction 區塊中的 `SchemaUtils.create(ProblemTable, TestCaseTable)` 則是指要在資料庫內建立起這個兩個表格，如果已經建立過的話，它就會讓這兩個資料表物件與實際資料庫連結起來，你就可以利用這兩個物件直接對資料庫進行操作，就不用去寫 SQL 語法了。

## 修改 RESTful API 的執行方式

接下來就讓我們來逐步將 RESTful API 的執行內容從操作陣列改換到操作資料庫吧！在更改之前，可以先將我們之前定義的假資料陣列刪除，然後一個一個去思考要怎麼改寫每一個 API 要執行的內容。

首先是取得題目列表資料 `GET /problems`。利用 `ProblemTable` 的 `selectAll()` 函式可將題目都從資料庫拉出來，接著利用 `map()` 函式一個一個轉成跟我們之前設計時一樣的格式即可。底下是詳細的程式碼，由於一些函式定義上的原因，無法將 `call` 直接寫在 `transaction` 區塊內，故會需要一個預先宣告的變數讓結果可從 `transaction` 區塊中帶出來給 `call.respond` 函式使用。

```kotlin
get {
    var problems: List<Map<String, Any>>? = null

    transaction {
        problems = ProblemTable.selectAll().map {
            mapOf(
                "id" to it[ProblemTable.id].toString(),
                "title" to it[ProblemTable.title]
            )
        }
    }

    call.respond(mapOf(
        "data" to problems
    ))
}
```

接下來是新增題目資料 `POST /problems`，由於我們已經將生 `id` 的職責交給了資料庫，所以在新的版本設計中，我們不希望使用者在發 HTTP request 時會帶 `id` 過來，但是這又跟原本的 `Problem` 類別設計不同，那該怎麼辦呢？其實很簡單，那就再定義一個類別即可，這種為了資料傳輸而生的類別物件通常我們稱之為 DTO（Data Transfer Object），所以我們就來設計 `Problem` 與 `TestCase` 給 `POST` 方法使用的 DTO 吧！

```
// Problem.kt
data class ProblemPostDTO(
    val title: String,
    val description: String,
    val testCases: List<TestCasePostDTO>
)

// TestCase.kt
data class TestCasePostDTO(
    val input: String,
    val expectedOutput: String,
    val comment: String,
    val score: Int,
    val timeOutSeconds: Double
)
```

定義完以後，就來利用這個 DTO 撰寫 `POST /problems` 的內容吧！底下是詳細的程式碼，基本上就是從客戶端手中拿到 `ProblemPostDTO` 後，利用 `ProblemTable.insert()` 將新的 Problem 輸入進資料庫，後頭可使用 `get` 去得到新加的這筆資料的欄位的值，我們利用這個函式拿到資料庫新增的 `id`，並存到 `newProblemId` 的變數中，接著再一筆一筆地將 `TestCase` 加進去 `TestCaseTable` 之中，並將 Foreign Key `problemId` 填入剛剛得知的新題目的 `id` 值即可，最後回傳回這筆新題目的 `id` 讓客戶端可以知道它剛加的題目 `id` 為何。

```kotlin
post {
    val newProblem = call.receive<ProblemPostDTO>()
    var newProblemId : Int? = null

    transaction {
        newProblemId = ProblemTable.insert {
            it[title] = newProblem.title
            it[description] = newProblem.description
        } get ProblemTable.id

        for (testCase in newProblem.testCases) {
            TestCaseTable.insert {
                it[input] = testCase.input
                it[expectedOutput] = testCase.expectedOutput
                it[comment] = testCase.comment
                it[score] = testCase.score
                it[timeOutSeconds] = testCase.timeOutSeconds
                it[problemId] = newProblemId!!
            }
        }
    }

    call.respond(mapOf(
        "problem_id" to newProblemId
    ))
}
```

接下來是取得題目詳細資料 `GET /problems/{id}`，基本上就是利用 `id` 當作條件，從 `ProblemTable` 和 `TestCaseTable` 拉出相對應的資料結合起來即可，比較的部分利用在 `select` 的區塊撰寫條件，做法是利用 `欄位.條件(值)`，這個相等的條件切記不可以使用 `==`，原因是這個部分是要建立出相等判斷的 SQL 語法，而不是讓我們直接在 Kotlin 裡面進行判斷，要小心。另外，原先我們設計的 `TestCase` 是沒有 `id` 的，但現在為了修改方便，我們會帶上 `TestCase` 的 `id` 給使用者，以利之後的修改，底下是詳細的程式碼：

```kotlin
get {
    val requestId = call.parameters["id"]?.toInt() ?:
        throw BadRequestException("The type of Id is wrong.")
    var responseData: Problem? = null

    transaction {
        val requestProblem = ProblemTable.select {
            ProblemTable.id.eq(requestId)
        }.first()

        val requestTestCases = TestCaseTable.select {
            TestCaseTable.problemId.eq(requestId)
        }.map {
            TestCase(
                id = it[TestCaseTable.id].toString(),
                input = it[TestCaseTable.input],
                expectedOutput = it[TestCaseTable.expectedOutput],
                comment = it[TestCaseTable.comment],
                score = it[TestCaseTable.score],
                timeOutSeconds = it[TestCaseTable.timeOutSeconds]
            )
        }.toList()

        responseData = Problem(
            id = requestProblem[ProblemTable.id].toString(),
            title = requestProblem[ProblemTable.title],
            description = requestProblem[ProblemTable.description],
            testCases = requestTestCases
        )
    }

    call.respond(mapOf("data" to responseData))
}
```

接著是修改資料 `PUT /problems/{id}` 的部分，這個部分會利用 `id` 去使用 `ProblemTable.update` 進行題目方面的修正，而對於一筆一筆的測資，則也是利用其測資的 `id` 去進行修正，但在這個修正會出現三種情況，分別利用三種不同的操作來對付：

1. 刪除測資：刪除掉存在於資料庫中，其測資 `id` 不存在於目前給予的測資列表中的那些資料。
2. 新增測資：其測資不帶 `id`，用 `null` 表示。
3. 修改測資：其測資包含原本的 `id`。

那為了要讓 `TestCase.id` 可以為 `null`，這裡又定義了 `ProblemPutDTO` 與 `TestCasePutDTO` 兩個類別讓客戶端使用。

```kotlin
// Problem.kt
data class ProblemPutDTO(
    val id: String,
    val title: String,
    val description: String,
    val testCases: List<TestCasePutDTO>
)

// TestCase.kt
data class TestCasePutDTO(
    val id: String?,
    val input: String,
    val expectedOutput: String,
    val comment: String,
    val score: Int,
    val timeOutSeconds: Double
)
```

最後可以得到程式碼如下：

```kotlin
put {
    val requestId = call.parameters["id"]?.toInt() ?:
        throw BadRequestException("The type of Id is wrong.")
    val updateProblemContent = call.receive<ProblemPutDTO>()

    transaction {
        ProblemTable.update({ ProblemTable.id.eq(requestId)}) {
            it[ProblemTable.title] = updateProblemContent.title
            it[ProblemTable.description] = updateProblemContent.description
        }

        TestCaseTable.deleteWhere {
            TestCaseTable.problemId.eq(requestId)
                .and(TestCaseTable.id.notInList(
                    updateProblemContent.testCases
                        .mapNotNull { it.id?.toInt() }
                ))
        }

        for (testcase in updateProblemContent.testCases) {
            if (testcase.id == null) {
                TestCaseTable.insert {
                    it[TestCaseTable.input] = testcase.input
                    it[TestCaseTable.expectedOutput] = testcase.expectedOutput
                    it[TestCaseTable.comment] = testcase.comment
                    it[TestCaseTable.score] = testcase.score
                    it[TestCaseTable.timeOutSeconds] = testcase.timeOutSeconds
                    it[TestCaseTable.problemId] = requestId
                }
                continue
            }

            TestCaseTable.update({ TestCaseTable.id.eq(testcase.id.toInt()) }){
                it[TestCaseTable.input] = testcase.input
                it[TestCaseTable.expectedOutput] = testcase.expectedOutput
                it[TestCaseTable.comment] = testcase.comment
                it[TestCaseTable.score] = testcase.score
                it[TestCaseTable.timeOutSeconds] = testcase.timeOutSeconds
            }
        }
    }

    call.respond(mapOf(
        "OK" to true
    ))
}
```

最後是刪除題目 `DELETE /problems/{id}` ，這個部分即是利用 `ProblemTable.deleteWhere` 和 `TestCaseTable.deleteWhere` 進行刪除即可。但要注意的是， `ProblemTable.id` 會被 `TestCaseTable.problemId` 這個 Foreign Key 給侷限住，所以你必須先將侷限住 `ProblemTable` 資料的 `TestCaseTable` 內的資料先刪除掉，才能刪除掉 `ProblemTable` 相對應的題目資料，要小心這個順序。

```kotlin
delete {
    val requestId = call.parameters["id"]?.toInt() ?:
        throw BadRequestException("The type of Id is wrong.")

    transaction {
        TestCaseTable.deleteWhere { TestCaseTable.problemId.eq(requestId) }
        ProblemTable.deleteWhere { ProblemTable.id.eq(requestId) }
    }

    call.respond(mapOf(
        "OK" to true
    ))
}
```

## 測試

接著就可以來測試看看了，首先先增加一道題目：（這裡我用程式碼的方式簡寫，各位可以將各個部分分別填入 Postman 相對應的欄位中。）

```
POST http://0.0.0.0:8080/problems
Content-Type: application/json

{
    "title": "A + B Problem",
    "description": "輸入兩數，將兩數加總。",
    "testCases": [
        {
            "input": "4 5",
            "expectedOutput": "9",
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
```

得到新增的題目編號為 1：

```json
{
    "problem_id": 1
}
```

接著看看題目列表：

```
GET http://0.0.0.0:8080/problems
```

會看到剛剛新增的題目：

```json
{
    "data": [
        {
            "id": "1",
            "title": "A + B Problem"
        }
    ]
}
```

接著看看詳細的題目資料：

```
GET http://0.0.0.0:8080/problems/1
```

得到題目的詳細資料，也可以看到測資的 `id`：

```json
{
    "data": {
        "id": "1",
        "title": "A + B Problem",
        "description": "輸入兩數，將兩數加總。",
        "testCases": [
            {
                "id": "1",
                "input": "4 5",
                "expectedOutput": "9",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "id": "2",
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

利用得到的詳細資料去修改看看這筆題目資料，這裡更改了題目敘述、增加一筆測資、修改一筆測資並且刪除了一筆測資：

```json
PUT http://0.0.0.0:8080/problems/1
Content-Type: application/json

{
    "id": "1",
    "title": "A + B Problem",
    "description": "輸入兩個數字，將兩個數字加總。",
    "testCases": [
        {
            "id": "1",
            "input": "4 0",
            "expectedOutput": "4",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        },
        {
            "input": "1 5",
            "expectedOutput": "6",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        }
    ]
}
```

可以得到修正成功的結果：

```json
{
    "OK": true
}
```

可以再利用 `GET http://0.0.0.0:8080/problems/1` 檢查一下是否有修改題目資料：

```json
{
    "data": {
        "id": "1",
        "title": "A + B Problem",
        "description": "輸入兩個數字，將兩個數字加總。",
        "testCases": [
            {
                "id": "1",
                "input": "4 0",
                "expectedOutput": "4",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "id": "3",
                "input": "1 5",
                "expectedOutput": "6",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            }
        ]
    }
}
```

最後就將該題目資料刪除吧！

```
DELETE http://0.0.0.0:8080/problems/1
```

得到操作成功的結果：

```json
{
    "OK": true
}
```

再利用 `GET http://0.0.0.0:8080/problems` 取得題目列表看看是否成功刪除了吧！

```json
{
    "data": []
}
```

## 總結
在今天我們終於將資料管理系統與資料庫連接了，而且也讓我們的 RESTful API 能夠正常運作了。但不知道各位有沒有發現一件奇怪的事情，我們好像都不用認證 HTTP request 的身份，就讓題目可以被新增、可以被修改、可以被刪除，理論上應該只有具有管理員權限的人才能進行這些操作才對呀！所以明天我們就要來看看，該怎麼認證一個 HTTP request 的身份，並阻擋沒有正確身份的人去做修改資料庫的事情。

## 參考資料
* [JetBrains/Exposed: Kotlin SQL Framework](https://github.com/JetBrains/Exposed)
* [brettwooldridge/HikariCP: 光 HikariCP・A solid, high-performance, JDBC connection pool at last.](https://github.com/brettwooldridge/HikariCP)
* [Create a REST Application with kTor and Exposed | Novatec](https://www.novatec-gmbh.de/en/blog/creating-a-rest-application-with-ktor-and-exposed/)
