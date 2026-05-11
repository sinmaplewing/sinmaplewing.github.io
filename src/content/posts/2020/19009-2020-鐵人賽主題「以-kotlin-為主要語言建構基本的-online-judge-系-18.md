---
id: 19009
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 18：程式執行與審核系統 (6) - 支援更多語言的審核程式'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-18
date: '2020-09-18T10:04:18+08:00'
lastmod: '2020-09-18T10:12:10+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- C#
- 2020鐵人賽
- Kotlin
- Java
- Python
featured_image: /uploads/2020/09/18fb.png
permalink: /2020/09/18/19009/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-18/
wp_status: publish
wp_type: post
---

![Day 18：程式執行與審核系統 (6) - 支援更多語言的審核程式](/uploads/2020/09/18fb.png)

截至昨天，我們解決了許多審核程式會碰到的各種問題，今天就來讓我們的審核程式支援更多的程式語言吧！基本上實作流程就是從 Docker 拉下具有該語言的編譯器和執行方式的映像檔，接著就是另外實作各個語言的 `ICompiler` 和 `IExecutor` 的類別即可。這裡我們就對在第十二天曾經提到過的三種不同程式語言的編譯及執行方式的各個代表程式語言來進行支援吧！

## 支援批改可直接編譯成該平台執行檔的程式語言的程式碼 – 以 C 語言為例

首先先讓我們來支援可直接編譯成符合指定平台的執行檔的程式語言 C 語言吧！先拉下具有 C 語言編譯器 `gcc` 環境的 Docker 映像檔，輸入下方的指令：

```sh
docker pull gcc
```

接著實作使用 gcc 編譯指令編譯的 `GCCCompiler` 與執行編譯出來的程式 `GCCExecutor`：

```kotlin
// GCCCompiler.kt
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

const val GCC_CODE_FILENAME = "_code.c"
const val GCC_CODE_EXECUTABLE_FILENAME = "_code"

class GCCCompiler(val workspace: String): ICompiler {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    override fun compile(code: String): String {
        val codeFilePath = workspace.appendPath(GCC_CODE_FILENAME)
        val executableFilePath = workspace.appendPath(GCC_CODE_EXECUTABLE_FILENAME)
        val codeFile = code.writeToFile(codeFilePath)

        val compileProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "gcc",
            "gcc",
            "/$codeFilePath",
            "-o",
            "/$executableFilePath")
        compileProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        compileProcess.start().waitFor()

        codeFile.delete()
        return executableFilePath
    }
}

// GCCExecutor.kt
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.util.concurrent.TimeUnit

const val GCC_INPUT_FILENAME = "input.txt"
const val GCC_OUTPUT_FILENAME = "output.txt"
const val GCC_DOCKER_CONTAINER_NAME = "gcc-docker"

class GCCExecutor(val workspace: String): IExecutor {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        val inputFilePath = workspace.appendPath(GCC_INPUT_FILENAME)
        val outputFilePath = workspace.appendPath(GCC_OUTPUT_FILENAME)
        val inputFile = input.writeToFile(inputFilePath)
        val dockerContainerName = GCC_DOCKER_CONTAINER_NAME + RandomStringGenerator.Generate(32)

        val startTime = System.currentTimeMillis()
        val executeProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "--name",
            dockerContainerName,
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "gcc",
            "sh",
            "-c",
            "/$executableFilename < /$inputFilePath > /$outputFilePath")
        executeProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        )
        if (!isFinished) {
            ProcessBuilder("docker", "kill", dockerContainerName).start().waitFor()
        }
        process.destroy()
        process.waitFor() // Wait for process terminated

        val isCorrupted = process.exitValue() != 0
        val executedTime = System.currentTimeMillis() - startTime

        val outputFile = File(outputFilePath)
        var output: String? = null
        if (outputFile.exists()) {
            output = outputFile.readText()
        }
        inputFile.delete()
        outputFile.delete()
        return IExecutor.Result(
            !isFinished,
            isCorrupted,
            executedTime.toDouble() / 1000.0,
            output
        )
    }
}
```

