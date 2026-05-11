---
id: 4196
title: '#LeetCode：41. First Missing Positive'
slug: leetcode：41-first-missing-positive
date: '2019-04-04T01:42:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/04/4196/leetcode%ef%bc%9a41-first-missing-positive/
wp_status: publish
wp_type: post
---

將給予的陣列的數字想辦法先照從 1 開始的順序去進行排序，也就是先尋覽一次陣列，將遇到的數字如果值介於 1 ~ N 的話，就與對應的第 0 ~ N-1 格的數字進行交換，完成後再從第 0 格開始看看從哪格開始沒有照順序排即是答案。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 41. First Missing Positive                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/04                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution {
public:
  int firstMissingPositive(vector<int>& nums) {
    for(int i = 0 ; i < nums.size() ; ++i){
      if(nums[i] >= 1 && nums[i] <= nums.size() && nums[nums[i] - 1] != nums[i]){
        swap(nums[i], nums[nums[i] - 1]);
        --i;
      }
    }

    for(int i = 0 ; i < nums.size() ; ++i){
      if(nums[i] - 1 != i){
        return i + 1;
      }
    }
    return nums.size() + 1;
  }
};
```
