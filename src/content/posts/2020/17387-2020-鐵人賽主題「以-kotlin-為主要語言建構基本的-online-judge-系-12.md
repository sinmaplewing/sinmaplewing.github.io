---
id: 17387
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 12：建立可用指令編譯與執行 Kotlin
  程式碼的環境'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-12
date: '2020-09-12T10:33:44+08:00'
lastmod: '2020-09-12T23:55:37+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
featured_image: /uploads/2020/09/12.png
permalink: /2020/09/12/17387/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-12/
wp_status: publish
wp_type: post
---

![Day 12：建立可用指令編譯與執行 Kotlin 程式碼的環境](/uploads/2020/09/12.png)

昨天建立了可以將程式碼送進資料庫的系統後，接著我們就要能夠將這個程式碼編譯成可執行的程式，並將編譯出來的程式拿去執行，輸入我們預先設計好的內容，再看看該程式的輸出是否與我們所預期的輸出相同，就可以判斷其對錯。為了要達到這個目的，我們需要先了解的是，該怎麼編譯出一個程式並執行它。

## 程式編譯與執行的流程

![程式碼的執行解說](/uploads/2020/09/compiler.png)

常見的程式碼執行方式有三種：

1. 透過編譯器將程式碼變成執行檔後，在該編譯出的執行擋可執行之平台執行。好處是可直接利用該平台之機器語言直接執行，速度較快；但壞處是無法將執行檔拿到別的平台上執行，要在該平台重新編譯程式碼才行。這一類常見的程式語言像是 C、C++ 等等。
2. 透過編譯器變成中間碼檔案，此中間碼檔案可利用各平台能夠執行該中間碼的程式進行執行。好處是可以將中間碼檔案發布給各平台的使用者，各平台的使用者只要下載能夠執行該中間碼的程式就可以執行；壞處是比第一種方法稍微慢了一點。這一類常見的程式語言像是 JAVA、Kotlin ，它們可以使用 JVM 去運行其編譯出來的 Java Bytecode。
3. 直接用直譯器去執行程式碼。好處是只要把程式碼丟給別人，別人只要安裝該平台的直譯器即可進行執行；壞處是程式碼會被看到，並且執行時由於還要翻譯程式碼，所以運行速度也是三種最慢的。這一類常見的程式語言像是 Ruby、Python 等等語言，甚至瀏覽器本身也可以算是 HTML、CSS 和 JavaScript 的直譯器。

那以我們這裡要能夠執行別人遞交的 Kotlin 程式碼，勢必要安裝兩個東西：一個是編譯 Kotlin 語言的編譯器，另外一個是執行編譯出來的 Java Bytecode 的 JVM 程式。那就讓我們開始來安裝這兩個東西吧！

## 安裝編譯器

### MacOS X

