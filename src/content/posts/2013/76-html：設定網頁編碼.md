---
id: 76
title: '#HTML：設定網頁編碼'
slug: html：設定網頁編碼
date: '2013-09-08T16:46:01+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/09/08/76/html%ef%bc%9a%e8%a8%ad%e5%ae%9a%e7%b6%b2%e9%a0%81%e7%b7%a8%e7%a2%bc/
wp_status: publish
wp_type: post
---

電腦裡面只能儲存0與1，並且透過二進位的方式用0與1儲存了數字，透過數字與文字的對應，電腦可以利用儲存數字的方式去儲存文字，並在顯示的時候透過對應表去找出該數字代表的文字為何，這樣的對應儲存模式就被稱為編碼。這世界上有很多語言，故編碼也有很多種，若使用的編碼不對，會導致網頁上出現我們有時候去瀏覽國外網站的時候常常會出現的亂碼現象，如下圖所示：
![html3-1.png](/uploads/2014/05/zHKS5sZoRK2oecYqNALa_html3-1.png)

因此我們必須要確定我們製作出來的網站是用什麼編碼方式儲存的，並且要試著從網頁裡去設定其網頁編碼，讓瀏覽器可以用正確的編碼方式去瀏覽該網站。

# 常見編碼

各國都有不同的編碼，底下試著列出一些常見的編碼：

   語言  | 常見編碼名稱
---------|--------
 繁體中文 | Big5
 簡體中文 | GBK 
   日文   | Shift-JIS
   韓文   | EUC-KR
   
由上表可知，每個語言都有其不同的當地的編碼方式，那麼如果要顯示所有國家語言的網站該怎麼辦？

不管你是否要做一個純粹單一語言的網站或是要做多語言的網站，我都會建議你使用Unicode萬國碼的 **UTF-8** 的編碼方式去儲存網站，這個編碼不僅支援多個國家的語言，有些繁體中文的罕見字其實用Big5是沒辦法表示的，但是用萬國碼卻是OK的！

# 如何儲存UTF-8格式的網頁

如果使用的是記事本來編輯網頁，可在儲存檔案的時候，點擊底下的編碼的選項，選擇UTF-8即可，如下圖所示：
![html3-2.png](/uploads/2014/05/KiIKvWqDQLSzRSWF14BJ_html3-2.png)

如果是使用Notepad++來編輯網頁，可在上面工具列的［編碼］裡面選擇［轉換至UTF-8碼格式(檔首無BOM)］即可，如下圖所示：
![html3-3.png](/uploads/2014/05/9Ycmyz0iRtC7VjIzDqnH_html3-3.png)

# 用meta標籤來設定該網頁的編碼
meta標籤在HTML文件中，是用來設定該文件的meta資料，除了可以用來設定編碼外，還可以設定很多其他跟網頁有關的資料，不過在這裡我只先提該如何設定網頁的編碼。

你可以在head元素內加上`<meta charset="編碼名稱" />`即可設定網頁的編碼，如果你要設定其為UTF-8的編碼，可如底下範例所示：
```html
...
<head>
  <meta charset="UTF-8" />
  <title>標題</title>
</head>
...
```

在HTML4.01的時候，是使用`<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />`這麼冗長的敘述，但是現在HTML5，你可以使用上述如此簡短的敘述即可。

# 參考資料
1. MOZILLA DEVELOPER NETWORK > 應該避免的過時語法：[https://developer.mozilla.org/zh-TW/docs/Web_%E9%96%8B%E7%99%BC/Historical_artifacts_to_avoid](https://developer.mozilla.org/zh-TW/docs/Web_%E9%96%8B%E7%99%BC/Historical_artifacts_to_avoid)
2. html5 - &lt;meta charset=&#39;utf-8&#39;&gt; vs &lt;meta http-equiv=&#39;Content-Type&#39;&gt; - Stack Overflow：[http://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type](http://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type)
3. w3schools.com > HTML &lt;meta&gt; Tag：[http://www.w3schools.com/tags/tag_meta.asp](http://www.w3schools.com/tags/tag_meta.asp)
