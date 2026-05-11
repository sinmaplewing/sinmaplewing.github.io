---
id: 4988
title: '#LeetCode：230. Kth Smallest Element in a BST'
slug: leetcode：230-kth-smallest-element-in-a-bst
date: '2020-05-20T21:38:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/20/4988/leetcode%ef%bc%9a230-kth-smallest-element-in-a-bst/
wp_status: publish
wp_type: post
---

此題要找出在二元搜尋樹中的第 K 個元素為何。

利用中序巡覽(in-order traversal)的方式去計算個數，當算到 K 的時候即是答案。

**Kotlin(232ms)**
```kotlin
/*******************************************************
 * LeetCode 230. Kth Smallest Element in a BST         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/20                                 *
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
    data class FindResult(val result: Int?, val count: Int?);
    
    fun findKthSmallest(root: TreeNode?, k: Int): FindResult {
        if (root == null) return FindResult(null, 0)
        
        val leftResult = findKthSmallest(root.left, k)
        if (leftResult.result != null) return leftResult
        
        val leftResultCount = leftResult.count ?: 0
        val currentK = k - leftResultCount - 1
        if (currentK == 0) return FindResult(root.`val`, null)
        
        val rightResult = findKthSmallest(root.right, currentK)
        if (rightResult.result != null) return rightResult
        
        val rightResultCount = rightResult.count ?: 0
        return FindResult(null, leftResultCount + 1 + rightResultCount)
    }
    
    fun kthSmallest(root: TreeNode?, k: Int): Int 
        = findKthSmallest(root, k).result!!
}
```
