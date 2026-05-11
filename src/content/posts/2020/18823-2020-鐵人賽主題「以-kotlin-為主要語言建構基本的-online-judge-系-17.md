---
id: 18823
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 17：程式執行與審核系統 (5) - 利用
  Redis 讓批改程式碼工作能被平行處理'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-17
date: '2020-09-17T10:58:15+08:00'
lastmod: '2020-09-18T10:10:50+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- Jackson
- Redis
- Jedis
featured_image: /uploads/2020/09/17fb.png
permalink: /2020/09/17/18823/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-17/
wp_status: publish
wp_type: post
---

![Day 17：程式執行與審核系統 (5) - 利用 Redis 讓批改程式碼工作能被平行處理](/uploads/2020/09/17fb.png)

以截至昨天為止審核程式所完成的部份，我們大概已經算完成了整個審核系統應該要做的事情，那接下來還要做些什麼呢？首先，我們先讓每次執行時所使用的 Docker 容器名稱都會不一樣，如下所示：

```kotlin
// RandomStringGenerator.kt
import kotlin.random.Random

object RandomStringGenerator {
    private val charPool = ('a'..'z') + ('A'..'Z') + ('0'..'9')

    fun Generate(length: Int): String =
        (0 until length)
            .map { Random.nextInt(0, charPool.size) }
            .map { charPool.get(it) }
            .joinToString("")
}

// JVMExecutor.kt
val dockerContainerName = DOCKER_CONTAINER_NAME + RandomStringGenerator.Generate(32)

/* ...... 中間的程式碼 ...... */

val executeProcess = ProcessBuilder(
    "docker",
    "run",
    "--rm",
    "--name",
    dockerContainerName,
    "-v",
    "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
    "zenika/kotlin",
    "sh",
    "-c",
    "java -jar /$executableFilename < /$inputFilePath > /$outputFilePath")
            
/* ...... 中間的程式碼 ...... */

if (!isFinished) {
    ProcessBuilder("docker", "kill", dockerContainerName).start().waitFor()
}
```

這裡實作了一個物件 `RandomStringGenerator` 用來生出一個隨機的字串，其利用 Kotlin 中的 Range 功能將數字和大小寫英文字母形成一個新的集合 `charPool`，接著在生出字串的函式中利用 `0 until length` 生出一個 `0` 到 `length - 1` 的範圍。對於此長度整數範圍裡面的每個值都使用隨機函式 `Random.nextInt` 生出一個包含在 `charPool` 長度內的其中一個整數，再利用這個整數當作索引值去 `charPool` 內拿出相對應的字母，最後將這些字母連接起來即可。

可以生出一個隨機的字串後，就在 `JVMExecutor.kt` 內使用 `DOCKER_CONTAINER_NAME` 的地方，改成後面連接 32 字長度的隨機字母字串 `DOCKER_CONTAINER_NAME + RandomStringGenerator.Generate(32)` 即可。

讓每次執行的 Docker 容器名稱不同後，將審核程式的專案多複製一份，並將兩份專案都利用 IntelliJ IDEA 打開執行，接著將資料管理系統專案也打開並執行起來，利用 Postman 傳遞一筆程式碼，你會發現兩個審核系統都批改了同一筆程式碼，究竟這是為什麼呢？

```
// A 審核程式
Submission 68: Accepted - Score: 100 (1.643)
// B 審核程式
Submission 68: Accepted - Score: 100 (1.53)
```

## Task Queue 架構說明

這個原因是因為兩個審核程式都去查詢了同一個資料庫內還沒審核的程式碼有哪些，由於兩個程式所使用的查詢用程式碼相同，故資料庫會回傳同一筆資料給兩個不同的程式，就導致了兩個審核程式都批改了同一筆資料。那該如何避免這種狀況呢？比較簡單的想法就是誰拿了哪筆程式碼去批改就先更新其狀態，這樣另外一個審核程式就會知道這筆程式碼已經有人拿去批改了。不過這個想法其實馬上就能想到有瑕疵的地方，如果審核程式才剛拿到程式碼資料，還來不及更新狀態，另外一個審核程式就去問哪筆程式碼還沒批改該怎麼辦。那如果又要解決這個問題，你可能又會想說那第一個審核程式要拿資料的時候，先將資料表鎖起來，等拿到資料並更新完狀態後再解鎖不就好了？那這樣其實又會碰到更多的問題：鎖上後如果有別的使用者想要遞交程式碼怎麼辦？如果審核程式還沒解鎖資料表就先壞掉了怎麼辦？等等諸如此類平行處理常見的各種問題，就會如雨後春筍般一個一個冒出來，那究竟該怎麼解決這個問題才好呢？

