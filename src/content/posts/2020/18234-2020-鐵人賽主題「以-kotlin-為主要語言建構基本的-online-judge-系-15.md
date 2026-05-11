---
id: 18234
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 15：程式執行與審核系統 (3) - 嘗試分辨程式執行結果'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-15
date: '2020-09-15T08:37:19+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
featured_image: /uploads/2020/09/15.png
permalink: /2020/09/15/18234/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-15/
wp_status: publish
wp_type: post
---

![Day 15：程式執行與審核系統 (3) - 嘗試分辨程式執行結果](/uploads/2020/09/15.png)

昨天的最後我們提到了一個問題：「如果使用者提交了會導致程式陷入無窮迴圈的程式碼，該怎麼解決審核系統會卡住的問題？」但其實不只有這個問題需要被解決，還有很多問題是我們之前沒有解決的，例如：「程式如果執行到一半當掉怎麼辦？」、「程式連編譯都沒辦法過怎麼辦？」......等等諸如此類的問題需要想個方法去解決掉它們。為了應付這些問題，我們先來思考一下審核一個程式碼的編譯與執行會產生哪些結果。

## 審核程式碼的編譯與執行所產生的結果

我們的審核程式在流程上，會去編譯程式碼，並執行編譯後所產生的程式，並將執行完後的結果回傳回來。那究竟在這個過程中，我們的審核程式會碰到哪些情況，並回傳哪些結果回來呢？底下整理出一些常見於各大程式碼批改系統的結果：

* **Accepted (AC)**：程式通過審核。
* **Wrong Answer (WA)**：程式輸出的結果有誤。
* **Compile Error (CE)**：程式在編譯的時候出現編譯錯誤。
* **Runtime Error (RE)**：程式在執行時壞掉。
* **Time Limit Exceeded (TLE)**：程式執行時間超過規定。
* Output Limit Exceeded (OLE)：程式輸出內容超過限制。
* Memory Limit Exceeded (MLE)：程式記憶體使用量超過限制。
* Presentation Error (PE)：程式輸出答案正確，但是格式有誤。

在這次我們的實作中，會省略掉 `OLE`、`MLE` 和 `PE` 三種情況。主要原因像是在 `OLE` 的狀況，如果程式輸出過多而超過時間限制，會被 `TLE` 擋下來。而如果輸出到最後程式有結束，則判斷上去肯定會 `WA`，所以就不另做判斷。而 `MLE` 本身超過記憶體限制這件事情很難準確判定，只能每隔一段時間監看該程式究竟使用了多少記憶體來決定，並且如果程式真的超過能夠執行的記憶體整體上限，則程式也會壞掉，進而得到 `RE` 的結果。最後 `PE` 以字串比對來說，本身就是 `WA` 的一種，可能就暫時不做進一步區分。故上面三種情況在這次的實作裡面就暫時不特別判斷，如果各位在完成了這次的系統後，有興趣去處理這些狀況的話也可以嘗試看看。

在我們審核程式中的 `Judger.Result` 類別，其定義了審核程式會判定的結果種類。我們先將上面多列出來要處理的結果種類加入其中，程式碼如下所示，基本上就是將 `CE`、`RE` 和 `TLE` 加入到裡面即可。

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    enum class Result { Accepted, WrongAnswer, CompileError, RuntimeError, TimeLimitExceeded }

    /* ...... 後面的區塊 ......*/
}
```

## 編譯階段的判斷結果

首先就先從編譯階段會出現的錯誤開始進行判斷吧！編譯階段基本上只會有編譯成功和編譯失敗兩種可能，而編譯失敗我們就會回傳 `CE`，編譯成功則繼續進行到執行階段的步驟，所以最後程式碼如下：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    enum class Result { Accepted, WrongAnswer, CompileError, RuntimeError, TimeLimitExceeded }
    data class ResultWithTime(val result: Result, val executedTime: Double)

    fun judge(submission: SubmissionData): Result {
        var executableFilename: String? = null

        try {
            executableFilename = compiler.compile(submission.code)
        }
        catch(e: Exception) {
            return Result.CompileError
        }

        if (executableFilename == null ||
            !File(executableFilename).exists()) {
            return Result.CompileError
        }

        /* ...... 執行階段程式碼 ...... */
    }
}
```

程式碼的部分， `KotlinCompiler` 內部的程式碼不變，僅判斷四種情形來決定成功與否：

1. 編譯時吐出 Exception：回傳 `CE`。
2. 編譯後得不到執行檔檔名字串：回傳 `CE`。
3. 編譯後，從執行檔檔名字串找不到檔案：回傳 `CE`。
4. 其餘情況表示能夠找到執行檔，故進入執行階段。

