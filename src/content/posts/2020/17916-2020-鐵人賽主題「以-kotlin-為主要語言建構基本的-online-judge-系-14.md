---
id: 17916
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 14：程式執行與審核系統 (2) - 將資料庫作為批改程式碼的資料來源'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-14
date: '2020-09-14T09:34:13+08:00'
lastmod: '2020-09-15T08:46:54+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Exposed
featured_image: /uploads/2020/09/14.png
permalink: /2020/09/14/17916/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-14/
wp_status: publish
wp_type: post
---

![Day 14：程式執行與審核系統 (2) - 將資料庫作為批改程式碼的資料來源](/uploads/2020/09/14.png)

在我們建立了一個基本的審核程式之後，接著就要來讓審核程式從資料管理系統所更新的資料庫進行抓取資料的動作，並將審核結果更新回資料庫內，就讓我們開始吧！

## 使用 Exposed 與 PostgreSQL 資料庫連接

與資料庫的連接其實也沒什麼特別的技巧，與第九天的方法相同，我們要利用 Exposed 來進行 PostgreSQL 的連接。Exposed 並不一定需要跟著 Ktor 一起使用，它本身也可以使用在一般的程式專案內。為了要能夠使用 Exposed，我們一樣在 `build.gradle.kts` 檔案的 `dependencies` 區塊加上三個會用到的套件：Exposed、HikariCP 和 PostgreSQL JDBC Driver。

```kotlin
implementation("com.zaxxer:HikariCP:3.4.5")
implementation("org.jetbrains.exposed:exposed:0.17.7")
implementation("org.postgresql:postgresql:42.2.16")
```

填入後讓 Gradle 重新跑一下，讓它安裝完套件後，在 `src/main/resources` 資料夾內增加資料庫連接設定檔 `hikari.properties`，應該會與資料管理系統專案所使用的檔案內容相同，內容應該如下：

```
dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
dataSource.user=postgres
dataSource.password=<你的密碼>
dataSource.databaseName=onlinejudge
dataSource.portNumber=5432
dataSource.serverName=localhost
```

設定好後，我們可以先定義資料庫內的資料表的結構。基本上與資料管理系統專案的定義會相同，不過這次我們可以根據這個專案會用到的部分，去省略掉一些不會用到的欄位，底下分別是 `SubmissionTable`、`ProblemTable` 和 `TestCaseTable` 的內容。

```kotlin
// SubmissionTable.kt
import org.jetbrains.exposed.sql.Table

object SubmissionTable: Table() {
    val id = integer("SubmissionId").autoIncrement().primaryKey()
    val language = varchar("Language", 255)
    val code = text("Code")
    val executedTime = double("ExecutedTime")
    val result = varchar("Result", 255)

    val problemId = integer("ProblemId") references ProblemTable.id
}

// ProblemTable.kt
import org.jetbrains.exposed.sql.*

object ProblemTable : Table() {
    val id = integer("ProblemId").autoIncrement().primaryKey()
}


// TestCaseTable.kt
import org.jetbrains.exposed.sql.Table

object TestCaseTable : Table() {
    val id = integer("TestCaseId").autoIncrement().primaryKey()
    val input = text("TestInput")
    val expectedOutput = text("ExpectedOutput")
    val score = integer("Score")
    val timeOutSeconds = double("TimeOutSeconds")

    val problemId = integer("ProblemId") references ProblemTable.id
}
```

內容上與資料管理系統專案所使用的資料表結構去比較的話，會發現我們這次省略掉了很多用不到的欄位，例如像是 `UserTable` 我們整個都不需要就不定義了，`ProblemTable` 裡面的內容其實都不需要，僅留 `id` 讓 `SubmissionTable` 和 `TestCaseTable` 可以結合起來就好。

## 建立連接資料庫的資料來源類別

接著就讓我們多加一種透過連接資料庫獲取資料的 `ISubmissionSource` 實作–`DatabaseSubmissionSource` 類別吧！首先先讓我們在建構該類別的物件時會與資料庫連接，如底下程式碼所示：