![Task Queue 架構解說圖](/uploads/2020/09/Task-Queue.png)

基本上我們可以使用 Task Queue 架構來解決這個問題。生產工作的系統（在這裡就是我們的資料管理系統）將要處理的工作丟給 Task Queue 做管理，而多個執行工作的程式（在這裡就是我們的審核程式）就跟這個 Task Queue 要工作， Task Queue 就會讓這些工作依照各個執行工作的程式來要資料的順序給予相對應的工作，這樣就可以避免多個執行工作的程式會彼此打架。因此如果要解決上述所說的問題，我們可以讓資料管理系統在收到使用者遞交的程式碼後，除了將遞交的程式碼更新進資料庫內，也將遞交的程式碼與測資一併丟給 Task Queue，讓審核程式可以直接從 Task Queue 拿程式碼去批改，批改完再根據其編號去更新結果到資料庫內相對應的資料即可。整體架構圖就會改成如下圖所示：

![整體系統架構圖](/uploads/2020/09/IMG_1509.png)

## Redis 資料庫介紹與安裝

![Redis 的 Logo（來自 https://en.wikipedia.org/wiki/Redis）](/uploads/2020/09/400px-Redis_Logo.svg_.png)

那關於 Task Queue 的部分我們該使用什麼東西來做呢？這時候就要來介紹 Redis 資料庫了。Redis 資料庫是一個將資料存取於記憶體中的資料庫，他可以讓你很簡單的以 `Key` 和 `Value` 的成對形式將資料儲存進去，並且也支援 Task Queue 的操作。為了要讓我們能夠開始使用 Redis 資料庫，我們就先來安裝它吧！首先，先來到官網的......等等，昨天我們不是學會了可以使用 Docker 來拉映像檔嗎？這時候就是要來展現 Docker 威力的時候了，剛好 Docker 的預設倉庫裡就有包裝好的 Redis 資料庫映像檔可以使用，我們就直接將 Redis 資料庫的映像檔拉下來吧！在終端機輸入下面的指令：

```sh
docker pull redis
``` 

這樣我們就拉下了 Redis 資料庫的映像檔了，接著在終端機輸入下面指令生出 Redis 資料庫的容器來使用：

```sh
docker run --name judge-redis -p 6379:6379 -d redis
```

這裡我們將生成的容器命名為 `judge-redis`，並使用 `-d` 參數來讓 Docker 於背景執行，這樣在執行該 Docker 指令時，終端機就還可以繼續輸入其他指令去執行。另外，我們也使用了 `-p` 參數，去將 Docker 容器內的 port 與我們主機實際的 port 去做對應，這裡是將主機的 6379 號碼的 port 與 Docker 容器內的 6379 號碼的 port 連結在了一起，這樣我們才能在 Docker 容器外連進去 Docker 容器內的 Redis 資料庫所預設監聽的 6379 號的 port。那在執行了 `docker run` 指令後，我們的 Redis 資料庫就已經跑起來了，是不是很容易呀？可以利用 `docker ps` 查看一下目前容器的狀態，如下所示：

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
3e03d17af26f        redis               "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:6379->6379/tcp   judge-redis
```

可以看到在 `PORTS` 的地方，我們的 Redis 資料庫就是監聽於 Docker 容器內的 6379 這個 port，並且可以看到我們在啟動的時候，將 0.0.0.0:6379 與 Docker 容器內的 port 6379 連接起來，所以之後我們要與 Redis 連線的時候就是使用 6379 這個 port 去進行連線。

## 讓資料管理系統將程式碼丟給 Redis 資料庫

Redis 資料庫架好了之後，我們就先來讓資料管理系統將使用者遞交的程式碼送進 Redis 資料庫內吧！首先先在資料管理系統內安裝能夠連結 Redis 資料庫的套件–Jedis，安裝方式與以往相同，在 `build.gradle.kts` 的 `dependencies` 區塊增加下面這行以讓 Gradle 安裝 Jedis 套件：

```kotlin
implementation("redis.clients:jedis:3.3.0")
```

安裝完後，在資料管理系統的 `Application.kt` 內的 `Application.module()` 函式內增加初始化 Jedis 的程式碼，如下所示：

```kotlin
fun Application.module(testing: Boolean = false) {
    initDatabase()

    // 增加初始化 Jedis 的程式碼
    val jedis = Jedis()

    val client = HttpClient(Apache) {
    }
    
    /* ...... 後面的程式碼 ...... */
}
```

由於我們所架設的 Redis 資料庫位於本機端，且 port 也是預設的 6379，所以初始化的時候就不用特別告知資料庫的位置和 port 的號碼即可初始化。

接著為了要讓審核程式能夠吃我們丟進 Redis 資料庫的資料，這裡定義了與審核程式使用的 `SubmissionData` 結構相同的類別 `JudgerSubmissionData` 去存要丟進 Redis 資料庫內的資料，詳細程式碼如下所示：

```kotlin
// JudgerSubmissionData.kt
package com.maplewing

data class JudgerSubmissionData(
    val id: Int,
    val language: String,
    val code: String,
    val testCases: List<JudgerTestCaseData>
)

data class JudgerTestCaseData(
    val input: String,
    val expectedOutput: String,
    val score: Int,
    val timeOutSeconds: Double
)
```

最後，讓我們在送 Submissions 路由的地方增加「遞送資料給 Redis 資料庫」的程式碼。首先除了原本要丟給資料庫的 Submission 資料以外，我們還必須將該筆 Submission 資料對應的題目的所有測資給查詢出來，與 Submission 資料一起丟給 Redis 資料庫，所以在前頭我們增加一個可以記住 `JudgerTestCaseData` 集合的變數 `testCaseData`，如下所示：

```kotlin
route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post {
            val submissionData = call.receive<SubmissionPostDTO>()
            val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
            val userId = userIdAuthorityPrincipal?.userId
            var submissionId: Int? = null

            // 增加這行去紀錄查詢出來的測資資料
            var testCaseData: List<JudgerTestCaseData>? = null

            if (userId == null) throw UnauthorizedException()

            /* ...... 後面的程式碼 ...... */
        }

        /* ...... 後面的程式碼 ...... */
    }
}
```

生出變數後，就在資料庫 `transaction` 區塊去查詢相關的測資資料：

```kotlin
route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post {
            /* ...... 前面的程式碼 ...... */

            transaction {
                submissionId = SubmissionTable.insert {
                    it[SubmissionTable.language] = submissionData.language
                    it[SubmissionTable.code] = submissionData.code
                    it[SubmissionTable.executedTime] = -1.0
                    it[SubmissionTable.result] = "-"
                    it[SubmissionTable.problemId] = submissionData.problemId
                    it[SubmissionTable.userId] = userId.toInt()
                } get SubmissionTable.id

                // 增加查詢測資的程式碼
                testCaseData = TestCaseTable.select {
                    TestCaseTable.problemId.eq(submissionData.problemId)
                }.map {
                    JudgerTestCaseData(
                        it[TestCaseTable.input],
                        it[TestCaseTable.expectedOutput],
                        it[TestCaseTable.score],
                        it[TestCaseTable.timeOutSeconds]
                    )
                }.toList()
            }
            
            /* ...... 後面的程式碼 ...... */
        }
    }
}
```

最後就是將 Submission 資料和測資資料包裝成 `JudgerSubmissionData`，丟給 Redis 資料庫。

```kotlin
route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post {
            /* ...... 前面的程式碼 ...... */

            val judgerSubmissionId: Int? = submissionId
            val judgerTestCaseData: List<JudgerTestCaseData>? = testCaseData
            if (judgerSubmissionId != null && judgerTestCaseData != null) {
                val judgerSubmissionData = JudgerSubmissionData(
                    judgerSubmissionId,
                    submissionData.language,
                    submissionData.code,
                    judgerTestCaseData
                )

                jedis.rpush(
                    submissionData.language,
                    jacksonObjectMapper().writeValueAsString(judgerSubmissionData)
                )
            }

            call.respond(mapOf("submission_id" to submissionId))
        }
    }
}
```

前面利用 `judgerSubmissionId` 和 `judgerTestCaseData` 先將上面兩個被資料庫資料修改的變數 `submissionId` 和 `testCaseData` 的值記錄下來。由於 `submissionId` 和 `testCaseData` 這兩個變數是在 `transaction` 裡面的 Lambda Function 被修改，導致後面使用 `if` 語句去判斷是否為 `null` 時，編譯器不知道該 Lambda Function 實際會在什麼時候執行，故無法保證這兩個值是否真的不為 null，所以無法直接裝進非 Nullable 的型態變數內。這就是為什麼我們才需要把這兩個值用另外定義的兩個變數去給取出來。

在 `if` 裡面，我們利用得到的資料建立出 `JudgerSubmissionData` 物件，並將該物件丟給 Jedis 資料庫。丟進去 Jedis 資料庫的方法是 `Jedis.rpush([Queue 的名稱], [要丟進 Queue 內的內容])`，這個 `rpush` 有點像是從 Queue 的右邊（列表的尾巴）將資料推進去的意思，另外還有一個相對應的推進去方式是 `lpush`，這個有點像是從左邊（列表的頭）將資料推進去的意思。透過這兩個函式，應該就可以再推測出將資料拿出來的方式有 `lpop`（從左邊（頭）拿出來）和 `rpop` （從右邊（尾巴）拿出來）兩種方法。要用哪種方法進行操作可以自行決定，我們這裡使用的是比較直覺地從列表後面丟進去，並從列表前頭拉出來的方式。

`Jedis.rpush()` 的第一個參數為 `Queue 的名稱`，我們可以在 Redis 建立很多個 Task Queue，去用來區分不同種類的工作，在這裡我們以程式碼所使用的語言去分類，以讓支援某種程式語言的審核程式可以只拉它所支援的程式語言即可。第二個參數是要推進去的資料，我們希望推進去的 `JudgerSubmissionData` 資料要是 JSON 的格式字串，故我們使用了之前有安裝過的 Jackson 套件去將資料轉成 JSON 格式。利用 `jacksonObjectMapper()` 建立一個 Jackson 套件的轉換資料物件，再利用該物件的 `writeValueAsString([資料物件])` 的函式將資料物件轉成 JSON 格式即可。

## 讓審核程式將程式碼從 Redis 資料庫讀取出來

資料管理系統可以丟程式碼進 Redis 資料庫後，我們就要來讓審核程式能夠從 Redis 資料庫讀取丟進去的程式碼出來。首先，為了要能夠和 Redis 資料庫連接，以及為了要能將 JSON 資料轉回成程式裡面所使用的物件，我們要先安裝 Jedis 以及 Jackson 套件。將審核程式專案裡的 `build.gradle.kts` 中的 `dependencies` 區塊，加上下面兩行以讓 Gradle 安裝 Jedis 以及 Jackson 兩個套件：

```kotlin
implementation("redis.clients:jedis:3.3.0")
implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.+")
```

安裝完後，接著修改 `DatabaseSubmissionSource` 裡面獲得資料的方式，基本上就是改成從 Redis 資料庫拉出一筆資料即可，程式碼如下所示：

```kotlin
// 設定支援的程式語言
const val SUPPORTED_LANGUAGE = "kotlin"

