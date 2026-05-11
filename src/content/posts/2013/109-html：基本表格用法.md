---
id: 109
title: '#HTML：基本表格用法'
slug: html：基本表格用法
date: '2013-10-11T21:31:51+08:00'
lastmod: '2014-08-28T00:53:40+08:00'
draft: false
private: false
categories:
- 02-01 程式設計教學
tags:
- HTML
permalink: /2013/10/11/109/html%ef%bc%9a%e5%9f%ba%e6%9c%ac%e8%a1%a8%e6%a0%bc%e7%94%a8%e6%b3%95/
wp_status: publish
wp_type: post
---

請原諒我很久沒繼續寫HTML教學文了，
一直很想寫，但因為生病的關係停了一陣子，
真的是很不好意思。

# 行和列、欄和列、Row & Column
首先要先能夠分別［行和列］、［欄和列］、［Row & Column］，這樣在表格的教學文中才不會出現問題，首先先看底下的圖來進行分辨：
![Row & Column](/uploads/2014/05/hrFU4NcsTd2XnSS7psvg_slide-22-638.jpg)

或許各位會記不起來行和列的分別，所以我利用以前在赫哲補習班學到的方法來告訴大家，透過行與列的第一個筆畫即可分別，`行`的第一個筆畫偏上下，而`列`的第一個筆畫為左右，故可藉此來分別，不過中國大陸的行和列是與我們相反的，還請各位多多注意。

# 基本表格結構
底下先讓我們看一個基礎的範例：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>表格</title>
  </head>
  <body>
    <table border="1">
      <tr>
        <th>英文名稱</th>
        <th>中文名稱</th>
      </tr>
      <tr>
        <td>Sonic</td>
        <td>索尼克</td>
      </tr>
      <tr>
        <td>Tails</td>
        <td>塔爾斯</td>
      </tr>
      <tr>
        <td>Knuckles</td>
        <td>納克</td>
      </tr>
      <tr>
        <td>Amy</td>
        <td>艾咪</td>
      </tr>
    </table>
  </body>
</html>
```
![table01.png](/uploads/2014/05/sN65znISLmbf66BEF316_table01.png)

看到程式碼這麼長，大家應該都昏了吧！我來慢慢解釋給各位聽吧！

首先，`<table>...</table>`包的是整個表格的內容，而table標籤本身有個屬性叫做border，在以前的標準，其值為框線的粗細大小；現時的標準，只有0與1這個值可以填，表明表格是否要有框線，若沒使用border，則預設為無框線。

再來有四組的`<tr>...</tr>`，每組tr標籤個別表示的是表格裡的一列，在每組tr標籤中，有`<td>...</td>`與`<th>...</th>`兩種標籤，分別都表示一列裡面的一格資料，只不過th標籤表示的是標題資料，td標籤表示的是一般資料。而th標籤由於是表示標題資料，故有預設的粗體、文字置中樣式會自動套上去。這樣大概就是整個表格的架構了！

# 合併格
接著我們來合併格子吧！底下一樣給個範例：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>表格</title>
  </head>
  <body>
    <table border="1">
      <tr>
        <th>英文名稱</th>
        <th>中文名稱</th>
      </tr>
      <tr>
        <td rowspan="2">Sonic</td>
        <td>索尼克</td>
      </tr>
      <tr>
        <td>音速小子</td>
      </tr>
      <tr>
        <td>Tails</td>
        <td>塔爾斯</td>
      </tr>
      <tr>
        <td>Knuckles</td>
        <td>納克</td>
      </tr>
      <tr>
        <td>Amy</td>
        <td>艾咪</td>
      </tr>
      <tr>
        <td colspan="2">E-123 Omega</td>
      </tr>
    </table>
  </body>
</html>
```
![table02.png](/uploads/2014/05/qpjHGljxQUG6VIBU03Hw_table02.png)

我們可以在td標籤與th標籤插入colspan與rowspan屬性去給予要合併的格數。

在範例中，`Sonic`該格使用了`rowspan="2"`，也就是指`Sonic`該格要佔兩個列(row)，所佔的位置為該格與下一列的對應位置的該格，這也使下一個tr內少了一個td標籤。同理，而`E-123 Omega`該格使用了`colspan="2"`，也就是指`E-123 Omega`該格要佔兩個行(column)，所佔的位置為該格與向右一格的格子，故其所在的tr標籤少了一個td標籤，這也就是合併格子的用法。

這樣講完了基本的表格用法，等之後再來提提更進階的表格結構吧！(雖然這個之後應該會非常久就是了XD!!)

# 參考資料
1. w3schools.com &gt; HTML Tables：[http://www.w3schools.com/html/html_tables.asp](http://www.w3schools.com/html/html_tables.asp)
2. w3schools.com &gt; HTML &lt;table&gt; Tag：[http://www.w3schools.com/tags/tag_table.asp](http://www.w3schools.com/tags/tag_table.asp)
3. HTML表格（table）的常用語法：[http://www.pt.ntu.edu.tw/hmchai/ptcomputer03_2/hHTML/HTMLtable.htm](http://www.pt.ntu.edu.tw/hmchai/ptcomputer03_2/hHTML/HTMLtable.htm)
