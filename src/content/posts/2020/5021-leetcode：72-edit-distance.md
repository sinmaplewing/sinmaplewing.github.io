---
id: 5021
title: '#LeetCode：72. Edit Distance'
slug: leetcode：72-edit-distance
date: '2020-06-01T00:15:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2020/06/01/5021/leetcode%ef%bc%9a72-edit-distance/
wp_status: publish
wp_type: post
---

此題要求出兩個字串若要修改成一樣的話，最少需要幾步。能做的步驟有三種，分別是插入一個字元、刪除一個字元和取代任一個字元成別的字元。

這題可以使用動態規劃，可使用類似於 LCS (Longest Common Subsequence) 的分段二維 DP，分析如下：

* 表示法 `dp[i][j]` 表示 A 字串從第 0 個字元開始 i 個字的子字串與 B 字串從第 0 個字元開始 j 個字的子字串最少需要幾步可以修改成一樣，如果 i 或 j 為 0 就表示是空字串。
* `dp[i][0]` 和 `dp[0][j]`：由於某一邊是空字串，故答案為不為空字串的那邊字串的長度。
* `dp[i][j]` 於 A[i – 1] 與 B[j – 1] 相等的條件：不用任何修改，因為兩邊加入一樣的字元，故答案會與 `dp[i-1][j-1]` 相等。 
* `dp[i][j]` 於 A[i – 1] 與 B[j – 1] 不相等的條件：需要修改，則答案則是從插入方 `dp[i-1][j]`、刪除方 `dp[i][j-1]` 和取代方 `dp[i-1][j-1]` 挑最小的加一步即是答案。

**Kotlin(180ms)**
```kotlin
/*******************************************************
 * LeetCode 72. Edit Distance                          *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/01                                 *
 *******************************************************/
class Solution {
    fun minDistance(word1: String, word2: String): Int {
        val minDistanceTable = Array<IntArray>(word1.length + 1, {
            if (it == 0) {
                IntArray(word2.length + 1) { innerIt ->
                    innerIt
                }
            } else {
                IntArray(word2.length + 1) { innerIt ->
                    if (innerIt == 0) it else 0
                }
            }
        })
        
        for (i in 1..word1.length) {
            for (j in 1..word2.length) {
                minDistanceTable[i][j] = if (word1[i - 1] == word2[j - 1]) {
                    minDistanceTable[i - 1][j - 1]
                } else {
                    Math.min(
                        minDistanceTable[i - 1][j],
                        Math.min(
                            minDistanceTable[i][j - 1],
                            minDistanceTable[i - 1][j - 1]
                        )
                    ) + 1
                }
            }
        }
        
        return minDistanceTable[word1.length][word2.length]
    }
}
```