object DatabaseSubmissionSource: ISubmissionSource {
    val jedis: Jedis

    init {
        /* ...... PostgreSQL 初始化連接的地方 ...... */

        // 初始化 Jedis 物件
        jedis = Jedis()
    }

    override fun getNextSubmissionData(): SubmissionData? {
        // 整個改成從 Jedis 拉資料出來
        val isDataAvailable = jedis.exists(SUPPORTED_LANGUAGE)
        if (!isDataAvailable) return null
    
        val data = jedis.lpop(SUPPORTED_LANGUAGE)
        return jacksonObjectMapper().readValue(data)
    }
    /* ...... 後面的程式碼 ...... */
}
```

首先，我們可以先決定審核系統支援哪些程式語言，在這裡就是設定成 `kotlin` 為這個審核系統支援的語言。然後在建構式的地方初始化與 Redis 資料庫的連接。連接完後，在 `getNextSubmissionData()` 的函式中，先檢查支援的程式語言所用的 Task Queue 是否存在資料，使用 `Jedis.exists([Queue 的名稱])` 這個函式就可以知道是否存在資料。檢查完後，如果沒有資料就回傳 `null`；如果有資料的話，就利用 `Jedis.lpop([Queue 的名稱])` 將資料拉出來，在這裡就是將 `kotlin` 名稱的 Task Queue 裡面的資料拉一筆出來。最後將拉出來的資料利用 Jackson 的 `jacksonObjectMapper().readValue([JSON 格式資料字串])` 轉成 `SubmissionData` 物件即可。

在 Radis 資料庫的取用資料部分，其實還有可以直接使用 `Jedis.blpop([Queue 的名稱])` 這個函式來操作。這個函式在 `lpop` 的字前面多了個 `b`，表示的是 Blocking 的意思。在該 Task Queue 中沒有資料時，該函式會直接將程式停在該處直到資料出來為止（此操作方式稱為 Blocking），不過為了符合我們原先的設計，我們在這裡還是使用不會被卡住的函式來實作，但你在使用的時候其實可以自行決定要怎麼從 Redis 資料庫中拉取資料。

## Redis 資料庫發生錯誤時的處理

由於我們現在多了一個 Redis 資料庫要丟程式碼進去，很有可能會發生 PostgreSQL 資料庫與 Redis 資料庫不同步的問題，尤其 Redis 資料庫是將資料存放在記憶體中，如果哪天它在執行途中當掉了，那所有丟進去的工作就會消失不見。首先我們先讓兩邊系統的 Jedis 連接物件變數 `jedis` 變成可以為 `null` 的型態，每次連線的時候確保 `jedis` 是否為 `null`，如果是就重新嘗試連線，接著與 Redis 連線的部分利用 `try-catch` 語句包起來，讓 Redis 如果突然斷線的話，只要印出錯誤即可，不會讓系統直接壞掉：

```kotlin
// 擴充 Jedis 函式 JedisExtension.kt
fun Jedis?.getConnection(): Jedis =
    if (this == null || !this.isConnected) Jedis() else this

