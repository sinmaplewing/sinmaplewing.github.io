---
id: 20719
title: '#2020 鐵人賽主題「以 Kotlin 為主要語言建構基本的 Online Judge 系統」Day 25：批改系統網頁 (7) - 在本地端測試環境中建立
  HTTPS 連線'
slug: 2020-鐵人賽主題「以-kotlin-為主要語言建構基本的-online-judge-系-25
date: '2020-09-25T08:55:36+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- 2020鐵人賽
- Kotlin
- Ktor
- SSL
- TLS
- HTTPS
- mkcert
featured_image: /uploads/2020/09/25fb.png
permalink: /2020/09/25/20719/2020-%e9%90%b5%e4%ba%ba%e8%b3%bd%e4%b8%bb%e9%a1%8c%e3%80%8c%e4%bb%a5-kotlin-%e7%82%ba%e4%b8%bb%e8%a6%81%e8%aa%9e%e8%a8%80%e5%bb%ba%e6%a7%8b%e5%9f%ba%e6%9c%ac%e7%9a%84-online-judge-%e7%b3%bb-25/
wp_status: publish
wp_type: post
---

![Day 25：批改系統網頁 (7) - 在測試環境中建立 HTTPS 連線](/uploads/2020/09/25fb.png)

昨天我們建立了登入頁面，但是卻遇到了連線不安全，無法進行跨領域修改 Cookie 的問題。究竟我們該如何建立一個安全的網路，來讓我們的資料管理系統能夠順利地去修改批改系統網頁這邊的 Cookie 值呢？

## SSL、TLS 以及 HTTPS

在網路傳輸的 Protocol 中，最常見的安全加密驗證方式就是使用 HTTPS（Hyper Text Transfer Protocol Secure）的方式傳遞資料。HTTPS 表示網站受到了 SSL/TLS 憑證的保護，資料傳輸之間會進行加密與驗證，以確保資料不會被竄改或是被竊取。而 SSL（Secure Sockets Layer）為一種用於保護網路傳輸以及防止資料在傳輸中間被人竊取的標準技術，可以防止之前我們在第十天的 MitM（中間人攻擊）的資安問題。不過由於 SSL 已經開始有安全性的問題出現，所以目前大多都是換成使用 TLS（Transport Layer Security）技術在處理安全傳輸資料的事情。TLS 是更新且更安全的 SSL 版本，一般現在提到 SSL 這個技術時，通常都是指 TLS 的意思，有時我們也可以將它用 SSL/TLS 來表示。

伺服器端必須先設定一份 SSL/TLS 憑證，藉以讓伺服器了解該如何對資料進行驗證、加密與解密，接著伺服器就會以 HTTPS 的 Protocol 去與客戶端進行溝通，在溝通過程中就會利用憑證對資料進行加密的傳輸與驗證，詳細的流程可以透過查找 `SSL`、`TLS` 或是 `HTTPS` 來了解，這裡就先不贅述了。主要在這裡想強調的是，如果要讓資料管理系統去修改網頁這邊的 Cookie 值，我們勢必要先讓資料管理系統支援 SSL/TLS 的連線機制才行，那究竟該如何做呢？

## 建立測試用的 HTTPS 連線

為了要讓 SSL/TLS 憑證能夠被正常的使用，其生成的要求會蠻麻煩的。你會需要一個能夠生成並認證其憑證具有合法效力的數位憑證認證機構（Certificate Authority，縮寫為CA），來進行發放憑證與認證憑證的工作。一般常見可以使用的機構像是「Let's Encrypt」，其為一個可以免費使用且生成憑證過程也比較不會太麻煩的 CA。但是如果我們現在只是要在測試環境建立這樣的連線，有沒有比較簡單的做法呢？我們可以使用 `mkcert`、`openssl` 與 `keytool` 來生成可以讓 Ktor 運作的 SSL/TLS 憑證。首先，先讓我們安裝這些套件吧！