基本上就是將編譯時的指令改換成執行 `gcc` 的編譯指令 `gcc [程式碼檔案路徑] -o [執行檔案路徑]`，以及直接執行編譯出來的執行檔 `[執行檔案路徑] < [輸入檔案路徑] > [輸出檔案路徑]` 即可。其餘的程式碼部分皆與 `KotlinCompiler.kt` 和 `JVMExecutor.kt` 相同。

## 支援批改可編譯成中間碼執行的程式語言所撰寫的程式碼 – 以 Java 語言為例

接著讓我們來支援可編譯成中間碼執行的程式語言所撰寫的程式碼吧！其實 Kotlin 語言本身就是其中一種，不過我們既然可以支援處理 Kotlin 語言的話，那也可以來試試看 Java 語言的支援。由於 Java 語言也可以被編譯成 `.jar` 檔案，這代表我們 `IExecutor` 的部分可以直接沿用 `JVMExecutor` 即可，僅僅只要實作 `ICompiler` 即可。底下是實作了 `ICompiler` 的 `JavaCompiler` 類別的內容：

```kotlin
// JavaCompiler.kt
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

const val JAVA_CODE_FILENAME = "Main.java"
const val JAVA_CLASS_FILENAME = "Main.class"
const val JAVA_CODE_EXECUTABLE_FILENAME = "_code.jar"
const val JAVA_MANIFEST_FILENAME = "MANIFEST.MF"

class JavaCompiler(val workspace: String): ICompiler {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    override fun compile(code: String): String {
        val codeFilePath = workspace.appendPath(JAVA_CODE_FILENAME)
        val classFilePath = workspace.appendPath(JAVA_CLASS_FILENAME)
        val manifestFilePath = workspace.appendPath(JAVA_MANIFEST_FILENAME)
        val codeFile = code.writeToFile(codeFilePath)
        val manifestFile = "Main-Class: Main\n\n\n".writeToFile(manifestFilePath)

        val compileProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "zenika/kotlin",
            "sh",
            "-c",
            "cd /$workspace; javac $JAVA_CODE_FILENAME; jar -cvfm $JAVA_CODE_EXECUTABLE_FILENAME $JAVA_MANIFEST_FILENAME $JAVA_CLASS_FILENAME")
        compileProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        compileProcess.start().waitFor()

        codeFile.delete()
        manifestFile.delete()
        File(classFilePath).delete()
        return workspace.appendPath(JAVA_CODE_EXECUTABLE_FILENAME)
    }
}
```

我們在這裡直接使用之前編譯 Kotlin 語言所用的映像檔 `zenika/kotlin` 來做 Java 語言編譯即可，裡面有支援 Java 語言編譯的環境。那因為 Java 語言編譯過程有點繁瑣，這裡稍微介紹一下。首先要先規定主程式的類別為 `Main`，並且裡面要有主函式 `main()` 來作為程式進入點。接著必須要先利用 `javac [程式碼檔案路徑]` 這個指令將程式碼檔案 `Main.java` 編譯成 `Main.class`，然候撰寫一個用來告知編譯完後需要執行 `.jar` 的程式主類別為何的檔案 `MANIFEST.MF`，內容就為 `Main-Class: Main\n\n\n`，後面多空幾行是為了讓它被執行的時候不會壞掉。接著將 `.class` 檔案和 `MANIFEST.MF` 一起利用 `jar -cvfm [執行檔路徑] [MANIFEST.MF 路徑] [class 檔案路徑]` 包裝成 `.jar` 即可。這樣就編譯完了 Java 語言所撰寫的程式碼檔案了。

## 支援批改可用直譯器執行的程式語言所撰寫的程式碼 – 以 Python 語言為例

最後要支援的語言就是利用直譯器來執行的程式語言，在這裡我們就來支援 Python 語言的批改吧！首先先從 Docker 預設倉庫拉下可以執行 Python 環境的 Docker 映像檔，輸入下方的指令：

```sh
docker pull python
```

接著由於 Python 語言不需要經過編譯，故我們的 `ICompiler` 的實作 `PassThroughCompiler` 僅僅就是將程式碼寫進一個檔案即可。而 `IExecutor` 的實作 `PythonExecutor` 類別則使用指令 `python [程式碼路徑] < [輸入檔路徑] > [輸出檔路徑]` 對 Python 程式碼檔案進行直譯執行即可。程式碼如下所示：

