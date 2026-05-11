---
id: 3742
title: '#LeetCode：13. Roman to Integer'
slug: leetcode：13-roman-to-integer
date: '2018-10-04T09:03:50+08:00'
lastmod: '2018-10-04T09:44:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/04/3742/leetcode%ef%bc%9a13-roman-to-integer/
wp_status: publish
wp_type: post
---

比對加總即可。唯一的例外就是當下該位的數值比右邊那位的數值小的時候要用減的，也就是 `IV` 、 `IX` ......等等這些狀況。

**C++(48ms)**
```cpp
/*******************************************************/
/* LeetCode 13. Roman to Integer                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/04                                 */
/*******************************************************/
#include <map>

class Solution {
private:
  const map<char, int> TABLE = { 
    {'I', 1}, {'V', 5}, {'X', 10},
    {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}
  };

public:
  int romanToInt(string s) {
    int value = TABLE.at(s[s.length()-1]);
    for(int i = s.length() - 2 ; i >= 0 ; --i){
      if(TABLE.at(s[i]) < TABLE.at(s[i+1])){
        value -= TABLE.at(s[i]);
        continue;
      }

      value += TABLE.at(s[i]);
    }

    return value;
  }
};
```