```kotlin
object DatabaseSubmissionSource: ISubmissionSource {
    init {
        val config = HikariConfig("/hikari.properties")
        config.schema = "public"
        val dataSource = HikariDataSource(config)
        Database.connect(dataSource)

        transaction {
            SchemaUtils.create(ProblemTable, TestCaseTable, SubmissionTable)
        }
    }
}
```

在類別裡面的 `init` 區塊是該類別的建構式，當類別物件被建構的時候，Kotlin 就會先呼叫這個區塊用來初始化剛生出的物件。而我們在這裡所填的內容其實也不陌生，就是之前第九天連結資料庫用的程式碼，這讓我們只要建構該物件後就會連接上設定好的資料庫。不過，由於連接其實只要連接一次，而且 Exposed 預設連接資料庫是一個全專案都可以使用的狀態，所以就直接使用 `object` 定義類別並直接產生同名的物件即可。

接下來為了要實作 `ISubmissionSource` 介面，我們必須要實作 `ISubmissionSource.getNextSubmissionData()` 和 `ISubmissionSource.setResult()`。首先先讓我們來實作 `ISubmissionSource.getNextSubmissionData()`，程式碼如下所示：

```kotlin
object DatabaseSubmissionSource: ISubmissionSource {
    /* ...... init 區塊 ...... */

    override fun getNextSubmissionData(): SubmissionData? {
        var submissionData: SubmissionData? = null
        transaction {
            val submission = SubmissionTable.select {
                SubmissionTable.result.eq("-")
            }.firstOrNull()

            if (submission != null) {
                val testCases = TestCaseTable.select {
                    TestCaseTable.problemId.eq(submission[SubmissionTable.problemId])
                }.map {
                    TestCaseData(
                        it[TestCaseTable.input],
                        it[TestCaseTable.expectedOutput],
                        it[TestCaseTable.score],
                        it[TestCaseTable.timeOutSeconds]
                    )
                }

                submissionData = SubmissionData(
                    submission[SubmissionTable.id],
                    submission[SubmissionTable.language],
                    submission[SubmissionTable.code],
                    testCases
                )
            }
        }

        return submissionData
    }
}
```

這段實作的是拿下一筆資料的邏輯，先看資料庫內是否有 `Submission` 的資料其結果為我們之前在資料管理系統專案中預設的 `-` 值，如果有的話就抓出來，然後將該程式碼所要解的題目測資也跟著一併抓出來，結合成一個我們昨天定義的 `SubmissionData` 結構的資料即可。如果資料庫內沒有任何未審核的 `Submission`，則跟昨天的 `FileSubmissionSource` 一樣回傳 `null` 即可。

接下來來實作設定審核結果的函式 `ISubmissionSource.setResult()`，程式碼如下：

```kotlin
object DatabaseSubmissionSource: ISubmissionSource {
    /* init 區塊與 getNextSubmissionData() 區塊 */

    override fun setResult(id: Int, result: Judger.Result) {
        transaction {
            SubmissionTable.update({
                SubmissionTable.id.eq(id)
            }) {
                it[SubmissionTable.result] = result.toString()
            }
        }

        println("Submission $id: $result")
    }
}
```

整體內容就是將結果變成字串傳回去更新資料庫而已，最後一樣將結果印出來，讓我們可以直接在 IntelliJ IDEA 底下的終端機看到結果的內容。

實作結束後，我們就將主函式內使用的 `ISubmissionSource` 換成 `DatabaseSubmissionSource` 即可。

```kotlin
fun main() {
    val submissionSource: ISubmissionSource = DatabaseSubmissionSource // 替換掉 FileSubmissionSource()

    /* ...... 剩餘的內容 ...... */
}
```

理論上這樣程式就真的可以從資料庫內抓程式碼來編譯與執行了。但是你會發現這段實作在資料庫沒有任何 `Submission` 資料後就會自己停掉了，我們希望如果這個系統一開起來，就會一直不停地去審核程式碼，如果資料庫沒資料的話那就等一下再問一次。所以整體實作會加上一個無窮迴圈，然後在沒有資料的時候利用 `Thread.sleep(1000)` 讓執行這個程式的執行緒（thread）稍微休眠個 5000 毫秒（= 5 秒鐘）再醒來問一次，最後主函式的程式碼就會如下：

