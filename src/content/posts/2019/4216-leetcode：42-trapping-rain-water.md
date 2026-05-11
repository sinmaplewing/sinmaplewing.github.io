---
id: 4216
title: '#LeetCode：42. Trapping Rain Water'
slug: leetcode：42-trapping-rain-water
date: '2019-04-09T10:10:40+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
featured_image: /uploads/2019/04/42.png
permalink: /2019/04/09/4216/leetcode%ef%bc%9a42-trapping-rain-water/
wp_status: publish
wp_type: post
---

![Water](/uploads/2019/04/42.png)

概念如同上圖所示，任一個位置能存的水量會是以那點往左以及往右所能找到最高高度的最小值。

而如何去找任一點的水量則可從兩邊的頭開始夾出，當兩邊有任一邊小於另外一邊，則該邊所指向的位置的水量即可算出，因為就算另外一邊可以拿到更高的高度，對已經碰到邊緣沒有更大的一邊來說已經沒辦法再增長它能夠存的水量，故可算出之後讓該比較小的那邊再向內一格，再繼續進行這個步驟。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 42. Trapping Rain Water                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/09                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int trap(vector<int>& height) {
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;
    for(int left = 0, right = height.size() - 1 ; left <= right ; ){
      leftMax = max(leftMax, height[left]);
      rightMax = max(rightMax, height[right]);
      
      int twoSideMinHeight = min(leftMax, rightMax);
      if(height[left] < height[right]){
        water += twoSideMinHeight - height[left];
        ++left;
      }
      else{
        water += twoSideMinHeight - height[right];
        --right;
      }
    }

    return water;
  }
};
```
