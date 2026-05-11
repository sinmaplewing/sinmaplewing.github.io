---
id: 123
title: '#HTML(HTML5)：文字標音'
slug: htmlhtml5：文字標音
date: '2013-10-13T22:20:23+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML5
- HTML
permalink: /2013/10/13/123/htmlhtml5%ef%bc%9a%e6%96%87%e5%ad%97%e6%a8%99%e9%9f%b3/
wp_status: publish
wp_type: post
---

本來是沒特別想寫這篇，不過想想這功能在最近已經被廣泛支援了，故就想說一定要好好來介紹一下！

大家在打入中文、日文的時候，有時候應該會想加入標音吧！正好以前IE有個標籤叫做ruby標籤可以做到這樣的事情，而在HTML5終於把ruby標籤做為標準加入了！

# 標音
底下一樣先用一個範例來解釋：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>標音</title>
  </head>
  <body>
    <ruby>踏<rt>ふ</rt></ruby>まれた<ruby>花<rt>はな</rt></ruby> <br />
    被<ruby>踐<rt>ㄐㄧㄢˋ</rt>踏<rt>ㄊㄚˋ</rt></ruby>的花朵
  </body>
</html>
```
![ruby01.png](/uploads/2014/05/v34wkTDHS9mM83j3oOgw_ruby01.png)
上面的排版有點亂，不過為了不要讓文字中間出現空白，只好擠成一行了，底下列一下通用式用法的解說：
```html rubyusage.html
<ruby>
  [欲加上標音的字詞1] <rt>[標音1]</rt>
  [欲加上標音的字詞2] <rt>[標音2]</rt>
  ...
</ruby>
```
大體上就是如此，整個標音群組用ruby標籤包住，打上要標音的詞彙後，加上rt標籤去做標音，就可以達到標音的效果了！

> rb標籤：早期的寫法會把[欲加上標音的字詞]包在`<rb>...</rb>`內，但是收錄進HTML5標準的時候，去除了rb標籤，所以目前的標準是要省略rb標籤的唷！

# 不支援標音之瀏覽器的表現方法
假設今天要讓不支援標音的瀏覽器上看起來也要至少正常一點，可以將要多餘顯示的文字用rp標籤包住。這樣的話，有支援標音的瀏覽器會忽略rp標籤裡的內容，而不支援標音的瀏覽器就會顯示rp標籤裡的內容。底下看個範例：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>標音</title>
  </head>
  <body>
    <ruby>踏<rp>（</rp><rt>ふ</rt><rp>）</rp></ruby>まれた<ruby>花<rp>（</rp><rt>はな</rt><rp>）</rp></ruby> <br />
    被<ruby>踐<rp>（</rp><rt>ㄐㄧㄢˋ</rt><rp>）</rp>踏<rp>（</rp><rt>ㄊㄚˋ</rt><rp>）</rp></ruby>的花朵
  </body>
</html>
```
![ruby02.png](/uploads/2014/05/6AhZ9VLCRHGdyaViPkKQ_ruby02.png)
左邊Google Chrome可以使用標音功能，故就直接顯示其標音，rp標籤裡之內容不管；而右邊Firefox不能使用標音功能，故就把rp標籤內的內容也一併顯示出來。

> 1. 與w3schools.com裡的內容不同：rp標籤我是放在rt標籤外才能讓有標音功能的瀏覽器顯示正常，但w3schools.com內的卻放在rt標籤內。
> 2. Firefox支援Ruby否？根據w3schools.com的內容是說已經支援了，但我的Firefox還是沒有。如果你的Firefox沒有標音功能，可以到[這裡(HTML Ruby)](https://addons.mozilla.org/zh-tw/firefox/addon/html-ruby/)下載套件安裝一下就支援了！

# 參考資料
1. w3schools.com &gt; HTML &lt;ruby&gt; Tag：[http://www.w3schools.com/tags/tag_ruby.asp](http://www.w3schools.com/tags/tag_ruby.asp)
2. w3schools.com &gt; HTML &lt;rp&gt; Tag：[http://www.w3schools.com/tags/tag_rp.asp](http://www.w3schools.com/tags/tag_rp.asp)
3. Re: &lt;rb&gt; as part of HTML5 ruby? from Dean Lee on 2011-12-29 (public-html-ig-zh@w3.org from December 2011)：[http://lists.w3.org/Archives/Public/public-html-ig-zh/2011Dec/0021.html](http://lists.w3.org/Archives/Public/public-html-ig-zh/2011Dec/0021.html)
4. 日文歌詞標音編輯器：[http://but.lolicom.org/tool/](http://but.lolicom.org/tool/)
