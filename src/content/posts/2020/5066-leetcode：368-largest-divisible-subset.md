---
id: 5066
title: '#LeetCode：368. Largest Divisible Subset'
slug: leetcode：368-largest-divisible-subset
date: '2020-06-14T02:09:37+08:00'
lastmod: '2020-06-14T02:14:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/14/5066/leetcode%ef%bc%9a368-largest-divisible-subset/
wp_status: publish
wp_type: post
---

此題要從給予的數字集合中，找出一個可兩兩成為整除關係的最大子集合為何。

先將數字從小到大排好，接著利用動態規劃(Dynamic Programming)紀錄每個數字 `i` 若是以其當作子集合中最大數字的話，最多可以做出多大的互相兩兩整除的子集合的數量 `count[i]`，則 [latex]count[i] = max(1, count[j_1] + 1, count[j_2] + 1, count[j_3] + 1, ...)， j_n \in \\{ j_n < i \land j_n \mid i \\}[/latex]，並且在找到最大值的時候也順便紀錄找到的 `j` 是哪個，這樣就可以在找到最大數量後，透過這個 `j` 回推出整個子集合有哪些元素。

**Kotlin(256ms)**
```kotlin
/*******************************************************
 * LeetCode 368. Largest Divisible Subset              *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/14                                 *
 *******************************************************/
class Solution {
    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        if (nums.size <= 1) return nums.toList()
        
        val sortedNumbers = nums.sorted()
        val divisibleSubsetCount = IntArray(sortedNumbers.size, { 1 })
        val previousElementIndexInSubset = IntArray(sortedNumbers.size, { it })
        
        var maxCount = 1
        var maxSubsetEndIndex = 0
        for (i in 1..sortedNumbers.lastIndex) {
            for (j in 0..i - 1) {
                if (sortedNumbers[i] % sortedNumbers[j] == 0) {
                    val count = divisibleSubsetCount[j] + 1
                    if (count > divisibleSubsetCount[i]) {
                        divisibleSubsetCount[i] = count
                        previousElementIndexInSubset[i] = j
                        
                        if (count > maxCount) {
                            maxCount = count
                            maxSubsetEndIndex = i
                        }
                    }
                }
            }
        }
        
        var index = maxSubsetEndIndex
        var result = IntArray(maxCount)
        for (i in 0 until maxCount) {
            result[i] = sortedNumbers[index]
            index = previousElementIndexInSubset[index]
        }
        return result.reversed()
    }
}
```
