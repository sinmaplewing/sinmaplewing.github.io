---
id: 21
title: '#JavaScript：Cross Domain AJAX－使用YQL'
slug: javascript：cross-domain-ajax－使用yql
date: '2013-09-03T01:13:10+08:00'
lastmod: '2019-12-01T23:03:48+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- AJAX
- JavaScript
permalink: /2013/09/03/21/javascript%ef%bc%9across-domain-ajax%ef%bc%8d%e4%bd%bf%e7%94%a8yql/
wp_status: publish
wp_type: post
---

在這次撰寫無名備份工具的途中，由於寫的是Web應用程式，我要抓取無名部落格上的資料就必須要使用到AJAX，但是基於安全性的問題，AJAX在回應非JSONP的情況下，僅支援同域名之間的抓取資料，那麼該怎樣才能跨越域名去抓取資料呢？

# 使用YQL
查了一下發現有人是使用Yahoo所提供的一套API－YQL來進行跨域抓資料的動作，而正好有人也幫你把它包裝起來寫成一個jQuery的plugin，讓你引用該javaScript碼後使用$.get就可以直接跨越域名去抓取資料。

底下正是該plugin的github位址(使用此plugin，也必須引入[jQuery函式庫](http://jquery.com/))：
[https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax/](https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax/)

引用以上的plugin後，在要做讀取資料的地方寫入底下的Code：
```js
$.get(/* 此處放置欲抓取之資料所在的URL */, function(data){
/* data.responseText即為所在該URL的網頁內容 */
});
```
大體上我就是這樣成功的將資料抓進來了！！

# 參考資料
1. Cross Domain AJAX 抓網頁撈過界以及如何整合兩個部落格的標籤：[http://user.frdm.info/ckhung/b/js/xdomain.php](http://user.frdm.info/ckhung/b/js/xdomain.php)
2. Cross-domain requests with jQuery：[http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/](http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/)
3. Cross domain mod for jQuery (Github)：[https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax/](https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax/)
