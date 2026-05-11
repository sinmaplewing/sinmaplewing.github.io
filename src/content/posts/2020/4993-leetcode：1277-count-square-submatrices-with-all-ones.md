---
id: 4993
title: '#LeetCode：1277. Count Square Submatrices with All Ones'
slug: leetcode：1277-count-square-submatrices-with-all-ones
date: '2020-05-21T20:24:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/05/21/4993/leetcode%ef%bc%9a1277-count-square-submatrices-with-all-ones/
wp_status: publish
wp_type: post
---

此題要找出給予的陣列中，能全是 1 的正方形有幾個。

建立一個二維陣列，每一個位置代表的是以此為右下角的矩形有幾個能都是 1。首先第一排和第一列基本上只能有長度為 1 的正方形，所以會與原資料相同。接下來的每一個位置，就去判斷往上、往左上和往左能全是 1 的範圍能多大，取三者之最小值表示能往三個方向都是 1 的最遠範圍（如下圖所示），此最遠範圍再加上自己也有 1 個長度則為能出現全是 1 的正方形的最大長度，也即為以此點為右下角的正方形的個數。將所有點都做完此計算加總即是答案。

![LeetCode 1277](/uploads/2020/05/1277.png)

**Kotlin(360ms)**
```kotlin
/*******************************************************
 * LeetCode 1277. Count Square Submatrices with All    *
 *                Ones                                 *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/21                                 *
 *******************************************************/
class Solution {
    fun countSquares(matrix: Array<IntArray>): Int {
        var count = 0
        val rightBottomSquareSums = Array<IntArray>(matrix.size, { i -> 
            IntArray(matrix[0].size, { j -> matrix[i][j] }) })
        for (i in 0..matrix.lastIndex) {
            for (j in 0..matrix[i].lastIndex) {
                if (matrix[i][j] != 1) continue
                
                if (i == 0 || j == 0) {
                    count += rightBottomSquareSums[i][j]
                    continue
                }
                
                rightBottomSquareSums[i][j] = Math.min(rightBottomSquareSums[i - 1][j - 1],
                    Math.min(rightBottomSquareSums[i - 1][j], rightBottomSquareSums[i][j - 1])) + 1
                count += rightBottomSquareSums[i][j]
            }
        }
        
        return count
    }
}
```
