---
id: 17600
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 13：程式執行與審核系統 (1) - 實作編譯程式碼並執行程式的程式'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-13
date: '2020-09-13T11:03:54+08:00'
lastmod: '2020-09-18T10:08:46+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
featured_image: /uploads/2020/09/13.png
permalink: /2020/09/13/17600/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-13/
wp_status: publish
wp_type: post
---

![Day 13：程式執行與審核系統 (1) - 實作編譯程式碼並執行程式的程式](/uploads/2020/09/13.png)

昨天我們建立了可以利用指令去編譯並執行 Kotlin 所寫的程式碼，今天我們就來寫一個 Kotlin/JVM 專案，利用這些指令將一份 Kotlin 程式碼檔案進行編譯和執行，並且將輸入資料輸進去得到結果，將結果與預期結果進行比對，來審核這個程式碼是否通過指定的題目。

## 程式流程

![實作 Runners 的部分](/uploads/2020/09/runners.png)

先回頭看看我們原本設計的架構圖，現在要來做的部分，就是位於架構圖右下角的批改程式碼系統的部分。那對於一個批改系統，它的流程大概會是長什麼樣子呢？

![批改系統流程](/uploads/2020/09/JudgeSystemFlow.png)

整個流程如上圖所示，首先先跟資料來源要一筆 Submission，如果沒辦法拿到，則等待一段時間後再問一次；如果可以拿到的話就進入下一步驟。那接下來就將剛拿到的程式碼進行編譯，編譯如果失敗，就回傳該筆 Submission 失敗，再回頭問有沒有下一筆資料；如果成功的話又再進入最後的步驟。最後，就是將編譯好的程式拿來執行，將輸入輸進去，檢查程式執行與輸出結果是否如預期，將檢查結果回傳回去，這樣就結束了一筆 Submission 的批改，進入下一筆 Submission 的處理。

那在今天的部分，我們先不進行錯誤方面的處理，先簡單做一個從資料來源讀取 Submission 然後編譯並執行完的基本流程的程式。

## 開新專案

先打開 IntelliJ IDEA，應該會先開啟我們上次做的資料管理系統的專案，可以先將它關閉。透過上方的 `File` 內的 `Close Project` 選項去關閉專案，即可看到當初剛進入 IntelliJ IDEA 的開啟視窗。

![關閉專案](/uploads/2020/09/截圖-2020-09-13-上午9.05.25.png)

接著一樣點選開新專案，進入新專案選擇的介面。

![開新專案視窗](/uploads/2020/09/截圖-2020-09-13-上午9.07.25.png)

這次我們要使用 `Gradle` 專案內的 `Kotlin/JVM` 專案進行開發，並且我們希望 Gradle 所使用的設定語言為 Kotlin。

![Gradle 專案設定](/uploads/2020/09/截圖-2020-09-13-上午9.08.45.png)

接著取名的地方就自行取名，取完名按下 `Finish` 就可以開啟一個新專案。剛開好新專案後，需要等 Gradle 將專案內的東西建置出來，建置完以後我們就會看到專案內有 `src` 資料夾，之後我們的程式碼就會放在 `src/main/kotlin` 的資料夾內，各位之後開啟新的檔案就可以從這裡新增即可。

## 程式實作

開好新的專案後，就讓我們開始寫程式碼吧！首先先讓我們將流程圖的部分用 `interface` 描述出來吧！在 Kotlin 語言裡面，一樣有 `interface` 可以讓你來描述你期待的程式結構會是長什麼樣子，可以先將程式結構想清楚後，再來實作其內部的細節。

那麼資料來源的部分，我定義了一個 interface 叫做 `ISubmissionSource` 用於表示獲取 `SubmissionData` 的物件模樣。

```kotlin
// ISubmissionSource.kt
interface ISubmissionSource {
    fun getNextSubmissionData(): SubmissionData?
    fun setResult(id: Int, result: Judger.Result)
}
```