// 資料管理系統 Application.kt
var jedis: Jedis? = Jedis()

/* ...... 中間的程式碼 ...... */

route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post {
            /* ...... 前面的程式碼 ...... */
                try {
                    jedis = jedis.getConnection()
                    val currentJedisConnection: Jedis = jedis!!
                    currentJedisConnection.rpush(
                        submissionData.language,
                        jacksonObjectMapper().writeValueAsString(judgerSubmissionData)
                    )
                    currentJedisConnection.disconnect()
                } catch (e: Exception) {
                    jedis?.disconnect()
                    jedis = null
                    println(e)
                }
            /* ...... 後面的程式碼 ...... */
        }
    }
}

// 審核程式的 DatabaseSubmissionSource.kt
var jedis: Jedis?

/* ...... 中間的程式碼 ...... */

override fun getNextSubmissionData(): SubmissionData? {
    try {
        jedis = jedis.getConnection()
        if (jedis == null) return null

        val currentJedisConnection = jedis!!
        val isDataAvailable = currentJedisConnection.exists(SUPPORTED_LANGUAGE)
        if (!isDataAvailable) return null

        val data = currentJedisConnection.lpop(SUPPORTED_LANGUAGE)
        return jacksonObjectMapper().readValue(data)
    }
    catch(e: Exception) {
        jedis?.disconnect()
        jedis == null
        println(e)
        return null
    }
}
``` 

這裡在兩邊的系統擴充了 `Jedis?.getConnection()` 讓兩邊系統可以進行 `null` 的檢查以及重啟連線的部分。接著連線的地方強制將連線物件的型態從 `Jedis?` 轉回非 Nullable 的型態 `Jedis` 並對其直接進行連線操作。如果中間發生錯誤就停止連線，並將 `jedis` 改為 `null`，印出錯誤，就結束本次的資料操作。

接著要在資料管理系統的 `POST /submissions/restart` 和 `POST /submissions/{id}/restart` 增加重新批改程式碼的工作給 Redis 資料庫，我們這裡設定成 `POST /submissions/restart` 只能是超級管理員才能執行，並且只有未審核的程式碼會重丟；而 `POST /submissions/{id}/restart` 只有該 Submission 為該 User 所遞交的時候才會重送，但是這個操作不會去判斷該程式碼是否有被審核程式批改過，不論批改過與否都可以再重送一次給審核系統批改。兩邊的程式碼如下：

```kotlin
// 將未審核的預設結果變為常數
const val SUBMISSION_NO_RESULT = "-"

