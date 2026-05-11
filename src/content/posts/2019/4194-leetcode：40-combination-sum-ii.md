---
id: 4194
title: '#LeetCode：40. Combination Sum II'
slug: leetcode：40-combination-sum-ii
date: '2019-04-04T00:57:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/04/4194/leetcode%ef%bc%9a40-combination-sum-ii/
wp_status: publish
wp_type: post
---

先排序數值，然後用 Backtracking 去找尋所有可能性，在過程中如果決定不選某個數字，則要跳過全部跟該數值等值的部分，而這也是為什麼要先排序的原因，排序後的數列會比較好做跳過整段相同數字的這件事情。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 40. Combination Sum II                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/04                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  void getCombinationSum(vector<vector<int>> &currentAnswers, vector<int> &currentUsed, vector<int>& candidates, int startIndex, int target){
    if(target == 0){
      currentAnswers.push_back(currentUsed);
      return;
    }

    for(int i = startIndex ; i < candidates.size() ; ++i){
      if(target < candidates[i]) break;

      currentUsed.push_back(candidates[i]);
      getCombinationSum(currentAnswers, currentUsed, candidates, i + 1, target - candidates[i]);
      currentUsed.pop_back();

      while(i < candidates.size() - 1 && candidates[i] == candidates[i+1]) ++i;
    }
  }

  vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    vector<vector<int>> answers;
    vector<int> currentUsed;
    sort(candidates.begin(), candidates.end());
    getCombinationSum(answers, currentUsed, candidates, 0, target);
    return answers;
  }
};
```
