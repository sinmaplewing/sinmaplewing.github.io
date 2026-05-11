---
id: 5081
title: '#LeetCode：130. Surrounded Regions'
slug: leetcode：130-surrounded-regions
date: '2020-06-17T23:21:07+08:00'
lastmod: '2020-06-17T23:21:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/17/5081/leetcode%ef%bc%9a130-surrounded-regions/
wp_status: publish
wp_type: post
---

此題給予一個盤面，要將盤面上面被 `X` 包住的 `O` 全部變成 `X`。

先將未被包住的 `O`，也就是有連到邊界的 `O` 換成別的符號，接著把剩下的 `O` 換成 `X`，再將剛才被換成別的符號的 `O` 換回來即可。

**Kotlin(184ms)**
```kotlin
/*******************************************************
 * LeetCode 130. Surrounded Regions                    *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/17                                 *
 *******************************************************/
const val TEMP_SYMBOL = 'T'
const val CIRCLE_SYMBOL = 'O'
const val CROSS_SYMBOL = 'X'

class Solution {
    fun replaceByFlooding(
        board: Array<CharArray>, 
        i: Int, 
        j: Int, 
        from: Char, 
        to: Char
    ) {
        if (board[i][j] != from) return
        
        board[i][j] = to
        if (i - 1 >= 0) replaceByFlooding(board, i - 1, j, from, to)
        if (i + 1 < board.size) replaceByFlooding(board, i + 1, j, from, to)
        if (j - 1 >= 0) replaceByFlooding(board, i, j - 1, from, to)
        if (j + 1 < board[i].size) replaceByFlooding(board, i, j + 1, from, to)
    }
    
    fun replaceAll(board: Array<CharArray>, from: Char, to: Char) {
        for (i in board.indices) {
            for (j in board[i].indices) {
                if (board[i][j] == from) board[i][j] = to
            }
        }
    }
    
    fun solve(board: Array<CharArray>): Unit {
        if (board.isEmpty()) return
        
        for (i in board.indices) {
            replaceByFlooding(board, i, 0, CIRCLE_SYMBOL, TEMP_SYMBOL)
            replaceByFlooding(board, i, board[i].size - 1, CIRCLE_SYMBOL, TEMP_SYMBOL)
        }
        
        for (j in board[0].indices) {
            replaceByFlooding(board, 0, j, CIRCLE_SYMBOL, TEMP_SYMBOL)
            replaceByFlooding(board, board.size - 1, j, CIRCLE_SYMBOL, TEMP_SYMBOL)
        }
        
        replaceAll(board, CIRCLE_SYMBOL, CROSS_SYMBOL)
        replaceAll(board, TEMP_SYMBOL, CIRCLE_SYMBOL)
    }
}
```
