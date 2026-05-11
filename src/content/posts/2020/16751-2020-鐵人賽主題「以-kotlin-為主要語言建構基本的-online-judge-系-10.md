---
id: 16751
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 10：資料管理伺服器 (8) - 驗證機制介紹與會員系統建置'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-10
date: '2020-09-10T09:06:18+08:00'
lastmod: '2020-09-12T23:55:14+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- Session
- Cookie
- Authentication
featured_image: /uploads/2020/09/10.png
permalink: /2020/09/10/16751/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-10/
wp_status: publish
wp_type: post
---

![Day 10：資料管理伺服器 (8) - 驗證機制介紹與會員系統建置](/uploads/2020/09/10.png)

建立了一套與資料庫連接，並且完整的 RESTful API 去與資料庫進行操作後，我們要開始建立一套會員系統，讓部分會更改到資料庫內容的危險操作，需要登入會員後才能進行。那這套會員系統該怎麼建置，並且伺服器端要怎麼驗證呢？首先先讓我們談談驗證機制吧！

## 驗證機制

基本上，目前流行的驗證機制架構分成兩類：一類為 `Session-Based Authentication`，一類為 `Token-Based Authentication`，底下稍微說明一下其內容為何。

### Session-Based Authentication

![Session-Based Authentication 流程圖](/uploads/2020/09/Session-Based.png)

Session-Based Authentication，顧名思義就是利用 Session 來進行驗證的機制，整體流程如上圖所示。客戶端先將帳號密碼丟給伺服器端，伺服器端透過帳密驗證，確定是正確的使用者登入，就開始建立一個伺服器端與你之間連線的 Session（會期）資料，裡面會放置一些用來辨識這個 Session 是被哪個使用者建立的資料，接著會回傳該 Session 的 ID 回來，並要求客戶端未來要驗證時需要帶這個 Session 的 ID 在 `HTTP Cookie` 上。

這個 `HTTP Cookie` 是位於 HTTP request 的 header 中的一個小區塊，它會自動被存在客戶端（通常是瀏覽器）上，並且 Cookie 會記載該資料是來自於哪個網址的資料，在瀏覽器對該網址為基底的網址做 HTTP request 的時候，都會自動帶上這個 Cookie ，藉以讓伺服器能夠驗證身份，並透過伺服器端儲存的 Session 資料，去回傳相對應身份可以得到的資料，這一整個就是基本的 Session-Based Authentication 架構。

### Token-Based Authentication

![Token-Based Authentication](/uploads/2020/09/Untitled-Diagram.png)

Token-Based Authentication，顧名思義就是利用 Token 來進行驗證的機制，整體流程如上圖所示。基本上流程和 Session-Based Authentication 類似，但是伺服器端不需要另外儲存任何資料，而是把相關的資料透過密鑰簽署組合成 Token，交由客戶端保管。客戶端拿到 Token 後，只要在每次 HTTP request 發送的時候，在 header 中的 Authorization 區塊帶上 Token 給伺服器端，即可被伺服器端再次透過密鑰驗證是否 Token 沒有被修改過，進而從中抽取資料，了解是哪個使用者的請求，給予相對應身份可以得到的資料。

在 Token-Based Authentication 中，目前最常見的方式是用 JWT（JSON Web Token）去做為 Token 的格式，JWT 會將 Token 分成三段，分別是 Header、Payload 和 Signature，而其中 Payload 就是上述所說到會放置能夠辨識使用者資料所儲存的地方。另外要注意的是，JWT 所使用的 Token 只會使用密鑰進行簽署的動作，簽署完後形成的就是 Signature，伺服器在收到 Token 時僅使用密鑰去進行 Signature 驗證，確定該 Token 是否有被修改過，並不會對 Token 進行加密。如果有要對 Token 進行加密的話，可以選擇 JWE（JSON Web Encryption）的加密方式。

### 優缺點比較

兩種不同的 Authentication 皆有一些不同的優缺點，底下就列舉幾點讓大家了解一下：

