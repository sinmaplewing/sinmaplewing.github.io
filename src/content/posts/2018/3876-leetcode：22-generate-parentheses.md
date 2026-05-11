---
id: 3876
title: '#LeetCode：22. Generate Parentheses'
slug: leetcode：22-generate-parentheses
date: '2018-10-16T10:08:16+08:00'
lastmod: '2018-10-17T08:54:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/16/3876/leetcode%ef%bc%9a22-generate-parentheses/
wp_status: publish
wp_type: post
---

可以將左括弧想成 +1 ，將右括弧想成 -1 ，而這意味著一個合理的括弧配對法就是：全部加總為 0 ，並且在巡覽的過程中的總和不會讓值小於 0 ，因為一旦小於 0 就表示在那個位置的右括弧數量已經比左括弧多了。用這個配對限制去做 backtracking 去列出來即是答案。

**C++(0ms)**
```cpp
/*******************************************************/
/* LeetCode 22. Generate Parentheses                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/16                                 */
/*******************************************************/
#include <vector>
#include <utility>

class Solution {
private:
  const pair<char, int> _possibleCharacters[2] = {
    {'(', 1},
    {')', -1}
  };

public:
  vector<string> generateParenthesis(int n) {
    vector<string> answerSet;
    string current = "";
    generateParenthesis(answerSet, 2*n, 0, current);

    return answerSet;
  }

  void generateParenthesis(vector<string>& answerSet, int length, int sum, string& current){
    if(current.length() == length){
      if(sum == 0) answerSet.push_back(current);
      return;
    }

    for(auto character : _possibleCharacters){
      if(sum + character.second >= 0){
        current.push_back(character.first);
        generateParenthesis(answerSet, length, sum + character.second, current);
        current.pop_back();
      }
    }
  }
};
```
