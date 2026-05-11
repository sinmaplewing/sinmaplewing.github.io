---
id: 17234
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 11：資料管理伺服器 (9) - 遞送程式碼系統'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-11
date: '2020-09-11T07:33:47+08:00'
lastmod: '2020-09-12T23:55:27+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
featured_image: /uploads/2020/09/11.png
permalink: /2020/09/11/17234/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-11/
wp_status: publish
wp_type: post
---

![Day 11：資料管理伺服器 (9) - 遞送程式碼系統](/uploads/2020/09/11.png)

昨日我們已經建立了一個完整具有會員系統，且可以操作資料庫內關於題目資料的 API。接下來，我們要來設計讓使用者能夠針對題目去傳送程式碼的 API。

## 傳送程式碼的 API 實作

首先，先定義傳送程式碼 `Submission` 的資料表結構，如下程式碼所示：

```kotlin
// Submission.kt
object SubmissionTable: Table() {
    val id = integer("SubmissionId").autoIncrement().primaryKey()
    val language = varchar("Language", 255)
    val code = text("Code")
    val executedTime = double("ExecutedTime")
    val result = varchar("Result", 255)

    val problemId = integer("ProblemId") references ProblemTable.id
    val userId = integer("UserId") references UserTable.id
}

// Application.kt
SchemaUtils.create(ProblemTable, TestCaseTable, UserTable, SubmissionTable)
```

先解釋一下上面 `SubmissionTable` 中的欄位。`id` 代表的是傳送的程式碼的編號，`language` 代表的是此程式碼用哪一個程式語言所撰寫的，`code` 即是程式碼本體，`executedTime` 代表的是程式執行的時間，`result` 則是程式執行的結果，最後兩個欄位 `problemId` 和 `userId` 是 Foreign Key，分別代表這個程式碼是用來解哪個題目，以及這個程式碼是哪個會員遞交的。最後，建立好 `SubmissionTable` 後，記得要將 `SubmissionTable` 使用建立資料表的 API `SchemaUtils.create()` 讓它與資料庫連接。

接著就來設計客戶端要傳來的 DTO 吧！預期上使用者只需要傳入 `language`、`code` 和 `problemId` 即可，`id` 的部分資料庫會自動產生，`executedTime` 和 `result` 會在系統審核完後產生填入， `userId` 則會使用 Session 存放的使用者 ID 填入。底下就是 DTO 的詳細程式碼：

```kotlin
data class SubmissionPostDTO(
    val language: String,
    val code: String,
    val problemId: Int
)
```

最後就是讓路由新增 `POST /submissions` 讓客戶端能提交程式碼上來，底下是詳細的程式碼：

```kotlin
route("/submissions") {
    authenticate("Session Auth") {
        post {
            val submissionData = call.receive<SubmissionPostDTO>()
            val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
            val userId = userIdAuthorityPrincipal?.userId
            var submissionId: Int? = null

            if (userId == null) throw BadRequestException("Authentication Error.")

            transaction {
                submissionId = SubmissionTable.insert {
                    it[SubmissionTable.language] = submissionData.language
                    it[SubmissionTable.code] = submissionData.code
                    it[SubmissionTable.executedTime] = -1.0
                    it[SubmissionTable.result] = "-"
                    it[SubmissionTable.problemId] = submissionData.problemId
                    it[SubmissionTable.userId] = userId.toInt()
                } get SubmissionTable.id
            }
            call.respond(mapOf("submission_id" to submissionId))
        }
    }
}
```

上面程式碼中，對於 DTO 沒有的 `executedTime` 和 `result` 欄位可放置預設的值，讓我們能夠辨識這筆程式碼尚未執行過，之後會將這些程式碼抓去執行，並將得到的結果更新上去。

接下來我們可以嘗試使用 Postman 測試看看這個 API，首先先登入昨天創的帳號，發送底下的 request：

```http
POST http://0.0.0.0:8080/users/login
Content-Type: application/json

{
    "username": "maplewing_test",
    "password": "1234"
}
```

登入後，先看看資料庫內有什麼題目，利用 `GET /problems` 來查看。

```http
GET http://0.0.0.0:8080/problems
```

依我這邊目前的資料庫，有一筆編號為 9 的題目。

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

接著就試著對這題題目發送程式碼吧！

