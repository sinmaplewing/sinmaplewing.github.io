---
id: 4234
title: '#LeetCode：46. Permutations'
slug: leetcode：46-permutations
date: '2019-04-11T22:22:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/11/4234/leetcode%ef%bc%9a46-permutations/
wp_status: publish
wp_type: post
---

利用遞迴將每個位置去決定要放的值，每次決定好後就將該值與目前的值做交換繼續遞迴下去，遞迴回來後就復原再將下一個值與目前的值交換繼續遞迴下去。

參考 [LeetCode 論壇的解答](https://leetcode.com/problems/permutations/discuss/18247/My-elegant-recursive-C%2B%2B-solution-with-inline-explanation)。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 46. Permutations                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/11                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution {
public:
  void recursivePermute(vector<vector<int>> &answer, vector<int> &nums, int index){
    if(index >= nums.size()) {
      answer.push_back(nums);
      return;
    }

    for(int i = index ; i < nums.size() ; ++i){
      swap(nums[i], nums[index]);
      recursivePermute(answer, nums, index + 1);
      swap(nums[i], nums[index]);
    }
  }

  vector<vector<int>> permute(vector<int>& nums) {
    if(nums.size() == 0) return vector<vector<int>>();
    vector<vector<int>> answer;
    recursivePermute(answer, nums, 0);
    return answer;
  }
};
```
