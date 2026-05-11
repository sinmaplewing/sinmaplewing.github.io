---
id: 4998
title: '#LeetCode：986. Interval List Intersections'
slug: leetcode：986-interval-list-intersections
date: '2020-05-23T17:29:15+08:00'
lastmod: '2020-05-23T17:31:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/23/4998/leetcode%ef%bc%9a986-interval-list-intersections/
wp_status: publish
wp_type: post
---

此題要找出兩邊區間群的交集區間群。

由於有兩條區間群都有排序過，所以就是兩邊開始從頭比較區間，如果兩邊所選出的區間有交集就產生出一個交集區間，接著將比較前面區間的那條區間群再往後一個去做一樣的判斷，直到兩邊區間群都沒區間為止。

**Kotlin(284ms)**
```kotlin
/*******************************************************
 * LeetCode 986. Interval List Intersections           *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/23                                 *
 *******************************************************/
class Solution {
    fun intervalIntersection(A: Array<IntArray>, B: Array<IntArray>): Array<IntArray>     {
        if (A.size == 0 || B.size == 0) return Array<IntArray>(0, { IntArray(0) })

        val result = mutableListOf<IntArray>()
        var aIndex = 0
        var bIndex = 0
        while (aIndex < A.size && bIndex < B.size) {
            if (A[aIndex][0] in B[bIndex][0]..B[bIndex][1] ||
                B[bIndex][0] in A[aIndex][0]..A[aIndex][1]
            ) {
                result.add(intArrayOf(
                    Math.max(A[aIndex][0], B[bIndex][0]),
                    Math.min(A[aIndex][1], B[bIndex][1])
                ))
            } 

            if (A[aIndex][1] < B[bIndex][1]) {
                ++aIndex
            } else if (A[aIndex][1] == B[bIndex][1]) {
                ++aIndex
                ++bIndex
            } else {
                ++bIndex
            }
        }

        return result.toTypedArray()
    }
}
```
