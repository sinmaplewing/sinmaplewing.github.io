---
id: 4948
title: '#LeetCode：367. Valid Perfect Square'
slug: leetcode：367-valid-perfect-square
date: '2020-05-09T18:51:55+08:00'
lastmod: '2020-05-09T18:55:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/09/4948/leetcode%ef%bc%9a367-valid-perfect-square/
wp_status: publish
wp_type: post
---

此題要找出給予的整數是否為一個完全平方數。

可以使用二元搜尋法去找其整數的根為何，不過要注意整數的範圍：

1. 在找根的過程中，求出兩界的中點時可以使用左界往上增加兩界距離的一半的方式。
2. 若直接使用求出來的根的平方去比大小的話，在求其根的平方數時就有可能會超界，故可以反向用除的來做。只是要注意的是，當相等的時候有可能是整除的情形，亦或是忽略小數點的情形，需另外判斷。

**Kotlin(120ms)**
```kotlin
/*******************************************************
 * LeetCode 367. Valid Perfect Square                  *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/09                                 *
 *******************************************************/
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        if (num == 0) return true
        
        var leftBound = 1
        var rightBound = num
        while (leftBound <= rightBound) {
            val currentRoot = leftBound + (rightBound - leftBound) / 2
            val divideNumber = num / currentRoot
            if (num % currentRoot == 0 && divideNumber == currentRoot) return true
            
            if (divideNumber >= currentRoot) {
                leftBound = currentRoot + 1
            } else {
                rightBound = currentRoot - 1
            }
        }
        
        return false
    }
}
```
