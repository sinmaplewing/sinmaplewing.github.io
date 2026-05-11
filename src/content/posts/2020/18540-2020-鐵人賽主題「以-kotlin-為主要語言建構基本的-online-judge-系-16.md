---
id: 18540
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 16：程式執行與審核系統 (4) - 利用
  Docker 編譯程式碼與執行程式'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-16
date: '2020-09-16T08:46:26+08:00'
lastmod: '2020-09-17T17:46:58+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Docker
featured_image: /uploads/2020/09/16.png
permalink: /2020/09/16/18540/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-16/
wp_status: publish
wp_type: post
---

![Day 16：程式執行與審核系統 (4) - 利用 Docker 編譯程式碼與執行程式](/uploads/2020/09/16.png)

昨天我們成功地讓審核系統能夠審核出使用者遞交的程式碼的各種結果，但直接把使用者提交的程式碼編譯起來放在主機上執行似乎有點危險，例如以現在的專案為例，假設我們送出下面的這個 HTTP request 給伺服器端（警告：先看完本段再決定要不要送）：

```http
POST https://0.0.0.0:8080/submissions
Content-Type: application/json

{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt(); val b = inputs[1].toInt(); val c = inputs[2].toInt(); ProcessBuilder(\"rm\", \"src/main/kotlin/ICompiler.kt\").start().waitFor()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

雖然這個程式碼的執行結果應當是 `AC` 沒錯，但它中間卻故意穿插了一段刪除某個特定檔案的程式碼，你如果有試著送送看的話，應該就會發現你專案裡面的 `ICompiler.kt` 檔案被砍掉了。這也可以讓你比較簡單地了解到，直接在主機上執行別人所送過來的程式是一件非常危險的事情。

## 虛擬機器與容器

那有沒有什麼辦法是可以讓我們比較安全地去執行程式呢？如果以前有試著灌過別的作業系統在自己的電腦上的話，應該有看過資料說：可以在原本的作業系統上使用虛擬機器去灌其他的作業系統。這樣如果你在這個虛擬機器裡面亂搞，導致虛擬機器裡面的作業系統壞光光，也不會影響到主機真正在跑的作業系統的運作。這個概念或許我們可以拿來運用，例如我們可以把使用者提交的程式碼放進虛擬機器裡面執行，然後得到結果再拿出來比較。雖然這個想法其實是可以的，但是虛擬機器要跑起來，還需要再另外開啟一個作業系統，其流程之繁瑣或許讓拿來執行一個 `a + b + c` 這麼簡單的程式來說，有點殺雞焉用牛刀了。

既然虛擬機器的啟動代價是如此地昂貴，那有沒有什麼其他辦法可以達到類似的效果呢？在這裡提供一個叫做容器的概念給大家參考。容器就是基於原本的作業系統，想辦法在主作業系統上，分配部分的資源去建立起一個與外部隔離的環境。這個環境的設定可以包裝各種你所需的函式庫、程式等等軟體在裡面，並且利用這個設定去建立起一個實際的環境之後，就可以在該環境內去執行你想執行的程式。利用容器這樣的概念，我們就可以不用為了跑一個簡單的程式，而去生出一台虛擬機器、建立一組虛擬硬體，並且開啟另外一個作業系統。詳細的架構圖如下所示：

![虛擬機器與容器架構比較圖](/uploads/2020/09/VM-Container.png)

## 安裝 Docker

![Docker 的 Logo（來自 https://www.docker.com/company/newsroom/media-resources）](/uploads/2020/09/horizontal-logo-monochromatic-white.png)

粗略了解了容器的概念後，我們就要來使用能夠幫助我們建立並且管理容器的軟體了。目前在這個領域最有名的軟體大概就非 Docker 莫屬了，在這裡我們就先來安裝 Docker 吧！點官網的 [Get Started 頁面](https://www.docker.com/get-started)，可以看到下面有一個 `Docker Desktop` 的選項，裡面有各種作業系統的安裝檔，直接下載下來安裝即可。

![Docker 的安裝頁面](/uploads/2020/09/截圖-2020-09-15-下午10.00.12.png)

安裝完後，你可以點擊開來，應該會出現 Docker 的教學，有興趣可以玩玩看，如果想直接先忽略的話也沒有關係。

![Docker 教學頁面](/uploads/2020/09/截圖-2020-09-13-下午8.23.52.png)

在安裝完以後，理論上你的「終端機」就可以直接輸入 `docker` 的指令了。

## Docker 的基本使用

要了解 Docker 的話，可以先大概了解一下主要在使用 Docker 時會碰到的三個常見名詞：

1. Image（映像檔）：即環境的模板，有點像是你所設定好的環境的包裝檔，透過這個包裝檔，你可以建立起好幾個一樣設定的環境實體去使用。
2. Container（容器）：就是指建立出來的環境實體，可以在裡面運行你的指令或程式。
3. Repository（倉庫）：這是集中各種不同映像檔的地方，例如像是 GitHub 就是集中各種程式碼的倉庫一般。那透過連接網路上可以存放 Docker 映像檔的倉庫，你就可以去拉取你想要的映像檔來用。

粗略地了解了這三個名詞後，就讓我們先來試一下 Docker 吧！首先先從網路上的倉庫拉取一個 Ubuntu 18.04 的環境映像檔下來，在「終端機」輸入下方指令：

```sh
docker pull ubuntu:18.04
```

接下來應該就會看到在下載了。那下載完後，可以先利用 `docker images` 這個指令確認一下是否有下載好 Ubuntu 18.04 版本的映像檔，應該會看到列表裡面出現了代表 Ubuntu 18.04 的映像檔資料在裡面，如下所示：

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              18.04               6526a1858e5d        3 weeks ago         64.2MB
```

