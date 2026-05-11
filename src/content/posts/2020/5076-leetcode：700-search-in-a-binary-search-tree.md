---
id: 5076
title: '#LeetCode：700. Search in a Binary Search Tree'
slug: leetcode：700-search-in-a-binary-search-tree
date: '2020-06-15T20:27:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/15/5076/leetcode%ef%bc%9a700-search-in-a-binary-search-tree/
wp_status: publish
wp_type: post
---

此題要搜尋某元素在二元搜尋樹中的位置。

基本上，本題就是基礎的二元搜尋樹搜尋，巡覽到某一節點 `root`，凡 `root` 中的值比要找的值小，則往節點的左端走；凡 `root` 中的值比要找的值大，則往節點的右端走；若為相等的話就找到並回傳即可。

**Kotlin(244ms)**
```kotlin
/*******************************************************
 * LeetCode 700. Search in a Binary Search Tree        *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/15                                 *
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
    fun searchBST(root: TreeNode?, `val`: Int): TreeNode? {
        if (root == null) return null
        
        return when {
            root.`val` == `val` -> root
            root.`val` < `val` -> searchBST(root.right, `val`)
            else -> searchBST(root.left, `val`)
        }
    }
}
```
