---
id: 3917
title: '#LeetCode：25. Reverse Nodes in k-Group'
slug: leetcode：25-reverse-nodes-in-k-group
date: '2018-10-19T12:03:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/19/3917/leetcode%ef%bc%9a25-reverse-nodes-in-k-group/
wp_status: publish
wp_type: post
---

先想像將 Linked List 試著切成多個 `k` 長度的 Linked List ，如果有某一個短的 Linked List 不夠 `k` 長度，則這段不做反轉的動作，其餘則要。

對於每一個 `k` 長度的 Linked List ，先記住原本的頭和尾以及銜接著這個 Linked List 兩側的節點，接著將中間的部分利用前、中、後三個 pointer 去反轉中間銜接的方式，最後再拿出剛剛記的頭尾銜接完反轉後的順序就大功告成了！

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 25. Reverse Nodes in k-Group               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/19                                 */
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
  ListNode* reverseKGroup(ListNode* head, int k) {
    if(head == NULL) return head;

    ListNode dummyHead(-1);
    dummyHead.next = head;

    ListNode* previous = &dummyHead;
    ListNode* current = dummyHead.next;

    while(current != NULL){
      ListNode* partialHeadPrevious = previous;
      ListNode* partialTailNext;
      ListNode* partialHead = current;
      ListNode* partialTail;

      ListNode* next = current;
      for(int i = 1 ; i < k ; ++i){
        next = next->next;
        if(next == NULL) return dummyHead.next;
      }

      partialTail = next;
      partialTailNext = next->next;
      for(int i = 0 ; i < k ; ++i){
        next = current->next;
        current->next = previous;
        previous = current;
        current = next;
      }
      
      partialHeadPrevious->next = partialTail;
      partialHead->next = partialTailNext;
      previous = partialHead;
      current = partialTailNext;
    }

    return dummyHead.next;
  }
};
```
