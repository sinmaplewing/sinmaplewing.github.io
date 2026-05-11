---
id: 3861
title: '#LeetCode：21. Merge Two Sorted Lists'
slug: leetcode：21-merge-two-sorted-lists
date: '2018-10-15T09:21:45+08:00'
lastmod: '2018-10-16T10:04:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/15/3861/leetcode%ef%bc%9a21-merge-two-sorted-lists/
wp_status: publish
wp_type: post
---

巡覽兩個陣列，依照小到大比對將他們接起來，接到一邊沒有值後就把另外一邊直接整個接上去即可，就不用再巡覽每個剩下的值了。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 21. Merge Two Sorted Lists                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/15                                 */
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
  ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode headNode(-1);
    ListNode* mergeList = &headNode;
    
    ListNode* currentNode = mergeList;
    while(l1 != NULL && l2 != NULL){
      if(l1->val < l2->val){
        currentNode->next = l1;
        l1 = l1->next;
      }
      else{
        currentNode->next = l2;
        l2 = l2->next;
      }
      currentNode = currentNode->next;
    }

    currentNode->next = (l1 != NULL) ? l1 : l2;
    return mergeList->next;
  }
};
```
