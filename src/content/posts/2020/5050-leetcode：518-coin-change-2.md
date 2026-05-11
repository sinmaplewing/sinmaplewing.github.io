---
id: 5050
title: '#LeetCode：518. Coin Change 2'
slug: leetcode：518-coin-change-2
date: '2020-06-08T21:18:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/08/5050/leetcode%ef%bc%9a518-coin-change-2/
wp_status: publish
wp_type: post
---

此題給予可用的硬幣以及要找錢的數量，想求得總共有幾種找零方法。

經典的找零錢問題，可以使用動態規劃(Dynamic Programming)的方式來解決，基本公式為`排法(價格 i, 從第 1 種硬幣使用到第 j 種硬幣) = 排法(i - coin[j], j)`，利用這個公式進行建表即可得解。

**Kotlin(176ms)**
```kotlin
/*******************************************************
 * LeetCode 518. Coin Change 2                         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/08                                 *
 *******************************************************/
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val changeCounts = IntArray(amount + 1) { 0 }
        changeCounts[0] = 1
        for (coin in coins) {
            for (i in 1..amount) {
                if (i - coin >= 0) {
                    changeCounts[i] += changeCounts[i - coin]
                }
            }
        }
        
        return changeCounts[amount]
    }
}
```
