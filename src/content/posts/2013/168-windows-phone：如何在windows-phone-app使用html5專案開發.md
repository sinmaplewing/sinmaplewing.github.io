---
id: 168
title: '#Windows Phone：如何在Windows Phone App使用HTML5專案開發'
slug: windows-phone：如何在windows-phone-app使用html5專案開發
date: '2013-11-28T23:54:22+08:00'
lastmod: '2019-12-01T23:05:44+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML5
- Windows Phone
permalink: /2013/11/28/168/windows-phone%ef%bc%9a%e5%a6%82%e4%bd%95%e5%9c%a8windows-phone-app%e4%bd%bf%e7%94%a8html5%e5%b0%88%e6%a1%88%e9%96%8b%e7%99%bc/
wp_status: publish
wp_type: post
---

這篇主要來介紹一下Windows Phone App的HTML5專案，打開Visual Studio並選擇Visual C#類別中的Windows Phone，即可找到Windows Phone HTML5應用程式的專案，如下圖所示：
![WP8HTML01.png](/uploads/2014/05/YaAWp6bTsanGHuAfZtHu_WP8HTML01.png)

新增專案後，你就會看到如下的畫面：
![WP8HTML02.png](/uploads/2014/05/BNqJvhdOSnuwBl044QQf_WP8HTML02.png)

可以很明顯地發現到其實Windows Phone的HTML5專案其實只是放個瀏覽器在裡面，並且去瀏覽專案中Html資料夾中的網頁而已，藉此你可以透過HTML+CSS+Javascript去撰寫APP。

在首頁的地方寫了簡單的程式碼：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="/html/css/phone.css" />
    <title>Windows Phone</title>
    <script>
      window.addEventListener("load", function () {
          document.querySelectorAll("#page-title p")[0].innerHTML = "Hello World!";
      });
    </script>
  </head>
  <body>
    <div>
        <p>我的應用程式</p>
    </div>
    <div id="page-title">
        <p>頁面標題</p>
    </div>
  </body>
</html>
```

簡單來說，就是在網頁載入後，將id為page-title裡的第一個p標籤裡的內容換成Hello World!。結果如下圖所示：
![WP8HTML03.png](/uploads/2014/05/gDEKBIQRmWYMAiKOfQhQ_WP8HTML03.png)

接著下來你就可以依照做網站的方式來開發APP了！

# 如果Javascript沒有作用...
我剛開始使用HTML5專案時，發現Javascript怎樣都沒有作用。如果遇到相同情形，可以在MainPage.xaml.cs中的Browser_Loaded函式內加上`Browser.IsScriptEnabled = true;`這行程式碼即可。
```cs
private void Browser_Loaded(object sender, RoutedEventArgs e)
{
  Browser.IsScriptEnabled = true;
  
  // 在此加入您的 URL
  Browser.Navigate(new Uri(MainUri, UriKind.Relative));
}
```

# 參考資料
1. Getting Started With Windows Phone 8 HTML5 Apps：[http://blogs.msdn.com/b/matthiasshapiro/archive/2013/02/15/getting-started-with-windows-phone-8-html5-apps.aspx](http://blogs.msdn.com/b/matthiasshapiro/archive/2013/02/15/getting-started-with-windows-phone-8-html5-apps.aspx)