那接著我們就可以來利用這個映像檔創建出一個容器，利用 `docker run -it ubuntu:18.04` 即可建立出一個 Ubuntu 18.04 的容器，並且由於使用了 `-it` 的參數，在執行該容器以後我們就會直接進入容器內與其互動。那執行後你會發現，操作上就好像進入了另外一個 Linux 作業系統一般，可以利用一些系統指令探索一下這個容器內部，接著輸出 `exit` 就可以離開 Ubuntu 18.04 的容器。

離開後可以輸入 `docker ps -a` 來查看現在建立起來的容器，如下所示：

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
19fdccae86d5        ubuntu:18.04        "/bin/bash"              31 seconds ago      Exited (0) 22 seconds ago                            hungry_hopper
```

你會看到我們雖然已經離開剛剛啟動的容器，但是似乎還存在在 Docker 的管理列表內。那如果想要移除掉它的話，可以使用 `docker rm [Container ID]` 來砍掉該容器。關於 Docker 的基本使用就暫時先介紹到這裡，未來如果有碰到其他的 Docker 操作會在那時再進行介紹。

那接下來為了要能夠在 Docker 容器內進行 Kotlin 的編譯與執行，我們要先拉下具有 Kotlin 編譯器與 JVM 軟體的環境映像檔。在這裡我們可以使用別人包裝好的映像檔 `zenika/kotlin` 來使用，在「終端機」輸入 `docker pull zenika/kotlin` 指令，然後利用 `docker images` 確認一下該映像檔是否存在，有了的話那我們就可以開始來將審核系統內的編譯指令與執行指令改換成 Docker 指令吧！

## 使用 Docker 實作編譯程式碼與執行程式的動作

首先，為了要讓容器裡面的環境能夠讀取到我們的程式碼，我們會需要讓主體作業系統分享一個資料夾位置給容器，讓容器可以透過自己的檔案系統讀取到分享的資料夾內的內容。那要達到這個目的之前，我們會需要把輸入檔、輸出檔和執行檔的位置前面加上一個資料夾的名稱，讓這些檔案會被集中在一個資料夾內管理，我在這裡將其命名為 `workspace`，並定義在 `Application.kt` 的地方，讓主程式將該資料夾餵給 `ICompiler` 和 `IExecutor` 的實作，如下所示：

```kotlin
const val DOCKER_WORKSPACE = "workspace" // 增加這行定義

fun main() {
    /* ...... 前面的程式碼 ...... */
        while (submission != null) {
            // 餵入資料夾名稱
            val judger = Judger(KotlinCompiler(DOCKER_WORKSPACE), JVMExecutor(DOCKER_WORKSPACE))

            /* ...... 後面的程式碼 ...... */
        }

    /* ...... 後面的程式碼 ...... */
}
```

接著先來看一下編譯部分的實作 `KotlinCompiler` 的建構式程式碼：

```kotlin
class KotlinCompiler(val workspace: String): ICompiler {
    init {
        Files.createDirectories(Paths.get(workspace))
    }

