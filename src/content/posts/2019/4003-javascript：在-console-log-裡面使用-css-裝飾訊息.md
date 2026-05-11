---
id: 4003
title: '#JavaScript：在 console.log 裡面使用 CSS 裝飾訊息'
slug: javascript：在-console-log-裡面使用-css-裝飾訊息
date: '2019-01-03T00:57:16+08:00'
lastmod: '2019-12-01T23:03:48+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- JavaScript
featured_image: /uploads/2019/01/圖片-240.png
permalink: /2019/01/03/4003/javascript%ef%bc%9a%e5%9c%a8-console-log-%e8%a3%a1%e9%9d%a2%e4%bd%bf%e7%94%a8-css-%e8%a3%9d%e9%a3%be%e8%a8%8a%e6%81%af/
wp_status: publish
wp_type: post
---

![住手](/uploads/2019/01/圖片-240.png)

相信很多人在使用 Facebook 的時候，把 Console 一打開，馬上就會看到兩個大字－**住手**。而因為我在看到之後覺得這個效果好神奇，所以就小小研究一下，結果發現在撰寫 JavaScript 的時候竟然可以在 `console.log` 裡面使用 CSS 來裝飾訊息。公式大致上如下：

```js
// 單個樣式
console.log("{任意文字}%c{會套用到CSS語法的任意文字}", "{CSS語法}");

// 多個樣式
console.log("{任意文字}%c{會套用到CSS語法(1)的任意文字}%c{會套用到CSS語法(1)與(2)疊加後的任意文字}......", "{CSS語法(1)}", "{CSS語法(2)}", ......);
```

舉個例子，例如我想要在 `console.log` 裡面利用綠底白字來裝飾一段文字可以這麼做：

```js
console.log("撰寫一篇 JavaScript 小教學： %c✓ 完成", "background-color: #13AA13; color: white; padding: 5px;");
```

![裝飾(1)](/uploads/2019/01/圖片-242.png)

由上面的這個例子來看，要改文字的樣式好像蠻容易的，但是這裡面卻有一個很大的限制。這個限制就是，在這個 console.log 內，一旦用 `%c` 改了 CSS 樣式後，並不存在一個簡單且直接的方式讓後面文字所要呈現的樣式回復成原本的樣子。意思就是說這個 CSS 樣式的套用是沒有一個結束的標示來表示你所要套用的 CSS 樣式要到哪裡結束，就如同上面的公式只有一個開頭的 `%c` ， `%c` 後面的文字全部會套用你所撰寫的樣式，所以如果你有需要回復的話，你可以利用一個小技巧，就是利用第二個新的 CSS 樣式去套用給後面的文字，而這個 CSS 樣式會將所有有調用的樣式都還原成原本的樣子，像這樣：

```js
console.log("撰寫一篇 JavaScript 小教學： %c✓ 完成%c (非常希望之後自己還可以寫下去)", "background-color: #13AA13; color: white; padding: 5px;", "background-color: none; color: auto; padding: none;");
```

![裝飾(2)](/uploads/2019/01/圖片-243.png)

不過必須要說這個東西真的沒什麼實質的用途，頂多就只是讓別人在瀏覽你的網站時，打開 Console 之後會覺得很酷這樣而已。XD

# 參考資料
1. Beyond console.log()：[https://medium.com/@mattburgess/beyond-console-log-2400fdf4a9d8](https://medium.com/@mattburgess/beyond-console-log-2400fdf4a9d8)
2. JavaScript - adding style to the text of console log [duplicate] - StackOverflow：[https://stackoverflow.com/questions/24828107/javascript-adding-style-to-the-text-of-console-log](https://stackoverflow.com/questions/24828107/javascript-adding-style-to-the-text-of-console-log)
