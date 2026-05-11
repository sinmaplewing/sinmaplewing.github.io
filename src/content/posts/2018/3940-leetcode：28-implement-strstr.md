---
id: 3940
title: '#LeetCode：28. Implement strStr()'
slug: leetcode：28-implement-strstr
date: '2018-10-23T01:38:52+08:00'
lastmod: '2018-10-23T01:39:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/23/3940/leetcode%ef%bc%9a28-implement-strstr/
wp_status: publish
wp_type: post
---

雖然本來應該用簡單的字串比對就可以解了，但想想字串比對可以用個 KMP/MP 演算法來解，所以就順便練一下了，詳細解說可見[演算法筆記](http://www.csie.ntnu.edu.tw/~u91029/StringSearching.html#2)。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 28. Implement strStr()                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/23                                 */
/*******************************************************/
class Solution {
public:
  int strStr(string haystack, string needle) {
    if(needle == "") return 0;
    if(haystack.length() < needle.length()) return -1;

    // Build failure
    vector<int> failure(needle.length());
    for(int i = 1, j = failure[0] = -1 ; i < needle.length() ; ++i){
      while(j >= 0 && needle[j+1] != needle[i]) j = failure[j];
      if(needle[j+1] == needle[i]) ++j;
      failure[i] = j;
    }

    // Search
    for(int i = 0, j = -1 ; i < haystack.length() ; ++i){
      while(j >= 0 && haystack[i] != needle[j+1]) j = failure[j];
      if(haystack[i] == needle[j+1]) ++j;

      if(j == needle.length() - 1){
        return i - needle.length() + 1;
      }
    }

    return -1;
  }
};
```