`ISubmssionSource` 裡面有兩個函式，一個是用於獲取下一筆 `SubmissionData` 的函式 `getNextSubmissionData()`，如果已經沒有 `SubmissionData` 可以獲取的話，它就會回傳 `null`；另外一個則是可以將批改系統的判斷結果設回去的 `setResult()` 函式。目前這個類別裡面，似乎用到了兩個還沒有定義的 `SubmissionData` 和 `Judger.Result` 類別，就讓我們繼續一步一步往下看吧！

接著先看 `SubmissionData` 的部分，基本上應該會跟之前定義 Submission 的資料差不多，只是為了批改系統能夠進行批改，它還必須帶上它所要解的該題題目的測資以及時間限制，詳細定義如下程式碼所示：

```kotlin
// SubmissionData.kt
data class SubmissionData (
    val id: Int,
    val language: String,
    val code: String,
    val testCases: List<TestCaseData>
)

data class TestCaseData (
   val input: String,
   val expectedOutput: String,
   val score: Int,
   val timeOutSeconds: Double
)
```

解釋一下上面程式碼中的欄位，`SubmissionData` 內的 `id` 代表該筆程式碼的編號，`language` 代表該筆程式碼是用什麼程式語言寫成的。為了講解方便，目前只會有 Kotlin 語言一種而已。`code` 代表的就是該筆程式碼的內容，而 `testCases` 則是該筆程式碼要解的該題題目的測資。測資裡面包含了之前我們常看到的 `input`（輸入資料）、`expectedOutput`（預期輸出資料）和 `timeOutSeconds`（執行時間限制）。

有了 `SubmissionData` 的定義後，接著就來讓我們看 `Judger` 的部分。`Judger` 在這裡定義的就是編譯程式碼，執行編譯出來的程式，並審核其結果的類別。依照這個定義，它的結構如下程式碼所示：

```kotlin
// Judger.kt
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    enum class Result { Accepted, WrongAnswer }

    fun judge(submission: SubmissionData): Result {
        val executableFilename = compiler.compile(submission.code)

        var isCorrect = true
        for (testCase in submission.testCases) {
            val output = executor.execute(executableFilename, testCase.input).trim()
            val expectedOutput = testCase.expectedOutput.trim()
            if (output != expectedOutput) {
                isCorrect = false
                break
            }
        }
        executableFilename.deleteFile()

        return if (isCorrect) Result.Accepted else Result.WrongAnswer
    }
}
```

`Judger` 類別的建構需要輸入兩個物件，一個是編譯程式的類別，我們利用 `ICompiler` 來定義；另外一個是執行程式的類別，我們利用 `IExecutor` 來定義。那再來看到成員函式的部分，成員函式只有一個 `judge()` 函式，這個函式主要就是做我們剛剛說的流程的地方。`judge()` 函式會吃一筆 `SubmissionData`，對於該筆資料先利用 `ICompiler` 進行編譯的動作，編譯完以後得到執行檔的檔名。接著對於 `SubmissionData` 所帶的每筆測資，將執行檔檔名與測資的輸入資料丟給 `IExecutor` 進行執行的動作，執行完後會回傳輸出回來。最後就將執行完後的輸出和該筆測資的預期輸出進行比較。在比較之前，我先將兩個字串前後的空白字元（例如：空白本身、Tab 字元和換行字元......等等在螢幕上看起來是空白的字元）先去除掉，利用 `trim()` 函式即可達到這個目的。去除完以後，進行相等的比較。如果結果不相等的話就直接結束測資迴圈，並且回傳「Submission 不正確」的結果回去；如果結果相等的話就比下一筆測資，直到全部測資比完都正確後，就會回傳「Submission 正確」的結果回去。

在這裡面對結果的部分，我利用 `enum` 列舉型態定義了可能會出現的結果的常數，目前主要只有兩個，一個是 `Accepted` 代表通過，另外一個則是 `WrongAnswer` 代表答案有錯。另外在刪除檔案的部分，我讓字串類別擴充了一些可以當成檔名使用的功能，詳細定義的程式碼如下所示：

