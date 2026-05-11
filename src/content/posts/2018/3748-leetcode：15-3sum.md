---
id: 3748
title: '#LeetCode：15. 3Sum'
slug: leetcode：15-3sum
date: '2018-10-05T01:38:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/05/3748/leetcode%ef%bc%9a15-3sum/
wp_status: publish
wp_type: post
---

先將陣列排序，之後三個數字先巡覽陣列去固定一個數字後，接著另外兩個數字從兩端向內夾出來即可。在巡覽陣列的時候和夾最後兩個解的時候如遇到重複的數字記得略過。

**C++(84ms)**
```cpp
/*******************************************************/
/* LeetCode 15. 3Sum                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/05                                 */
/*******************************************************/
class Solution {
public:
  vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    if(nums.size() < 3) return result;

    sort(nums.begin(), nums.end());

    /* i + j + k = 0 => j + k = -i */
    for(int i = 0 ; i < nums.size() - 2 ; ++i){
      if(i == 0 || nums[i] != nums[i-1]){
        int finalSum = -nums[i];
        for(int j = i+1, k = nums.size() - 1 ; j < k ; ){
          int currentSum = nums[j] + nums[k];
          if( currentSum > finalSum ){
             do { --k; } while(j < k && nums[k] == nums[k+1]);
          }
          else if(currentSum < finalSum){
            do { ++j; } while(j < k && nums[j] == nums[j-1]);
          }
          else{
            result.push_back({nums[i], nums[j], nums[k]});

            do { ++j; } while(j < k && nums[j] == nums[j-1]);
            do { --k; } while(j < k && nums[k] == nums[k+1]);
          }
        }
      }
    }

    return result;
  }
};
```
