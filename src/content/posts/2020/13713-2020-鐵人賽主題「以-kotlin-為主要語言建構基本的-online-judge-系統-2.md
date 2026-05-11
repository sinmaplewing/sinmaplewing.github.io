---
id: 13713
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 2：Kotlin 簡介與 IDE 介紹'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系統-2
date: '2020-09-02T07:38:48+08:00'
lastmod: '2020-09-22T09:51:36+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- IntelliJ IDEA
featured_image: /uploads/2020/09/02.png
permalink: /2020/09/02/13713/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb%e7%b5%b1-2/
wp_status: publish
wp_type: post
---

![Day 2：Kotlin 簡介與 IDE 介紹](/uploads/2020/09/02.png)

不知道大家還記不記得我在題目上有寫到「以 Kotlin 為主要語言」這幾個字呢？接下來就讓我來好好介紹一下在這 30 天即將使用到的程式語言－Kotlin，以及我們即將會使用什麼樣的 IDE（開發整合環境）來進行開發吧！

## Kotlin 程式語言

![Kotlin 的 Logo（來自 https://logos-download.com/10209-kotlin-logo-download.html）](/uploads/2020/08/Kotlin_logo_wordmark.png)

Kotlin 程式語言為 JetBrains 公司所開發的程式語言，其語言所撰寫的程式碼可編譯讓 JVM 執行，也可以編譯後利用 LLVM 轉成原生程式碼（Kotlin/Native）去執行，甚至也可以編譯成 JavaScript 語言讓瀏覽器去執行（Kotlin/JS），是個非常萬用的程式語言。由於可以編譯成讓 JVM 去執行的程式碼的特性，以及透過此特性，可以與 Java 語言進行橋接的關係，這使得使用 Kotlin 去開發 Android 程式相當容易，甚至在 2017 年的 Google I/O 中，Google 宣布在 Android 上會為 Kotlin 提供最佳的支援。不過近期 Kotlin 的野心越來越大，推出了 Kotlin Multiplatform，讓你可以在大多數的作業系統平台上共用程式碼，使得在開發多平台的程式上更加的方便。

Kotlin 程式語言與近代的語言設計相似，除了提供了 Object-Oriented Programming 的語法可以使用外，也導入了很多 Functional Programming 的設計在程式語言裡面。底下根據基本的程式語言功能整理了這些功能在 Kotlin 裡面大概長什麼樣子，如果有學過其他程式語言的話，可以先透過底下的整理去快速了解 Kotlin 的語法，不過如果要熟悉這個語言的話還是建議去找個教學來看。

### 基本資料型態

* 整數型態（由大到小）: `Long`, `Int`, `Short`, `Byte`
* 浮點數型態（由大到小）: `Double`, `Float`
* 字元型態: `Char`
* 布林值型態：`Boolean`

### 宣告變數

* 用 `val` 關鍵字來宣告唯獨之變數，值可為變數。
* 用 `var` 關鍵字來宣告可變動之變數。
* 用 `const val` 關鍵字來宣告常數，值只能為 compile-time 就可知道的數值。此宣告方式不能放在任何一個程式區塊(例如：函式定義區塊或是類別定義區塊)裡面去定義，也就是不能成為區域變數（local variable），只能放在全域(global)中去定義。
* 在變數宣告時，如果後面有接字面常量的話，其實是可以省略型態不寫的，像是底下的範例程式碼中的前三行就可以寫成 `or` 下面的形式。

```kotlin
val a: Int = 2 
var b: Double = 2.0 
const val c: Boolean = true 

// or
val a = 2
var b = 2.0
const val c = true
```

### 字串

* 型態名為 `String`。
* 具有 String Interpolation 的功能，可以在字串中直接嵌入程式碼。

```kotlin
val a: String = "abc" 

// String Interpolation
val b = 174
var c: String = "$b ${b + 33} XD" // "174 207 XD"
```

### 條件判斷

* 主要有 `if` 和 `when` 兩種語法。
* `when` 有點類似於 `switch-case`，但功能更多元。
* `if` 和 `when` 兩種都可以當作 expression 來寫，每個區段的最後一行的值，會被當作若執行到該區段會讓整個語句回傳的值。 
* 利用上一點的特性，可以直接用此語法去取代常見的三元運算子 `(a ? b : c)` ，使用上語法會更一致，且用法上會更彈性。

```kotlin
// if
val count = 10
if (count < 5) {
  println("太少")
} else if (count > 5) {
  println("太多")
} else {
  println("剛剛好")
}

// if-expression
val result = if (count < 5) {
  "太少" 
} else if (count > 5) { 
  "太多" 
} else {
  "剛剛好"
}

// when
when (count) {
    in 0..4 -> println("太少")
    5 -> println("剛剛好")
    else -> println("太多")
}

// when-expression
val result = when (count) {
    in 0..4 -> "太少"
    5 -> "剛剛好"
    else -> "太多"
}
```

### 集合

* 陣列部分可分為兩種建構方式，一種為基本型態各自特殊的陣列，一種是用 Generic 方式定義的通用陣列。兩者如果使用在基本型態的差別在於，是否是會將基本型態進行 Boxing，例如：用 Java 的方式去解釋兩種不同的整數陣列型態 `IntArray` 與 `Array<Int>` 的話， `IntArray` 就是對應到 `int[]` ，而 `Array<Int>` 就是對應到 `Integer[]`。
* 其餘的集合底下列舉了 `List` 、 `Map` 與 `Set` 的建構方式，這些集合型態又分成了唯獨版本與可變版本，可變版本即是在該型態名稱前加上 `Mutable` 即是可變版本的型態名稱。

```kotlin
// 各型態不同的陣列
val integers = intArrayOf(1, 2, 3) // IntArray
val doubles = doubleArrayOf(1.0, 2.0, 3.0) // DoubleArray

// 通用陣列
val generalIntegers = arrayOf(1, 2, 3) // Array<Int>
val generalDoubles = arrayOf(1.0, 2.0, 3.0) // Array<Double>

// 唯讀集合 (節錄自 Kotlin 官方教學程式碼)
// List<String>
val strings = listOf("Anne", "Karen", "Peter")
// Map<String, Int>
val map = mapOf("a" to 1, "b" to 2, "c" to 3)
// Set<String>
val set = setOf("a", "b", "c")

// 可變集合 (節錄自 Kotlin 官方教學程式碼)
// MutableList<String>
val strings = mutableListOf("Anne", "Karen", "Peter") 
// MutableMap<String, Int>
val map = mutableMapOf("a" to 1, "b" to 2, "c" to 3)
// MutableSet<String, Int>
val set = mutableSetOf("a", "b", "c")
```

### 迴圈

* 主要有 `for...in...` 與 `while`， `for...in...` 的部分可結合 Kotlin 中的 `Range` 型態去運用，底下有相關的範例。
* 迴圈流程控制除了有一般常見的 continue 和 break，也提供標籤型的 continue 和 break，用於跳出外層迴圈。

```kotlin
// for (節錄自 Kotlin 官方教學程式碼)
val names = listOf("Anne", "Peter", "Jeff")

// 會接續印出 Anne 、 Peter 、 Jeff
for (name in names) {
    println(name) 
}

// 會接續印出 0 到 10
for (x in 0..10) println(x) 

// 會接續印出 0 到 9
for (x in 0 until 10) println(x)

// 會接續印出 0, 2, 4, 6, 8
for (x in 0 until 10 step 2) println(x)

// 會接續印出 10, 8, 6, 4, 2, 0
for (x in 10 downTo 0 step 2) println(x)

// 會接續印出 0: Anne, 1: Peter, 2: Jeff
for ((index, value) in names.withIndex()) {
    println("$index: $value")
}

// while (節錄自 Kotlin 官方教學程式碼)
// 會接續印出 0 到 9
var x = 0
while (x < 10) {
    println(x)
    x++
}

// 標籤型的 continue 和 break 用於跳出外層迴圈 (節錄自 Kotlin 官方教學程式碼)
outer@ for (n in 2..100) {
    for (d in 2 until n) {
        if (n % d == 0) continue@outer
    }
    println("$n is prime")
}
```

### 函式

* 定義語法為 `fun [函式名稱]([參數 1 名稱]: [參數 1 型態], [...其他參數]): [回傳型態] { [內容] }`。
* 若內容只有一行 `return` 的話，可直接使用 `=` 來取代大括弧，並不用寫 `return`。用此方式時由於回傳型態容易判斷，故`: [回傳型態]` 可加可不加。
* 無回傳參數的型態為 `Unit`，並且若回傳參數為 `Unit` 時，則函式可以不用填寫回傳型態。

```kotlin
// 節錄自 Kotlin 官方教學程式碼
fun happyBirthday(name: String, age: Int): String {
    return "Happy ${age}th birthday, $name!"
}

// 如果函式只有一行 return 的話，可簡寫成等式
fun happyBirthday2(name: String, age: Int) =
    "Happy ${age}th birthday, $name!"

// 無回傳參數的型態為 Unit 或不寫亦可
fun happyBirthday3(name: String, age: Int): Unit =
    println("Happy ${age}th birthday, $name!")

val greeting = happyBirthday("Anne", 32)
```

### 例外處理

* 與其餘語言大致上相同，利用 `throw` 去丟例外，並使用 `try...catch...` 去接收例外。

```kotlin
// 節錄自 Kotlin 官方教學程式碼

// throw
throw IllegalArgumentException("Value must be positive")

// try-catch
fun divideOrZero(numerator: Int, denominator: Int): Int {
    try {
        return numerator / denominator
    } catch (e: ArithmeticException) {
        return 0
    }
}
```

### 類別

* 類別定義方式有很多寫法，這裡僅列出比較簡單使用的寫法，關於建構式的部分除了下面範例中這種直接帶值的寫法，也有 `init` 區塊可以去做初始化的動作，詳情可見 Kotlin 的文件或是教學。
* 如果你想定義的類別型態比較接近純資料的包裝的話，可以利用 `Data Class` 這種特殊的類別定義方式去定義它。若使用這種方式定義你的類別的話，則該類別定義完後，程式會自動幫你實作 `toString()` 、 `equals()` 與 `hashCode()` 這三個以純資料物件來說，最容易讓程式自己去定義得比較合乎使用的函式。

```kotlin
class Person (val name: String, val age: Int) {
  fun greeting() = "嗨！年紀 $age 歲的 $name！"
}

val sonic = Person("Sonic", 30)
val amy = Person("Amy", 22)
println(sonic.greeting) // 印出 "嗨！年紀 30 歲的 Sonic！"
println(amy.greeting) // 印出 "嗨！年紀 22 歲的 Amy！"

// Data Class
data class PersonData (val name: String, val age: Int)

val sonicData = PersonData("Sonic", 30)
println(sonicData.toString()) // 印出 PersonData(name=Sonic, age=30)
```

### Null safety

* 一般型態(包含類別定義的物件型態)變數的值都不可以有 `null`，唯有型態後面有接問號的才能存放 `null`，這種有問號接在後面的型態稱作 `Nullable` 型態。
* 所有 `Nullable` 型態的變數都需要在確保不會有 `null` 的情況下才能對它進行操作。
* 與大部分近代語言相同，具有一些可以省略判斷 `null` 的運算子，可以方便對這些 `Nullable` 型態變數進行操作，像是 Safe call operator `?.` 和 Elvis operator `?:`。
* 若想直接將 `Nullable` 型態轉回不能放置 `null` 的一般型態的話，可以使用 Not-null assertion operator `!!`。將該運算子接在變數後面後，即可轉型該變數的值成為原本不具有 `null` 型態的值。但如果剛好該變數內容是 `null` 的話，就會在轉型的過程中丟出 `NullPointerException` ，所以要特別小心使用。

```kotlin
// 節錄自 Kotlin 官方教學程式碼
fun test(a: String, b: String?) {
  if (b == null) {
    // b 無法使用，若使用會有編譯錯誤
  } else {
    println(b.length)
  }
}

// Safe call operator
class Person (val name: String, val age: Int) {
  fun greeting() = println("嗨！年紀 $age 歲的 $name！")
}

val sonic: Person? = null
sonic?.greeting() // 由於 sonic 為 null，故不會執行

// Elvis operator
val x: Int? = null
val y: Int = 3
val z = x ?: y // 若 x 為 null，則給 y
val z = x ?: return y // 若 x 為 null，則函式提早 return 回 y 這個值。

// Not-null assertion operator
val w: Int = x!! // throw NullPointerException
```

### Lambda Function

* 函式型態在 Kotlin 中的定義為 `([參數型態列表]) -> [回傳型態]`。
* Lambda Function 在 Kotlin 中的基本定義為 `{ [參數列表] -> [函式內容] }`，函式內容最後一行會是該函式回傳的值。
* Lambda Function 在 Kotlin 裡面有很多可以簡寫的方式，可以看下方的範例程式碼透過註解與程式碼的配合來了解一下。
* 定義 Lambda Function 的參數型態時，其參數型態可以定義成一種叫做 Receiver Type 的型態，讓 Lambda Function 內可以直接呼叫該參數的成員屬性或是成員函式，底下有一段範例可以稍微了解一下這個用法。這個用法也讓 Kotlin 可以很好被拿來做為設計各種不同應用領域的 DSL (Domain-Specific Language) 的程式語言之一。詳情可以搜尋 `HTML DSL`，看看 Kotlin 是怎麼被應用來去定義出一份 HTML 文件。

```kotlin
// Function Type
fun operateTwoNumbers(a: Int, b: Int, f: (Int, Int) -> Int) =
  f(a, b)

// 代入 Lambda Function
val add = operateTwoNumbers(3, 4, { a: Int, b: Int -> 
  a + b 
})

// Lambda Function 的內容也可以是 if-expression
val divide = operateTwoNumbers(5, 0, {a: Int, b: Int ->
  if (b == 0) 0 else a / b
})

// 函式最後一個若是 Function Type，可不放入括弧內
val minus = operateTwoNumbers(8, 3) {a: Int, b: Int ->
  a - b
}

// Lambda 函式若傳入值型態確定，可省略
val multiple = operateTwoNumbers(5, 15) { a, b ->
  a * b
}

// 若 Lambda 僅放入單值，可省略傳入參數，
// 參數用 it (它) 這個字代替
fun operateOneNumber(a: Int, f: (Int) -> Int) =
  f(a)

// 代入一個「自己乘以自己」的函式
val square = operateOneNumber(3) { a -> a * a }
// 用 it 簡寫
val square = operateOneNumber(3) { it * it }

// Receiver Type
class Person (val name: String, val age: Int) {
  fun greeting() = println("嗨！年紀 $age 歲的 $name！")
}

fun operateWithSonic(f: Person.() -> Unit) = 
  f(Person("Sonic", 30))

operateWithSonic {  // 參數只有 Function Type 的話，連小括弧都可不寫。
  greeting()
  println("$name 真的很棒。")
}
```

## Kotlin 專用 IDE：IntelliJ IDEA

![IntelliJ IDEA 的 Logo](/uploads/2020/09/intellij-idea_logo_300x300.png)

看完上方的 Kotlin 語法整理後，接著應該就要來嘗試使用這個程式語言了，那通常我們會用什麼軟體來使用 Kotlin 語言開發程式呢？製作 Kotlin 的公司 JetBrains 自己也有研發一套非常完整的 Kotlin IDE，名稱叫做 IntelliJ IDEA。這套 IDE 有兩個版本可以使用，一個是免費使用的 Community 版本，另一個是付費訂閱使用的 Ultimate 版本。那如果你是剛開始接觸這個語言的話，可以先從 Community 版本使用看看，假設後來你真的愛上了這個語言，那到那個時候再來考慮要不要訂閱 Ultimate 的版本也不遲。下載網址可至[官方網站](https://www.jetbrains.com/idea/download/)去進行下載。

下載安裝完後，我們就來嘗試一下這套軟體吧！首先先開啟 IntelliJ IDEA，可以看見下方畫面。

![IntelliJ IDEA 開啟新專案視窗](/uploads/2020/09/截圖-2020-09-01-上午9.32.39.png)

點擊 `New Project` 後，進入開新專案介面。

![IntelliJ IDEA 設定新專案介面](/uploads/2020/09/截圖-2020-09-01-上午9.34.06.png)

在這個介面上選擇 `Kotlin`，然後選擇 `JVM`，接著會有專案的屬性設定，這個就隨你決定後，點擊 `Start` 即會進到可以編輯專案的介面。

![IntelliJ IDEA 專案結構介面介紹](/uploads/2020/09/截圖-2020-09-01-上午9.37.06.png)

在此介面左邊為專案的資料管理，將專案檔案點擊開來後，裡面會有個 `src` 的資料夾，這個資料夾是存放你的程式碼主要的地方。

![IntelliJ IDEA 專案開新檔案截圖](/uploads/2020/09/截圖-2020-09-01-上午9.37.40.png)

接著對該資料夾點右鍵，增加一個 Kotlin 的檔案，可以叫做 `Main.kt`。

![IntelliJ IDEA 專案檔案編輯區](/uploads/2020/09/截圖-2020-09-01-上午9.41.22.png)

增加檔案後，右方就會出現可以編輯該檔案的檔案編輯區。我們可以試著來執行看看 Kotlin 語法整理中類別部分的範例程式碼，只不過 Kotlin 會需要一個程式執行的進入點 `main()` 函式，故整理以後會變成下面的形式：

```kotlin
class Person (val name: String, val age: Int) {
    fun greeting() = println("嗨！年紀 $age 歲的 $name！")
}

fun operateWithSonic(f: Person.() -> Unit) =
    f(Person("Sonic", 30))

fun main() {
    operateWithSonic {  // 參數只有 Function Type 的話，連括弧都可不寫。
        greeting()
        println("$name 真的很棒。")
    }
}
```

填寫完後，會在 `main()` 函式的旁邊看到綠色的箭頭，點下去後會看到 `Run 'xxxx'` 的選項，再點擊下去就會開始編譯執行。

![IntelliJ IDEA 專案執行截圖](/uploads/2020/09/截圖-2020-09-01-上午9.44.27.png)

最後就可以得到下圖中紅框的結果了！

![IntelliJ IDEA 專案執行結果截圖](/uploads/2020/09/截圖-2020-09-01-上午9.45.14.png)

## 總結

到這裡我們就成功執行了一個簡單的 Kotlin 程式了，明天我們就會開始來實作資料管理伺服器的部分，就請各位敬請期待囉！

## 參考資料
* [Kotlin – Logos Download](https://logos-download.com/10209-kotlin-logo-download.html)
* [Kotlin (programming language) - Wikipedia](https://en.wikipedia.org/wiki/Kotlin_(programming_language))
* [Tutorials - Kotlin Programming Language](https://kotlinlang.org/docs/tutorials/)
* [Kotlin Playground: Edit, Run, Share Kotlin Code Online](https://play.kotlinlang.org)
* [IntelliJ IDEA](IntelliJ IDEA: The Java IDE for Professional Developers by JetBrains)
* [Kotlin - use Array&lt;Double&gt; or DoubleArray - Stack Overflow](https://stackoverflow.com/questions/49391973/kotlin-use-arraydouble-or-doublearray)

> 本篇文章最早發表於 `第 12 屆 iT 邦幫忙鐵人賽`: https://ithelp.ithome.com.tw/articles/10233580
