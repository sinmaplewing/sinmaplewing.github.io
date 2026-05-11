---
id: 3564
title: '#LeetCode：2. Add Two Numbers'
slug: leetcode：2-add-two-numbers
date: '2018-05-23T01:23:22+08:00'
lastmod: '2020-05-14T09:51:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/05/23/3564/leetcode%ef%bc%9a2-add-two-numbers/
wp_status: publish
wp_type: post
---

此題要將兩條 Linked List 做相加，每個 Node 僅留一位數，有進位的部分增加到下一個 Node 上，想問其結果為何。

作法就是直接將兩個 Linked List 中的數值做相加，並將進位加給下一個 Node 即可，但要多加小心指標或 Reference 的操作。

**Kotlin(212ms)**
```kotlin
/*******************************************************/
/* LeetCode 2. Add Two Numbers                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/14                                 */
/*******************************************************/
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
    fun getCurrentNodeValue(node: ListNode?): Int =
        node?.`val` ?: 0
    
    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        var carry : Int = 0
        var head : ListNode? = null
        var p1 = l1
        var p2 = l2
        
        var current : ListNode? = null
        while (p1 != null || p2 != null){
            val sum = getCurrentNodeValue(p1) + getCurrentNodeValue(p2) + carry
            val value = sum % 10
            carry = sum / 10

            val sumNode = ListNode(value)
            if (current == null) {
                head = sumNode
                current = head
            } else {
                current.next = sumNode
                current = current.next
            }

            p1 = p1?.next
            p2 = p2?.next
        }

        if(carry > 0) current!!.next = ListNode(carry)
        return head
    }
}
```

**C++(64ms)**
```cpp
/*******************************************************/
/* LeetCode 2. Add Two Numbers                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/23                                 */
/*******************************************************/
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
  ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    int carry = 0;
    ListNode *head = NULL;
    ListNode *p1 = l1, *p2 = l2, *current = NULL;
    while(p1 != NULL || p2 != NULL){
      int sum = _iterateCurrent(&p1) + _iterateCurrent(&p2) + carry;
      int value = sum % 10;
      carry = sum / 10;
      
      if(head == NULL){
        head = new ListNode(value);
        current = head;
      }
      else{
        current->next = new ListNode(value);
        current = current->next;
      }
    }
    
    if(carry > 0) current->next = new ListNode(carry);
    
    return head;
  }

private:
  int _iterateCurrent(ListNode** p){
    if(*p != NULL){
      int value = (*p)->val;
      *p = (*p)->next;  
      return value;
    }
    
    return 0;
  }
};
```
