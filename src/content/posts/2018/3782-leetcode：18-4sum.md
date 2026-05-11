---
id: 3782
title: '#LeetCode：18. 4Sum'
slug: leetcode：18-4sum
date: '2018-10-09T10:12:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/09/3782/leetcode%ef%bc%9a18-4sum/
wp_status: publish
wp_type: post
---

將原本 [15. 3Sum](/?p=3748) 擴張到 4Sum 或是 nSum 也是一樣的道理，先排序後定住 n-2 個值後，最後兩個值利用前後夾擊的方式去求出來。至於如何定住 n-2 個值，當然你可以使用 n-2 個迴圈，不過就沒辦法擴充了，可以用類似 [17. Letter Combinations of a Phone Number](/?p=3771) 的方法，利用 Backtracking 法去求出。

**C++(20ms)**
```cpp
/*******************************************************/
/* LeetCode 18. 4Sum                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/09                                 */
/*******************************************************/
#include <vector>
#include <algorithm>

class Solution {
public:
  void nSum(vector<vector<int>> &result, vector<int> &current, const vector<int>& nums, int target, int n, int startIndex, int endIndex){
    if( n == 2 ){
      for(int left = startIndex, right = endIndex - 1 ; left < right ;){
        int sum = nums[left] + nums[right];
        if(sum > target) --right;
        else if(sum < target) ++left;
        else {
          current.push_back(nums[left]);
          current.push_back(nums[right]);
          result.push_back(current);
          current.pop_back();
          current.pop_back();
          do { ++left; } while(left > startIndex && nums[left] == nums[left-1] && left < right);
          do { --right; } while(right < endIndex - 1 && nums[right] == nums[right+1] && left < right);
        }
      }
      return;
    }

    for(int i = startIndex ; i < endIndex ; ++i){
      if(i > startIndex && nums[i] == nums[i-1]) continue;
      current.push_back(nums[i]);
      nSum(result, current, nums, target - nums[i], n - 1, i + 1, endIndex);
      current.pop_back();
    }
  }

  vector<vector<int>> fourSum(vector<int>& nums, int target) {
    vector<vector<int>> result;
    if(nums.size() < 4) return result;

    sort(nums.begin(), nums.end());

    vector<int> current;
    nSum(result, current, nums, target, 4, 0, nums.size());
    return result;
  }
};
```