這樣判斷完後，編譯階段產生的錯誤結果就處理完了，接著就可以繼續處理執行階段產生的錯誤結果了。

## 執行階段的判斷結果

執行階段的部分，由於 `IExecutor` 現在不只要吐出程式輸出的資料，也要知道程式執行的狀態，故我們在這裡新增 `IExecutor.Result` 讓 `IExecutor` 能帶執行的結果回來，程式碼如下：

```kotlin
interface IExecutor {
    data class Result(
        val isTimeOut: Boolean,
        val isCorrupted: Boolean,
        val output: String
    )

    fun execute(executableFilename: String, input: String, timeOutSeconds: Double): Result
}
```

在 `IExecutor` 的 interface 內，多加了 `Result` 類別去讓 `IExecutor.execute()` 回傳執行結果給呼叫的地方。裡面的欄位分別有：`isTimeOut` 代表執行是否超過時限、`isCorrupted` 代表程式執行途中是否壞掉以及 `output` 代表原本的程式輸出字串。為了要能讓 `IExecutor` 判斷是否超時，這時我們必須將之前有存的各筆測資的時限給傳進去，參數列多了一個 `timeOutSeconds` 可讓呼叫的地方傳入時限以進行判斷。

有了這個定義後，實作的類別 `JVMExecutor` 就會根據這些定義去將執行的結果狀態填入 `IExecutor.Result` 內。首先先來看看判斷 `isTimeOut` 的部分：

```kotlin
class JVMExecutor: IExecutor {
    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        /* ...... 前頭的部分 ...... */
      
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        ) // 其函式回傳結果即為反向的 isTimeOut 邏輯 (!isTimeOut) 
        process.destroy()
        process.waitFor() // Wait for process terminated

        /* ...... 後頭的部分 ...... */
    }
}
```

我們將原本的 `executeProcess.start().waitFor()` 拆開，變成只剩下 `start()`，並將 `start()` 回傳的該 `Process` 物件記起來，接著使用 `waitFor()` 的另外一個帶參數的實作 `waitFor([等待的時間量值], [等待的時間單位])` 來進行等待。這個 `waitFor()` 會在程式結束或是執行時間超過所指定的量值時，直接結束等待，讓審核程式可以繼續進行後續的判斷，並且會回傳程式是否有在時限內結束的布林值。利用這個是否有在時限內結束的布林值就可以判斷程式的執行是否已經超過時限，`isTimeOut` 即為這個布林值的反向。那最後因為已經等待結束了，為了避免程式尚未執行完，我們利用 `destroy()` 函式將該程式砍掉，並且再度使用 `waitFor()` 去等待它結束執行即可。

接著來判斷 `isCorrupted` 的部分，這個部分其實很簡單，直接判斷程式執行完後的回傳狀態值是否為一般程式正常執行完後回傳的正常值 0 即可，如果不是 0 的話就表示程式在中途掛掉。

```kotlin
class JVMExecutor: IExecutor {
    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        /* ...... 前頭的部分至 process.waitFor() 這行 ...... */
      
        val isCorrupted = process.exitValue() != 0
        
        /* ...... 後頭的部分 ...... */
    }
}
```

整體 `JVMExecutor.execute` 函式的程式碼如下：

```kotlin
class JVMExecutor: IExecutor {
    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        val inputFile = input.writeToFile(JVM_INPUT_FILENAME)
        val outputFile = File(JVM_OUTPUT_FILENAME)

        val executeProcess = ProcessBuilder(
            "java",
            "-jar",
            executableFilename)
        executeProcess.redirectInput(inputFile)
        executeProcess.redirectOutput(outputFile)
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        )
        process.destroy()
        process.waitFor() // Wait for process terminated

        val isCorrupted = process.exitValue() != 0

        val output = outputFile.readText()
        inputFile.delete()
        outputFile.delete()
        return IExecutor.Result(
            !isFinished,
            isCorrupted,
            output
        )
    }
}
```