1. Session-Based Authentication 由於是利用 Cookie 傳遞資料，Cookie 只要是在同網域下的請求皆會帶上，故只要別人用它的網站去連結你 API 的網址（例如：刪除題目的 API 網址），就可以讓你不知不覺對你的網站進行資料庫操作的動作，這個攻擊稱作 CSRF（Cross Site Request Forgery）。最簡單的防止方式通常是將 `SameSite` 加註在 Cookie 上，讓瀏覽器僅會在發送的請求是與該網頁同網域的 `URI` 的時候，才會帶上 Cookie 在請求中。關於詳細的攻擊內容以及防止方式可見此[文章](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)。
2. Token-Based Authentication 的 Token 通常必須要由客戶端自行決定如何儲存。由於最常見的客戶端通常為瀏覽器，所以通常是使用 JavaScript 去進行儲存。那如果在你的網頁上可以被別人加上 JavaScript 程式碼的話，就可以盜取別人的 Token，又由於伺服器端完全信任 Token 的關係，幾乎完全無法防止別人使用該 Token 去當作你的身份，用此身份來進行伺服器操作，這種攻擊通常稱為 XSS（Cross-site scripting）。最常見的防止方式是將 Token 一樣使用 Cookie 去帶，並且對該 Cookie 使用 `HttpOnly` 和 `Secure Flag` 讓 Cookie 內容不能被 JavaScript 讀取。詳細關於 XSS 的內容可見 [Wiki](https://zh.wikipedia.org/wiki/跨網站指令碼)。
3. 如果你所處的網路環境正在被監聽的話，不管是 Session-Based Authentication 或是 Token-Based Authentication 都有可能因為被監聽而 Cookie 或是 Token 被其他人偷走，進而導致帳號被盜，這種攻擊一般稱作 MitM（Man-in-the-Middle Attack）。通常的解決方式就是讓客戶端與伺服器端連線之間透過加密資料進行溝通，最常見的加密方式是使用 SSL（Secure Sockets Layer）加密技術，而溝通的 protocol 就會從 `http` 改成後面加上 SSL 第一個字的 `https`。詳細關於 MitM 的部分可以參見 [Wiki](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。
4. 以 RESTful API 的角度看，我們曾經提到它有個原則叫做 `Stateless`，就是只要我送給伺服器的參數相同，應該就會得到一樣的結果，伺服器並沒有記錄任何狀態下來，去影響客戶端送出的 Request 要回應的內容。以這個特點來看，Token-Based Authentication 就比較符合這個原則，而 Session-Based Authentication 就會比較違反這個原則。
5. Session-Based Authentication 由於在每次驗證建立後，都必須使用空間來儲存辨識使用者的資料；而 Token-Based Authentication 則是將這些資料交給客戶端儲存。如果以伺服器可以服務的用戶數量的量級來比較的話，就是 Token-Based Authentication 的方式能夠服務的用戶數量會高很多。但相對地，就會有第三點所提到的問題，伺服器端無法主動終止該 Token 的驗證，必須等到 Token 所含的過期時間到了才能被終止，所以通常的做法就是讓 Token 的過期時間很短，以防止 Token 被偷，那這樣對使用者的影響就是常常會需要重新輸入帳號密碼去做登入，就比較不適合用於需要長時間驗證的服務上。

綜上這幾點的優缺點比較後，我個人是認為以我們的系統來說，用傳統的 Session-Based Authentication 比較符合我們的需求，所以在這裡所示範的會是 Session-Based Authentication 的驗證方式，如果你有需要使用 Token-Based Authentication 或是直接指名就是要用 JWT 驗證的話，可以參考 Ktor 的[官方教學](https://ktor.io/quickstart/guides/api.html)。

## 會員系統：註冊會員資料

了解了上述的驗證機制後，我們就來建立簡單的會員登入與登出的 API ，以及除了瀏覽題目以外的操作都需要登入會員的機制吧！

首先是會員相關的資料表，定義如下：

```kotlin
// User.kt
object UserTable: Table() {
    val id = integer("UserId").autoIncrement().primaryKey()
    val username = varchar("Username", 255).uniqueIndex()
    val password = varchar("Password", 255)
    val name = varchar("Name", 255)
    val email = varchar("Email", 255)
    val authority = integer("Authority")
}

// Application.kt
SchemaUtils.create(ProblemTable, TestCaseTable, UserTable)
```

解釋一下上面一些之前未出現的東西，`uniqueIndex()`，可以用來告知資料庫該欄位為 unique （唯一值）屬性，表示該欄位的值不得重複。`varchar()` 是一種型態，代表可變動數量字串的型態，需要給予最大的長度，在這裡長度都給 255，用以避免不夠裝的問題。最後不要忘記在 `Application.kt` 裡面，將資料表建立起來的 API `SchemaUtils.create()` 中加入 `UserTable`。

定義完會員的資料表後，接著要讓我們註冊會員，我們要建立 `POST /users` 這個 API。先定義要傳遞給該 API 的 DTO：

```kotlin
data class UserPostDTO (
    val username: String,
    val password: String,
    val name: String,
    val email: String
)
```

有了這個 DTO 之後，理論上，我們就可以將使用者填寫的資料填入給資料庫了。但這裡要注意一個地方，那就是直接將使用者輸入的密碼存進資料庫這件事情並不是一件好事，這代表只要有人能夠進入資料庫中，就能夠瀏覽到所有人的密碼，非常的危險。那該怎麼儲存使用者的密碼呢？通常我們不會直接儲存使用者的密碼，會將使用者的密碼利用一些雜湊演算法變成一串亂碼並儲存進資料庫。這串亂碼無法還原回原本的密碼，但是可以在下次獲取使用者輸入的密碼後，驗證是否使用者輸入的密碼與這串亂碼是吻合的，藉此就可以在不知道使用者密碼的情況下進行驗證。

那我們該怎麼使用雜湊演算法呢？這裡我們會使用 Bcrypt 去進行實作。先使用 Gradle 進行 Bcrypt 套件安裝，加入下面的內容在 `build.gradle.kts` 的 `dependencies` 區塊中去進行安裝：

```kotlin
implementation("at.favre.lib:bcrypt:0.9.0")
```

接著來撰寫一個用來雜湊密碼的類別 `PasswordHasher`，分別實作雜湊密碼的函式 `hashPassword ` 和驗證密碼的函式 `verifyPassword`：

```
const val BCRYPT_COST = 12

object PasswordHasher {
    fun hashPassword(password: String) =
        BCrypt.withDefaults().hashToString(
            BCRYPT_COST,
            password.toCharArray()
        )

    fun verifyPassword(password: String, passwordHash: String) =
        BCrypt.verifyer().verify(
            password.toCharArray(),
            passwordHash
        )
}
```

BCrypt 類別中的 `Hasher.hashToString()` 和 `Verifyer.verify()` 分別對應「雜湊密碼」與「驗證密碼」的兩個動作。雜湊會需要一個 `cost` 參數，這裡就不去細談它為什麼會需要這個參數，以及 Bcrypt 所使用的雜湊演算法 `OpenBSD Blowfish password hashing algorithm`，有興趣的話可以看看 [Wiki](https://en.wikipedia.org/wiki/Bcrypt) 上的說明。

有了可以雜湊密碼的類別後，我們就可以將會員資料存入資料庫中了。

```kotlin
route("/users") {
    post {
        val userData = call.receive<UserPostDTO>()
        var userId: Int? = null

        transaction {
            userId = UserTable.insert {
                it[UserTable.username] = userData.username
                it[UserTable.password] =
                    PasswordHasher.hashPassword(userData.password)
                it[UserTable.name] = userData.name
                it[UserTable.email] = userData.email
                it[UserTable.authority] = 1 // 預設填入一個基本權限
            } get UserTable.id
        }
        call.respond(mapOf("user_id" to userId))
    }
}
```

基本上除了雜湊密碼的部分，其餘都與昨日新增題目的程式碼大同小異，因此這裡就不多作介紹。

## 會員系統：登入與登出

接下來要開始做登入的部分，為了要能夠登入，我們要先將驗證機制建立好。在這之前，我們要先安裝 Ktor 的驗證機制套件，也就是 `ktor-auth`。利用 Gradle 在 `build.gradle.kts` 的 dependencies 區塊中，增加下列這行即可進行安裝：

```kotlin
implementation("io.ktor:ktor-auth:$ktor_version")
```

安裝完後，接著就要開始來撰寫程式碼了。由於我們要使用 Session-Based Authentication，故會需要在 Ktor 中設定 `Sessions` 這個區塊，設定方式如下程式碼所示：

```kotlin
install(Sessions) {
    cookie<UserIdPrincipal>(
        "login_data",
        storage = SessionStorageMemory()
    ) {
        cookie.path = "/"
    }
}
```

在 `Sessions` 的區塊，我們設定了要在 Cookie 內帶入能夠辨識伺服器端儲存的 `UserIdPrincipal` 資料的 Id，這個 `UserIdPrincipal` 資料是 Ktor 預設先幫你做好的資料類別，可以讓你儲存一個字串。如果你覺得能夠儲存的資料不夠用的話（例如：我們希望能夠再存放權限資料），也可以自己定義一個 `Principal` 類別。就假設我現在除了使用者編號外，我還想存這個使用者究竟有多高的權限，那我就可以另外定義一個 `UserIdAuthorityPrincipal` 類別去繼承 `Principal` 類別，把 `UserIdAuthorityPrincipal` 當作儲存時的格式。底下是定義的程式碼：

```kotlin
data class UserIdAuthorityPrincipal(val userId: String, val authority: String) : Principal
```

接著就可以把 `Sessions` 區塊中的 `cookie` 改換成使用 `UserIdAuthorityPrincipal` 這個資料。

```
install(Sessions) {
    cookie<UserIdAuthorityPrincipal>(
        "login_data",
        storage = SessionStorageMemory()
    ) {
        cookie.path = "/"
    }
}
```

那 `cookie` 裡面代入的三個值分別是 Cookie 的名字、Cookie 儲存的地方以及 Cookie 的其他操作，名字目前我給它取作 `login_data`，那儲存的地方我把它放在記憶體中，你也可以把它儲存到檔案中，這個就是看個人所需。最後在 Cookie 的其他操作，我讓 Cookie 會被代入 HTTP request 的時機點是，只要該 `URI` 參數根據在根目錄上都會，也就是說，任何一個目前我們所寫的 API 在使用者打過來的時候，都會帶上我所設定的這個 Cookie 的意思。

再來要設定驗證機制的區塊，在 Ktor 中的驗證機制區塊名稱為 `Authentication`，其詳細程式碼如下：

```kotlin
install(Authentication) {
    session<UserIdAuthorityPrincipal>("Session Auth") {
        challenge {
            throw BadRequestException("Authentication Error.")
        }
        validate { session: UserIdAuthorityPrincipal ->
            session
        }
    }
}
```

區塊裡面可以定義多個驗證機制，而我們在這裡只定義了一個 `session` 驗證機制，這個機制儲存了一個我們剛剛上面定義的類別 `UserIdAuthorityPrincipal` 的物件值，並且將這個驗證機制命名為 `Session Auth`。在 `session` 區塊中，我們又定義了兩個區塊，`challenge` 區塊是當驗證失敗的時候要執行什麼，這裡我們就隨意丟了一個 `BadRequestException()`；而 `validate` 區塊則是驗證權限是否正確，其區塊如果回傳的值為一個 `Principal` 物件則代表驗證成功，而如果回傳的是 `null` 則代表驗證失敗，在這裡我們定義成只要能拿到 Session 的值即驗證成功。

設定完了功能後，接著就要來定義登入 API `POST /users/login` 要怎麼做了。基本上，先定義該 API 所需的 DTO，如下：

```kotlin
data class UserLoginDTO (
    val username: String,
    val password: String
)
```

然後在獲得該 DTO 後，去驗證 `username` 相同的該筆資料是否 `password` 可以被 `PasswordHasher` 驗證成功。如果可以的話，就設定 Session 的值為 `userId` 和 `authority` 形成的 `UserIdAuthorityPrincipal` 物件值，同時設定完也會讓 HTTP response 加上一段告訴客戶端之後要帶什麼樣的 Cookie 值回來，也就是在 HTTP response 的 header 中填入 `Set-Cookie` 的參數。設定完後，就隨意回傳個 OK 即可讓該 HTTP response 去告知客戶端其 Cookie 要被設定的值為何；如果驗證失敗的話，則一樣丟個 `BadRequestException()` 出來。詳細程式碼如下：

```kotlin
post("/login") {
    val userLoginDTO = call.receive<UserLoginDTO>()
    var userId: Int? = null
    var authority: Int? = null

    transaction {
        val userData = UserTable.select { UserTable.username.eq(userLoginDTO.username) }.firstOrNull()

        if (userData == null) throw BadRequestException("Authentication Error.")
        if (!PasswordHasher.verifyPassword(
                userLoginDTO.password,
                userData?.get(UserTable.password)
        )) {
            throw BadRequestException("Authentication Error.")
        }

        userId = userData.get(UserTable.id)
        authority = userData.get(UserTable.authority)
    }

    if (userId == null || authority == null) throw BadRequestException("Authentication Error.")

    call.sessions.set("login_data", UserIdAuthorityPrincipal(userId.toString(), authority.toString()))
    call.respond(mapOf("OK" to true))
}
```

做完登入後，登出就相對簡單了，基本上就是在收到 `POST /users/logout` request 的時候，將 Session 的值清掉即可，程式碼如下：

```kotlin
post("/logout") {
    call.sessions.clear("login_data")
    call.respond(mapOf("OK" to true))
}
```

這裡登出的操作，明明沒有帶任何參數，卻使用 `POST` 來處理登出，而不是使用 `GET`。其原因只是因為 `GET` 太容易被觸發，所以我們稍微增加了一點難度去進行登出行為的觸發。

能夠登入登出後，我們就將需要驗證的操作（在這裡就是修改題目相關資料的操作）利用 `authenticate([驗證機制名稱])` 包起來即可，那麼只要路由到這邊的區塊，就必須要先經過驗證機制驗證過後，才能使用裡面的操作，程式碼就如下所示：

```kotlin
route("/problems") {
    get { /* ...... 內容 ...... */ }
  
    authenticate("Session Auth") {
        post { /* ...... 內容 ...... */ }
    }

    route("/{id}") {
        get { /* ...... 內容 ...... */ }

        authenticate("Session Auth") {
            put { /* ...... 內容 ...... */ }

            delete { /* ...... 內容 ...... */ }
        }
    }
}
```

## 測試

我們可以利用 Postman 進行測試，首先先測試註冊會員的 API：

```
POST http://0.0.0.0:8080/users
Content-Type: application/json

{
    "username": "maplewing_test",
    "password": "1234",
    "name": "Maplewing",
    "email": "test@test.test"
}
```

註冊完會拿到新增會員的編號：

```json
{
    "user_id": 9
}
```

接著嘗試登入看看，輸入帳號與密碼，送出 `POST /users/login` 的請求。

```
POST http://0.0.0.0:8080/users/login
Content-Type: application/json

{
    "username": "maplewing_test",
    "password": "1234"
}
```

這次會拿到的東西多了 Cookie 的部分，下面結果的部分有個 `Cookie` 頁籤，按下去就可以看到拿到的 Cookie 值，即是在我們之前設定的 `login_data` 這個名字之中。

![Cookie 的結果](/uploads/2020/09/截圖-2020-09-10-上午12.37.20.png)

接著可以看到 Postman 右上角有個 `Cookies`，即可看到裡面存了剛剛拿到的 Cookie 資料，從這個時間點之後， Postman 就會在當要對我們的伺服器發送 HTTP request 的時候，連帶將該 Cookie 資料一起傳遞上來。

![儲存的 Cookie 資料](/uploads/2020/09/截圖-2020-09-10-上午12.40.25.png)

有了登入後的 Cookie 資料後，我們可以來新增題目看看，應該操作上都會是正常的，與之前沒什麼變化。

```
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

送出新題目的需求之後，會得到新增後的題目編號。

```json
{
    "problem_id": 9
}
```

接著我們來測試登出的 API，發送 `POST /users/logout` 請求，發送完後應該就會發現 Cookie 全部被清掉了。

```
POST http://0.0.0.0:8080/users/logout
```

![清除 Cookie 後的結果](/uploads/2020/09/截圖-2020-09-10-上午12.50.30.png)

最後，可以再嘗試看看新增題目。如果你有在處理 Exception 的地方增加底下的程式碼：

```kotlin
exception<BadRequestException> {
    call.respond(HttpStatusCode.BadRequest)
}
```

則你就會收到 `400 Bad Request` 的錯誤，這就表示驗證系統真的將我們擋掉了，也就代表我們的會員系統實作完成了。

![收到 400 Bad Request 錯誤](/uploads/2020/09/截圖-2020-09-10-上午12.54.24.png)

## 總結

到今天為止，我們其實已經完成了一個可以透過會員機制來進行對資料庫內的資料進行操作的整套完整 API 了！關於目前程式碼中還有一些實作不太完整的地方，例如資料庫處理失敗目前還是回傳 `500 Internal Server Error`，或是現在 `routing` 區塊越來越龐大，應該要切割出去......等等的問題，就交給各位去仔細思考並實作了，基本上概念都已經在這幾天的內容中提到過了，剩下的就是將這些概念應用在專案的各個區塊而已了。

明天我們會再稍微利用實作遞交程式碼的過程，來好好總結一下這幾天的內容，就請各位繼續期待了。

## 參考資料
* [Session vs Token Based Authentication | by Sherry Hsu | Medium](https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4)
* [HTTP cookie - Wikipedia](https://en.wikipedia.org/wiki/HTTP_cookie)
* [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
* [跨網站指令碼 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/跨網站指令碼)
* [patrickfav/bcrypt: A Java standalone implementation of the bcrypt password hash function. Based on the Blowfish cipher it is the default password hash algorithm for OpenBSD and other systems including some Linux distributions. Includes a CLI Tool.](https://github.com/patrickfav/bcrypt)
* [bcrypt - Wikipedia](https://en.wikipedia.org/wiki/Bcrypt)
* [architecture - Logout: GET or POST? - Stack Overflow](https://stackoverflow.com/questions/3521290/logout-get-or-post)
* [HTTP API - Quick Start - Ktor](https://ktor.io/quickstart/guides/api.html)
* [Authentication in Ktor Server using form data](https://medium.com/@alexeynovikov_89393/authentication-in-ktor-server-using-form-data-e7ab626ada97)
* [Sessions - Servers - Ktor](https://ktor.io/servers/features/sessions.html)
* [Authentication - Servers - Ktor](https://ktor.io/servers/features/authentication.html)
