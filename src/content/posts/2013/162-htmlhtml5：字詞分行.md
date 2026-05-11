---
id: 162
title: '#HTML(HTML5)：字詞分行'
slug: htmlhtml5：字詞分行
date: '2013-11-07T21:29:53+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML5
- HTML
permalink: /2013/11/07/162/htmlhtml5%ef%bc%9a%e5%ad%97%e8%a9%9e%e5%88%86%e8%a1%8c/
wp_status: publish
wp_type: post
---

在HTML裡面，如果打了太長的一連串的英文字，瀏覽器會把它當作一個詞彙，並且不會在空間狹小的時候做分行(除非中間有-,?......等等之類的分隔符，會在分隔符處分行)。不過我們平常打中文沒有這個問題，中文一個一個字，中間就算沒空白也會以字為單位去做分行。但是就算打英文文章，好似也很少遇過會有一個單字長到完全裝不下的情形。其實是真有這情況會需要，那就是網址，網址中間通常都不會有分隔符，而偏偏又得連在一起，就會導致以下的結果：
![wbr.png](/uploads/2014/05/Q4lMh3n3RjW9KIscrUj6_wbr.png)

那該怎麼做去解決這個問題呢？就利用wbr標籤吧！

# wbr：字詞方行
```html wbr.html
...
  http://this<wbr />.is<wbr />.a<wbr />.really<wbr />.long<wbr />.example<wbr />.com/With<wbr />/deeper<wbr />/level<wbr />/pages
...
```
以上是個例子，我們在我們認定可以斷行的地方去加上wbr標籤，瀏覽器就會在裝該文字的容器塞不下的時候選擇適當的wbr標籤去斷行。若文字能夠完美得塞進容器內那就不會進行斷行。

可完美放入的時候：
![wbr1.png](/uploads/2014/05/WoMQeK0HQzGXKDkt9f1T_wbr1.png)

無法完美放入的時候：
![wbr2.png](/uploads/2014/05/How9ZxzRRIuIgUxdehRL_wbr2.png)

(此範例對於網址的分段方法是依照DevDocs上所言[The Yahoo Style Guide](http://styleguide.yahoo.com/)的分行方法。)

# 參考資料
1. DevDocs：[http://devdocs.io/html/](http://devdocs.io/html/)
2. w3schools.com &gt; HTML &lt;wbr&gt; Tag：[http://www.w3schools.com/tags/tag_wbr.asp](http://www.w3schools.com/tags/tag_wbr.asp)
