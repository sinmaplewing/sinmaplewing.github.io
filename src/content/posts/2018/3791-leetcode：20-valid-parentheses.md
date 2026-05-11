---
id: 3791
title: '#LeetCode：20. Valid Parentheses'
slug: leetcode：20-valid-parentheses
date: '2018-10-11T22:54:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/11/3791/leetcode%ef%bc%9a20-valid-parentheses/
wp_status: publish
wp_type: post
---

利用 Stack (堆疊) 去 push 左邊括弧，遇到右邊括弧就 pop 出來看能不能配對，如果能完美配對就是對的，如果不行就是錯的。

**C++(0ms)**
```cpp
/*******************************************************/
/* LeetCode 20. Valid Parentheses                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/11                                 */
/*******************************************************/
#include <map>
#include <stack>

class Solution {
private:
  const map<char, char> _findLeftParenthesis = {
    {')', '('},
    {'}', '{'},
    {']', '['}
  };
public:
  bool isValid(string s) {
    stack<char> checkStack;
    for(int i = 0 ; i < s.length() ; ++i){
      auto leftParenthesis = _findLeftParenthesis.find(s[i]);
      if(leftParenthesis == _findLeftParenthesis.end()){
        checkStack.push(s[i]);
        continue;
      }

      if(checkStack.empty() || leftParenthesis->second != checkStack.top()){
        return false;
      }

      checkStack.pop();
    }
    return checkStack.empty();
  }
};
```
