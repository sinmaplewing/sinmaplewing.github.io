---
id: 4140
title: '#LeetCode：33. Search in Rotated Sorted Array'
slug: leetcode：33-search-in-rotated-sorted-array
date: '2019-03-31T10:07:19+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/03/31/4140/leetcode%ef%bc%9a33-search-in-rotated-sorted-array/
wp_status: publish
wp_type: post
---

先利用二分搜尋找出旋轉起點，再以其為起點去使用二分搜尋找出答案。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 33. Search in Rotated Sorted Array         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/31                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution{
public:
  int findRotateIndex(int size, int startIndex, int index){
    return (index + startIndex) % size;
  }

  int search(vector<int> &nums, int target){
    if(nums.size() <= 0) return -1;

    int lowBound = 0, highBound = nums.size();
    int startIndex = 0;
    while(lowBound < highBound){
      int middle = (lowBound + highBound) / 2;

      if(middle == 0 || nums[middle] < nums[middle - 1]){
        startIndex = middle;
        break;
      }

      if(nums[middle] > nums[0]) lowBound = middle + 1;
      else highBound = middle;
    }

    lowBound = 0;
    highBound = nums.size();
    while(lowBound < highBound){
      int middle = (lowBound + highBound) / 2;
      int rotateMiddle = findRotateIndex(nums.size(), startIndex, middle);
      if(nums[rotateMiddle] == target) return rotateMiddle;

      if (nums[rotateMiddle] > target) highBound = middle;
      else lowBound = middle + 1;
    }

    return -1;
  }
};
```
