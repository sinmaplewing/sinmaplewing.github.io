---
id: 3932
title: '#LeetCode：27. Remove Element'
slug: leetcode：27-remove-element
date: '2018-10-21T12:01:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/21/3932/leetcode%ef%bc%9a27-remove-element/
wp_status: publish
wp_type: post
---

與 [#LeetCode：26. Remove Duplicates from Sorted Array](/2018/10/21/3919/leetcode%ef%bc%9a26-remove-duplicates-from-sorted-array/) 做法類似是用兩個變數去記目前刪除完元素後的數量和正在巡覽陣列時的位置，只是比較的對象變成傳進來的值即可。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 27. Remove Element                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/21                                 */
/*******************************************************/
class Solution {
public:
  int removeElement(vector<int>& nums, int val) {
    if(nums.empty()) return 0;

    int notValueCount = (nums[0] == val) ? 0 : 1;
    for(int i = 1 ; i < nums.size() ; ++i){
      if(nums[i] != val){
        nums[notValueCount] = nums[i];
        ++notValueCount;
      }
    }

    return notValueCount;
  }
};
```
