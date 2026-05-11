---
id: 4257
title: '#LeetCode：49. Group Anagrams'
slug: leetcode：49-group-anagrams
date: '2019-04-14T23:35:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/14/4257/leetcode%ef%bc%9a49-group-anagrams/
wp_status: publish
wp_type: post
---

以排序的字串作為 Key ，將各個字串放入以其字串所得之 Key 並與之相同 Key 的陣列中即可。

**C++(52ms)**
```cpp
/*******************************************************/
/* LeetCode 49. Group Anagrams                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/14                                 */
/*******************************************************/
#include <vector>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<vector<string>> groupAnagrams(vector<string>& strs) {
    map<string, vector<string>> stringMap;
    for(int i = 0 ; i < strs.size() ; ++i){
      string key = strs[i];
      sort(key.begin(), key.end());
      stringMap[key].push_back(strs[i]);
    }

    vector<vector<string>> result;
    for(auto strings : stringMap){
      result.push_back(strings.second);
    }
    return result;
  }
};
```
