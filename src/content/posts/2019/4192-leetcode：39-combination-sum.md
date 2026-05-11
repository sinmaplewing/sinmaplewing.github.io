---
id: 4192
title: '#LeetCode：39. Combination Sum'
slug: leetcode：39-combination-sum
date: '2019-04-04T00:30:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/04/4192/leetcode%ef%bc%9a39-combination-sum/
wp_status: publish
wp_type: post
---

利用 Backtracking 將所有可能性都列舉出來即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 39. Combination Sum                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/04                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution {
public:
  void getCombinationSum(vector<vector<int>> &currentAnswers, vector<int> &currentUsed, vector<int>& candidates, int startIndex, int target){
    if(target == 0){
      currentAnswers.push_back(currentUsed);
      return;
    }

    for(int i = startIndex ; i < candidates.size() ; ++i){
      if(target < candidates[i]) continue;

      currentUsed.push_back(candidates[i]);
      getCombinationSum(currentAnswers, currentUsed, candidates, i, target - candidates[i]);
      currentUsed.pop_back();
    }
  }

  vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> answers;
    vector<int> currentUsed;
    getCombinationSum(answers, currentUsed, candidates, 0, target);
    return answers;
  }
};
```
