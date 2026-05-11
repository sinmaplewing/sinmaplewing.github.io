---
id: 58
title: '#CSharp(C#)：var與dynamic'
slug: csharpc：var與dynamic
date: '2013-09-05T08:49:09+08:00'
lastmod: '2019-12-01T23:04:30+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- C#
permalink: /2013/09/05/58/csharpc%ef%bc%9avar%e8%88%87dynamic/
wp_status: publish
wp_type: post
---

這篇的出現頗神奇的，主要是因為剛好看到Javascript大全中提到duck-typing，突然想到其實C#也是可以玩玩duck-typing，結果就打算來寫這篇Orz...

看到網路上似乎有人對於var和dynamic兩個的用法有點不了解，敝人就以自己沒用多久的經驗來告訴大家兩者的差別吧！

# var: 編譯時期決定型別 (C# 3.0)
var基本上來說，並沒有跳脫強型別的規範，也就是說，用var宣告出來的變數，依然還是屬於靜態型別的變數。var僅僅是讓你在宣告變數時，若可以明確判斷該變數為何種型別的話，就可以不必在變數宣告式寫上其型別，寫上var即可。

```cs
var s = "XD"; //由於可從後面指派的變數得知s為string型別，故可寫var
var model = new Model(); //由於可從後面指派的變數得知model為Model型別，故可寫var
var i; //此處編譯時會出錯，因為無法確定i的型別為何。
s = 1; //此處編譯時會出錯，因為s會是string型別的變數，無法儲存整數值
```

var一般被稱作隱含型別，它其實會在編譯的時候，編譯器自動幫你判斷該變數為何種型別，並幫你在var處填上該型別的名稱，像上面的例子var s = "XD"在編譯的時候，會用string代替掉原本的var。

舉一個簡單且常見的例子，當要對Dictionary型別去做foreach的瀏覽時，我們可直接使用var來代替掉用來當作每個單項的變數的宣告，底下範例：
```cs
Dictionary<string, int> dict = new Dictionary<string, int>();
/* 增加dict的資料 */

foreach( var pair in dict ){  //原本應該寫foreach(KeyValuePair<string, int> pair in dict)
  /* 對pair做事情 */
}
```

# dynamic：執行時期決定型別 (C# 4.0)
這個dynamic就是真正的動態變數，類似於Javascript、Python、Ruby...等等這些語言的變數，一個變數的型態決定於被指派的時候，底下是個範例：
```cs
dynamic dyn; //宣告一個dynamic的變數
dyn = 2; //可以指派整數進去
dyn += 3; //當dyn內存的是整數時，此行會對
dyn = "XD"; //可以改變裡面存的變數為string型別的值
dyn += "XD"; //當dyn內存的是字串時，此行會對
dyn += 3; //當dyn內存的是字串時，此行會在執行時期發生錯誤，但編譯會過。
dyn.HelloEveryBody(); //當dyn內存的值具有HelloEveryBody方法可調用的話會對，但若沒有則在執行時期會錯，但編譯會過。
```

由於變數可以動態的替換各種不同型態的值，編譯器會無法在編譯期找出錯誤，若要找出錯誤，只能等執行時期看看裡面的變數是否可做該運算而決定。

而這個地方也說明了你可以用C#來做duck-typing的事情，底下用個簡單的範例作為收尾。
```cs
void Quack(dynamic duck){
  duck.quack(); //只要傳進來的值具有quack方法可調用，則就會正確執行，不管其型別為何。
}
```

# 參考資料
1. MSDN > var (C# 參考)：[http://msdn.microsoft.com/zh-tw/library/bb383973.aspx](http://msdn.microsoft.com/zh-tw/library/bb383973.aspx)
2. MSDN > dynamic (C# 參考)：[http://msdn.microsoft.com/zh-tw/library/dd264741.aspx](http://msdn.microsoft.com/zh-tw/library/dd264741.aspx)
3. What's the difference between dynamic(C# 4) and var? - Stack Overflow：[http://stackoverflow.com/questions/961581/whats-the-difference-between-dynamicc-4-and-var](http://stackoverflow.com/questions/961581/whats-the-difference-between-dynamicc-4-and-var)
4. var, dynamic 差別以及如何實作像 ViewBag 一樣的物件 - Kelp Code：[http://kelp.phate.org/2011/11/var-dynamic-viewbag.html](http://kelp.phate.org/2011/11/var-dynamic-viewbag.html)
