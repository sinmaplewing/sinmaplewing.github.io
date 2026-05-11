---
id: 3448
title: '#HTML(HTML5)：具有摘要與詳細兩種資訊的折疊呈現'
slug: htmlhtml5：具有摘要與詳細兩種資訊的折疊呈現
date: '2017-12-30T01:03:39+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
featured_image: /uploads/2017/12/details2.png
permalink: /2017/12/30/3448/htmlhtml5%ef%bc%9a%e5%85%b7%e6%9c%89%e6%91%98%e8%a6%81%e8%88%87%e8%a9%b3%e7%b4%b0%e5%85%a9%e7%a8%ae%e8%b3%87%e8%a8%8a%e7%9a%84%e6%8a%98%e7%96%8a%e5%91%88%e7%8f%be/
wp_status: publish
wp_type: post
---

在 HTML5 中，對於某段內容具有摘要資訊與詳細資訊兩種資訊需要呈現，並且希望能夠先折疊起來只顯示摘要資訊，等使用者按下去再開啟詳細資訊的這種狀況，我們可以使用 `<details>` 與 `<summary>` 這兩個標籤來呈現，具體用法是：
```html
<details>
  <summary>{摘要資訊}</summary>
  {詳細資訊}
</details>
```

舉個例子，例如我現在想要介紹雷亞即將在 2018 年 1 月上市的 Cytus2 ，我可能就會這麼做：
```html
<details>
  <summary>音樂遊戲 Cytus2</summary>
  <p>Cytus2 是一款由雷亞遊戲即將於 2018 年 1 月出品的遊戲，根據目前釋出的 Trailer 影片即將會有五隻角色在劇情之中。</p>
  <p>相關連結：
     <ul>
        <li><a href="https://www.youtube.com/watch?v=IAS52XC2pto" target="_blank">Trailer 連結</a></li>
        <li><a href="https://www.rayark.com/g/cytus2/" target="_blank">官網連結</a></li>
     </ul>
  </p>
</details>
```

呈現效果大概會是這樣，僅出現摘要內容，並且前面會出現折疊符號：
![details1](/uploads/2017/12/details1.png)

按下去之後可以展開詳細的資訊：
![details2](/uploads/2017/12/details2.png)

如果你希望一開始就要是展開的樣貌的話，就在 `<details>` 標籤裡面加上 `open` 屬性：
```html
  <details open> ...... 內容省略 ...... </details>
```

P.S. 利用教學來工商我目前工作的專案也是萬萬沒想到wwwwwwwwww

# 參考資料
1. DevDocs：[http://devdocs.io/html/](http://devdocs.io/html/)
2. w3schools.com &gt; HTML &lt;details&gt; Tag：[https://www.w3schools.com/tags/tag_details.asp](https://www.w3schools.com/tags/tag_details.asp)
3. w3schools.com &gt; HTML &lt;summary&gt; Tag：[https://www.w3schools.com/tags/tag_summary.asp](https://www.w3schools.com/tags/tag_summary.asp)
