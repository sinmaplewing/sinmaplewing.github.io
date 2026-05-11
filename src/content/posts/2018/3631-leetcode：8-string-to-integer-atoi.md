---
id: 3631
title: '#LeetCode：8. String to Integer (atoi)'
slug: leetcode：8-string-to-integer-atoi
date: '2018-09-28T02:30:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/28/3631/leetcode%ef%bc%9a8-string-to-integer-atoi/
wp_status: publish
wp_type: post
---

先忽略前面的空白，遇到不是空白的字元後開始判斷第一個字是不是 `+` 、 `-` 或數字，不是就直接傳 0 ，是的話就開始將這裡開始到最後不是數字的地方變成一個整數。

轉成整數的做法就是利用 ASCII 碼中，數字每個字元與 `0` 字元兩個值的距離就是該數字字元所代表的數字，然後一位一位塞進去變數中。判斷 Overflow 的方法跟[第七題](/?p=3627)差不多，在會 Overflow 的前一刻確定一旦將這位數字移進去會不會 Overflow 即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 8. String to Integer (atoi)                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/28                                 */
/*******************************************************/
#include <climits>
#include <cctype>

class Solution {
public:
  int myAtoi(string str) {
    int startIndex = 0;
    for(startIndex = 0; startIndex < str.length() ; ++startIndex){
      if(str[startIndex] != ' ') break;
    }

    if(!isdigit(str[startIndex]) && 
        str[startIndex] != '-' &&
        str[startIndex] != '+' ) return 0;

    int sign = 1;
    if(str[startIndex] == '-'){
        sign = -1;
        ++startIndex;
    }
    else if(str[startIndex] == '+'){
      ++startIndex;
    }

    int value = 0;
    int maxIntDiv10 = INT_MAX / 10;
    int minIntDiv10 = INT_MIN / 10;
    int maxIntLowestDigit = INT_MAX % 10;
    int minIntLowestDigit = INT_MIN % 10;
    for(int i = startIndex ; i < str.length() && isdigit(str[i]) ; ++i){
      int digit = str[i] - '0';

      int currentValue = value * sign;
      if(currentValue > maxIntDiv10 || (currentValue == maxIntDiv10 && digit > maxIntLowestDigit)) return INT_MAX;
      if(currentValue < minIntDiv10 || (currentValue == minIntDiv10 && digit * sign < minIntLowestDigit)) return INT_MIN;

      value = value * 10 + digit;
    }

    return value * sign;
  }
};
```
