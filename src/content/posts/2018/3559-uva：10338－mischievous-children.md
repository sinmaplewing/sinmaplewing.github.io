---
id: 3559
title: '#UVa：10338－Mischievous Children'
slug: uva：10338－mischievous-children
date: '2018-05-21T09:23:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2018/05/21/3559/uva%ef%bc%9a10338%ef%bc%8dmischievous-children/
wp_status: publish
wp_type: post
---

排列組合的問題。有 n 個字母的總共排列方式是 `n!` ，而其中某個文字若是有重複 m 個的話則必須將結果除以 `m!` ，將所有重複的文字的排列數除掉後即是答案。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 10338 Mischievous Children                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

void makeFactorial(long long int f[], long long int n){
  for(int i = 0 ; i <= n ; ++i){
    if(i == 0 || i == 1){
      f[i] = 1;
      continue;
    }
    
    f[i] = f[i-1] * i;
  }
}

int main(){
  long long int factorial[25];
  makeFactorial(factorial, 20);

  int caseCount;
  while(scanf("%d", &caseCount) != EOF){
    for(int caseNumber = 1 ; caseNumber <= caseCount ; ++caseNumber){
      string word;
      cin >> word;
      
      int totalWordCount = word.length();
      long long int result = factorial[totalWordCount];
      int charCount[26] = {0};
      for(int i = 0 ; i < word.length() ; ++i){
        ++charCount[word[i] - 'A'];
      }
      
      for(int i = 0 ; i < 26 ; ++i){
        result /= factorial[charCount[i]];
      }
      
      printf("Data set %d: %lld\n", caseNumber, result);
    }
  }
    
  return 0;
}
```
