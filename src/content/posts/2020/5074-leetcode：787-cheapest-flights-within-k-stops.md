---
id: 5074
title: '#LeetCode：787. Cheapest Flights Within K Stops'
slug: leetcode：787-cheapest-flights-within-k-stops
date: '2020-06-15T01:01:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/15/5074/leetcode%ef%bc%9a787-cheapest-flights-within-k-stops/
wp_status: publish
wp_type: post
---

此題要求從起點到終點，中間最多只能經過 `K` 個停靠站的情況下，最少可以花多少錢。

基本上題目就是最短路徑問題加上 `K` 個中途點的限制。這裡使用 Bellman-Ford 的最短路徑演算法實作，利用僅更新 `K + 1` 次來達到被 `K` 個中途點所限制的條件。

**Kotlin(236ms)**
```kotlin
/*******************************************************
 * LeetCode 787. Cheapest Flights Within K Stops       *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/15                                 *
 *******************************************************/
const val NO_DATA = -1

class Solution {
    fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, K: Int): Int {
        var previousCityPrice = IntArray(n, { NO_DATA })
        var currentCityPrice = IntArray(n, { NO_DATA })
        currentCityPrice[src] = 0
        
        for (i in 0..K) {
            previousCityPrice = currentCityPrice.clone()
            for (flight in flights) {
                if (previousCityPrice[flight[0]] == NO_DATA) {
                    continue;
                }
                
                val currentTargetCityPrice = previousCityPrice[flight[0]] + flight[2]
                if (currentCityPrice[flight[1]] == NO_DATA ||
                    currentTargetCityPrice < currentCityPrice[flight[1]]
                ) {
                    currentCityPrice[flight[1]] = currentTargetCityPrice
                }
            }
        }
        
        return currentCityPrice[dst]
    }
}
```
