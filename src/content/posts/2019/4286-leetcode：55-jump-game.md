---
id: 4286
title: '#LeetCode：55. Jump Game'
slug: leetcode：55-jump-game
date: '2019-04-17T01:11:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/17/4286/leetcode%ef%bc%9a55-jump-game/
wp_status: publish
wp_type: post
---

從頭開始，看看在每一格能夠跳到的最遠距離到哪裡，持續更新，直到最後看看能不能跳到最後的一格即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 55. Jump Game                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/17                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  bool canJump(vector<int>& nums) {
    int maxIndex = 0;
    for(int i = 0 ; i <= maxIndex && i < nums.size() ; ++i){
      maxIndex = max(i + nums[i], maxIndex);
    }

    return maxIndex >= nums.size() - 1;
  }
};
```