```kotlin
fun main() {
    val submissionSource: ISubmissionSource = DatabaseSubmissionSource // FileSubmissionSource()

    while (true) {
        var submission = submissionSource.getNextSubmissionData()
        while (submission != null) {
            val judger = Judger(KotlinCompiler(), JVMExecutor())

            val result = judger.judge(submission)
            submissionSource.setResult(submission.id, result)
            submission = submissionSource.getNextSubmissionData()
        }

        Thread.sleep(5000)
    }
}
```

如果不做休眠動作的話，這個程式就會不斷地佔用 CPU 資源、不斷地對資料庫進行查詢，對系統會是一個負擔，所以盡量就是等待一個合理的時間再進行要資料的動作會比較好。

## 測試實作

最後就讓我們來測試看看這個審核系統是否真的可以連接上資料庫吧！為了測試這件事情，請用另外一個 IntelliJ IDEA 視窗打開資料管理系統專案，我們這次測試會要同時將兩個專案執行起來。打開專案後，先將資料管理系統執行起來，我們先來確認一下第十一天所建立的題目是否還存在，利用 `GET /problems` 來要題目列表，傳遞要求後，我這邊的資料庫會得到下面的結果：

```json
{
    "data": [
        {
            "id": "9",
            "title": "A + B + C Problem"
        }
    ]
}
```

如果你的題目資料有點太亂，不確定是否有哪題可以解的話，可以自行再將第十一天的例子 `A + B + C Problem` 重新加進去，只要最後可以讓你那邊呼叫 `GET /problems/{id}` 得到與我這裡呼叫 `GET /problems/9` 的回應內容上，除了 `id` 不同以外，其他都是一樣的即可。

```json
{
    "data": {
        "id": "9",
        "title": "A + B + C Problem",
        "description": "輸入三個數字，將三個數字加總。",
        "testCases": [
            {
                "id": "22",
                "input": "4 0 5",
                "expectedOutput": "9",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            },
            {
                "id": "23",
                "input": "1 5 3",
                "expectedOutput": "9",
                "comment": "",
                "score": 50,
                "timeOutSeconds": 10.0
            }
        ]
    }
}
```

接著將審核系統程式執行起來，可能會有一筆結果冒出來，因為第十一天我們其實有丟一個 Submission 進去，所以可能會有第一筆的結果出現。但印完後就沒有任何訊息印出來了，接著我們利用 Postman 先登入帳號：

```
POST http://0.0.0.0:8080/users/login
Content-Type: application/json

{
    "username": "maplewing_test",
    "password": "1234"
}
```

登入後，利用 `POST /submissions` 遞交一筆程式碼去解上面所找到的題目。

```
POST http://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

接著可能會需要等它編譯並執行一段時間，等到執行完後，就會看到審核系統印出一段文字：

```
Submission 2: Accepted
```

看到這段文字就代表我們真的將審核系統和資料庫連接上了！接著用 Postman 確認一下編號 2 的 `Submission` 資料是否有被更新結果上去，利用 `GET /permissions/2` 去查詢，結果如下程式碼所示，`result` 真的被填 `Accepted` 這個值上去了！

```json
{
    "data": {
        "id": 2,
        "language": "kotlin",
        "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
        "executedTime": -1.0,
        "result": "Accepted",
        "problemId": 9,
        "userId": 1
    }
}
```

## 總結
今天我們將審核系統的資料來源接上了資料庫，雖然已經可以審核資料庫內的程式碼，但還有很多狀況我們沒有處理，例如：如果審核的程式進入了無窮迴圈怎麼辦？如果你現在試著送上去一個會有無窮迴圈的程式碼，審核系統應該就會直接卡在那裡了。那這種情況該怎麼處理呢？就請各位期待明天的內容吧！

## 參考資料
* [JetBrains/Exposed: Kotlin SQL Framework](https://github.com/JetBrains/Exposed)