    /* ...... compile() 的部分 ...... */
}
```

`KotlinCompiler` 在得到資料夾名稱後，會在建構式的時候利用 `Files.createDirectories()` 這個函式去建立該資料夾出來，路徑的部分不能是一個純字串，要利用 `Paths.get()` 函式去轉成路徑物件。`Files.createDirectories()` 這個函式在資料夾已存在的狀況下會直接不做任何事情，所以前面可以不用檢查資料夾是否存在。

```kotlin
class KotlinCompiler(val workspace: String): ICompiler {
    /* ...... init 的部分 ...... */

    override fun compile(code: String): String {
        // 檔案前面加上 workspace 的資料夾路徑
        val codeFilePath = workspace.appendPath(KOTLIN_CODE_FILENAME)
        val executableFilePath = workspace.appendPath(KOTLIN_CODE_EXECUTABLE_FILENAME)
        val codeFile = code.writeToFile(codeFilePath)

        // 使用 Docker 指令進行編譯
        val compileProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "zenika/kotlin",
            "kotlinc",
            "/$codeFilePath",
            "-include-runtime",
            "-d",
            "/$executableFilePath")

        // 將指令輸出錯誤的方式導向到主控台上
        compileProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        compileProcess.start().waitFor()

        codeFile.delete()
        return executableFilePath
    }
```

那繼續往下來到 `KotlinCompiler.compile()` 這裡，我們將原本的檔案前面都先接上 `workspace` 這個資料夾路徑。這裡擴充了 `String` 這個類別，新增了一個 `String.appendPath()` 的函式來方便我們處理路徑銜接的問題，其定義如下。基本上就是確認要銜接的兩個字串中間是否已經存在 `/`，如果有的話，在處理的時候就不用另外加一個 `/`；如果沒有的話就加一個 `/` 上去。

```kotlin
// FilenameExtension.kt
fun String.appendPath(nextSegment: String) =
    if (this.endsWith('/')) this + nextSegment
        else "$this/$nextSegment"
```

了解 `String.appendPath()` 後，我們再回來看 `KotlinCompiler.compile()` 的程式碼，裡面的 `compileProcess` 物件要執行的指令變成了 `docker run --rm -v ${System.getProperty("user.dir").appendPath(workspace)}:/$workspace zenika/kotlin kotlinc /$codeFilePath -include-runtime -d /$executableFilePath` 這麼長的一串指令。為了要能夠理解這串指令在說什麼，我們就一步一步來拆解這個指令吧！

首先 `docker run [映像檔名稱] [指令]` 的意思是可以利用該映像檔生出一個容器，直接在容器內執行後面所輸入的指令，所以我們其實主要想要呼叫的就是 `docker run zenika/kotlin kotlinc [Code 於 Docker 容器內的路徑] -include-runtime -d [執行檔於 Docker 容器內的路徑]` 讓 Docker 利用 `zenika/kotlin` 所生出來的容器去編譯我們的程式碼。

那在 `docker run` 的指令上，我們用了兩個參數，一個是 `--rm`，其用途就是在我們執行完指令後，可以不用再下 `docker rm` 的指令去刪除容器，直接在執行完指令後， Docker 就可以幫我們刪除掉了。那另外一個參數是 `-v`，它就是我們剛剛所說的，要將主系統的資料夾目錄掛給 Docker 容器內的檔案系統的目錄去使用，其格式是 `-v [主系統目錄位置]:[Docker 內容器檔案系統目錄位置]`，所以指令的這段內容其實就是要將 `workspace` 這個資料夾分享進容器內的 `/workspace` 這個位置上（Linux 在路徑最前面有 `/` 代表是位在其檔案系統根目錄的位置上）。那在主系統的目錄 `workspace` 前面，我們用了 `System.getProperty("user.dir")` 這個函式去獲得當前目錄的絕對路徑，避免使用相對路徑去造成最後路徑與預期不符的錯誤。

解釋完 Docker 的指令後，我們在建立了 `compilerProcess` 物件後加上了 `compileProcess.redirectError(ProcessBuilder.Redirect.INHERIT)` 這行程式碼。這行程式碼主要是讓執行指令所輸出的錯誤，會被導向輸出在審核系統執行時所使用的主控台上。`compileProcess.redirectError()` 函式就是用來導向執行指令時的錯誤輸出，而 `ProcessBuilder.Redirect.INHERIT` 則代表是繼承目前審核程式的輸出方式，也就是使用執行時的主控台去輸出錯誤內容。

編譯部分的程式碼改完後，接著來改執行部分的實作 `JVMExecutor` 內的程式碼，一樣先從建構式開始看：

```kotlin
class JVMExecutor(val workspace: String): IExecutor {
    init {
        Files.createDirectories(Paths.get(workspace))
    }
    /* ...... execute() 的部分 ...... */
```

與編譯部分的建構式一樣，去建立傳入的 `workspace` 資料夾，如果存在的話就不做任何事情。

```kotlin
const val DOCKER_CONTAINER_NAME = "jvm-docker"

class JVMExecutor(val workspace: String): IExecutor {
    /* ...... init 的部分 ...... */

