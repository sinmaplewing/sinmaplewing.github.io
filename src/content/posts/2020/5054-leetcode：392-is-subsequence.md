---
id: 5054
title: '#LeetCode：392. Is Subsequence'
slug: leetcode：392-is-subsequence
date: '2020-06-09T21:43:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/09/5054/leetcode%ef%bc%9a392-is-subsequence/
wp_status: publish
wp_type: post
---

此題給予 `s` 和 `t` 兩個字串，試求 `s` 字串是否為 `t` 的子序列（即順序相同，但是字不用一定要連在一起）

基本上就是將 `t` 字串依照順序去與 `s` 第一個字比對，如果有一樣的字就比對 `s` 的下一個字，以此類推，直到結束前，如果 `s` 的每一個字都被比過，那答案就為 `true`；那如果直到結束都沒有成功比對，那就是 `false`。

**Kotlin(124ms)**
```kotlin
/*******************************************************
 * LeetCode 392. Is Subsequence                        *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/09                                 *
 *******************************************************/
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        if (s.length == 0) return true
        
        var sCurrentIndex = 0
        for (c in t) {
            if (s[sCurrentIndex] == c) ++sCurrentIndex
            if (sCurrentIndex == s.length) return true
        }
        return false
    }
}
```
