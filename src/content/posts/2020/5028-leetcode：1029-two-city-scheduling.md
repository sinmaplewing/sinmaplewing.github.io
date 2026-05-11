---
id: 5028
title: '#LeetCode：1029. Two City Scheduling'
slug: leetcode：1029-two-city-scheduling
date: '2020-06-03T18:05:26+08:00'
lastmod: '2020-06-03T18:06:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/06/03/5028/leetcode%ef%bc%9a1029-two-city-scheduling/
wp_status: publish
wp_type: post
---

此題要將 2N 個人平均分攤在兩個城市內，並且要讓所有人飛去的時間的總和是最少的，最後求出其加總的時間為何。

先將 2N 個人按照飛去 A 城市可以省下多少的時間來進行排序，最後選前 N 個飛去 A 城市最省的人飛去 A 城市，另一半人去 B 城市，加總所有時間即可得解。

**Kotlin(172ms)**
```kotlin
/*******************************************************
 * LeetCode 1029. Two City Scheduling                  *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/03                                 *
 *******************************************************/
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val costsByDiffs = costs.sortedBy { it[0] - it[1] }
        val n = costsByDiffs.size / 2
        return costsByDiffs.withIndex().sumBy { 
            it.value[ if (it.index < n) 0 else 1 ] 
        }
    }
}
```
