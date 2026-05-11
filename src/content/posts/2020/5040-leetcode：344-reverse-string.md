---
id: 5040
title: '#LeetCode：344. Reverse String'
slug: leetcode：344-reverse-string
date: '2020-06-04T18:08:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/04/5040/leetcode%ef%bc%9a344-reverse-string/
wp_status: publish
wp_type: post
---

此題要將輸入進來的字元陣列直接反轉。

作法是直接用迴圈讓 i 從 0 數到陣列的一半，並在每次迴圈執行時，將從頭數 i 個與從尾巴數 i 個的兩個陣列值進行交換，即是答案。

**Kotlin(260ms)**
```kotlin
/*******************************************************
 * LeetCode 344. Reverse String                        *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/04                                 *
 *******************************************************/
class Solution {
    fun reverseString(s: CharArray): Unit {
        if (s.size == 0) return
        
        for (leftIndex in 0..s.lastIndex / 2) {
            val rightIndex = s.lastIndex - leftIndex
            
            val temp = s[leftIndex]
            s[leftIndex] = s[rightIndex]
            s[rightIndex] = temp
        }
    }
}
```
