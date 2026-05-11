---
id: 5005
title: '#LeetCode：525. Contiguous Array'
slug: leetcode：525-contiguous-array
date: '2020-05-26T20:06:59+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/26/5005/leetcode%ef%bc%9a525-contiguous-array/
wp_status: publish
wp_type: post
---

這題要求 0 與 1 數量相等的最長子陣列長度。

將陣列中從 0 開始到每一個位置的 0 與 1 差距算出來，然後看看之前是否有算出過同樣的差距，如果有就表示其中中間的這段必定 0 與 1 相互之間數量相等，所以才會抵消變回一樣的差距，故透過這個方法可以找出 0 與 1 相等的子陣列在哪裡。而每個不同的差距只要記得最早出現這個差距的位置即可，因為後面的位置減掉最前面出現的位置才會做出同樣出現這個差距的最長子陣列。

**Kotlin(468ms)**
```kotlin
/*******************************************************
 * LeetCode 525. Contiguous Array                      *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/26                                 *
 *******************************************************/
class Solution {
    fun findMaxLength(nums: IntArray): Int {
        if (nums.size == 0) return 0
        
        val diffToMinIndexFromStart = mutableMapOf(0 to -1)
        var diff = 0
        var maxLength = 0
        for (i in nums.indices) {
            diff += if (nums[i] == 1) 1 else -1
            if (diffToMinIndexFromStart.containsKey(diff)) {
                maxLength = Math.max(maxLength, i - diffToMinIndexFromStart[diff]!!)
            } else {
                diffToMinIndexFromStart[diff] = i
            }
        }
        
        return maxLength
    }
}
```
