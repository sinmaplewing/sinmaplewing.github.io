---
id: 115
title: '#HTML：無序、有序與定義清單'
slug: html：無序、有序與定義清單
date: '2013-10-12T22:48:49+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/10/12/115/html%ef%bc%9a%e7%84%a1%e5%ba%8f%e3%80%81%e6%9c%89%e5%ba%8f%e8%88%87%e5%ae%9a%e7%be%a9%e6%b8%85%e5%96%ae/
wp_status: publish
wp_type: post
---

清單在網頁中是很常使用到的東西，故多少還是要了解一下。在HTML中有三種不太一樣的清單，分別是無序清單、有序清單與定義清單，無序清單與有序清單的用法差不多，但與定義清單的用法差距比較大，底下來個別解釋其使用的方法。

# 無序清單
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>清單</title>
  </head>
  <body>
    <ul>
      <li>Sonic</li>
      <li>Tails</li>
      <li>Knuckles</li>
      <li>Amy</li>
      <li>Shadow</li>
      <li>Silver</li>
    </ul>
  </body>
</html>
```
![list01.png](/uploads/2014/05/oei6c5rDR30zTXQ2OKNb_list01.png)

無序清單使用`<ul>...</ul>`將整個清單包起來，每一項使用`<li>...<li>`即可，效果就跟用Word按的項目符號及編號做出來的差不多。

# 有序清單
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>清單</title>
  </head>
  <body>
    <ol>
      <li>Sonic</li>
      <li>Tails</li>
      <li>Knuckles</li>
      <li>Amy</li>
      <li>Shadow</li>
      <li>Silver</li>
    </ol>
  </body>
</html>
```
![list02.png](/uploads/2014/05/J0fvAwtITeprP45zFWS5_list02.png)

有序清單的使用與無序清單差不多，僅僅只是將ul(unordered list)標籤換成了ol(ordered list)標籤，效果就從原本的項目符號換成了數字編號。

如果要改變起始的編號，可使用`start`屬性，例如起始值要改成10，就寫`<ol start="10">`。

HTML5提供了新的屬性，可讓ol反向計算數值，利用`reversed`屬性即可，僅要寫`<ol reversed>`即可反向。(HTML5的功能性屬性，大多都是有寫就有效果，不用給值，沒寫就沒有效果)

# 定義清單
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>清單</title>
  </head>
  <body>
    <dl>
      <dt>Sonic</dt>
      <dd>刺蝟音速小子（日文：ソニック・ザ・ヘッジホッグ；英文：Sonic The Hedgehog）是一個電子遊戲人物，也是世嘉公司的吉祥物，誕生於1990年。他是刺蝟音速小子系列的主角，也是世界上最有名的刺蝟，擁有超過音速的奔跑速度，被稱為「世界上最快的刺蝟」。以音速小子為主人公的電玩遊戲曾在多個平台發售，總累計銷量已經超過了7000萬套。以它為主角的動畫、漫畫作品也風靡全球。其主要創作者為中裕司，大島直人以及安田廣和。</dd>
      <dt>Tails</dt>
      <dd>初登場於音速小子2，是個有兩條尾巴的小狐狸，如同音速小子小弟般的存在。可以藉由兩條尾巴旋轉飛行，其飛行速度接近音速小子。因為天生有兩條尾巴而遭到同伴排擠，在偶然間遇到音速小子後便跟隨他。對於機械有相當高的領悟力。</dd>
    </dl>
  </body>
</html>
```
![list03.png](/uploads/2014/05/Pli6ycbqRBCM3nYpi7Sk_list03.png)

與前述兩種清單不同的地方在於，整個清單用`<dl>...</dl>`包住，每一項從原本僅有一個li標籤，換成dt和dd各一個標籤，dt表示的是欲解釋的項目，dd表示的是欲解釋的內容，因為是解釋的內容，所以dd標籤在排版上會做自動縮排。

# 巢狀清單用法
若要在清單內的某一項再利用清單解釋，可用以下的做法：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>清單</title>
  </head>
  <body>
    <ul>
      <li>
        Team Sonic
        <ul>
          <li>Sonic</li>
          <li>Tails</li>
          <li>Knuckles</li>
        </ul>
      </li>
      <li>
        Team Dark
        <ul>
          <li>Shadow</li>
          <li>Rouge</li>
          <li>E-123 Omega</li>
        </ul>
      </li>
    </ul>
  </body>
</html>
```
![list04.png](/uploads/2014/05/e9DpeeMqRWyGsKo6NtQZ_list04.png)

上面對於每一項li標籤內又在加入了另外一個清單去做描述，而清單內的清單瀏覽器會自動在排版上去做縮排，這是很方便可以做多層巢狀清單的用法，各位也可以自己試試看如果換成用ol和dl又會發生什麼事情。

# 參考資料
1. w3schools.com &gt; HTML &lt;ul&gt; Tag：[http://www.w3schools.com/tags/tag_ul.asp](http://www.w3schools.com/tags/tag_ul.asp)
2. w3schools.com &gt; HTML &lt;ol&gt; Tag：[http://www.w3schools.com/tags/tag_ol.asp](http://www.w3schools.com/tags/tag_ol.asp)
3. w3schools.com &gt; HTML &lt;dl&gt; Tag：[http://www.w3schools.com/tags/tag_dl.asp](http://www.w3schools.com/tags/tag_dl.asp)
4. 這樣做就對了 &gt; HTML &lt;dl/&gt;, &lt;dt/&gt; 與 &lt;dd/&gt; 的誤用：[http://josephjiang.com/entry.php?id=340](http://josephjiang.com/entry.php?id=340)
