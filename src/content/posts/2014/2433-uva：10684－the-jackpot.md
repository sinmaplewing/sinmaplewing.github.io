---
id: 2433
title: '#UVa：10684－The jackpot'
slug: uva：10684－the-jackpot
date: '2014-12-23T14:40:49+08:00'
lastmod: '2014-12-31T23:07:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2014/12/23/2433/uva%ef%bc%9a10684%ef%bc%8dthe-jackpot/
wp_status: publish
wp_type: post
---

DP題，利用另外一個陣列記錄到從前面連續到目前這格贏最多的錢是多少，再找這裡面全部最多錢的即是答案。

**C++(0.099)**
```cpp
/*******************************************************/
/* UVa 10684 The jackpot                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/23                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N ) != EOF && N != 0 ){
    int sequences[10005];
    for( int i = 1 ; i <= N ; ++i ){
      scanf("%d", &sequences[i]);
    }
    
    int dp[10005] = {0};
    int win = 0;
    for( int i = 1 ; i <= N ; ++i ){
      dp[i] = max( sequences[i], dp[i-1] + sequences[i] );
      win = max( win, dp[i] );
    }

    if( win > 0 ){
      printf("The maximum winning streak is %d.\n", win);
    }
    else{
      printf("Losing streak.\n");
    }
  }
  return 0;
}
```
