---
id: 3746
title: '#LeetCode：14. Longest Common Prefix'
slug: leetcode：14-longest-common-prefix
date: '2018-10-05T01:03:16+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/05/3746/leetcode%ef%bc%9a14-longest-common-prefix/
wp_status: publish
wp_type: post
---

從頭到尾對每個字串比對直到失敗或結束為止即可得解。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 14. Longest Common Prefix                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/05                                 */
/*******************************************************/
class Solution {
public:
  string longestCommonPrefix(vector<string>& strs) {
    if(strs.size() == 0) return "";
    if(strs.size() == 1) return strs[0];

    for(int i = 0 ; i < strs[0].length() ; ++i){
      char c = strs[0][i];
      for(int j = 1 ; j < strs.size() ; ++j){
        if(c != strs[j][i]){
          return strs[0].substr(0, i);
        }
      }
    }

    return strs[0];
  }
};
```
