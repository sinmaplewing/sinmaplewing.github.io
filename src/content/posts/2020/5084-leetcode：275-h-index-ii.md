---
id: 5084
title: '#LeetCode：275. H-Index II'
slug: leetcode：275-h-index-ii
date: '2020-06-19T02:21:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/19/5084/leetcode%ef%bc%9a275-h-index-ii/
wp_status: publish
wp_type: post
---

此題給定某位研究員每篇投稿的論文被引用的次數列表，其中次數由小排到大，透過此列表求出該研究的 H 指數為多少。

透過 [Wiki](https://en.wikipedia.org/wiki/H-index) 上的公式：[latex]h-index(f) = \max_i \min (f(i), i)[/latex]，可以了解到要找出所有篇數中，有 h 篇至少有被 h 次以上引用的最大 h 為何。故利用二分搜尋法，透過上述公式求值，接著移動的方向就是往比較可能的方向走：

* 如果[latex]f(i) > i[/latex]，則試圖減少 `f(i)` 的值，增加 `i` 的值，即往右邊搜尋。
* 如果[latex]f(i) < i[/latex]，則試圖增加 `f(i)` 的值，減少 `i` 的值，即往左邊搜尋。
* 如果相等，即往哪走都不會更好了，故求得解。

**Kotlin(208ms)**
```kotlin
/*******************************************************
 * LeetCode 275. H-Index II                            *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/19                                 *
 *******************************************************/
class Solution {
    fun hIndex(citations: IntArray): Int {
        var maxHIndex = 0
        var left = 0
        var right = citations.size
        while (left < right) {
            val mid = left + (right - left) / 2
            val h = citations[mid]
            val atLeastHCount = citations.size - mid
            maxHIndex = Math.max(maxHIndex, Math.min(h, atLeastHCount))
            
            if (h < atLeastHCount) {
                left = mid + 1
            } else if (h > atLeastHCount) {
                right = mid
            } else {
                break
            }
        }
        
        return maxHIndex
    }
}
```
