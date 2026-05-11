---
id: 5001
title: '#LeetCode：1008. Construct Binary Search Tree from Preorder Traversal'
slug: leetcode：1008-construct-binary-search-tree-from-preorder-traversal
date: '2020-05-24T21:05:06+08:00'
lastmod: '2020-05-24T21:05:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1000-9999]
permalink: /2020/05/24/5001/leetcode%ef%bc%9a1008-construct-binary-search-tree-from-preorder-traversal/
wp_status: publish
wp_type: post
---

此題給予一個用前序排序的方式排好的二元搜尋樹序列，想要求得原來的二元搜尋樹結構。

首先，前序排序的方式的順序為「中、左、右」，「中」即為當下的根節點，而「左」與「右」的序列則為根節點後面的序列，故接下來需要了解該如何將「左」與「右」序列從後面的序列中分出來。

由於此樹是一個二元搜尋樹，故可知「左」序列中的數值必比根節點的數值來的小，而「右」序列中的數值必比根節點的數值來的大，找到其分界的地方即可分出「左」與「右」序列的交接處，再將兩遍的序列繼續往下遞迴建樹即可得解。

**Kotlin(180ms)**
```kotlin
/*******************************************************
 * LeetCode 1008. Construct Binary Search Tree from    *
 *                Preorder Traversal                   *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/24                                 *
 *******************************************************/
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun bstFromPreorder(preorder: IntArray): TreeNode? {
        if (preorder.size == 0) return null
        val root = TreeNode(preorder.first())
        
        val leftTreeIndex = preorder.indexOfFirst { it < root.`val` }
        val rightTreeIndex = preorder.indexOfFirst { it > root.`val` }

        root.left = if (leftTreeIndex == -1) {
            null
        } else if (rightTreeIndex == -1) {
            bstFromPreorder(preorder.sliceArray(leftTreeIndex..preorder.lastIndex))
        } else {
            bstFromPreorder(preorder.sliceArray(leftTreeIndex..rightTreeIndex - 1))
        }

        root.right = if (rightTreeIndex == -1) {
            null
        } else {
            bstFromPreorder(preorder.sliceArray(rightTreeIndex..preorder.lastIndex))
        }
        
        return root
    }
}
```