接著回到 `Judger` 的部分，由於接下來執行 `IExecutor` 的部分會增加很多判斷，我們先試著將該部分分割到另外一個函式內，變成下面的程式碼：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    enum class Result { Accepted, WrongAnswer, CompileError, RuntimeError, TimeLimitExceeded }

    fun judge(submission: SubmissionData): Result {
        /* ...... 編譯階段程式碼 ...... */        

        // 這裡濃縮成一個 execute() 函式
        val result = execute(executableFilename, submission.testCases)
        executableFilename.deleteFile()
        return result
    }
}
```

最後是我們提取出來的 `execute()` 函式部分：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    /* ...... 前面的部分 ...... */

    private fun execute(executableFilename: String, testCases: List<TestCaseData>): ResultWithTime {
        var isCorrect = true
        
        for (testCase in testCases) {
            var result: IExecutor.Result?
            try {
                result = executor.execute(executableFilename, testCase.input, testCase.timeOutSeconds)
            }
            catch (e: Exception) {
                return Result.RuntimeError
            }

            if (result == null) return Result.RuntimeError
            if (result.isTimeOut) return Result.TimeLimitExceeded
            if (result.isCorrupted) return Result.RuntimeError

            val output = result.output.trim()
            val expectedOutput = testCase.expectedOutput.trim()
            if (output != expectedOutput) {
                isCorrect = false
                break
            }
        }

        return if (isCorrect) Result.Accepted
        else Result.WrongAnswer
    }
}
```

這個部分除了用原先的 `isCorrect` 去判斷 `AC` 和 `WA` 以外，前面的部分又多判斷了四種情形：

1. 如果 `IExecutor.execute()` 丟出 Exception：表示程式執行途中發生意想不到的錯誤，回傳 `RE`。
2. 如果執行完後沒有任何結果狀態：表示審核程式在執行程式時，在中途發生意外狀況而結束，回傳 `RE`。
3. 如果執行完後超時：回傳 `TLE`。
4. 如果執行途中程式壞掉：回傳 `RE`。

基本上這樣執行階段的判斷結果功能就處理完了。

## 程式執行時間與分數計算

接下來我們來增加「計算程式執行時間」以及「計算分數」兩個部分吧！對於 `Judger` 要回傳的值除了程式審核的結果外，現在又要再增加計算出來的執行時間與計算出來的分數兩個欄位，故我們定義一個 `Judger.ResultState` 來表示這個回傳資料。

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    enum class Result { Accepted, WrongAnswer, CompileError, RuntimeError, TimeLimitExceeded }
    data class ResultState(val result: Result, val executedTime: Double, val totalScore: Int)

    fun judge(submission: SubmissionData): ResultState { /* ...... 內容 ...... */ }
```

由於在發生錯誤的時候會有「無執行時間」以及「無分數」的狀況，故先在 `Judger.kt` 裡定義好這兩個常數以方便使用。

```kotlin
const val NO_EXECUTED_TIME = -1.0
const val NO_SCORE = 0
```

接著先處理編譯階段的回傳，基本上編譯時如果發生錯誤，則兩個值分別應當為 `NO_EXECUTED_TIME` 和 `NO_SCORE`，如下所示：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    /* ...... 定義類別區域 ...... */

    fun judge(submission: SubmissionData): ResultState {
        var executableFilename: String? = null

        try {
            executableFilename = compiler.compile(submission.code)
        }
        catch(e: Exception) {
            return ResultState(Result.CompileError, NO_EXECUTED_TIME, NO_SCORE)
        }

        if (executableFilename == null ||
            !File(executableFilename).exists()) {
            return ResultState(Result.CompileError, NO_EXECUTED_TIME, NO_SCORE)
        }

        /* ...... 執行階段程式碼 ...... */
    }
}
```

處理完編譯階段後，就要來處理執行階段的程式碼。首先是在 `IExecutor.execute()` 的執行結果 `IExecutor.Result` 內，必須增加其執行時間是多少的欄位，如下所示：

```kotlin
interface IExecutor {
    data class Result(
        val isTimeOut: Boolean,
        val isCorrupted: Boolean,
        val executedTime: Double, // 增加這個欄位
        val output: String
    )

    fun execute(executableFilename: String, input: String, timeOutSeconds: Double): Result
}
```

在 `JVMExecutor` 中，我們可以利用內建的 `System.currentTimeMillis()` 函式來獲得以毫秒為單位的目前時間。在執行前與執行後抓取時間差即可得知執行的時間花了多少毫秒，接著就可以將計算出來的執行時間填入 `IExecutor.Result` 的 `executedTime` 欄位中。

```kotlin
class JVMExecutor: IExecutor {
    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        /* ...... 前面的部分 ...... */        

        val startTime = System.currentTimeMillis() // 增加開始時間
        val executeProcess = ProcessBuilder(
            "java",
            "-jar",
            executableFilename)
        executeProcess.redirectInput(inputFile)
        executeProcess.redirectOutput(outputFile)
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        )
        process.destroy()
        process.waitFor() // Wait for process terminated

        val isCorrupted = process.exitValue() != 0
        val executedTime = System.currentTimeMillis() - startTime // 計算時間差

        /* ...... 後面的部分 ...... */
        return IExecutor.Result(
            !isFinished,
            isCorrupted,
            executedTime.toDouble() / 1000.0, // 換算成秒回傳回去
            output
        )
    }
}
```