```kotlin
// FilenameExtension.kt
import java.io.File

fun String.writeToFile(filename: String): File {
    val file = File(filename)
    if (file.exists()) file.delete()
    file.writeText(this)

    return file
}

fun String.deleteFile() = File(this).delete()
```

這裡使用到了 Java 語言原本有的 `File` 類別去做使用，其類別的建構式代入檔名即可開啟檔案，可利用 `File.exists()` 函式確認檔案是否存在、 `File.delete()` 函式來刪除檔案以及 `File.writeText()` 函式來寫東西進檔案，之後我們還會看到 `File.readText()` 來進行讀檔的動作。

結束這些解說後，我們就只剩下 `ICompiler` 和 `IExecutor` 的定義沒寫了，基本上上面的函式內容已經大概可以讓你猜到它們該怎麼定義了，詳細程式碼如下：

```kotlin
// ICompiler.kt
interface ICompiler {
    fun compile(code: String): String
}

// IExecutor.kt
interface IExecutor {
    fun execute(executableFilename: String, input: String): String
}
```

最後有了這些程式碼零件後，就可以將最主要的流程定義出來了，所以我們的 `main()` 函式流程如下：

```kotlin
// Application.kt
fun main() {
    val submissionSource: ISubmissionSource = /* ISubmissionSource 實體 */

    var submission = submissionSource.getNextSubmissionData()
    while (submission != null) {
        val judger = Judger(/* ICompiler 實體 */, /* IExecutor 實體 */)

        val result = judger.judge(submission)
        submissionSource.setResult(submission.id, result)
        submission = submissionSource.getNextSubmissionData()
    }
}
```

基本上這個主函式的流程就是從 `ISubmissionSource` 拿下一筆 `SubmissionData`，有拿到的話就根據程式碼的語言生出一個 `Judger`，由於我們這裡目前只有 Kotlin 語言，所以直接生 `Judger` 就可以了。接著將 `SubmissionData` 交由 `Judger` 去批改，批改完後將結果設定回去給 `ISubmissionSource`，設定完後再拿下一筆 `SubmissionData` 繼續判斷即可。

## ISubmissionSource、ICompiler 和 IExecutor

在整個程式架構起來後，剩下的就是三個 interface 該定義什麼實體了。`ISubmissionSource` 的部分理論上應該要跟資料庫連結，但為了將來測試方便，我們來做一個從檔案獲得程式碼並繼承於 `ISubmissionSource` 的 `FileSubmissionSource` 類別吧！而未來當我們要做資料庫版本的 `ISubmissionSource` 的實體，我們只要實作另外一個類別 `DatabaseSubmissionSource`，並從 `main()` 函式的這行 `val submissionSource: ISubmissionSource = /* ISubmissionSource 實體 */` 替換掉實體的部分即可，這正是使用 interface 架構程式的好處，這一類的技巧可以稱作 `Dependency Injection`，利用依賴 interface 來輕鬆替換掉裡面的實作改變程式行為，但是卻不用動到整個程式的架構程式碼。

```kotlin
// FileSubmissionSource.kt
import java.io.File

const val FILE_SUBMISSION_CODE_FILENAME = "src/main/resources/file/code.txt"
const val FILE_SUBMISSION_INPUT_FILENAME = "src/main/resources/file/input.txt"
const val FILE_SUBMISSION_OUTPUT_FILENAME = "src/main/resources/file/output.txt"

class FileSubmissionSource: ISubmissionSource {
    var isGet = false

    override fun getNextSubmissionData(): SubmissionData? {
        if (isGet) return null

        val codeFile = File(FILE_SUBMISSION_CODE_FILENAME)
        val inputFile = File(FILE_SUBMISSION_INPUT_FILENAME)
        val outputFile = File(FILE_SUBMISSION_OUTPUT_FILENAME)

        isGet = true
        return SubmissionData(
            1,
            "kotlin",
            codeFile.readText(),
            listOf(TestCaseData(
                inputFile.readText(),
                outputFile.readText(),
                100,
                10.0
            ))
        )
    }

    override fun setResult(id: Int, result: Judger.Result) {
        println("Submission $id: $result")
    }
}
```

