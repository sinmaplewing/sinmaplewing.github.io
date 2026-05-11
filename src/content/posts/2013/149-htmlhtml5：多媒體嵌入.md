---
id: 149
title: '#HTML(HTML5)：多媒體嵌入'
slug: htmlhtml5：多媒體嵌入
date: '2013-11-04T23:46:55+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML5
- HTML
permalink: /2013/11/04/149/htmlhtml5%ef%bc%9a%e5%a4%9a%e5%aa%92%e9%ab%94%e5%b5%8c%e5%85%a5/
wp_status: publish
wp_type: post
---

今天終於要來提HTML5的新功能之一－放置多媒體的部分，底下一樣就用範例來解說。

# embed：外部嵌入播放器播放音樂與影片
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>多媒體</title>
  </head>
  <body>
    <embed src="Sonic Generations [OST] - Rooftop Run (Modern).mp3" />
    <embed src="[灆洢]Sonic Generations - Sky Sanctuary Act2 - 0225.13-087-Rank S.mp4" />
  </body>
</html>
```
![media01.png](/uploads/2014/05/6pi7sAHOS5O6khuZnIg2_media01.png)

這個embed標籤從很早以前就有了，不過直至HTML5才將之納為標準。

embed主要是用外部的播放程式鑲嵌在網頁上來播放音樂或影片，利用src屬性去放置音樂或影片的連結。如果該瀏覽器找不到可播放此音樂或影片的播放程式，那麼就沒辦法播放了。

不過在HTML5的標準裡，已經支援讓瀏覽器去播放音樂或影片了！底下就來看看直接讓瀏覽器播放音樂或影片的標籤吧！

# audio：播放音樂
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>多媒體</title>
  </head>
  <body>
    <p>
      <audio src="Sonic Generations [OST] - Rooftop Run (Modern).mp3" controls autoplay loop>
      對不起，您的瀏覽器不支援HTML5。
      </audio>
    </p>
  </body>
</html>
```
![media02.png](/uploads/2014/05/rZPCxGf5Rc6oS3eonNvJ_media02.png)

audio標籤用於放置音樂，屬性有很多，在此列舉常用的controls、autoplay、loop，這些屬性跟以前看到的屬性有點不同，以前的屬性都要代值，但是HTML5中很多標籤是具有布林屬性：有出現就有功能，沒出現就沒功能。controls表示是否要出現控制面板，autoplay表示是否要自動播放，loop表示是否要循環。

audio裡面的內容可放置文字，來讓不支援HTML5的瀏覽器可以顯示。

# video：播放影片
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>多媒體</title>
  </head>
  <body>
    <p>
      <video src="[灆洢]Sonic Generations - Sky Sanctuary Act2 - 0225.13-087-Rank S.mp4" controls autoplay loop>
      對不起，您的瀏覽器不支援HTML5。
      </video>
    </p>
  </body>
</html>
```
![media03.png](/uploads/2014/05/3cG7rTKT5aJyVOHdSwEk_media03.png)

video標籤用於放置音樂，屬性跟audio一樣有很多，範例中一樣列舉常用的controls、autoplay、loop，這些屬性跟audio的同名屬性類似，就不多提了。

video裡面的內容一樣可放置文字，來讓不支援HTML5的瀏覽器可以顯示。

# 瀏覽器支援音樂、影片列表
由於audio與video是使用瀏覽器自身來播放音樂與影片，故就要來稍微注意一下每個瀏覽器支援的音樂與影片格式有哪些了，底下是列表：

## 音樂格式支援
| Browser | mp3 | wav | ogg |
| ------- | --- | --- | --- |
| Internet Explorer | **YES** | NO | NO |
| Chrome | **YES** | **YES** | **YES** |
| Firefox | **YES** | **YES** | **YES** |
| Safari | **YES** | **YES** | NO |
| Opera | NO | **YES** | **YES** |

## 影片格式支援
| Browser | MP4 | WebM | Ogg |
| ------- | --- | ---- | --- |
| Internet Explorer | **YES** | NO | NO |
| Chrome | **YES** | **YES** | **YES** |
| Firefox | **YES** | **YES** | **YES** |
| Safari | **YES** | NO | NO |
| Opera | NO | **YES** | **YES** |

看完上面的表，不知道各位有沒有發現，上面沒有一種格式可以在每個瀏覽器上皆可執行，那該怎麼辦呢？這時候就要來使用source標籤了！

# source：設定音樂與影片的來源
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>多媒體</title>
  </head>
  <body>
    <p>
      <audio controls autoplay loop>
        <source src="music.ogg" type="audio/ogg">
        <source src="music.mp3" type="audio/mpeg">
        對不起，您的瀏覽器不支援HTML5。
      </audio>
    </p>
    <p>
      <video controls autoplay loop>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        對不起，您的瀏覽器不支援HTML5。
      </video>
    </p>
  </body>
</html>
```
將audio或video內的src屬性拿掉，換成在audio或video內容內加入來source標籤，每個source標籤就代表一個音樂或是影片的來源，瀏覽器在讀的時候會照順序找尋可播放的來源，若找到有可以播放的來源時，就會播放。

最後給各位一個不錯的支援多瀏覽器的方法如下：
```html
...
<p>
  <audio controls autoplay loop>
    <source src="music.ogg" type="audio/ogg">
    <source src="music.mp3" type="audio/mpeg">
    <embed src="music.ogg" />
  </audio>
</p>
<p>
  <video controls autoplay loop>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    <embed src="movie.mp4" />
  </video>
</p>
...
```
除了原本加source的版本外，在給不支援HTML5的瀏覽器就用embed來取代，這樣就又可以支援更多的瀏覽器了！

# 參考資料
1. DevDocs：[http://devdocs.io/html/](http://devdocs.io/html/)
2. w3schools.com &gt; HTML5 Audio：[http://www.w3schools.com/html/html5_audio.asp](http://www.w3schools.com/html/html5_audio.asp)
3. w3schools.com &gt; HTML5 Video：[http://www.w3schools.com/html/html5_video.asp](http://www.w3schools.com/html/html5_video.asp)
