---
id: 4896
title: '#LeetCode：169. Majority Element'
slug: leetcode：169-majority-element
date: '2020-05-06T17:21:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/06/4896/leetcode%ef%bc%9a169-majority-element/
wp_status: publish
wp_type: post
---

此題要找出陣列中，數值個數佔陣列長度一半以上的數值是多少。

由於數值個數超過陣列長度一半以上，故該數值的個數必定會是陣列中最多的數值。先利用陣列求出每個數值在陣列中佔多少個數的表，接著找表中個數最多的數值是誰即可。

**Kotlin(228ms)**
```kotlin
/*******************************************************
 * LeetCode 169. Majority Element                      *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/06                                 *
 *******************************************************/
class Solution {
    fun majorityElement(nums: IntArray): Int =
        nums.groupBy({ it }).maxBy({ it.value.size })!!.key
}
```
