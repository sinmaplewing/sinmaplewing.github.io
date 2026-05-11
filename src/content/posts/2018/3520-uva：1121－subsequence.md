---
id: 3520
title: '#UVa：1121－Subsequence'
slug: uva：1121－subsequence
date: '2018-05-16T20:05:36+08:00'
lastmod: '2018-05-17T00:00:07+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 11
permalink: /2018/05/16/3520/uva%ef%bc%9a1121%ef%bc%8dsubsequence/
wp_status: publish
wp_type: post
---

找出最短長度的數列可以比指定的數 `S` 大。

利用記住連續數列的最前端和最後端，慢慢從後面增長。如果總和超過了指定數 `S` ，則從最前端縮回來，直到數列總和比 `S` 小為止。

P.S. 記得處理總和沒辦法超過 `S` 的狀況。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 1121 Subsequence                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
using namespace std;

int main(){
  int N, S;
  while(scanf("%d%d", &N, &S) != EOF){
    vector<int> sequence;
    for(int i = 0 ; i < N ; ++i){
      int number;
      scanf("%d", &number);
      sequence.push_back(number);
    }
    
    int sum = 0, minLength = N+1, front = 0;
    for(int i = 0 ; i < N ; ++i ){
      sum += sequence[i];
      
      while(sum >= S){
        minLength = min(minLength, i - front + 1);
        sum -= sequence[front];
        ++front;
      }
    }
    
    printf("%d\n", (minLength == N+1)? 0 : minLength);
  } 
  return 0;
}
```
