---
id: 4230
title: '#LeetCode：44. Wildcard Matching'
slug: leetcode：44-wildcard-matching
date: '2019-04-11T21:27:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/11/4230/leetcode%ef%bc%9a44-wildcard-matching/
wp_status: publish
wp_type: post
---

以「＊」作為分隔，可以將 Pattern 切成好幾段，由於中間是「＊」的關係，這幾段中間可以間隔任意數量的字元，並且除最後一段外的前面所有段都是盡量越前面有配對到就選最前面可以配對的地方即可，直接配到最後一段就要配對完成最後面即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 44. Wildcard Matching                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/11                                 */
/*******************************************************/
#include <string>
using namespace std;

class Solution {
public:
  bool isMatch(string s, string p) {
    int sIndex = 0;
    int pIndex = 0;
    int lastStarFirstSIndex = -1;
    int lastStarPIndex = -1;

    while(sIndex < s.length()){
      if(pIndex < p.length() && p[pIndex] == '*'){
        lastStarFirstSIndex = sIndex;
        lastStarPIndex = pIndex;
        ++pIndex;
      }
      else if(pIndex < p.length() && (s[sIndex] == p[pIndex] || p[pIndex] == '?')){
        ++sIndex;
        ++pIndex;
      }
      else if(lastStarPIndex != -1){
        ++lastStarFirstSIndex;
        sIndex = lastStarFirstSIndex;
        pIndex = lastStarPIndex + 1;
      } 
      else return false;
    }

    while(pIndex < p.length()){
      if(p[pIndex] != '*') return false;
      ++pIndex;
    }

    return true;
  }
};
```
