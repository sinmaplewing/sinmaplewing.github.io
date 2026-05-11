---
id: 3516
title: '#UVa：481－What Goes Up'
slug: uva：481－what-goes-up
date: '2018-05-16T01:14:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2018/05/16/3516/uva%ef%bc%9a481%ef%bc%8dwhat-goes-up/
wp_status: publish
wp_type: post
---

經典的 LIS (Longest Increasing Subsequence) 題目，利用解 LIS 的演算法即可得解。

參考：[演算法筆記 - Longest Increasing Subsequence](http://www.csie.ntnu.edu.tw/~u91029/LongestIncreasingSubsequence.html)

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 481 What Goes Up                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
#include <stack>
using namespace std;

int getLIS(const vector<int> &sequence, vector<int> &position){
  if(sequence.size() == 0) return 0;
  
  vector<int> subsequence;
  for(int i = 0 ; i < sequence.size() ; ++i ){
    vector<int>::iterator lowerBound = lower_bound(subsequence.begin(), subsequence.end(), sequence[i]);
    if(lowerBound == subsequence.end()){
      position[i] = subsequence.size();
      subsequence.push_back(sequence[i]);
    }
    else{
      position[i] = lowerBound - subsequence.begin();
      *lowerBound = sequence[i];
    }
  }
  
  return subsequence.size();
}


int main(){
  vector<int> sequence;
  int n;
  while(scanf("%d", &n) != EOF){
    sequence.push_back(n);
  }
  
  vector<int> position(sequence.size(), 0);
  int length = getLIS(sequence, position);
  printf("%d\n", length);
  printf("-\n");
  
  stack<int> increasingSubsequence; 
  int currentPosition = length - 1;
  for(int i = sequence.size() - 1 ; i >= 0 ; --i){
    if(currentPosition == position[i]){
      increasingSubsequence.push(sequence[i]);
      --currentPosition;
    }
  }
  
  while(!increasingSubsequence.empty()){
    printf("%d\n", increasingSubsequence.top());
    increasingSubsequence.pop();
  }

  return 0;
}
```