最後是 `Judger` 的執行階段程式碼。基本上原本測試測資的地方變成不能看到 `WA` 就跳過，而是要全部測試完來計算總分，並且也要將每筆測資的執行時間加總，即可回傳所有測資測試完後的總時間與總分。至於其他的錯誤部分，與編譯階段發生錯誤一樣，回傳 `NO_EXECUTED_TIME` 與 `NO_SCORE` 即可，底下是詳細的程式碼可以參考一下：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    /* ...... 定義類別區域 ...... */
    fun judge(submission: SubmissionData): ResultState {
        /* ...... 編譯階段程式碼 ...... */

        val resultWithTime = execute(executableFilename, submission.testCases)
        executableFilename.deleteFile()
        return resultWithTime
    }

    private fun execute(executableFilename: String, testCases: List<TestCaseData>): ResultState {
        var isCorrect = true
        var totalExecutedTime = 0.0 // 計算總時間
        var totalScore = 0 // 計算總分
        for (testCase in testCases) {
            var result: IExecutor.Result?
            try {
                result = executor.execute(executableFilename, testCase.input, testCase.timeOutSeconds)
            }
            catch (e: Exception) {
                return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)
            }

            if (result == null) return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)
            if (result.isTimeOut) return ResultState(Result.TimeLimitExceeded, NO_EXECUTED_TIME, NO_SCORE)
            if (result.isCorrupted) return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)

            val output = result.output.trim()
            val expectedOutput = testCase.expectedOutput.trim()

            // 不可直接 return 結果，要看完全部測資計算總分
            if (output == expectedOutput) {
                totalScore += testCase.score // 答對加分
            } else {
                isCorrect = false // 答錯紀錄已經有測資錯誤了
            }

            totalExecutedTime += result.executedTime // 計算總時間
        }

        return if (isCorrect) ResultState(Result.Accepted, totalExecutedTime, totalScore)
        else ResultState(Result.WrongAnswer, totalExecutedTime, totalScore)
    }
}
```

最後就是將這些資料都設回去給 `ISubmissionSource` 的部分了。底下是增加了執行時間與分數兩個欄位的 `ISubmissionSource.setResult()` 函式的介面：

```kotlin
interface ISubmissionSource {
    /* ...... getNextSubmissionData 所在處 ...... */

    // 增加了後面兩項：executedTime（執行時間）與 score（分數）
    fun setResult(id: Int, result: Judger.Result, executedTime: Double, score: Int)
}
```

最後就是將實作也加上處理這兩個參數的部分。基本上檔案來源的實作 `FileSubmissionSource` 就是多輸出一些資料，而資料庫來源的實作 `DatabaseSubmissionSource` 就是將結果填入資料庫內。分數的部分由於沒有特別在資料庫中開欄位，所以是直接與結果字串連接在一起的。如果未來要使用的時候會拆開來使用的話，會違反我們之前所提到的資料正規化的問題，不過這裡就先為求方便加在結果後面就可以。如果你還是希望能夠讓資料正規化的話，可以試著自己增加欄位來處理分數的部分。那最後主要兩個實作 `FileSubmissionSource` 和 `DatabaseSubmissionSource` 的程式碼如下所示：

```kotlin
// FileSubmissionSource.kt
class FileSubmissionSource: ISubmissionSource {
    /* ...... 前面的部分 ...... */

    override fun setResult(id: Int, result: Judger.Result, executedTime: Double, score: Int) {
        println("Submission $id: $result - Score: $score ($executedTime)")
    }
}

// DatabaseSubmissionSource.kt
object DatabaseSubmissionSource: ISubmissionSource {
    /* ...... 前面的部分 ...... */

