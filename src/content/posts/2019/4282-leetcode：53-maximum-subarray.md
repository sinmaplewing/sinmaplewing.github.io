---
id: 4282
title: '#LeetCode：53. Maximum Subarray'
slug: leetcode：53-maximum-subarray
date: '2019-04-16T23:28:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/16/4282/leetcode%ef%bc%9a53-maximum-subarray/
wp_status: publish
wp_type: post
---

從頭開始加，當總和比加的該項還小的時候就換成該項的值，一直到最後將加過的值裡面最大的記住即是答案。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 53. Maximum Subarray                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/16                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for(int i = 1 ; i < nums.size() ; ++i){
      currentSum = max(currentSum + nums[i], nums[i]);
      maxSum = max(currentSum, maxSum);
    }

    return maxSum;
  }
};
```
