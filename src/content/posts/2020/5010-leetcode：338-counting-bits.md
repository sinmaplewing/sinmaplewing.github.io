---
id: 5010
title: '#LeetCode：338. Counting Bits'
slug: leetcode：338-counting-bits
date: '2020-05-29T00:31:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/29/5010/leetcode%ef%bc%9a338-counting-bits/
wp_status: publish
wp_type: post
---

此題要求出 0 到給予的數字全部換算成二進位後，每一個數字中 1 的個數有幾個。

可以利用 DP 動態規劃來求值，也剛好 DP 動態規劃求出來的表即是答案，遞歸方式如下：

1. 0: 答案為 0。
2. n: 先將個位數那位是 0 還是 1 先得出來，接著砍掉個位數後（向右移或除 2），剩下的部分一定比目前這個值小。由於本題惠從小到大的求解，故可直接查表後將原本個位數那位的答案加總即是答案。

**Kotlin(164ms)**
```kotlin
/*******************************************************
 * LeetCode 338. Counting Bits                         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/29                                 *
 *******************************************************/
class Solution {
    fun countBits(num: Int): IntArray {
        val numberOfBits = IntArray(num + 1, { 0 })
        for (i in 0..num) {
            val currentDigit = i and 1
            val currentBits = currentDigit + numberOfBits[i shr 1]
            numberOfBits[i] = currentBits
        }
        
        return numberOfBits
    }
}
```
