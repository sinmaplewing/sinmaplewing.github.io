---
id: 4956
title: '#LeetCode：733. Flood Fill'
slug: leetcode：733-flood-fill
date: '2020-05-11T21:04:07+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/11/4956/leetcode%ef%bc%9a733-flood-fill/
wp_status: publish
wp_type: post
---

此題給予一張二維的影像，並給予一個點的位置與新的顏色，想要知道如果從該點做油漆桶倒新顏色後，得到的新影像會長什麼樣子。

基本上就是對該點找相鄰的同色做 Flooding(遞迴、DFS) ，將循覽到的點都換成新顏色即可得解。

P.S. 由於本題開出來的函式是希望新影像能夠用回傳的形式回傳回來，故在處理的時候我有特別複製一份，避免改到從函式傳入的原圖片，不過看了一下其他人的解答都沒特別處理就是了。

**Kotlin(244ms)**
```kotlin
/*******************************************************
 * LeetCode 733. Flood Fill                            *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/11                                 *
 *******************************************************/
data class Direction (val row: Int, val column: Int)

class Solution {
    val DIRECTIONS = listOf(
        Direction(1, 0),
        Direction(-1, 0),
        Direction(0, 1),
        Direction(0, -1)
    )
    
    fun floodFill(image: Array<IntArray>, sr: Int, sc: Int, newColor: Int): Array<IntArray> {
        if (
            sr in 0 until image.size &&
            sc in 0 until image[0].size &&
            image[sr][sc] == newColor
        ) {
            return image
        }
        
        val oldColor = image[sr][sc]
        var newImage = Array<IntArray>(image.size) { 
            row -> IntArray(image[row].size) { column -> image[row][column] } 
        }
        newImage[sr][sc] = newColor
        for (direction in DIRECTIONS) {
            val nextRow = sr + direction.row
            val nextColumn = sc + direction.column
            
            if (
                nextRow in 0 until newImage.size &&
                nextColumn in 0 until newImage[0].size &&
                newImage[nextRow][nextColumn] == oldColor
            ) {
                newImage = floodFill(newImage, nextRow, nextColumn, newColor)
            }
        }
        
        return newImage
    }
}
```