`mkcert` 的安裝方式可以見[這個網站](https://github.com/FiloSottile/mkcert)的 `Installation` 區塊，而 `openssl` 則在一般的 Unix 和Linux 系統內應該都有內建，如果是 Windows 的話可以來[這個頁面](https://www.openssl.org/source/)進行下載。`keytool` 的部分在有安裝 Java 的情況下，應該就會有這個指令，你可以嘗試看看。

首先先利用終端機輸入以下指令，來讓自己的電腦變成一個本地端的 CA：

```sh
mkcert -install
```

接著就來生成允許常見的本地端網域的 SSL/TLS 憑證，輸入以下指令：

```sh
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

生成完以後會產生出 `./example.com+5.pem` 憑證檔和 `./example.com+5-key.pem` 鑰匙檔這兩個檔案。有了這兩個檔案後，接著就將它們利用 OpenSSL 生成相對應的 `.p12` 檔案。

```sh
openssl pkcs12 -export -out ./keystore.p12 -inkey ./example.com+5-key.pem -in ./example.com+5.pem -name devtest
```

接著可能會需要輸入一個密碼，這裡由於是測試的環境，可以指定一個簡單的密碼即可。設定完後，會輸出 `keystore.p12` 這個檔案，再利用 `keytool` 讀取 `keystore.p12` 檔案後，生成出 `keystore.jks` 這個檔案即可，中間需要輸入的密碼與剛剛指定使用的密碼相同就可以了。

```sh
keytool -importkeystore -alias devtest -destkeystore ./keystore.jks -srcstoretype PKCS12 -srckeystore ./keystore.p12
```

最後，將生成出來的 `keystore.jks` 放置進資料管理系統專案的根目錄中，接著將專案中的 `resources/application.conf` 裡面增加使用 HTTPS 連線的 port，以及要加密使用的檔案和密碼即可，如下所示：

```kotlin
ktor {
    deployment {
        port = 8081
        port = ${?PORT}
        sslPort = 8082
        sslPort = ${?PORT_SSL}
    }

    /* ...... 中間的部分 ...... */

    security {
        ssl {
            keyStore = keystore.jks
            keyAlias = devtest
            keyStorePassword = [剛設定的密碼]
            privateKeyPassword = [剛設定的密碼]
        }
    }
}
```

在這裡我們將 HTTPS 連線所使用的 port 設定在 8082，這樣就可以在批改系統網頁專案中，將 `Fetcher` 所使用的 `DATA_URL` 換成 `https://127.0.0.1:8082` 這個網址，讓批改系統網頁專案與資料管理系統進行 HTTPS 連線。

## 實作測試

重新開啟批改系統網頁，在登入頁面的部分輸入帳號密碼，如下圖所示：

![於登入頁面輸入帳號密碼的截圖](/uploads/2020/09/截圖-2020-09-24-下午10.36.08.png)

接著登入後可能會發現，雖然導向回了首頁，但好像還是沒有登入的狀態。

![回到首頁的狀態](/uploads/2020/09/截圖-2020-09-24-下午10.37.54.png)

但是在重新整理網頁後，就會看到右上角變成登入後的狀態了。

![登入後的網頁截圖](/uploads/2020/09/截圖-2020-09-24-下午10.38.51.png)

如果你使用 Safari 瀏覽器，並且在重新整理網頁後還是沒有成功登入的話，記得進「Safari」內的「偏好設定...」中，選擇「隱私權」的 Tab，將「網站追蹤：防止跨網站追蹤」的選項關掉，如下圖所示：

![將「網站追蹤：防止跨網站追蹤」關掉的截圖](/uploads/2020/09/截圖-2020-09-24-下午10.48.52.png)

## 總結

今天我們成功在測試環境中建立了 HTTPS 連線，並且能夠利用帳號密碼去登入會員系統了。不過在登入完成後，卻發現狀態無法即時地反應在右上方的元件中。如果你有試著思考看看怎麼解決這個問題的話，就會發現你必須將你從 `LoginForm` 得到的登入成功的資訊，往上傳給根節點，再傳下來到 `LoginStatus` 告知要重新確認會員登入的狀態。這條路線實在有點過於複雜，究竟我們能不能有更方便的方式去更新這件事情呢？就請各位敬請期待明天的內容吧！

## 參考資料
* [什麼是 SSL、TLS 以及 HTTPS？| DigiCert](https://www.websecurity.digicert.com/zh/hk/security-topics/what-is-ssl-tls-https)
* [[Security] SSL — HTTPS 背後的功臣. Security 資訊安全系列文第三篇！ | by 施靜樺 | Medium](https://medium.com/@jinghua.shih/security-ssl-https-背後的功臣-df714e4df77b)
* [FiloSottile/mkcert: A simple zero-config tool to make locally trusted development certificates with any names you'd like.](https://github.com/FiloSottile/mkcert)
* [OpenSSL](https://www.openssl.org)
* [SSL - Help | Ktor 1.4.0](https://ktor.io/docs/ssl.html#ktor)