/* ...... 中間的程式碼 ...... */

route("/submissions") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post { /* ...... 遞交程式碼的區塊 ...... */ }

        authenticate(SUPER_USER_AUTHENTICATION_NAME) {
            post("/restart") {
                var unjudgedSubmissionData: List<JudgerSubmissionData>? = null
                var isOK = true

                // 尋找未審核的程式碼資料
                transaction {
                    unjudgedSubmissionData =
                        SubmissionTable.select {
                            SubmissionTable.result.eq(SUBMISSION_NO_RESULT)
                        }.map {
                            val testCaseData = TestCaseTable.select {
                                TestCaseTable.problemId.eq(it[SubmissionTable.problemId])
                            }.map {
                                JudgerTestCaseData(
                                    it[TestCaseTable.input],
                                    it[TestCaseTable.expectedOutput],
                                    it[TestCaseTable.score],
                                    it[TestCaseTable.timeOutSeconds]
                                )
                            }

                            JudgerSubmissionData(
                                it[SubmissionTable.id],
                                it[SubmissionTable.language],
                                it[SubmissionTable.code],
                                testCaseData
                            )
                        }.toList()
                }

                // 將資料丟入 Redis 資料庫中
                val judgerSubmissionDataList = unjudgedSubmissionData
                if (judgerSubmissionDataList != null) {
                    for (judgerSubmissionData in judgerSubmissionDataList) {
                        try {
                            jedis = jedis.getConnection()
                            val currentJedisConnection: Jedis = jedis!!
                            currentJedisConnection.rpush(
                                judgerSubmissionData.language,
                                jacksonObjectMapper().writeValueAsString(judgerSubmissionData)
                            )
                        } catch (e: Exception){
                            jedis?.disconnect()
                            jedis = null
                            println(e)

                            // 紀錄是否出現錯誤
                            isOK = false
                        }
                    }
                }

                // 回傳是否有成功
                call.respond(mapOf("OK" to isOK))
            }
        }

        route("/{id}") {
            get { /* ...... 取得 Submission 資料的程式碼部分 ...... */ }

            post("/restart") {
                val requestId = call.parameters["id"]?.toInt() ?:
                    throw BadRequestException("The type of Id is wrong.")
                var unjudgedSubmissionData: JudgerSubmissionData? = null
                var isOK = true
                val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
                val userId = userIdAuthorityPrincipal?.userId

                if (userId == null) throw UnauthorizedException()

                transaction {
                    val submissionData =
                        SubmissionTable.select {
                            SubmissionTable.id.eq(requestId)
                        }.first()

                    // 非該用戶所遞交的程式碼，直接丟入 UnauthorizedException
                    if (submissionData[SubmissionTable.userId] != userId.toInt()) {
                        throw UnauthorizedException()
                    }

                    val testCaseData =
                        TestCaseTable.select {
                            TestCaseTable.problemId.eq(submissionData[SubmissionTable.problemId])
                        }.map {
                            JudgerTestCaseData(
                                it[TestCaseTable.input],
                                it[TestCaseTable.expectedOutput],
                                it[TestCaseTable.score],
                                it[TestCaseTable.timeOutSeconds]
                            )
                        }

                    unjudgedSubmissionData = JudgerSubmissionData(
                        submissionData[SubmissionTable.id],
                        submissionData[SubmissionTable.language],
                        submissionData[SubmissionTable.code],
                        testCaseData
                    )
                }
               
                // 將資料丟入 Redis 資料庫中
                val judgerSubmissionData = unjudgedSubmissionData
                if (judgerSubmissionData != null) {
                    try {
                        jedis = jedis.getConnection()
                        val currentJedisConnection: Jedis = jedis!!
                        currentJedisConnection.rpush(
                            judgerSubmissionData.language,
                            jacksonObjectMapper().writeValueAsString(judgerSubmissionData)
                        )
                    } catch (e: Exception) {
                        println(e)
                        jedis?.disconnect()
                        jedis = null

                        // 紀錄是否出現錯誤
                        isOK = false
                    }
                }

                // 回傳是否有成功
                call.respond(mapOf("OK" to isOK))
            }
        }
    }
}
```

由於邏輯都是使用前面所介紹過的技巧，程式碼的部分就不一一贅述，基本的流程就是從資料庫撈出對應的程式碼資料與測資資料，包裝成 `JudgerSubmissionData`後轉成 JSON 格式字串丟進 Redis 資料庫即可。另外與之前比較不同的地方是，我們利用了 `isOK` 這個變數去紀錄重新遞交程式碼工作是否成功，並會將該結果告知客戶端，這樣你就可以在 Postman 中看到是否重送程式碼的操作有成功。

## 實作測試

最後測試的部分可以嘗試連丟三筆程式碼進去看看，接著將審核程式的專案複製兩份，並且兩邊一起執行就可以得到幾乎平均分配的批改工作量：

```
// A 審核程式
Submission 81: Accepted - Score: 100 (1.6709999999999998)
Submission 83: Accepted - Score: 100 (1.541)
// B 審核程式
Submission 82: Accepted - Score: 100 (2.141)
```

你也可以將上面批改過的結果重新批改一次，我這裡利用 `POST /submissions/81` 重新丟一次上面批改過的 81 號程式碼：

```
Submission 81: Accepted - Score: 100 (1.5950000000000002)
```

接著可以將 Redis 伺服器利用 `docker stop [容器名稱]` 停住，會看到審核程式開始出現錯誤：

```
redis.clients.jedis.exceptions.JedisConnectionException: Failed connecting to localhost:6379
```

接著試著丟幾筆程式碼進去，應該也會在資料管理系統看到相同的錯誤。丟完後，重新利用 `docker restart [容器名稱]` 重新啟動該容器，等了很久應該審核程式都沒有反應。因為剛遞交的程式碼是在 Redis 資料庫斷線的時候遞交的，所以 Redis 資料庫並沒有收到，也就讓審核程式沒辦法拿到那些程式碼資料去進行批改。可以對資料管理系統送出 `POST /submissions/restart`，接著應該就會看到剛剛 Redis 資料庫停機時丟的程式碼開始被批改了。

## 總結
今天我們成功地利用 Redis 資料庫分配了多筆批改工作給多個審核程式。那在這次 30 天文章的審核程式部分的最後一天，我們就來讓審核程式可以支援更多種程式語言的批改吧！敬請期待明天的內容。

## 參考資料
* [Generate a Random Alphanumeric String in Kotlin | Baeldung](https://www.baeldung.com/kotlin-random-alphanumeric-string)
* [Redis](https://redis.io)
* [Redis Documentation](https://redis.io/documentation)
* [Intro to Jedis - the Java Redis Client Library | Baeldung](https://www.baeldung.com/jedis-java-redis-client-library)
* [Maven Repository: redis.clients » jedis](https://mvnrepository.com/artifact/redis.clients/jedis)
