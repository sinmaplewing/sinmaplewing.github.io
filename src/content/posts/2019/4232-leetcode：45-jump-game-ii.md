---
id: 4232
title: '#LeetCode：45. Jump Game II'
slug: leetcode：45-jump-game-ii
date: '2019-04-11T21:58:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/11/4232/leetcode%ef%bc%9a45-jump-game-ii/
wp_status: publish
wp_type: post
---

在每段可以到的最遠距離之中，找出下一段可以到的最遠距離，找完後進入下一段循環這個過程到結尾即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 45. Jump Game II                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/11                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int jump(vector<int>& nums) {
    int furthest = 0;
    int step = 0;
    for(int i = 0 ; i < nums.size() && furthest < nums.size() - 1 ; ){
      int currentFurthest = 0;
      while(i <= furthest){
        currentFurthest = max(i + nums[i], currentFurthest);
        ++i;
      }
      furthest = currentFurthest;
      ++step;
    }

    return step;
  }
};
```
