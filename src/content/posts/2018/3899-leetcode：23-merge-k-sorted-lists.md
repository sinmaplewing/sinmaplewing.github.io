---
id: 3899
title: '#LeetCode：23. Merge k Sorted Lists'
slug: leetcode：23-merge-k-sorted-lists
date: '2018-10-17T08:55:12+08:00'
lastmod: '2018-10-17T08:56:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/17/3899/leetcode%ef%bc%9a23-merge-k-sorted-lists/
wp_status: publish
wp_type: post
---

將題目想像成是在做 `Merge Sort` 的最後一步合併兩個排序好的陣列回來，故可將這 k 個排序好的陣列利用`Divide & Conquer`的方式兩個兩個合併回來，至於合併兩個排序好的陣列可見[#LeetCode：21. Merge Two Sorted Lists
](/2018/10/15/3861/leetcode%EF%BC%9A21-merge-two-sorted-lists/)。

**C++(16ms)**
```cpp
/*******************************************************/
/* LeetCode 23. Merge k Sorted Lists                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/17                                 */
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
  ListNode* mergeLists(vector<ListNode*>& lists, int startIndex, int endIndex){
    int size = endIndex - startIndex;
    if(size == 0) return NULL;
    if(size == 1) return lists[startIndex];
    
    ListNode *leftSide = mergeLists(lists, startIndex, startIndex + size / 2);
    ListNode *rightSide = mergeLists(lists, startIndex + size / 2, endIndex);
    ListNode headNode(-1);
    ListNode *mergedList = &headNode;
    ListNode *currentNode = mergedList;
    while(leftSide != NULL && rightSide != NULL){
      if(leftSide->val < rightSide->val){
        currentNode->next = leftSide;
        leftSide = leftSide->next;
      }
      else{
        currentNode->next = rightSide;
        rightSide = rightSide->next;
      }

      currentNode = currentNode->next;
    }

    currentNode->next = (leftSide != NULL)? leftSide : rightSide;
    return mergedList->next;
  }

  ListNode* mergeKLists(vector<ListNode*>& lists) {
    return mergeLists(lists, 0, lists.size());
  }
};
```