```kotlin
// PassThroughtCompiler.kt
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

const val PYTHON_CODE_FILENAME = "_code.py"

class PassThroughCompiler(val workspace: String): ICompiler {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    override fun compile(code: String): String {
        val codeFilePath = workspace.appendPath(PYTHON_CODE_FILENAME)
        val codeFile = code.writeToFile(codeFilePath)
        return codeFilePath
    }
}

// PythonExecutor.kt
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.util.concurrent.TimeUnit

const val PYTHON_INPUT_FILENAME = "input.txt"
const val PYTHON_OUTPUT_FILENAME = "output.txt"
const val PYTHON_DOCKER_CONTAINER_NAME = "python-docker"

class PythonExecutor(val workspace: String): IExecutor {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        val inputFilePath = workspace.appendPath(PYTHON_INPUT_FILENAME)
        val outputFilePath = workspace.appendPath(PYTHON_OUTPUT_FILENAME)
        val inputFile = input.writeToFile(inputFilePath)
        val dockerContainerName = PYTHON_DOCKER_CONTAINER_NAME + RandomStringGenerator.Generate(32)

        val startTime = System.currentTimeMillis()
        val executeProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "--name",
            dockerContainerName,
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "python",
            "sh",
            "-c",
            "python3 /$executableFilename < /$inputFilePath > /$outputFilePath")
        executeProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        )
        if (!isFinished) {
            ProcessBuilder("docker", "kill", dockerContainerName).start().waitFor()
        }
        process.destroy()
        process.waitFor() // Wait for process terminated

        val isCorrupted = process.exitValue() != 0
        val executedTime = System.currentTimeMillis() - startTime

        val outputFile = File(outputFilePath)
        var output: String? = null
        if (outputFile.exists()) {
            output = outputFile.readText()
        }
        inputFile.delete()
        outputFile.delete()
        return IExecutor.Result(
            !isFinished,
            isCorrupted,
            executedTime.toDouble() / 1000.0,
            output
        )
    }
}
```

另外說明一下，在實作中應該會發現到 `const val` 常數在整個專案內各個檔案都可以存取，如果你希望這些常數只能在它所在的檔案內被讀到的話，可以使用 `private` 修飾字修飾它們即可。

```kotlin
// KotlinCompiler.kt
private const val KOTLIN_CODE_FILENAME = "_code.kt"
private const val KOTLIN_CODE_EXECUTABLE_FILENAME = "_code.jar"

// JVMExecutor.kt
private const val JVM_INPUT_FILENAME = "input.txt"
private const val JVM_OUTPUT_FILENAME = "output.txt"
private const val DOCKER_CONTAINER_NAME = "jvm-docker"

// GCCCompiler.kt
private const val GCC_CODE_FILENAME = "_code.c"
private const val GCC_CODE_EXECUTABLE_FILENAME = "_code"

// GCCExecutor.kt
private const val GCC_INPUT_FILENAME = "input.txt"
private const val GCC_OUTPUT_FILENAME = "output.txt"
private const val GCC_DOCKER_CONTAINER_NAME = "gcc-docker"

// PassThroughCompiler.kt
private const val PYTHON_CODE_FILENAME = "_code.py"

// PythonExecutor.kt
private const val PYTHON_INPUT_FILENAME = "input.txt"
private const val PYTHON_OUTPUT_FILENAME = "output.txt"
private const val PYTHON_DOCKER_CONTAINER_NAME = "python-docker"
```

## 拉出資料與批改流程變更

支援了這些語言的編譯和執行後，我們就要將相對應的程式碼從 Redis 的各個根據程式語言分開的 Task Queue 去拉出程式碼以進行批改。修改 `DatabaseSubmissionSource` 內從 Redis 資料庫拿資料的方法，將支援的語言字串變成一個字串陣列，並對其中每個支援的語言標示字串對其相對應的 Redis Task Queue 去拉取資料即可。底下是詳細的程式碼：

