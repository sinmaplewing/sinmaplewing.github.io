---
id: 1845
title: '#UVa中文翻譯：620－Cellular Structure(細胞結構)'
slug: uva翻譯：620－cellular-structure細胞結構
date: '2014-08-16T22:56:56+08:00'
lastmod: '2019-12-01T22:37:42+08:00'
draft: false
private: false
categories:
- 03-01 翻譯文章
tags:
- UVa
permalink: /2014/08/16/1845/uva%e7%bf%bb%e8%ad%af%ef%bc%9a620%ef%bc%8dcellular-structure%e7%b4%b0%e8%83%9e%e7%b5%90%e6%a7%8b/
wp_status: publish
wp_type: post
---

有一些APUDOTDLS種的微生物的細胞結構是由A與B兩種不同型態的細胞所串連而成的。

如果這種生物在成長時沒有發生任何突變的話，它的細胞鏈會是底下三種型式的其中一種：

* 單純階段(simple stage)　　　　　　　　　　O = A
* 完全成長階段(fully-grown stage)　　　　　O = OAB
* 致突變階段(mutagenic stage)　　　　　　　O = BOA

範例表示中，若出現O=OA代表我們在一個正常生物的細胞鏈的右方加上了一個A細胞，然後又讓包含A的整條鏈又形成了一條正常生物的細胞鏈。換句話說，意思就是從原本的生物鏈又多成長了一個A細胞。

有個研究室研究了一群這種生物。你的任務就是去寫一支程式，這程式可以從某隻生物的細胞鏈序列得知此生物目前的成長階段以及其健康程度。

# 輸入
一個整數n代表有幾條細胞鏈要被檢驗，接下來n行分別是每條被檢驗的細胞鏈的資訊。

# 輸出
對於每條要被檢驗的細胞鏈(分在不同行)給予一個適當的答案：
　　　　SIMPLE　　　　　　　若為單純階段
　　　　FULLY-GROWN　　　若為完全成長階段
　　　　MUTAGENIC　　　　若為致突變階段
　　　　MUTANT　　　　　　若為其他(對於那些已經突變過的生物)

如果某隻生物同時符合上面兩種階段的話，請以在上面的列表中比較前面的選項作為答案。

# 範例輸入
```
4
A
AAB
BAAB
BAABA
```
# 範例輸出
```
SIMPLE
FULLY-GROWN
MUTANT
MUTAGENIC
```
`翻譯：灆洢。若翻譯有任何錯誤，歡迎底下留言告知，感謝！`
