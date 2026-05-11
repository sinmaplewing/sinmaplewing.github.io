---
id: 4142
title: '#LeetCode：34. Find First and Last Position of Element in Sorted Array'
slug: leetcode：34-find-first-and-last-position-of-element-in-sorted-array
date: '2019-03-31T10:22:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/03/31/4142/leetcode%ef%bc%9a34-find-first-and-last-position-of-element-in-sorted-array/
wp_status: publish
wp_type: post
---

C++ 的話，利用函式庫內建的 `lower_bound` 和 `upper_bound` 即可得解。如果要知道詳細的做法可以參考 [C++ reference - lower_bound](http://www.cplusplus.com/reference/algorithm/lower_bound/) 與 [C++ reference - upper_bound](http://www.cplusplus.com/reference/algorithm/upper_bound/) ，基本上就是在二分搜尋的時候對等號的情況給予不一樣的行為即可。

**C++(8ms)**
```cpp
/************************************************************************/
/* LeetCode 34. Find First and Last Position of Element in Sorted Array */
/* Author: Maplewing [at] knightzone.studio                             */
/* Version: 2019/03/31                                                  */
/************************************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<int> searchRange(vector<int>& nums, int target) {
    auto lowerPosition = lower_bound(nums.begin(), nums.end(), target);
    if(lowerPosition == nums.end() || 
      *lowerPosition != target)
      return vector<int>(2, -1);
    
    auto upperPosition = upper_bound(nums.begin(), nums.end(), target);
    return vector<int> { 
      (int)(lowerPosition - nums.begin()), 
      (int)(upperPosition - nums.begin() - 1) 
    };
  }
};
```
