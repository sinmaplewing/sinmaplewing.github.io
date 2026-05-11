---
id: 5003
title: '#LeetCode：1035. Uncrossed Lines'
slug: leetcode：1035-uncrossed-lines
date: '2020-05-25T21:05:19+08:00'
lastmod: '2020-06-01T00:12:55+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/05/25/5003/leetcode%ef%bc%9a1035-uncrossed-lines/
wp_status: publish
wp_type: post
---

這題要求將兩個數列中，將兩邊相同的數字連在一起，中途不可以交叉，最多可以連出幾條線。

這題可以使用動態規劃，可使用類似於 LCS (Longest Common Subsequence) 或 Edit Distance 的分段二維 DP，分析如下：

* 表示法 `dp[i][j]` 表示 A 數列從第 1 個值到第 i 個值的子數列與 B 數列從第 1 個值到第 j 個值的子數列最多可連線的個數為多少，如果 i 或 j 為 0 就表示是空數列。
* `dp[i][0]` 和 `dp[0][j]`：由於某一邊都完全沒有數值，故所有答案為 0 。
* `dp[i][j]` 於 A[i - 1] 與 B[j - 1] 相等的條件：可連線，答案即為沒有這條連線的最佳答案 `dp[i-1][j-1]` 加上這條連線。
* `dp[i][j]` 於 A[i - 1] 與 B[j - 1] 不相等的條件：無法連線，答案即選擇沒有其中一邊的最佳答案中的最大值 `max(dp[i-1][j], dp[i][j-1])`。

**Kotlin(164ms)**
```kotlin
/*******************************************************
 * LeetCode 1035. Uncrossed Lines                      *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/25                                 *
 *******************************************************/
class Solution {
    fun maxUncrossedLines(A: IntArray, B: IntArray): Int {
        val dpRows = A.size + 1
        val dpColumns = B.size + 1
        val dpTable = Array<IntArray>(dpRows, { IntArray(dpColumns, { 0 }) })
        for (i in 1 until dpRows) {
            for (j in 1 until dpColumns) {
                dpTable[i][j] = if (A[i - 1] == B[j - 1]) {
                    dpTable[i - 1][j - 1] + 1 
                } else {
                    Math.max(dpTable[i][j - 1], dpTable[i - 1][j])
                }
            }
        }
        
        return dpTable[dpRows - 1][dpColumns - 1]
    }
}
```
