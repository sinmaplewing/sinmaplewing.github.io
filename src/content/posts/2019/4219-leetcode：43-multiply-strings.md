---
id: 4219
title: '#LeetCode：43. Multiply Strings'
slug: leetcode：43-multiply-strings
date: '2019-04-10T23:11:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/10/4219/leetcode%ef%bc%9a43-multiply-strings/
wp_status: publish
wp_type: post
---

使用大數乘法的方式去做即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 43. Multiply Strings                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/10                                 */
/*******************************************************/
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
  string multiply(string num1, string num2) {
    vector<int> result(num1.length() + num2.length() + 1, 0);
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());

    for(int i = 0 ; i < num1.length() ; ++i){
      for(int j = 0 ; j < num2.length() ; ++j ){
        result[i + j] += (num1[i] - '0') * (num2[j] - '0');
      }
    }

    for(int i = 0 ; i < result.size() - 1; ++i){
      result[i + 1] += result[i] / 10;
      result[i] %= 10;
    }

    string resultString;
    bool isLeadingZero = true;
    for(int i = result.size() - 1 ; i >= 0 ; --i){
      if(isLeadingZero && i != 0 && result[i] == 0) continue;
      isLeadingZero = false;
      resultString += result[i] + '0'; 
    }

    return resultString;
  }
};
```