我們讓整個 `FileSubmissionSource` 模擬成只有一筆 `SubmissionData`，一旦利用 `FileSubmissionSource.getNextSubmissionData()` 拿過一次之後就再也只會吐出 `null` 而已，這點的控制我們利用 `isGet` 這個變數來記憶。而 `FileSubmissionSource.getNextSubmissionData()` 的內容基本上就是透過讀三個檔案 `codeFile`、`inputFile` 和 `outputFile` 的資料，來做出一個 `SubmissionData` 給呼叫的人即可，這三個檔案皆放在 `src/main/resources/file` 底下，內容分別是：

```
// code.txt
fun main() {
    val inputs = readLine()!!.split(' ')
    val a = inputs[0].toInt()
    val b = inputs[1].toInt()
    val c = inputs[2].toInt()
    val sum = a + b + c

    println(sum.toString())
}

// input.txt
3 4 5

// output.txt
12
```

目前我們存在檔案裡面的資料，就是用來測試一個三數相加的 Kotlin 程式是否正確的意思。`code.txt` 裡面所使用到的 `readLine()` 即是讀一整行輸入的內容的意思，讀完後由於不一定讀的到資料，所以其型態為 `String?`，需要轉回成不是 `Nullable` 的型態才能繼續對該字串進行操作，所以使用 `!!` 轉型回來即可，其他的部分像是 `split()`、`toInt()` 大概可以從字面意義了解其內容為何，如果有不了解的部分可以試著查查 [Kotlin 的文件](https://kotlinlang.org/docs/reference/)。回到 `FileSubmissionSource` 的定義，在最後一個函式 `FileSubmissionSource.setResult()` 裡，預期上應該是要將結果寫回去檔案，但由於將結果寫進檔案好像也沒什麼意義，所以我們就將結果顯示出來即可。

定義完 `FileSubmissionSource` 類別後，接著就是定義 `ICompiler` 的實體。那為了要能夠編譯 Kotlin 語言，我們就來實作繼承 `ICompiler` 的 `KotlinCompiler` 類別，詳細定義如下程式碼所示：

```kotlin
// KotlinCompiler.kt
const val KOTLIN_CODE_FILENAME = "_code.kt"
const val KOTLIN_CODE_EXECUTABLE_FILENAME = "_code.jar"

class KotlinCompiler: ICompiler {
    override fun compile(code: String): String {
        val codeFile = code.writeToFile(KOTLIN_CODE_FILENAME)

        val compileProcess = ProcessBuilder(
            "kotlinc",
            KOTLIN_CODE_FILENAME,
            "-include-runtime",
            "-d",
            KOTLIN_CODE_EXECUTABLE_FILENAME)
        compileProcess.start().waitFor()

        codeFile.delete()
        return KOTLIN_CODE_EXECUTABLE_FILENAME
    }
}
```

主要的程式碼部分都在 `KotlinCompiler.compile()` 這個函式內。這個函式內容基本上就是將拿到的程式碼先寫入一個檔案，接著利用 `ProcessBuilder()` 建構一個用於呼叫指令的物件，呼叫我們昨天有使用到的 `kotlinc [程式碼檔名] -include-runtime -d [執行檔檔名]` 來對剛寫入的檔案進行編譯。建構完後，使用 `ProcessBuilder.start()` 函式開始執行指令，那由於我們希望等到指令執行完才繼續，所以後面使用 `waitFor()` 函式去等待它結束。編譯結束完後，將剛寫入的程式碼檔案刪除掉，並將執行檔檔名回傳回來即可。

定義完 `KotlinCompiler` 類別後，最後就是要來定義 `IExecutor` 的實體了。為了要能夠執行 `.jar` 檔案，我們就來寫個 `JVMExecutor` 的類別來呼叫昨天有提到的執行指令去進行執行，程式碼如下所示：

```kotlin
// JVMExecutor.kt
import java.io.File

const val JVM_INPUT_FILENAME = "input.txt"
const val JVM_OUTPUT_FILENAME = "output.txt"

class JVMExecutor: IExecutor {
    override fun execute(executableFilename: String, input: String): String {
        val inputFile = input.writeToFile(JVM_INPUT_FILENAME)
        val outputFile = File(JVM_OUTPUT_FILENAME)

        val executeProcess = ProcessBuilder(
            "java",
            "-jar",
            executableFilename)
        executeProcess.redirectInput(inputFile)
        executeProcess.redirectOutput(outputFile)
        executeProcess.start().waitFor()

        val output = outputFile.readText()

        inputFile.delete()
        outputFile.delete()
        return output
    }
}
```

那這個類別的主要程式碼部分都在 `JVMExecutor.execute()` 這個函式內。先將丟進來的輸入資料寫入檔案，並預先開啟一個程式要輸出內容進去的檔案。接著一樣使用 `ProcessBuilder()` 去呼叫 `java -jar [執行檔檔名]` 以進行執行，不同的地方在於後面我們多使用了 `ProcessBuilder.redirectInput()` 和 `ProcessBuilder.redirectOutput()`，這兩個函式，使用這兩個函式的目的，基本上是要將所執行程式的輸入方式和輸出方式導向到檔案，不然如果直接執行的話，它就會等待我們使用鍵盤輸入內容進去，並且將結果印在螢幕上，而我們希望之後程式能繼續進行判斷，所以我們就將輸入方式導向到剛剛寫入的輸入資料檔案，將輸出方式導向剛剛預先開好的輸出內容要進去的檔案即可。最後將輸出內容從檔案讀出來，刪除兩個剛剛創的檔案，將結果回傳回來即可。

全部定義出來的介面都有實體後，我們就將實體填入 `main()` 函式內，來執行看看吧！

```kotlin
// Application.kt
fun main() {
    val submissionSource: ISubmissionSource = FileSubmissionSource()

    var submission = submissionSource.getNextSubmissionData()
    while (submission != null) {
        val judger = Judger(KotlinCompiler(), JVMExecutor())

        val result = judger.judge(submission)
        submissionSource.setResult(submission.id, result)
        submission = submissionSource.getNextSubmissionData()
    }
}
```

跟我們第二天的步驟相同，點選 `main()` 函式旁邊的播放鍵即可開始執行，執行完後應該會在下方得到程式碼正確的結果。

```
Submission 1: Accepted
```

你可以嘗試將 `code.txt` 的內容改成錯誤的程式碼，如下所示：

```
fun main() {
    val inputs = readLine()!!.split(' ')
    val a = inputs[0].toInt()
    val b = inputs[1].toInt()
    val c = inputs[2].toInt()
    val sum = a + b - c // 這裡改成減 c

    println(sum.toString())
}
```

再執行一次應該就可以得到程式碼錯誤的結果。

```
Submission 1: WrongAnswer
```

## 總結
今天我們完成了一個基本的批改程式，那接下來我們就要讓這個程式能夠從之前資料管理系統所使用的資料庫內，將使用者遞交的程式碼拉出來執行，就請各位敬請期待明天的內容吧！

## 參考資料
* [exec - How to invoke external command from within Kotlin code? - Stack Overflow](https://stackoverflow.com/questions/35421699/how-to-invoke-external-command-from-within-kotlin-code)
* [ProcessBuilder (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/lang/ProcessBuilder.html)
* [Interfaces - Kotlin Programming Language](https://kotlinlang.org/docs/reference/interfaces.html)
* [Reference - Kotlin Programming Language](https://kotlinlang.org/docs/reference/)
