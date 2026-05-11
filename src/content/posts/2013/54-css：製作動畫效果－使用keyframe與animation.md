---
id: 54
title: '#CSS：製作動畫效果－使用keyframe與animation'
slug: css：製作動畫效果－使用keyframe與animation
date: '2013-09-04T08:40:17+08:00'
lastmod: '2019-12-01T23:03:22+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- CSS
permalink: /2013/09/04/54/css%ef%bc%9a%e8%a3%bd%e4%bd%9c%e5%8b%95%e7%95%ab%e6%95%88%e6%9e%9c%ef%bc%8d%e4%bd%bf%e7%94%a8keyframe%e8%88%87animation/
wp_status: publish
wp_type: post
---

之前在網站上搞了一個Logo用的CSS3動畫，然後現在這個部落格的標題也用了CSS3動畫，故現在想來好好地整理一下跟CSS3動畫相關的功能，底下就開始說明該如何建立CSS3動畫。

# 使用@keyframes建立動畫內容
首先先在CSS檔內建立@keyframes去制定動畫的內容，其Syntax在下方：
```css
@keyframes 動畫名稱 {
  關鍵影格選擇器1 { 眾多css樣式; }
  關鍵影格選擇器2 { 眾多css樣式; }
  ...
}
```
概念類似Flash當中的關鍵影格，在動畫內建立各個位置的時候，其css樣式為何，到最後就交由瀏覽器去做補間效果。

關鍵影格選擇器的部分可使用：
1. 0-100% ： 在時間的幾%時為何種css樣式。
2. from、to ： 其實意思與0%和100%一樣。
上列兩種選擇器範例如下：
```css
@keyframes myAnimation
{
  0% { margin-top: 0px; background-color: yellow;}
  50% { margin-top: 50px; background-color: red; }
  100% { margin-top: 100px; background-color: blue; }
}
```
```css
@keyframes myAnimationFromTo
{
  from { margin-top: 20px; color: yellow; }
  to { margin-top: 80px; color: blue; }
}
```
建立好@keyframes動畫內容後，接著就要在欲放置該動畫的CSS樣式表內加入animation屬性。

# Animation屬性
Animation屬性的Syntax於下：
```css
  animation: name duration timing-function delay iteration-count direction;
```
或者依照上面每一項的名稱皆可分開寫：
```css
animation-name: 動畫名稱;
animation-duration: 動畫作用時間;
animation-timing-function: 動畫補間時運用的計算公式;
animation-delay: 動畫需間隔多久後才開始;
animation-iteration-count: 動畫作用次數;
animation-direction: 動畫作用的方向;
```
animation-name指的就是上面定義的@keyframes的名稱，找到你想用的@keyframes的名稱，填上去即可。

接著可以從animation-duration去指定其動畫時間，這也是為什麼上面定義@keyframes不是使用時間，而是使用%，這可以讓同一個動畫重複使用，並且不一定要執行相同的時間。

timing-function有linear、ease、ease-in、ease-out、ease-in-out可以用，或者可用cubic-bezier(n,n,n,n)來自己制定(0 <= n <= 1)。

至於iteration-count如果要無限多次可用infinite。

最後動畫作用的方向指的是動作作用的時候可以是@keyframes相反的方向(to->from、100%->0%)(reverse)，或是作用完後又回頭(alternate)、或是先相反再變正常順序(alternate-reverse)。

底下用個範例去使用上面定義的myAnimation動畫：
```css
div{
  width: 100px;
  height: 100px;
  animation: myAnimation 3s ease 0s infinite alternate;
}
```
![CSSAnimationExample.gif](/uploads/2014/05/qvZxc31IRNudZBNFdMna_CSSAnimationExample.gif)

大體上製作一個CSS Animation就是這樣的一個流程，你也可以搭配CSS3的transform屬性去作出更多移動、翻轉、放大縮小的效果，甚至是3D翻轉喔！！

如果不想自己coding出動畫，想藉助一些工具來做動畫，可以參考使用[CSS 3.0 Maker](http://css3maker.com/)唷！

# -webkit-前綴字
由於目前通用性的寫法在Chrome上還是不能用，請在CSS多複製一份@keyframes動畫與animation屬性，並在前面加上-webkit-前綴字，如下列範例所示：
```css
@keyframes myAnimation
{
  0% { margin-top: 0px; background-color: yellow;}
  50% { margin-top: 50px; background-color: red; }
  100% { margin-top: 100px; background-color: blue; }
}

@-webkit-keyframes myAnimation
{
  0% { margin-top: 0px; background-color: yellow;}
  50% { margin-top: 50px; background-color: red; }
  100% { margin-top: 100px; background-color: blue; }
}

div{
  width: 100px;
  height: 100px;
  animation: myAnimation 3s ease 0s infinite alternate;
  -webkit-animation: myAnimation 3s ease 0s infinite alternate;
}
```

# 參考資料
1. w3schools.com > CSS3 @keyframes Rule：[http://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp](http://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp)
2. w3schools.com > CSS3 animation Property：[http://www.w3schools.com/cssref/css3_pr_animation.asp](http://www.w3schools.com/cssref/css3_pr_animation.asp)
3. 池水間 - 你需要知道的CSS3動畫技術 ::: 睡蓮‧池水間 - waterlily-lsl.com：[http://waterlily-lsl.com/modules/article/view.article.php/c2/232/p2](http://waterlily-lsl.com/modules/article/view.article.php/c2/232/p2)
4. CSS 3.0 Maker：[http://css3maker.com/](http://css3maker.com/)
