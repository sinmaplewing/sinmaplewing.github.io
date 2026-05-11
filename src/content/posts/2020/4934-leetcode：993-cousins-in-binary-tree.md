---
id: 4934
title: '#LeetCode：993. Cousins in Binary Tree'
slug: leetcode：993-cousins-in-binary-tree
date: '2020-05-07T20:04:44+08:00'
lastmod: '2020-05-07T20:05:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/07/4934/leetcode%ef%bc%9a993-cousins-in-binary-tree/
wp_status: publish
wp_type: post
---

此題要問的是兩個數值在指定的二元樹中，是否深度相同但親節點不同。

基本上的方法就是先找出兩個數值在二元樹中的深度與其親節點為何，接著進行比較即可得解。

**Kotlin(148ms)**
```kotlin
/*******************************************************
 * LeetCode 993. Cousins in Binary Tree                *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/07                                 *
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
    companion object {
        const val ROOT_PARENT = -1
    }
    
    data class NodeData(val depth: Int, val parent: Int)
    
    fun findNode(root: TreeNode?, n: Int, depth: Int, parent: Int): NodeData? {
        if (root == null) return null
            
        if (root.`val` == n) {
          return NodeData(depth, parent)
        }  

        val leftFound = findNode(root.left, n, depth + 1, root.`val`)
        if (leftFound != null) return leftFound

        return findNode(root.right, n, depth + 1, root.`val`)
    }
    
    fun isCousins(root: TreeNode?, x: Int, y: Int): Boolean {
        if (root == null) return false
        
        var xNodeData = findNode(root, x, 0, ROOT_PARENT)
        var yNodeData = findNode(root, y, 0, ROOT_PARENT)
        
        return (xNodeData?.depth == yNodeData?.depth && 
            xNodeData?.parent != yNodeData?.parent) ?: false
    }
}
```