```
POST http://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n    val inputs = readLine()!!.split(' ')\n    val a = inputs[0].toInt()\n    val b = inputs[1].toInt()\n    val c = inputs[2].toInt()\n    println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

發送完後會得到該筆 Submission 的 ID，如下所示。

```json
{
    "submission_id": 1
}
```

能夠傳送程式碼後，如果我們希望能夠得到該筆 Submission 的詳細資訊該怎麼辦呢？我們可以使用 `GET /submissions/{id}` 這個路由來設計 API。但是如果我們需要限制只有上傳該筆 Submission 的會員才可以看到該筆 Submission 的詳細資料，其他人都不能看到該筆資料，那該如何做呢？又如果我們也希望能夠將登入的會員區分出不同的權限，讓修改題目資料的操作需要權限比較高的人才能做，而一般會員只能遞交解題的程式碼，又該怎麼做呢？

## 權限設定

首先先來設定 `GET /submissions/{id}` 吧！基本原理就是先進行會員驗證，接著從資料庫中抓出要求的 Submission 資料，比對登入的人的 ID 是否等於該筆資料的會員 ID。如果等於的話就回傳資料；如果不相等的話就給予錯誤。

```kotlin
// Submission.kt
data class Submission(
    val id: Int,
    val language: String,
    val code: String,
    val executedTime: Double,
    val result: String,
    val problemId: Int,
    val userId: Int
)

// Application.kt
route("/{id}") {
    get {
        val requestId = call.parameters["id"]?.toInt() ?:
            throw BadRequestException("The type of Id is wrong.")
        var responseData: Submission? = null
        val userIdAuthorityPrincipal = call.sessions.get<UserIdAuthorityPrincipal>()
        val userId = userIdAuthorityPrincipal?.userId

        if (userId == null) throw BadRequestException("Authentication Error.")

        transaction {
            val requestSubmission = SubmissionTable.select {
                SubmissionTable.id.eq(requestId)
            }.first()
            
            if (requestSubmission[SubmissionTable.userId] != userId.toInt()) {
                throw BadRequestException("Authentication Error.")
            }

            responseData = Submission(
                id = requestSubmission[SubmissionTable.id],
                language = requestSubmission[SubmissionTable.language],
                code = requestSubmission[SubmissionTable.code],
                executedTime = requestSubmission[SubmissionTable.executedTime],
                result = requestSubmission[SubmissionTable.result],
                problemId = requestSubmission[SubmissionTable.problemId],
                userId = requestSubmission[SubmissionTable.userId]
            )
        }

        call.respond(mapOf("data" to responseData))
    }
}
```

另外在這裡我們幾乎都是使用 `400 Bad Request` 作為回傳，其實你也可以使用 `401 Unauthorized` 去做未符合權限操作的狀態碼，新增一個 `UnauthorizedException`，並針對該 Exception 去做回傳 `401 Unauthorized` 處理，接著把 `throw BadRequestException("Authentication Error.")` 改成 `throw UnauthorizedException` 即可。

```kotlin
// UnauthorizedException.kt
class UnauthorizedException(message: String? = "Authentication Error.") : Exception(message)

// Application.kt
exception<UnauthorizedException> {
    call.respond(HttpStatusCode.Unauthorized)
}
```

最後，我們來增加一個會根據 `authority` 欄位去進行區分成員驗證高低的驗證方式，並將題目修正的部分都改成使用這個驗證方式，即可做出需要高權限的帳號才能進行題目修正操作的功能。

```kotlin
const val NORMAL_USER_AUTHENTICAION_NAME = "Normal User"
const val SUPER_USER_AUTHENTICATION_NAME = "Super User"

/* ...... 很多程式碼 ...... */

install(Authentication) {
    session<UserIdAuthorityPrincipal>(NORMAL_USER_AUTHENTICAION_NAME) {
        challenge {
            throw UnauthorizedException()
        }
        validate { session: UserIdAuthorityPrincipal ->
            session
        }
    }

    session<UserIdAuthorityPrincipal>(SUPER_USER_AUTHENTICATION_NAME) {
        challenge {
            throw UnauthorizedException()
        }
        validate { session: UserIdAuthorityPrincipal ->
            if (session.authority.toInt() > 1) session else null
        }
    }
}

/* ...... 很多程式碼 ...... */

route("/problems") {
    get { /* ...... 內容 ...... */ }
  
    authenticate(SUPER_USER_AUTHENTICATION_NAME) {
        post { /* ...... 內容 ...... */ }
    }

    route("/{id}") {
        get { /* ...... 內容 ...... */ }

        authenticate(SUPER_USER_AUTHENTICATION_NAME) {
            put { /* ...... 內容 ...... */ }

            delete { /* ...... 內容 ...... */ }
        }
    }
}

