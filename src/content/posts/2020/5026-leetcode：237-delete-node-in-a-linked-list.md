---
id: 5026
title: '#LeetCode：237. Delete Node in a Linked List'
slug: leetcode：237-delete-node-in-a-linked-list
date: '2020-06-02T20:16:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/02/5026/leetcode%ef%bc%9a237-delete-node-in-a-linked-list/
wp_status: publish
wp_type: post
---

這題是要將給予的點從其所在的 Linked List 裡面刪除掉。

由於沒有給前一顆 Node 是誰的關係，所以這題的做法就是把下一顆 Node 的資料蓋掉自己的資料即是答案。

**Kotlin(156ms)**
```kotlin
/*******************************************************
 * LeetCode 237. Delete Node in a Linked List          *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/02                                 *
 *******************************************************/
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */

class Solution {
    fun deleteNode(node: ListNode?) =
        node?.let {
            it.`val` = it.next.`val`
            it.next = it.next.next
        } 
}
```
