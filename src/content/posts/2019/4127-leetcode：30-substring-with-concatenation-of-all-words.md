---
id: 4127
title: '#LeetCode：30. Substring with Concatenation of All Words'
slug: leetcode：30-substring-with-concatenation-of-all-words
date: '2019-03-29T02:30:17+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/03/29/4127/leetcode%ef%bc%9a30-substring-with-concatenation-of-all-words/
wp_status: publish
wp_type: post
---

由於欲尋找的詞組 `words` 都是等長的字串，故首先以該長度將欲搜尋的字串 `s` 去分割成好幾個詞組。例如：欲搜尋的字串 `s` 為 `"barfoothefoobarman"` ，而欲搜尋的詞組 `words` 為 `["foo","bar"]` ，則以長度為 3 去切割字串，分別從開頭的索引值是 0, 1, 2 切成三次去尋覽，分割的結果分別是 `"bar|foo|the|foo|bar|man"` 、 `"(b)arf|oot|hef|oob|arm(an)"` 和 `"(ba)rfo|oth|efo|oba|rma(n)"`。

接著對於每一個分割的結果利用 Sliding Window 的方式去尋找是否能夠滿足整個欲搜尋的詞組 `words` ，當 Window 滑動到下個分割出來的詞組時，若符合則記住符合欲搜尋的詞組 `words` 中的第幾個；若無法符合則先去除最前面搜尋到的詞組再試一次，這樣的過程中遇到已經完美組合的狀況則記住答案，一直到全部分割的詞組都找過為止。

**C++(484ms)**
```cpp
/**********************************************************/
/* LeetCode 30. Substring with Concatenation of All Words */
/* Author: Maplewing [at] knightzone.studio               */
/* Version: 2018/10/01                                    */
/**********************************************************/
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<int> findSubstring(string s, vector<string>& words) {
    vector<int> answer;
    int wordsCount = words.size();
    if(wordsCount <= 0)
      return answer;
    
    int sLength = s.length();
    int wordLength = words[0].length();
    int totalWordsLength = wordLength * wordsCount;
    if(sLength < totalWordsLength)
      return answer;

    for(int i = 0 ; i < wordLength ; ++i){
      vector<int> usedGroupIndex(wordsCount, -1);
      vector<bool> usedWord(wordsCount, false);
      int totalWordsMatch = 0;
      for(int j = i ; j <= sLength - wordLength ; j += wordLength){
        int wordIndex = findWord(words, s, j, wordLength, usedWord);
        if(wordIndex != -1){
          usedGroupIndex[totalWordsMatch] = wordIndex;
          usedWord[wordIndex] = true;
          ++totalWordsMatch;
          if(totalWordsMatch == wordsCount) answer.push_back(j - (wordsCount - 1) * wordLength);
        }
        
        if(wordIndex == -1 || totalWordsMatch == wordsCount){
          if(totalWordsMatch > 0){
            usedWord[usedGroupIndex[0]] = false;
            for(int k = 0 ; k < totalWordsMatch - 1 ; ++k){
              usedGroupIndex[k] = usedGroupIndex[k + 1];
            }
            usedGroupIndex[totalWordsMatch - 1] = -1;
            --totalWordsMatch;
            if(wordIndex == -1) j -= wordLength;
          }
        }
      }
    }

    return answer;
  }

  int findWord(const vector<string> &baseWords, string s, int startIndex, int length, const vector<bool> &used){
    for(int i = 0 ; i < baseWords.size() ; ++i){
      if(used.size() > 0 && used[i]) continue;

      bool isEqual = true;
      for(int j = 0 ; j < length ; ++j){
        if(baseWords[i][j] != s[j + startIndex]){
          isEqual = false;
          break;
        }
      }

      if(isEqual) return i;
    }

    return -1;
  }
};
```