route("/problems") {
    authenticate(NORMAL_USER_AUTHENTICAION_NAME) {
        post { /* ...... 內容 ...... */ }

        route("/{id}") {
            get { /* ...... 內容 ...... */ }
        }
    }
}
```

實作完後，你可以重啟伺服器，利用 Postman 來測試上面兩個功能。首先，先登入會員：

```http
POST http://0.0.0.0:8080/users/login
Content-Type: application/json

{
    "username": "maplewing_test",
    "password": "1234"
}
```

接著重新對編號 9 的題目遞交程式碼，發送底下的請求：

```http
POST http://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n    val inputs = readLine()!!.split(' ')\n    val a = inputs[0].toInt()\n    val b = inputs[1].toInt()\n    val c = inputs[2].toInt()\n    println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

可以得到編號為 1 的 Submission：

```json
{
    "submission_id": 1
}
```

試著查看這筆 Submission 的詳細資訊：

```http
GET http://0.0.0.0:8080/submissions/1
```

可以得到詳細資訊：

```json
{
    "data": {
        "id": 1,
        "language": "kotlin",
        "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt(); val b = inputs[1].toInt(); val c = inputs[2].toInt(); println(\"${a + b + c}\")\n}",
        "executedTime": -1.0,
        "result": "-",
        "problemId": 9,
        "userId": 9
    }
}
```

最後用同樣的帳號去創立新題目：

```http
POST http://0.0.0.0:8080/problems
Content-Type: application/json

{
    "title": "A + B + C Problem",
    "description": "輸入三個數字，將三個數字加總。",
    "testCases": [
        {
            "input": "4 0 5",
            "expectedOutput": "9",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        },
        {
            "input": "1 5 3",
            "expectedOutput": "9",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        }
    ]
}
```

由於帳號權限不夠大，應該會被以 `401 Unauthorized` 或是 `400 Bad Request` （看你有沒有改過丟出來的 Exception）擋下來。

接著可以註冊一個新帳號：

```http
POST http://0.0.0.0:8080/users
Content-Type: application/json

{
    "username": "maplewing_admin_test",
    "password": "1234",
    "name": "Maplewing Admin",
    "email": "test@test.test"
}
```

得到其會員編號：

```json
{
    "user_id": 10
}
```

從資料庫管理介面輸入 SQL 更改其會員權限，使用 SQL 語法中的 `UPDATE [表格] SET [欄位 1] = [值 1], ...... WHERE [條件]` 子句，對表格中的符合條件的資料的欄位值進行修改，這裡我們將 `UserId` 為 10 的值，也就是上面這筆 `maplewing_admin_test`，調整其權限為 2。

```sql
UPDATE public.user SET "Authority" = 2 WHERE "UserId" = 10;
```

調整完後，先登出原本的帳號：

```http
POST http://0.0.0.0:8080/logout
```

接著登入新建的帳號：

```http
POST http://0.0.0.0:8080/users/login
Content-Type: application/json

{
    "username": "maplewing_admin_test",
    "password": "1234"
}
```

登入完後，查看剛剛遞送的程式碼詳細資料是否看得到：

```http
GET http://0.0.0.0:8080/submissions/1
```

由於程式碼並非這個帳號所遞送的，所以應該會被以 `401 Unauthorized` 或是 `400 Bad Request` 擋下來。

最後再新增看看題目：

```http
POST http://0.0.0.0:8080/problems
Content-Type: application/json

{
    "title": "A + B + C Problem",
    "description": "輸入三個數字，將三個數字加總。",
    "testCases": [
        {
            "input": "4 0 5",
            "expectedOutput": "9",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        },
        {
            "input": "1 5 3",
            "expectedOutput": "9",
            "comment": "",
            "score": 50,
            "timeOutSeconds": 10.0
        }
    ]
}
```

這次因為該帳號權限比較大，就會得到新增的題目編號了。

```json
{
    "problem_id": 10
}
```

## 總結

今天基本上已經完成了可以遞交程式碼的功能了，終於完成了資料管理系統的部分了。那接下來我們就要來談談該怎麼讓這些遞交的程式碼被執行，並且可以被審核出結果然後更新到資料庫中，就請各位敬請期待下個部分囉！

## 參考資料

* [401 Unauthorized - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
* [Sessions - Servers - Ktor](https://ktor.io/servers/features/sessions.html)
