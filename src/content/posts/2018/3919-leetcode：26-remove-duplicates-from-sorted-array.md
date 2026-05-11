---
id: 3919
title: '#LeetCode：26. Remove Duplicates from Sorted Array'
slug: leetcode：26-remove-duplicates-from-sorted-array
date: '2018-10-21T01:23:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/21/3919/leetcode%ef%bc%9a26-remove-duplicates-from-sorted-array/
wp_status: publish
wp_type: post
---

利用兩個變數，一個記得不重複元素的數量，一個去巡覽整個陣列找出與前項不同的值。巡覽陣列找到不重複的值後就將該值塞在不重複元素目前數量的位置，然後讓記得不重複元素數量的變數往上增加即可得解。

**C++(16ms)**
```cpp
/*******************************************************/
/* LeetCode 26. Remove Duplicates from Sorted Array    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/21                                 */
/*******************************************************/
class Solution {
public:
  int removeDuplicates(vector<int>& nums) {
    if(nums.empty()) return 0;

    int uniqueCount = 1;
    for(int i = 1 ; i < nums.size() ; ++i){
      if(nums[i] != nums[i-1]){
        nums[uniqueCount] = nums[i];
        ++uniqueCount;
      }
    }
    return uniqueCount;
  }
};
```
