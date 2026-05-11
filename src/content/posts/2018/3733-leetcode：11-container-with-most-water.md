---
id: 3733
title: '#LeetCode：11. Container With Most Water'
slug: leetcode：11-container-with-most-water
date: '2018-10-02T09:40:36+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/02/3733/leetcode%ef%bc%9a11-container-with-most-water/
wp_status: publish
wp_type: post
---

從兩邊開始往內夾算面積，移動的方式就是看兩邊誰的高比較小，則那邊就向內移動。原因是因為面積只取到兩邊最小的高，如果某一邊比另外一邊高，就表示矮的那邊已經碰到極限了，所以就向內找看看有沒有更高的高。

**C++(16ms)**
```cpp
/*******************************************************/
/* LeetCode 11. Container With Most Water              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/02                                 */
/*******************************************************/
#include <cstdlib>

class Solution {
public:
  int maxArea(vector<int>& height) {
    int maxA = 0;
    for(int left = 0, right = height.size() - 1 ; left < right ; ){
      maxA = max(maxA, min(height[left], height[right]) * (right - left));
      if(height[left] < height[right]){
        ++left;
      }
      else{
        --right;
      }
    }

    return maxA;
  }
};
```
