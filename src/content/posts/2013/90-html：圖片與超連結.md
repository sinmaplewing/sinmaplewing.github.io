---
id: 90
title: '#HTML：圖片與超連結'
slug: html：圖片與超連結
date: '2013-09-10T20:12:15+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/09/10/90/html%ef%bc%9a%e5%9c%96%e7%89%87%e8%88%87%e8%b6%85%e9%80%a3%e7%b5%90/
wp_status: publish
wp_type: post
---

該如何在網頁內放置圖片以及超連結，我照慣例先使用一個範例讓你看，再來解釋這個範例的意義。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>圖片與超連結範例</title>
  </head>
  <body>
    <h1 id="top">圖片與超連結</h1> <!-- 設定h1的id為top -->
    <img src="/image/thumbs/32.jpg" alt="全身圖" /> <!-- 放置圖片 -->
    <a href="http://www.google.com" target="_blank">往Google</a> <!-- 連結並換新分頁 -->
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <p>好幾個段落</p>
    <a href="#top">回Top</a> <!-- 連結至id為top的地方 -->
  </body>
</html>
```
![html4-1.png](/uploads/2014/05/GyeO6tYCTP6KqSzrKSCi_html4-1.png)

# img標籤：放置圖片
如果要在網頁中放置圖片，可使用img標籤，它具有兩個屬性必須設定，一個為src屬性，是放你的圖片的路徑；另外一個則是alt屬性，是放你的圖片的說明文字，也有可能會被用於圖片連結不到時的替代文字。

```html
<img src="圖片所在路徑" alt="說明文字" />
```

當要改變圖片的大小，可使用CSS語法，或是使用width(寬度)與height(高度)屬性，此兩個屬性的值在HTML5中必為數值，單位是像素點(pixel)，而若在HTML4.01裡還可以使用%數。建議在你每個img標籤上都盡量加上這兩個屬性，這樣在網頁載入時若連結不到該圖片，還是會保留一塊相同大小的方塊，可避免排版亂掉。

```html
<img src="圖片所在路徑" alt="說明文字" width="圖片寬度" height="圖片高度"/>
```

# a標籤：放置超連結
若要放置超連結，可使用a標籤，它有href屬性可以設定該連結要往那兒去，當使用者點擊時瀏覽器會跳至該頁面。
```html
<a href="網頁所在路徑">連結文字</a>
```

如果不希望連結蓋掉目前的網頁，而是希望開新分頁去顯示連結的網頁，則可加上target屬性，並給予值為`_blank`。
```html
<a href="網頁所在路徑" target="_blank">連結文字</a>
```

超連結不一定要連到其他的網頁，如果這個網頁過長時，要上上下下滑動很麻煩時，可指定將瀏覽器跳到某個HTML元素位置上，每個HTML元素都可以設定id屬性去給予元素一個id名稱，這樣a標籤就可以連結到該元素上。a標籤僅需要在href屬性的值前方加上#，後面再加上要連結到的元素的id屬性名稱即可。以前HTML4.01會使用a標籤的name屬性去設立錨點，讓超連結可以連結該地方，不過到了HTML5後就刪除name屬性了，一律改使用任何HTML元素的id屬性來設定。
```html
<h1 id="id名稱">標題</h1>
...
<a href="#id名稱">連結文字</h1>
```

當然你可以將上面連結到其他網頁以及某個HTML元素位置上的方法結合起來，變成連結到該頁的某個HTML元素上。
```html
<a href="網頁所在路徑#id名稱">連結文字</a>
```

# 相對路徑與絕對路徑
以上不論是img標籤的src屬性或是a標籤的href屬性皆是放置一個檔案的路徑位置，路徑分成兩種：一種是相對路徑，另外一種則是絕對路徑。

## 相對路徑
相對路徑是指從你所在的位置該如何走到欲連結到的檔案的位置的路徑表示，底下用幾張我以前的ppt來解說。

假設該網頁名稱為second6.html，若要連結到與網頁在同資料夾的圖片，則直接打上該名字即可。
![html4-2.png](/uploads/2014/05/wpLKVi59SlecwcHkgmR2_html4-2.png)

若要連結到位於跟網頁同資料夾的picture資料夾內的圖片，則打上picture，後面再加上斜線分隔，再打上圖片名稱。如果資料夾非常多層則是一樣的道理，可以寫成`同層資料夾/內層資料夾1/內層資料夾2/...以此類推/圖片名稱`。
![html4-3.png](/uploads/2014/05/hxoYB90RyVoypWLiGwRQ_html4-3.png)

若要連結的圖片在網頁所在的資料夾的上一層，則使用..去表示。
![html4-4.png](/uploads/2014/05/kQiNSVBnTKm0EWe0YSSr_html4-4.png)

## 絕對路徑
絕對路徑通常是為了連結外部的資料，不在本網站內的資料去使用，因為不是本站的資料，所以無法使用相對路徑去連結到，只能使用絕對路徑去連結。若使用相對路徑，則網頁搬到不同的地方會連結到的位置會不同，端看該網頁的位置在何處；但若使用絕對路徑，則網頁不管搬到不同的地方則連結到的地方會是相同的。若你的資料會跟你的網站一起搬動，建議使用相對路徑；若不會，則使用絕對路徑。

若是使用絕對路徑，則開頭會先寫明協定名稱，接著是IP位置、Domain Name或是電腦內的絕對路徑，例如要連結到Google就寫`<a href="http://www.google.com>Google連結</a>`，如果要瀏覽網頁者連到他自己電腦的圖片則使用`<img src="file:///C:/myphoto.jpeg" />`(當然我不建議連到本機端這種用法)。

# 參考資料
1. w3schools.com > HTML &lt;a&gt; Tag：[http://www.w3schools.com/tags/tag_a.asp](http://www.w3schools.com/tags/tag_a.asp)
2. w3schools.com > HTML &lt;img&gt; Tag：[http://www.w3schools.com/tags/tag_img.asp](http://www.w3schools.com/tags/tag_img.asp)
3. html5 - HTML Anchors with &#39;name&#39; or &#39;id&#39;? - Stack Overflow：[http://stackoverflow.com/questions/484719/html-anchors-with-name-or-id](http://stackoverflow.com/questions/484719/html-anchors-with-name-or-id)
