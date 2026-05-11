---
id: 70
title: '#HTML：基本內文文章結構'
slug: html：基本內文文章結構
date: '2013-09-07T10:07:04+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/09/07/70/html%ef%bc%9a%e5%9f%ba%e6%9c%ac%e5%85%a7%e6%96%87%e6%96%87%e7%ab%a0%e7%b5%90%e6%a7%8b/
wp_status: publish
wp_type: post
---

HTML文件裡面的內容大概如你在報紙上看到的一篇篇文章，一樣會具備標題、副標題、段落等等格式，我們就先給一個範例來表現一篇文章的HTML文件吧！

```html
<!DOCTYPE html>
<html>
  <head>
    <title>文章範例</title>
  </head>
  <body>
    <h1>主要標題</h1>
    <h2>副標題</h2>
    <hr />
    <p>第一個段落</p>
    <p>第二個段落</p>
    <p>
      <em>斜體強調</em>，<br />
      <strong>粗體強調</strong>，<br />
      <em><strong>粗斜體強調</strong></em>
    </p>
  </body>
</html>
```
![html2-1.png](/uploads/2014/05/laHLnesBSPOkJMnJa0Dp_html2-1.png)

# 標題表示用標籤
使用h1~h6標籤分別可以表示從大到小的1級到6級的標題，當一篇文章出現標題的時候，可以使用此標籤來表示標題的部分。底下是h1~h6各個標籤範例：
```html
...
<body>
  <h1>一級標題</h1>
  <h2>二級標題</h2>
  <h3>三級標題</h3>
  <h4>四級標題</h4>
  <h5>五級標題</h5>
  <h6>六級標題</h6>
</body>
...
```
![html2-2.png](/uploads/2014/05/REVdse98QKmT7WBtIids_html2-2.png)

# 水平線標籤
若要使用水平線來分隔文章，可以使用hr標籤來表示，hr為一個無包內容的標籤，可以寫作`<hr />`。

# 段落與換行標籤
若文章中要表示段落，可將段落使用p標籤包起來，此時段落上下會與其他段落產生分隔的效果；若僅只要使用簡單的單行換行可使用br標籤，br亦為一個無包內容的標籤，可以寫作`<br />`。

# 強調標籤
若文章中有需要強調的地方，可使用em標籤做斜體強調、strong標籤去做粗體強調，若要兩者一起使用，則可巢狀式的將一個標籤包起另外一個標籤（就像範例所寫的`<em><strong>強調部分</strong></em>`）。如果以前有用過HTML的人可能會知道有另外兩個標籤與之效果相同，分別是i(斜體)與b(粗體)標籤。在HTML5開始強調用標籤來表示文章語意的做法後，會建議使用em、strong兩個標籤來取代i與b標籤。

# block元素與inline元素
大部分的HTML元素都會定義它為block元素或是inline元素。當使用該標籤會造成該元素與上下元素自動有所分隔，則該標籤所產生的元素為block元素；相對地，若並不會造成與上下元素之間的分隔的話，則為inline元素。本範例中，像是h系列的元素和p元素就屬於block元素；而em元素和strong元素則屬於inline元素。

# 已被廢棄使用的樣式用標籤
在HTML5當中，已不建議使用center標籤(置中)與font標籤(改變文字樣式，像是文字大小、文字顏色等)來去做樣式變化，目前HTML語法強調是被使用在文件語意上，而樣式美觀的部分就全權交給CSS語法去做處理，故若要置中或是改變文字樣式的部分請使用CSS樣式去做。(其實不只center、font標籤，其他像是align屬性(該元素對齊用)、bgcolor屬性(背景顏色屬性)......等等與樣式有關係的標籤或是屬性都已不建議使用HTML語法做更改，請盡量都使用CSS語法去撰寫)

# pre標籤：直接顯示與原語法相同內容
如果有時從別的地方直接複製一篇長篇的文章，要在該文章換行或段落的地方加上`<br />`或是`<p>...</p>`實在有點麻煩，這時候只要直接先貼上該文章，然後前後加上`<pre>...文章...</pre>`即可，這就是pre標籤的用途。

```html
...
<body>
  <pre>
這是一篇很長的文章，
害我懶的用br和p標籤，
真是抱歉！
  </pre>
</body>
...
```
![html2-3.png](/uploads/2014/05/Dt8qrPkeSymD78W0DmB9_html2-3.png)

## 參考資料
1. html教學 > 第03章。常用標籤：[http://m7.dfps.tp.edu.tw/chen/main5/ahtml/03.asp](http://m7.dfps.tp.edu.tw/chen/main5/ahtml/03.asp)
2. w3schools.com > HTML &lt;div&gt; and &lt;span&gt;：[http://www.w3schools.com/html/html_blocks.asp](http://www.w3schools.com/html/html_blocks.asp)
3. w3schools.com > HTML &lt;pre&gt; tag：[http://www.w3schools.com/tags/tag_pre.asp](http://www.w3schools.com/tags/tag_pre.asp)
