---
id: 5015
title: '#LeetCode：973. K Closest Points to Origin'
slug: leetcode：973-k-closest-points-to-origin
date: '2020-05-30T21:43:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/30/5015/leetcode%ef%bc%9a973-k-closest-points-to-origin/
wp_status: publish
wp_type: post
---

此題要求的是給予的點中，找出與原點最近的 K 個點是哪些。

此題的作法基本上就是將這群點用與原點之間的距離去進行排序，排序完後取前 K 個即可得解。

**Kotlin(608ms)**
```kotlin
/*******************************************************
 * LeetCode 973. K Closest Points to Origin            *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/30                                 *
 *******************************************************/
class Solution {
    class Point(val x: Int, val y: Int) {
        val distance = Math.hypot(x.toDouble(), y.toDouble())
        
        fun toIntArray() = intArrayOf(x, y)
    }
    
    
    fun kClosest(points: Array<IntArray>, K: Int): Array<IntArray> =
        if (K == 0) {
            arrayOf<IntArray>()
        } else {
            points.map({ Point(it[0], it[1]) })
                .sortedBy({ it.distance })
                .slice(0..K - 1)
                .map({ it.toIntArray() })
                .toTypedArray()
        }
}
```
