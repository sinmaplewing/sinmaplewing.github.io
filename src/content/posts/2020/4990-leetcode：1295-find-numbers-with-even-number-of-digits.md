---
id: 4990
title: '#LeetCode：1295. Find Numbers with Even Number of Digits'
slug: leetcode：1295-find-numbers-with-even-number-of-digits
date: '2020-05-20T22:01:59+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/05/20/4990/leetcode%ef%bc%9a1295-find-numbers-with-even-number-of-digits/
wp_status: publish
wp_type: post
---

此題要找出陣列中，究竟有偶數位數的數字有幾個。

將陣列中每個數值轉成字串後，再篩出字串長度為偶數的有幾個即是答案。

**Kotlin(176ms)**
```kotlin
/*******************************************************
 * LeetCode 1295. Find Numbers with Even Number of     *
 *                Digits                               *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/20                                 *
 *******************************************************/
class Solution {
    fun findNumbers(nums: IntArray): Int =
        nums.count { it.toString().length % 2 == 0 }
}
```
