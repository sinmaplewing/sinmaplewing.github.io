---
id: 3915
title: '#LeetCode：24. Swap Nodes in Pairs'
slug: leetcode：24-swap-nodes-in-pairs
date: '2018-10-18T10:35:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/18/3915/leetcode%ef%bc%9a24-swap-nodes-in-pairs/
wp_status: publish
wp_type: post
---

利用兩個指標指向 Linked List 兩個欲交換的節點前面做交換，並巡覽整個 List 做一次即可。

**C++(0ms)**
```cpp
/*******************************************************/
/* LeetCode 24. Swap Nodes in Pairs                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/18                                 */
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
  ListNode* swapPairs(ListNode* head) {
    if(head == NULL) return head;

    ListNode dummyHead(-1);
    dummyHead.next = head;

    ListNode* previous = &dummyHead;
    ListNode* current = dummyHead.next;

    while(current != NULL){
      if(current->next == NULL) break;
      previous->next = current->next;
      current->next = previous->next->next;
      previous->next->next = current;

      previous = current;
      current = current->next;
    }

    return dummyHead.next;
  }
};
```
