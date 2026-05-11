---
id: 4288
title: '#LeetCode：56. Merge Intervals'
slug: leetcode：56-merge-intervals
date: '2019-04-17T02:05:34+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/17/4288/leetcode%ef%bc%9a56-merge-intervals/
wp_status: publish
wp_type: post
---

以每個範圍的開頭對這些範圍做排序，接著從頭至尾去檢查是否有交集，由於已經照開頭排序，所以只要檢查下一個範圍的開頭是否有在現在最後一個範圍的裡面，如果有就擴充最後一個範圍；如果沒有就當成一個新的範圍加進去答案集合裡，這樣即可得解。

P.S. 2019/04/15 這題更新輸入後，似乎也有增加輸入數量，所以現在跑的時間很難比之前上傳的人快。

**C++(20ms)**
```
/*******************************************************/
/* LeetCode 56. Merge Intervals                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/17                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<vector<int>> merge(vector<vector<int>>& intervals) {
    vector<vector<int>> ranges;
    if(intervals.size() <= 0) return ranges;

    sort(intervals.begin(), intervals.end(), [](vector<int>& a, vector<int>& b){
      return a[0] < b[0];
    });

    ranges.push_back(intervals[0]);
    for(int i = 1 ; i < intervals.size() ; ++i){
      vector<int>& lastRange = ranges.back();
      if(intervals[i][0] >= lastRange[0] &&
        intervals[i][0] <= lastRange[1]){
        lastRange[1] = max(lastRange[1], intervals[i][1]);
      }
      else ranges.push_back(intervals[i]);
    }

    return ranges;
  }
};
```
