---
id: 4939
title: '#LeetCode：1232. Check If It Is a Straight Line'
slug: leetcode：1232-check-if-it-is-a-straight-line
date: '2020-05-08T20:22:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/05/08/4939/leetcode%ef%bc%9a1232-check-if-it-is-a-straight-line/
wp_status: publish
wp_type: post
---

此題要算出給予的所有點是否會在同一條線上。

將每一個點與第一個點做斜率，看看是否每個斜率做出來皆相同即可得解。

P.S. 注意垂直時的斜率要另外找方法表示。

**Kotlin(176ms)**
```kotlin
/*******************************************************
 * LeetCode 1232. Check If It Is a Straight Line       *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/08                                 *
 *******************************************************/
class Solution {
    fun getSlope(a: IntArray, b: IntArray): Double? {
        val deltaX = b[0] - a[0]
        if (deltaX == 0) return null
        
        val deltaY = b[1] - a[1]
        return deltaY.toDouble() / deltaX.toDouble()
    }
    
    fun equalApproximatly(a: Double?, b: Double?): Boolean {
        if (a == null && b == null) return true
        if (a == null) return false
        if (b == null) return false
        
        val errorValue = 1e-9
        return a < b + errorValue && a > b - errorValue
    }
    
    fun checkStraightLine(coordinates: Array<IntArray>): Boolean {
        if (coordinates.size < 2) return false
        if (coordinates.size == 2) return true
        
        val firstSlope = getSlope(coordinates[0], coordinates[1])
        for (i in 2 until coordinates.size) {
            val currentSlope = getSlope(coordinates[0], coordinates[i])
            if (!equalApproximatly(firstSlope, currentSlope)) {
                return false    
            }
        }
        
        return true
    }
}
```
