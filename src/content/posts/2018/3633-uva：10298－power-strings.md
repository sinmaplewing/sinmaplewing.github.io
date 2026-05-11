---
id: 3633
title: '#UVa：10298－Power Strings'
slug: uva：10298－power-strings
date: '2018-09-28T10:18:28+08:00'
lastmod: '2018-09-29T22:14:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
featured_image: /uploads/2017/12/MaplewingLogo.png
permalink: /2018/09/28/3633/uva%ef%bc%9a10298%ef%bc%8dpower-strings/
wp_status: publish
wp_type: post
---

將字串拿來做 KMP (或是 MP) 的 failure table ，詳細建法可以看[演算法筆記的 failure function （ prefix function ）（ border function ）章節](http://www.csie.ntnu.edu.tw/~u91029/StringSearching.html#2)，大致概念就是這個表要記錄字串每個字元在其為最後的次長的相同前綴後綴中的位置是哪裡。

而利用這個 Table ，檢查最後一個字元會出現在次長的相同前綴後綴中位置的哪裡，字串長度減掉(它所位於的位置 + 1(這個值應當是最後一個字所在之次長的前綴後綴的長度))即是未被列在最後一個字所在之次長的前綴後綴的字串的長度，再檢查這個長度是否能夠整除字串總長度即可確定其是不是答案。

至於為什麼是這樣，可以想一些例子：
1. `ababab` 的 failure table ，其會是 `-1 -1 0 1 2 3` (次長的前綴後綴是 abab)，總長度扣掉長度等於 2 ，表示的就是沒有列在這個次長的前綴後綴的字串部分 `ab` 的長度 2。
2. `abczabc` 的 failure table ，其會是 `-1 -1 -1 -1 0 1 2` (次長的前綴後綴是 abc)，總長度扣掉長度等於 4 ，表示的就是沒有列在這個次長的前綴後綴的字串部分 `abcz` 的長度是 4 ，而 4 不能整除總長度 7 ，所以表示不是一直重複而來。

P.S. 這題我本來還用 `int sLength = s.Length();` 去記下來，結果這樣還多跑了 0.01 秒，到底wwwwwwwww

**C++(0.100)**
```cpp
/*******************************************************/
/* UVa 10298 Power Strings                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  string s;
  while(cin >> s && s != "."){
    vector<int> failure(s.length(), 0);

    for(int i = 1, j = failure[0] = -1 ; i < s.length() ; ++i){
      while(j >= 0 && s[j+1] != s[i]) j = failure[j];
      if(s[j+1] == s[i]) ++j;
      failure[i] = j;
    }

    int repeatLength = s.length() - failure[s.length() - 1] - 1;
    if(s.length() % repeatLength == 0){
      printf("%d\n", s.length() / repeatLength);
    }
    else{
      printf("1\n");
    }
  }
  return 0;
}
```
