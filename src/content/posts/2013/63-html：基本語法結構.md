---
id: 63
title: '#HTML：基本語法結構'
slug: html：基本語法結構
date: '2013-09-06T15:33:54+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/09/06/63/html%ef%bc%9a%e5%9f%ba%e6%9c%ac%e8%aa%9e%e6%b3%95%e7%b5%90%e6%a7%8b/
wp_status: publish
wp_type: post
---

由於開學之後會有教學Web技術的讀書會，故我現在就一邊整理HTML+CSS的資料，一邊PO上Logdown這裡讓大家看看。

談到HTML語法，我們先來看一個簡單的HTML範例：
```html
<!DOCTYPE html>
<html>
  <head>
    <title>這裡是標題的部分</title>
  </head>
  <body>
    這裡是內容的部分。 <!-- 此為註解 -->
  </body>
</html>
```
![html1-1.png](/uploads/2014/05/NXRkjm7lSPingeD2QxDC_html1-1.png)
底下我們開始對這個範例進行講解。

# HTML版本宣告

每份HTML文件的第一行通常會放置該HTML是使用哪個版本的宣告，如今HTML5已漸漸成為主流，故我們會用`<!DOCTYPE html>`這行來進行版本宣告，若你有看過HTML4.01的版本宣告，你一定會知道以前的版本宣告有多麼冗長，它是長這樣的：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`，目前您已經可以盡量使用HTML5的版本宣告，現代的瀏覽器都支援它。

# 標籤(tag)與元素(element)

HTML文件是以一堆標籤形成的元素所組合而成的，標籤即是使用小於符號、標籤名稱與大於符號所組合而成的，而元素則是由開始標籤、標籤屬性以及標籤所包之內容與結束標籤所組合而成，底下是一個HTML元素的格式：
```html
<標籤名 屬性1='值' 屬性2='值' ....多個屬性以此類推> 元素內容 </標籤名>
```
最前面的即是開始標籤，而最後面在標籤名前加上斜線的即為結束標籤。

若元素並無元素內容時，即可簡寫為下列格式：
```html
<標籤名 屬性1='值' 屬性2='值'  ....多個屬性以此類推 />
```
即類似於將結束標籤開頭的斜線放置於開始標籤的尾部即可。

# html、head、body標籤
每一份html文件的第一個最底部的標籤必定是html標籤，而html標籤的內容通常又會分成兩個標籤，一個是head標籤，另外一個是body標籤。
```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

head標籤內放置的是此HTML文件的整體資訊，像是head內一定會放的title標籤即是設定該網頁的標題。
```html
...
<head>
  <title>這裡是標題的部分</title>
</head>
...
```
![html1-2.png](/uploads/2014/05/BMw2wcZ1QkqNDM6wADvw_html1-2.png)

body標籤內則是放置網頁的內容，打在這裡面的內容都會呈現在網頁上。
```html body.html
...
<body>
  這裡是內容的部分。
</body>
...
```
![html1-3.png](/uploads/2014/05/xXR4CuvHSUS9OvcCW4GD_html1-3.png)

# 註解
你可以利用`<!-- 註解文字 -->`放置註解，註解文字並不會顯示在網頁上，僅提供你在開發網頁的時候能夠方便了解該段程式碼的含意為何。

# 參考資料
1. HTML基本語法：[http://kaihang.tripod.com/computer/html/html.html](http://kaihang.tripod.com/computer/html/html.html)
2. w3school.com > HTML &lt;html&gt; tag：[http://www.w3schools.com/tags/tag_html.asp](http://www.w3schools.com/tags/tag_html.asp)
3. 程式設計教學誌 > HTML 4.01：[http://pydoing.blogspot.tw/2010/11/html-401-overview.html](http://pydoing.blogspot.tw/2010/11/html-401-overview.html)
