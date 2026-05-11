---
id: 4961
title: '#LeetCode：540. Single Element in a Sorted Array'
slug: leetcode：540-single-element-in-a-sorted-array
date: '2020-05-12T21:02:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/12/4961/leetcode%ef%bc%9a540-single-element-in-a-sorted-array/
wp_status: publish
wp_type: post
---

此題要找出陣列唯一沒有兩個重複值的數字為何。

可以利用二分搜尋法去找。由於除了唯一一個數字不是成對出現，其餘的數字都是成對出現，故如果唯一的數字尚未出現的話，陣列索引值為偶數的數字會和它的下一個數字相同(ex. `nums[0] == nums[1]`、`nums[2] == nums[3]`)；但若唯一的數字出現過的話，則後面的全部數字就會變成陣列索引值為偶數的數字會和它的上一個數字相同(ex. `nums[4]` 為答案，接下去就會是 `nums[5] == nums[6]`、`nums[7] == nums[8]`)。根據這個規則，在二分搜尋的時候，就看現在的狀況是上述兩種狀況的哪一種，即可知道下一次要往前找還是往後找了。

**Kotlin(196ms)**
```kotlin
/*******************************************************
 * LeetCode 540. Single Element in a Sorted Array      *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/12                                 *
 *******************************************************/
const val NOT_FOUND = -1

class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {
        val indexRange = 0 until nums.size
        var leftBound = indexRange.start
        var rightBound = indexRange.endInclusive
        while (leftBound <= rightBound) {
            val currentIndex = leftBound + (rightBound - leftBound) / 2
            val nextIndex = currentIndex + 1
            val previousIndex = currentIndex - 1
            
            var secondIndex = currentIndex
            if (nextIndex in indexRange && nums[currentIndex] == nums[nextIndex]) {
                secondIndex = nextIndex
            } else if (previousIndex in indexRange && nums[currentIndex] == nums[previousIndex]) {
                secondIndex = currentIndex
            } else return nums[currentIndex]
            
            if (secondIndex % 2 == 1) {
                leftBound = secondIndex + 1
            } else {
                rightBound = secondIndex - 2
            }
        }
        
        // According to the problem description, this will not be achieved.
        return NOT_FOUND
    }
}
```
