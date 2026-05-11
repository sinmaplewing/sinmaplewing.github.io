---
id: 3737
title: '#LeetCode：12. Integer to Roman'
slug: leetcode：12-integer-to-roman
date: '2018-10-03T10:08:17+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/03/3737/leetcode%ef%bc%9a12-integer-to-roman/
wp_status: publish
wp_type: post
---

先對羅馬文字建表，不同的呈現方式就要在表中形成一項，最後從最高的開始往最低的去比對接出字串即是答案。

**C++(44ms)**
```cpp
/*******************************************************/
/* LeetCode 12. Integer to Roman                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/03                                 */
/*******************************************************/
#include <utility>

class Solution {
private:
  static const int ROMAN_TABLE_SIZE = 13;
  const pair<int, string> TABLE[ROMAN_TABLE_SIZE] = { 
    make_pair(1000, "M"), 
    make_pair(900, "CM"), 
    make_pair(500, "D"),
    make_pair(400, "CD"),
    make_pair(100, "C"),
    make_pair(90, "XC"),
    make_pair(50, "L"),
    make_pair(40, "XL"),
    make_pair(10, "X"),
    make_pair(9, "IX"),
    make_pair(5, "V"),
    make_pair(4, "IV"),
    make_pair(1, "I")
  };

public:
  string intToRoman(int num) {
    string result = "";
    for(int i = 0 ; i < ROMAN_TABLE_SIZE ; ++i){
      while(num >= TABLE[i].first){
        result += TABLE[i].second;
        num -= TABLE[i].first;
      }
    }

    return result;
  }
};
```
