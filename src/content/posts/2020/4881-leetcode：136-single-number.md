---
id: 4881
title: '#LeetCode：136. Single Number'
slug: leetcode：136-single-number
date: '2020-05-05T08:55:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/05/4881/leetcode%ef%bc%9a136-single-number/
wp_status: publish
wp_type: post
---

此題要找出整數陣列中唯一沒有與其他數字重複出現的數字是哪一個數字。

利用兩個一樣的數字做 XOR 運算會等於零的性質，將陣列中的所有數字全部做 XOR 後，剩下來的數字就是唯一沒有與人重複的數字。

**Kotlin(212ms)**
```kotlin
/*******************************************************
 * LeetCode 136. Single Number                         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/05                                 *
 *******************************************************/
class Solution {
    fun singleNumber(nums: IntArray): Int =
        nums.reduce { acc, number -> acc xor number }
}
```
