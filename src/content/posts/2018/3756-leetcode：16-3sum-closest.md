---
id: 3756
title: '#LeetCode：16. 3Sum Closest'
slug: leetcode：16-3sum-closest
date: '2018-10-07T01:52:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/07/3756/leetcode%ef%bc%9a16-3sum-closest/
wp_status: publish
wp_type: post
---

跟 [15. 3Sum](/?p=3748) 解法類似，先排序陣列，固定一個數字後，另外兩個數字就從剩下的數字前後往內縮去找總和最相近的即可。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 16. 3Sum Closest                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/06                                 */
/*******************************************************/
#include <cstdlib>
#include <climits>
#include <algorithm>

class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());

        int minDistance = INT_MAX;
        int closestSum = 0;
        for(int i = 0 ; i < nums.size() - 2 ; ++i){
          for(int j = i + 1, k = nums.size() - 1 ; j < k ; ){
            int sum = nums[i] + nums[j] + nums[k];
            if(sum == target) return sum;

            int distance = abs(sum - target);
            if(distance < minDistance){
              minDistance = distance;
              closestSum = sum;
            }

            if(sum < target){
               do { ++j; } while(j < k && nums[j] == nums[j-1]);
            }
            else{ 
              do { --k; } while(j < k && nums[k] == nums[k+1]);
            }
          }
        }

        return closestSum;
    }
};
```
