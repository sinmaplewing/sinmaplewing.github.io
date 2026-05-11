---
id: 4136
title: '#LeetCode：32. Longest Valid Parentheses'
slug: leetcode：32-longest-valid-parentheses
date: '2019-03-30T19:52:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/03/30/4136/leetcode%ef%bc%9a32-longest-valid-parentheses/
wp_status: publish
wp_type: post
---

利用 Stack 去紀錄左括弧，並在看到右括弧時找出配對的左括弧後將這個合法的區段標記起來，最後找出最長的區段即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 32. Longest Valid Parentheses              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/30                                 */
/*******************************************************/
#include <string>
#include <stack>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int longestValidParentheses(string s) {
    stack<int> leftParenthesesIndexes;
    vector<bool> isValid(s.length(), false);

    for(int i = 0 ; i < s.length() ; ++i){
      if(s[i] == '('){
        leftParenthesesIndexes.push(i);
      }
      else if(s[i] == ')'){
        if (leftParenthesesIndexes.empty()){
          continue;
        }

        int leftParentheseIndex = leftParenthesesIndexes.top();
        leftParenthesesIndexes.pop();
        for(int j = leftParentheseIndex ; j <= i ; ++j){
          isValid[j] = true;
        }
      }
    }

    int maxLength = 0;
    int currentLength = 0;
    for(int i = 0 ; i < isValid.size() ; ++i){
      if(!isValid[i]){
        currentLength = 0;
        continue;
      }
      ++currentLength;
      maxLength = max(maxLength, currentLength);
    }

    return maxLength;
  }
};
```