在 MacOS X 中，有可以管理軟體套件安裝的好用工具，名字叫做 [Homebrew](https://brew.sh)，安裝的方式是在終端機內輸入下面的這串指令：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

安裝完 Homebrew 後，接著利用[官網下載頁面](https://kotlinlang.org/docs/tutorials/command-line.html)提供的下載方式，輸入下面的指令即可安裝完 Kotlin：

```sh
brew update
brew install kotlin
```

### Ubuntu

可以用內建的 Snap 套件管理來進行安裝，輸入下面這段指令即可安裝完成。

```sh
sudo snap install --classic kotlin
```

### 其餘的 Linux 系統

可以使用 SDKMAN! 來進行安裝，首先先安裝 SDKMAN!，輸入下面這段指令：

```sh
curl -s https://get.sdkman.io | bash
```

接著安裝 Kotlin 編譯器即可：

```sh
sdk install kotlin
```

### Windows

Windows 的安裝要能夠在「命令提示字元」中使用會相對麻煩一點，首先先根據官網上面的說明，點選下載頁面的 Github 網站的網頁，下載指定的 `kotlin-compiler-1.4.10.zip` 檔案（檔案名稱可能會隨版本變化，理論上應該都會是 `kotlin-compiler-x.x.x.zip` 的形式）

![Kotlin Compiler 下載頁面](/uploads/2020/09/截圖-2020-09-12-上午9.28.28.png)

![Kotlin Compiler 於 Github 的下載頁面](/uploads/2020/09/截圖-2020-09-12-上午9.34.02.png)

解壓縮以後會看到一個 `kotlinc` 的資料夾，裡面有一個 `bin` 的資料夾存放的是 Kotlin 編譯器的執行檔。接著我們要讓「命令提示字元」可以直接使用它，所以要在環境變數中增加可以直接使用這個資料夾內的檔案的路徑。底下先搜尋「環境變數」，會看到「編輯系統環境變數」的項目。

![環境變數設定](/uploads/2020/09/截圖-2020-09-12-上午9.39.22.png)

接著點擊「環境變數(N)...」，然後在上面的變數中找到 `Path`，對其進行編輯。

![進入環境變數，編輯 Path](/uploads/2020/09/截圖-2020-09-12-上午9.42.32.png)

在裡面新增你剛剛下載 Kotlin 編譯器的 `bin` 資料夾路徑即可。

![新增路徑至 Path](/uploads/2020/09/截圖-2020-09-12-上午9.46.00.png)

## 安裝 Java

為了要能執行 Kotlin 編譯出來的 Java Bytecode，我們要來安裝 Java，安裝流程比較簡單，上 [Java 的官方網站](https://www.java.com/zh_TW/) 點擊「免費 Java 下載」，會進到各作業系統不同的下載頁面，點擊「同意並開始免費下載」即可。

![Java 官網](/uploads/2020/09/截圖-2020-09-12-上午9.50.23.png)

![Java 下載頁面](/uploads/2020/09/截圖-2020-09-12-上午9.50.29.png)

## 用指令編譯並執行程式碼

我們來編譯一個簡單的 `Hello, World!` 程式，底下是一個用 Kotlin 語法寫出來的簡單程式：

```kotlin
fun main() {
    println("Hello, World!")
}
```

將之存成一個檔案，名為 `hello_world.kt`，並存放在隨意的一個資料夾內。接著利用「終端機」或「命令提示字元」進入該資料夾，進入的過程可以使用 `ls` 或 `dir` 去顯示當下的目錄裡面有哪些資料、`cd [資料夾名稱]` 可以進入該資料夾以及 `cd ..` 可以回到上一層目錄。

進到該資料夾後利用底下指令對其進行編譯：

```sh
kotlinc hello_world.kt -include-runtime -d hello_world.jar
```

基本上這個指令就是呼叫 `kotlinc` 這個程式，對 `hello_world.kt` 這個檔案，編譯成可被 `java` 程式直接執行的 `hello_world.jar` 檔案，所以你會看到該資料夾多了一個 `hello_world.jar` 的檔案。

![hello_world.jar 檔案的產生](/uploads/2020/09/截圖-2020-09-12-上午10.10.01.png)

最後我們就可以對該 `hello_world.jar` 檔案用 `java` 程式執行，底下是執行的指令：

```sh
java -jar hello_world.jar
```

指令執行後應該就會看到 `Hello, World!` 的字串了，那關於 Kotlin 語言的編譯和執行環境就建立完成了。

## 總結

今天我們讓我們所使用的操作環境（作業系統）可以直接呼叫指令去對一個簡單的 Kotlin 檔案進行編譯與執行，明天我們就要利用 Kotlin 語言去呼叫這些指令，讓它對別人遞交過來的 Kotlin 程式碼去進行編譯與執行，就請各位期待一下明天的內容吧！

## 參考資料
* [Working with the Command Line Compiler - Kotlin Programming Language](https://kotlinlang.org/docs/tutorials/command-line.html)
* [Java | Oracle](https://www.java.com/zh_TW/)
* [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh)
* [Home - SDKMAN! the Software Development Kit Manager](https://sdkman.io)
* [Snapcraft - Snaps are universal Linux packages](https://snapcraft.io/#)
* [Packt Subscription | Learn more for less](https://subscription.packtpub.com/book/application_development/9781787126367/1/ch01lvl1sec7/using-the-command-line-to-compile-and-run-kotlin-code)
