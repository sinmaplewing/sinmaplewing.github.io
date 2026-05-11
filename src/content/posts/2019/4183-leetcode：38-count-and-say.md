---
id: 4183
title: '#LeetCode：38. Count and Say'
slug: leetcode：38-count-and-say
date: '2019-04-02T23:34:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/02/4183/leetcode%ef%bc%9a38-count-and-say/
wp_status: publish
wp_type: post
---

題目描述的很不清楚，主要的意思是首先從 `1` 開始，接著我們試著念它，會念作 `1 個 1`，所以從這個唸法中出現的數字結合起來得到下一個字串 `11`。接著再試著念這個新得到的字串，會念作 `2 個 1`，所以一樣將唸法出現的數字結合起來得到下一個字串 `21`。繼續將這個新得到的字串拿來念，會念作 `1 個 2，1 個 1`，一樣將所有數字結合起來得到 `1211`。那接著下一個字串就是其念法 `1 個 1，1 個 2，2 個 1`，也就是 `111221` 。以此類推繼續下去就可以。

**C++(4ms)**
```
/*******************************************************/
/* LeetCode 38. Count and Say                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/02                                 */
/*******************************************************/
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
  string countAndSay(int n) {
    if(n <= 1) return "1";

    string previousSay = "1", currentSay;
    for(int i = 2 ; i <= n ; ++i){
      currentSay = "";
      char currentNumber = previousSay[0];
      int currentCount = 1;
      for(int j = 1 ; j < previousSay.length() ; ++j){
        if(currentNumber == previousSay[j]){
          ++currentCount;
        }
        else{
          currentSay += to_string(currentCount) + currentNumber;
          currentNumber = previousSay[j];
          currentCount = 1;
        }
      }
      currentSay += to_string(currentCount) + currentNumber;
      previousSay = currentSay;
    }

    return currentSay;
  }
};
```