    override fun setResult(id: Int, result: Judger.Result, executedTime: Double, score: Int) {
        transaction {
            SubmissionTable.update({
                SubmissionTable.id.eq(id)
            }) {
                it[SubmissionTable.result] = "$result ($score)" // 填入連接結果與分數後的字串
                it[SubmissionTable.executedTime] = executedTime // 填入時間
            }
        }

        println("Submission $id: $result - Score: $score ($executedTime)")
    }
}
```

## 實作測試

實作完後，就讓我們對這個審核程式進行測試吧！與昨天一樣，將資料管理系統專案開啟，並連同 PostgreSQL 資料庫和審核系統專案一起執行起來。接著在使用 Postman 登入資料管理系統後，嘗試對昨天使用的題目進行五種不同審核結果的測試。

首先是 `AC` 的部分，送出底下的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

可以得到該 Submission 的結果印在審核程式內，以我這裡就是編號 53 號的 Submission 通過了審核測試，得到 100 分並執行了 0.188 秒左右。

```
Submission 53: Accepted - Score: 100 (0.188)
```

接著測試 `WA` 的部分，由於我們知道其中一筆測資為 `a(1) + b(5) + c(3) = 9`，那麼我將程式的算式改成 `a(1) * b(5) + c(3) + 1 = 9` 來得到相同的答案。但是用這樣的算式去算，另外一筆測資就不會正確，這樣的話我應該就會得到結果 50 分的 `WA`，我們就來嘗試看看吧！送出底下的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a * b + c + 1}\")\n}",
    "problemId": 9
}
```

即可在審核系統的結果得到與我們預期相符的字串：

```
Submission 54: WrongAnswer - Score: 50 (0.226)
```

再來測試 `TLE` 的部分，很簡單的傳送一個無窮迴圈的程式即可。送出底下的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n while (true) println(\"Hi!\")\n}",
    "problemId": 9
}
```

這次需要等久一點，至少要等到題目的限制時間（10 秒）結束後才會有結果，結果應如下所示：

```
Submission 55: TimeLimitExceeded - Score: 0 (-1.0)
```

測試完 `TLE` 後，就來測試看看 `RE` 吧！在取用輸入陣列裡的資料的部分，我們讓其中一處取陣列的 `index` 值大於其陣列長度，讓程式產生 Exception 後閃退，看看是否可以藉此得到預期的結果 `RE`。送出下面的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[9999].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

理論上應該會得到預期的結果 `RE`，如下所示：

```
Submission 56: RuntimeError - Score: 0 (-1.0)
```

最後，嘗試丟一些亂七八糟的字串來讓編譯失敗進而測試 `CE` 的結果，送出下面的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "XDDDDD",
    "problemId": 9
}
```

即可看到預期的結果 `CE`：

```
Submission 57: CompileError - Score: 0 (-1.0)
```

全部測試完畢後，可以嘗試用 Postman 看看資料庫內的資料是否也有更新，底下是查詢我上面所有提交的測試程式碼，從編號 53 到編號 57 的結果：

```json
// GET /submissions/53
{
    "data": {
        "id": 53,
        "language": "kotlin",
        "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
        "executedTime": 0.188,
        "result": "Accepted (100)",
        "problemId": 9,
        "userId": 1
    }
}

// GET /submissions/54
{
    "data": {
        "id": 54,
        "language": "kotlin",
        "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a * b + c + 1}\")\n}",
        "executedTime": 0.226,
        "result": "WrongAnswer (50)",
        "problemId": 9,
        "userId": 1
    }
}

// GET /submissions/55
{
    "data": {
        "id": 55,
        "language": "kotlin",
        "code": "fun main() {\n while (true) println(\"Hi!\")\n}",
        "executedTime": -1.0,
        "result": "TimeLimitExceeded (0)",
        "problemId": 9,
        "userId": 1
    }
}

// GET /submissions/56
{
    "data": {
        "id": 56,
        "language": "kotlin",
        "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[9999].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
        "executedTime": -1.0,
        "result": "RuntimeError (0)",
        "problemId": 9,
        "userId": 1
    }
}

// GET /submissions/57
{
    "data": {
        "id": 57,
        "language": "kotlin",
        "code": "XDDDDD",
        "executedTime": -1.0,
        "result": "CompileError (0)",
        "problemId": 9,
        "userId": 1
    }
}
```

## 總結
今天我們終於能夠判斷程式編譯與執行的錯誤部分了，但是還有一些提交的程式碼在執行時會發生的危險事情我們還沒有特別處理，例如有人丟上來的程式碼會在裡面呼叫 `rm` 這個系統指令去刪除你主機裡面的檔案該怎麼辦呢？這個就讓我們明天利用 Docker 這個工具來解決吧！就請各位敬請期待明天的內容了。

## 參考資料
* [java - How to stop a command being executed after 4-5 seconds through process builder? - Stack Overflow](https://stackoverflow.com/questions/37043114/how-to-stop-a-command-being-executed-after-4-5-seconds-through-process-builder)
* [How can I get the time it takes a function to test the performance of functions in Kotlin - Stack Overflow](https://stackoverflow.com/questions/44099480/how-can-i-get-the-time-it-takes-a-function-to-test-the-performance-of-functions)
