---
id: 3771
title: '#LeetCode：17. Letter Combinations of a Phone Number'
slug: leetcode：17-letter-combinations-of-a-phone-number
date: '2018-10-08T09:23:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2018/10/08/3771/leetcode%ef%bc%9a17-letter-combinations-of-a-phone-number/
wp_status: publish
wp_type: post
---

遞迴展開所有結果即可。

**C++(0ms)**
```cpp
/*******************************************************/
/* LeetCode 17. Letter Combinations of a Phone Number  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/08                                 */
/*******************************************************/
#include <vector>

class Solution {
private:
  const vector<string> _telephoneButtonsMap = {
    " ", "", "abc",
    "def", "ghi", "jkl",
    "mno", "pqrs", "tuv",
    "wxyz"};
public:
  vector<string> indexLetterCombinations(const string &digits, int index, vector<string> &prefixStrings){
    if(index == digits.length()) return prefixStrings;

    string buttonCharacters = _telephoneButtonsMap[digits[index]-'0'];
    if(buttonCharacters.length() > 0 && prefixStrings.size() == 0){
      prefixStrings.push_back("");
    }

    vector<string> result;
    for(int i = 0 ; i < prefixStrings.size() ; ++i){
      for(int j = 0 ; j < buttonCharacters.length() ; ++j){
        result.push_back(prefixStrings[i] + buttonCharacters[j]);
      }
    }

    return indexLetterCombinations(digits, index + 1, result);
  }

  vector<string> letterCombinations(string digits) {
    vector<string> emptyVector;
    return indexLetterCombinations(digits, 0, emptyVector);
  }
};
```
