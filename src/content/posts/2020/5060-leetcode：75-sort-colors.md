---
id: 5060
title: '#LeetCode：75. Sort Colors'
slug: leetcode：75-sort-colors
date: '2020-06-12T01:16:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2020/06/12/5060/leetcode%ef%bc%9a75-sort-colors/
wp_status: publish
wp_type: post
---

此題要將給予的花朵陣列依照紅、白、藍的順序排好。

解題的想法大致上就是將紅與藍排好的話，白色的花就會排好了。所以就巡覽陣列，若遇到紅的花就從前頭開始排，若遇到藍的花就從尾巴開始排，依此方式去交換陣列裡的花即可得解。

**Kotlin(156ms)**
```kotlin
/*******************************************************/
/* LeetCode 75. Sort Colors                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/06/12                                 */
/*******************************************************/
fun IntArray.swap(i: Int, j: Int) {
    val temp = this[i]
    this[i] = this[j]
    this[j] = temp
}

class Solution {
    fun sortColors(nums: IntArray): Unit {
        var redTailIndex = -1
        var blueHeadIndex = nums.size
        
        var currentIndex = 0
        while (currentIndex < blueHeadIndex) {
            when (nums[currentIndex]) {
                0 -> nums.swap(currentIndex, ++redTailIndex)
                2 -> nums.swap(currentIndex--, --blueHeadIndex)
            }
            ++currentIndex
        }
    }
}
```
