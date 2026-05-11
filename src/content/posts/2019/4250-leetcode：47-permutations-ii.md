---
id: 4250
title: '#LeetCode：47. Permutations II'
slug: leetcode：47-permutations-ii
date: '2019-04-14T22:26:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/14/4250/leetcode%ef%bc%9a47-permutations-ii/
wp_status: publish
wp_type: post
---

可先排序後，利用 `next_permutation` 解決此題。至於 `next_permutation` 如何實作可以看[#LeetCode：31. Next Permutation](/2019/03/29/4131/leetcode%ef%bc%9a31-next-permutation/)這篇。

**C++(20ms)**
```cpp
/*******************************************************/
/* LeetCode 47. Permutations II                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/14                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<vector<int>> permuteUnique(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> answer;
    do{
      answer.push_back(nums);
    } while(next_permutation(nums.begin(), nums.end()));
    return answer;
  }
};
```
