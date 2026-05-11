---
id: 4975
title: '#LeetCode：485. Max Consecutive Ones'
slug: leetcode：485-max-consecutive-ones
date: '2020-05-15T01:12:57+08:00'
lastmod: '2020-05-15T01:13:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/15/4975/leetcode%ef%bc%9a485-max-consecutive-ones/
wp_status: publish
wp_type: post
---

此題要找出陣列中，連續 1 出現的最長長度為何。

基本上做法就是從頭開始巡覽，去紀錄每一小段的 1 有多長。遇到 1 的時候長度增加 1，遇到 0 的話就重新歸零繼續計算。最後取所有小段 1 長度中最長的那個長度即是答案。

**Kotlin(248ms)**
```kotlin
/*******************************************************
 * LeetCode 485. Max Consecutive Ones                  *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/15                                 *
 *******************************************************/
class Solution {
    fun findMaxConsecutiveOnes(nums: IntArray): Int {
        var maxOneLength = 0
        var oneLength = 0
        for (num in nums) {
            when (num) {
                1 -> {
                    ++oneLength
                    maxOneLength = Math.max(maxOneLength, oneLength)
                }
                else -> oneLength = 0
            }
        }
        
        return maxOneLength
    }
}
```
