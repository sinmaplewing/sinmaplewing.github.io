---
id: 5024
title: '#LeetCode：226. Invert Binary Tree'
slug: leetcode：226-invert-binary-tree
date: '2020-06-01T19:40:55+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/01/5024/leetcode%ef%bc%9a226-invert-binary-tree/
wp_status: publish
wp_type: post
---

這題想要將給予的二元樹中，所有節點的左右子樹通通互換過來。

先遞迴將根節點的左右子樹中的所有節點的左右子樹互相交換，接著再將根節點的左右子樹交換即可得解。

**Kotlin(144ms)**
```kotlin
/*******************************************************
 * LeetCode 226. Invert Binary Tree                    *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/01                                 *
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
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) return null
        
        val temp = root.left
        root.left = invertTree(root.right)
        root.right = invertTree(temp)
        
        return root
    }
}
```
