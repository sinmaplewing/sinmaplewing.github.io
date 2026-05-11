---
id: 4979
title: '#LeetCode：328. Odd Even Linked List'
slug: leetcode：328-odd-even-linked-list
date: '2020-05-16T23:18:22+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/16/4979/leetcode%ef%bc%9a328-odd-even-linked-list/
wp_status: publish
wp_type: post
---

此題要將原本的 Linked List 排列成原本位於奇數位的數字按順序排在一起，後面接著原本位於偶數位的數字按順序排在一起。

做法就是先將奇數位和偶數位的數字個別接到另外一個 Linked List 上，再把這兩個 Linked List 接起來即是答案。

**Kotlin(172ms)**
```kotlin
/*******************************************************
 * LeetCode 328. Odd Even Linked List                  *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/16                                 *
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
    fun oddEvenList(head: ListNode?): ListNode? {
        if (head == null) return head
        
        val oldNodeList = ListNode(0)
        var lastOldNode = oldNodeList
        val evenNodeList = ListNode(0)
        var lastEvenNode = evenNodeList
        
        var currentNode = head
        var index = 1
        while (currentNode != null) {
            if (index % 2 == 0) {
                lastEvenNode.next = currentNode
                lastEvenNode = lastEvenNode.next
            } else {
                lastOldNode.next = currentNode
                lastOldNode = lastOldNode.next
            }
           
            currentNode = currentNode.next
            ++index
        }
        
        lastEvenNode.next = null
        lastOldNode.next = evenNodeList.next
        return oldNodeList.next
    }
}
```
