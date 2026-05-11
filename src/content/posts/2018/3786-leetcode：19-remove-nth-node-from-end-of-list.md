---
id: 3786
title: '#LeetCode：19. Remove Nth Node From End of List'
slug: leetcode：19-remove-nth-node-from-end-of-list
date: '2018-10-10T18:43:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/10/3786/leetcode%ef%bc%9a19-remove-nth-node-from-end-of-list/
wp_status: publish
wp_type: post
---

利用一個指標尋找結尾、一個指標尋找要刪除的那個 Node 的前一個人是誰。基本上就是讓找結尾的指標先走了 n 個節點後，再開始讓尋找要刪除的那個 Node 的前一個人的指標開始從頭一起走就可以搜尋到了。

P.S. 由於有可能刪除的節點是第一個點，所以前面可以再接個假節點去處理這個狀況。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 19. Remove Nth Node From End of List       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/10                                 */
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
  ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode beforeHead(0);
    beforeHead.next = head;

    ListNode* prevRemoveNode = &beforeHead;
    ListNode* endNode = head;
    for(int i = 0 ; i < n ; ++i){
      endNode = endNode->next;
    }

    while(endNode != NULL){
      prevRemoveNode = prevRemoveNode->next;
      endNode = endNode->next;
    }

    ListNode* nextNode = prevRemoveNode->next->next;
    delete prevRemoveNode->next;
    prevRemoveNode->next = nextNode;

    return beforeHead.next;
  }
};
```