```kotlin
DatabaseSubmissionSource: ISubmissionSource {
    private val supportedLanguages = listOf("kotlin", "c", "java", "python")
    
    /* ...... 初始化連線區塊 ...... */

    override fun getNextSubmissionData(): SubmissionData? {
        try {
            jedis = jedis.getConnection()
            if (jedis == null) return null

            val currentJedisConnection = jedis!!
            for (language in supportedLanguages) {
                val isDataAvailable = currentJedisConnection.exists(language)
                if (!isDataAvailable) continue

                val data = currentJedisConnection.lpop(language)
                return jacksonObjectMapper().readValue(data)
            }
        }
        catch(e: Exception) {
            jedis?.disconnect()
            jedis == null
            println(e)
            return null
        }

        return null
    }
    /* ...... SetResult 的程式碼區塊 ...... */
}
```

最後在 `Application.kt` 對於不同程式語言拉出來的程式碼去產生出相對應的 `Judger` 物件即可。詳細程式碼如下：

```kotlin
fun main() {
    val submissionSource: ISubmissionSource = DatabaseSubmissionSource // FileSubmissionSource()

    while (true) {
        var submission = submissionSource.getNextSubmissionData()
        while (submission != null) {
            // 輸入程式語言進函式去生出相對應的 Judger
            val judger = getJudger(submission.language)

            val resultState = judger.judge(submission)
            submissionSource.setResult(submission.id, resultState.result, resultState.executedTime, resultState.totalScore)
            submission = submissionSource.getNextSubmissionData()
        }

        Thread.sleep(5000)
    }
}

// 根據各個語言選擇正確的 Judger 去進行編譯與執行的動作
fun getJudger(language: String): Judger =
    when(language) {
        "kotlin" -> Judger(KotlinCompiler(DOCKER_WORKSPACE), JVMExecutor(DOCKER_WORKSPACE))
        "c" -> Judger(GCCCompiler(DOCKER_WORKSPACE), GCCExecutor(DOCKER_WORKSPACE))
        "java" -> Judger(JavaCompiler(DOCKER_WORKSPACE), JVMExecutor(DOCKER_WORKSPACE))
        "python" -> Judger(PassThroughCompiler(DOCKER_WORKSPACE), PythonExecutor(DOCKER_WORKSPACE))
        else -> throw NotImplementedError()
    }
```

## 實作測試

先測試 C 語言的行為是否正常，送出底下的 HTTP request：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "c",
    "code": "#include<stdio.h>\n\nint main() { int a, b, c; scanf(\"%d%d%d\", &a, &b, &c); printf(\"%d\\n\", a + b + c); }",
    "problemId": 9
}
```

應該可以得到正確的結果：

```
Submission 105: Accepted - Score: 100 (2.152)
```

接著測試 Java 語言的行為是否正常，送出底下的 HTTP request:

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "java",
    "code": "import java.util.Scanner;\npublic class Main {\n public static void main(String[] args) {\nScanner input = new Scanner(System.in);\nint a = input.nextInt();\nint b = input.nextInt();\nint c = input.nextInt();\nSystem.out.println(a + b + c);\n}\n}",
    "problemId": 9
}
```

應該也可以得到正確的結果：

```
Submission 106: Accepted - Score: 100 (1.62)
```

最後測試 Python 語言的行為是否正常，送出底下的 HTTP request:

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "python",
    "code": "inputs = input().split(\" \");\na = int(inputs[0])\nb = int(inputs[1])\nc = int(inputs[2])\nprint(a + b + c)",
    "problemId": 9
}
```

應該也可以得到正確的結果：

```
Submission 107: Accepted - Score: 100 (1.298)
```

## 總結
今天我們終於完成了一個基本的審核程式要有的各種套件了，接著下來我們就要開始來打造如何使用這套審核系統的前端介面了，各位就敬請期待明天的內容吧！

## 參考資料
* [gcc - Docker Hub](https://hub.docker.com/_/gcc)
* [java的打包成jar方法 - 學而時習之](https://sites.google.com/site/waue0920/Home/java/java-de-da-bao-chengjar-fang-fa)
* [python - Docker Hub](https://hub.docker.com/_/python)
* [Python String to Int() and Int to String Tutorial: Type Conversion in Python](https://careerkarma.com/blog/python-string-to-int/)