    override fun execute(executableFilename: String, input: String, timeOutSeconds: Double): IExecutor.Result {
        /* 增加 workspace 資料夾於檔案前 */
        val inputFilePath = workspace.appendPath(JVM_INPUT_FILENAME)
        val outputFilePath = workspace.appendPath(JVM_OUTPUT_FILENAME)
        val inputFile = input.writeToFile(inputFilePath)
        
        val startTime = System.currentTimeMillis()
        /* 使用 Docker 來執行程式 */
        val executeProcess = ProcessBuilder(
            "docker",
            "run",
            "--rm",
            "--name",
            DOCKER_CONTAINER_NAME,
            "-v",
            "${System.getProperty("user.dir").appendPath(workspace)}:/$workspace",
            "zenika/kotlin",
            "sh",
            "-c",
            "java -jar /$executableFilename < /$inputFilePath > /$outputFilePath")
        executeProcess.redirectError(ProcessBuilder.Redirect.INHERIT)
        val process = executeProcess.start()
        val isFinished = process.waitFor(
            (timeOutSeconds * 1000).toLong(),
            TimeUnit.MILLISECONDS
        )

        /* 如果 TLE 的話，除了砍掉執行的指令，還要讓 Docker 去砍掉該 Container 才行。
        if (!isFinished) {
            ProcessBuilder("docker", "kill", DOCKER_CONTAINER_NAME).start().waitFor()
        }
        process.destroy()
        process.waitFor() // Wait for process terminated

        val isCorrupted = process.exitValue() != 0
        val executedTime = System.currentTimeMillis() - startTime
        
        /* 改使用指令型式的輸入輸出導向後，檔案不見得會存在，所以 output 從 String 變成了 String? */
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

那繼續看到 `JVMExecutor.execute()` 的程式碼部分，裡面大概有四個地方有進行內容上的改動。首先是與編譯部分的檔案一樣，會在要使用的檔案名稱前面加上 `workspace` 的資料夾名稱。再來是改用 Docker 指令來執行程式，這裡執行的指令整體為 `docker run --rm --name DOCKER_CONTAINER_NAME -v ${System.getProperty("user.dir").appendPath(workspace)}:/$workspace zenika/kotlin sh -c 'java -jar /$executableFilename < /$inputFilePath > /$outputFilePath'`，一樣我們來解析一下這段指令做了什麼事情。

為了要讓執行檔執行時所使用到的標準輸入輸出方式變成使用檔案的方式來進行輸入輸出處理（也就是要將鍵盤輸入以及螢幕輸出的方式，去導向變成使用檔案做輸入輸出），這裡利用指令原有的方式去進行輸入輸出的導向動作：`< [輸入檔案名稱]`（將標準輸入方式導向使用後面的檔案進行輸入）和 `> [輸出檔案名稱]`（將標準輸出檔案方式導向使用後面的檔案進行輸出）。所以整體執行指令就變成為 `java -jar [執行檔於 Docker 容器內的路徑] < [輸入檔於 Docker 容器內的路徑] > [輸出檔於 Docker 容器內的路徑]`。那為什麼不用之前的 `executeProcess.redirectInput()` 和 `executeProcess.redirectOutput()` 來做輸入輸出導向呢？原因是我們想要導向的是 Docker 容器內執行的指令，而非執行 Docker 的指令，你可以使用上面兩個函式來做導向看看，程式應該就會卡住，表示 Docker 容器內執行的程式收不到導向後的輸入內容。

如果直接讓 Docker 執行上面我們組裝好的 `java -jar` 指令的話，還是會有分不清楚到底最後面的輸入和輸出的導向是 Docker 要執行的指令做導向，還是整個呼叫 Docker 的指令要做輸入和輸出的導向的問題。所以我們讓 Docker 容器執行 `sh -c [指令]` 這個指令。`sh` 就是一個可以在作業系統內用來執行指令的程式，全稱是 `Shell` 程式。後面接 `-c` 表示要執行的指令為何，所以我們就在 `-c` 後面接上 `java -jar [執行檔於 Docker 容器內的路徑] < [輸入檔於 Docker 容器內的路徑] > [輸出檔於 Docker 容器內的路徑]` 即可。加上呼叫 Docker 的指令，全部合起來就為 `docker run zenika/kotlin sh -c 'java -jar /$executableFilename < /$inputFilePath > /$outputFilePath'`。

而跟編譯時的指令一樣，我們會利用 `--rm` 來讓容器執行完後就直接被砍掉，以及利用 `-v` 來分享資料夾。那剩下一個參數 `--name` 是做什麼用的呢？這個是用來給生出來的容器命名，我們將這個容器命名為 `DOCKER_CONTAINER_NAME` 常數所定義的值，那為什麼編譯時期不用為容器命名，而這裡卻要呢？原因是如果我們讓 Docker 容器執行一個無窮迴圈的程式的話，由於該容器沒有執行完，它就會讓程式一直卡在那裡，這時如果單純只要求將執行 Docker 指令的 `Process` 物件給砍掉的話，還是必須要等待 Docker 容器執行完才能真正將該 `Process` 物件砍掉，所以當我們碰到程式 `TLE` 的時候，我們要先使用 `docker kill [容器名稱]` 的指令，來讓 Docker 可以直接砍掉還在運行中的容器，這樣審核程式才能將執行 Docker 指令的 `Process` 給砍掉。

最後，由於我們不再使用 `File` 物件的方式來先建立檔案去讓程式輸出，所以檔案不見得會存在，這時 `output` 變數就有可能會是 `null` 的狀況，我們就必須將 `output` 從型態 `String` 改為 `String?`，並且要先判斷輸出檔案是否存在才能做讀取。因為這樣的型態改動，所以連帶會有幾個地方也要跟著修改，第一個是 `IExecutor.Result` 的定義：

```kotlin
interface IExecutor {
    data class Result(
        /* ...... 其他欄位 ...... */
        val output: String? // 更改這裡的型態
    )

    /* ...... execute() ...... */
}
```

第二個是 `Judger.execute()` 使用到 `IExecutor.execute()` 的地方：

```kotlin
class Judger(val compiler: ICompiler, val executor: IExecutor) {
    /* ...... 前面的程式碼 ...... */

   private fun execute(executableFilename: String, testCases: List<TestCaseData>): ResultState {
        /* ...... 定義變數的部分 ...... */

        for (testCase in testCases) {
            /* ...... 執行部分的程式碼 ...... */
            if (result == null) return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)
            if (result.isTimeOut) return ResultState(Result.TimeLimitExceeded, NO_EXECUTED_TIME, NO_SCORE)
            if (result.isCorrupted) return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)

            // 使用 ?. 和 ?: 去處理 null 的情況 
            val output = result.output?.trim() ?: return ResultState(Result.RuntimeError, NO_EXECUTED_TIME, NO_SCORE)
            val expectedOutput = testCase.expectedOutput.trim()
            if (output == expectedOutput) {
                totalScore += testCase.score
            } else {
                isCorrect = false
            }

            /* ...... 計算總時間的地方 ...... */
        }

        /* ...... 回傳的地方 ...... */
    }
}
```

大致上這樣改完程式就可以利用 Docker 對程式碼進行編譯並執行了。

## 實作測試

測試的部分，可以利用與昨天相同的測試資料進行測試即可，底下直接列出各個測試所遞送的 JSON 資料與結果。

### AC

```
// 遞送的資料
{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}

// 結果
Submission 66: Accepted - Score: 100 (1.568)
```

### WA

```
// 遞送的資料
{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a * b + c + 1}\")\n}",
    "problemId": 9
}

// 結果
Submission 67: WrongAnswer - Score: 50 (1.5830000000000002)
```

### TLE

```
// 遞送的資料
{
    "language": "kotlin",
    "code": "fun main() {\n while (true) println(\"Hi!\")\n}",
    "problemId": 9
}

// 結果
Submission 68: TimeLimitExceeded - Score: 0 (-1.0)
```

### RE

```
// 遞送的資料
{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[9999].toInt()\n val b = inputs[1].toInt()\n val c = inputs[2].toInt()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}

// 結果
Exception in thread "main" java.lang.IndexOutOfBoundsException: Index 9999 out of bounds for length 3
	at java.base/jdk.internal.util.Preconditions.outOfBounds(Preconditions.java:64)
	at java.base/jdk.internal.util.Preconditions.outOfBoundsCheckIndex(Preconditions.java:70)
	at java.base/jdk.internal.util.Preconditions.checkIndex(Preconditions.java:248)
	at java.base/java.util.Objects.checkIndex(Objects.java:372)
	at java.base/java.util.ArrayList.get(ArrayList.java:459)
	at _codeKt.main(_code.kt:3)
	at _codeKt.main(_code.kt)
Submission 69: RuntimeError - Score: 0 (-1.0)
```

### CE

```
// 遞送的資料
{
    "language": "kotlin",
    "code": "XDDDDD",
    "problemId": 9
}

// 結果
orkspace/_code.kt:1:1: error: expecting a top level declaration
XDDDDD
^
Submission 70: CompileError - Score: 0 (-1.0)
```

與昨天不同的地方大概有兩處：

1. 執行時間比昨天長。原因是因為這次又要加上生出 Docker 容器的時間，如果你擔心這樣會超過測資所規定的時間，可以在時間限制上加上一個固定的數值，好讓時限去包含 Docker 容器生成所需要的時間。
2. 程式碼的錯誤資訊會印出來。原因是我們將指令錯誤的輸出導向到了主控台上，所以就會看到指令執行所噴出來的錯誤為何。

最後你可以再次傳遞會砍掉檔案的程式碼，試試看是否你的 `ICompiler.kt` 不會再被刪除了。（底下的路徑部分已經改成從 `workspace` 資料夾作為基底時 `ICompiler.kt` 所在的相對路徑了）

```json
{
    "language": "kotlin",
    "code": "fun main() {\n val inputs = readLine()!!.split(' ')\n val a = inputs[0].toInt(); val b = inputs[1].toInt(); val c = inputs[2].toInt(); ProcessBuilder(\"rm\", \"../src/main/kotlin/ICompiler.kt\").start().waitFor()\n println(\"${a + b + c}\")\n}",
    "problemId": 9
}
```

## 總結
今天我們讓程式能夠被隔離在 Docker 容器中去執行，那麼接下來審核系統還有什麼事情要處理呢？由於我們希望能夠跑多個審核系統去加速批改作業，你可以將審核系統的專案再多複製一份，並將兩份專案都跑起來，丟筆程式碼去讓他們跑跑看。結果令人意外的是，兩個專案竟然都批改了同一筆程式碼，究竟該怎麼分配批改工作給多個審核系統呢？就請各位敬請期待明天的內容囉！

## 參考資料
* [Docker 基礎教學與介紹 101. 何謂容器虛擬化、介紹 Docker 三元素、手把手建立 Docker… | by 胡程維｜Cheng-Wei Hu | HcwXd | Medium](https://medium.com/unorthodox-paranoid/docker-tutorial-101-c3808b899ac6)
* [Zenika/docker-kotlin: Kotlin docker images built upon official openjdk images.](https://github.com/Zenika/docker-kotlin)
* [Docker run reference | Docker Documentation](https://docs.docker.com/engine/reference/run/)
* [Article | Compile code with Docker](https://nextbreakpoint.com/posts/article-compile-code-with-docker.html)
* [How to get the current working directory in Java? - Stack Overflow](https://stackoverflow.com/questions/4871051/how-to-get-the-current-working-directory-in-java)
* [java - Create a directory if it does not exist and then create the files in that directory as well - Stack Overflow](https://stackoverflow.com/questions/28947250/create-a-directory-if-it-does-not-exist-and-then-create-the-files-in-that-direct)
* [Bash / Docker exec: file redirection from inside a container - Stack Overflow](https://stackoverflow.com/questions/31438112/bash-docker-exec-file-redirection-from-inside-a-container)
* [What is the sh -c command? - Ask Ubuntu](https://askubuntu.com/questions/831847/what-is-the-sh-c-command)
* [docker kill | Docker Documentation](https://docs.docker.com/engine/reference/commandline/kill/)
