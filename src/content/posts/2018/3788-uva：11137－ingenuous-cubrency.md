---
id: 3788
title: '#UVa：11137－Ingenuous Cubrency'
slug: uva：11137－ingenuous-cubrency
date: '2018-10-11T20:23:49+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2018/10/11/3788/uva%ef%bc%9a11137%ef%bc%8dingenuous-cubrency/
wp_status: publish
wp_type: post
---

典型的找零錢問題(或稱背包問題 Knapsack Problem)，利用 DP 可解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11137 Ingenuous Cubrency                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/11                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const int MAX_COIN_COUNT = 21;
  const int MAX_INPUT_AMOUNT = 10000;
  
  int coin[MAX_COIN_COUNT + 5] = {0};
  for(int i = 1 ; i <= MAX_COIN_COUNT ; ++i){
    coin[i] = i * i * i;
  }

  long long int dp[MAX_INPUT_AMOUNT + 5] = {1, 0};
  for(int i = 1 ; i <= MAX_COIN_COUNT ; ++i){
    for(int j = coin[i] ; j <= MAX_INPUT_AMOUNT ; ++j ){
      dp[j] += dp[j - coin[i]];
    }
  }

  int paid;
  while(scanf("%d", &paid) != EOF){
    printf("%lld\n", dp[paid]);
  }
  return 0;
}
```
