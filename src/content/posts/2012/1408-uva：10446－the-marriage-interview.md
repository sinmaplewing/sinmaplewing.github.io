---
id: 1408
title: '#UVa：10446－The Marriage Interview :-)'
slug: uva：10446－the-marriage-interview
date: '2012-01-26T00:17:02+08:00'
lastmod: '2014-12-31T23:07:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2012/01/26/1408/uva%ef%bc%9a10446%ef%bc%8dthe-marriage-interview/
wp_status: publish
wp_type: post
---

這題使用DP建二維的表(依照n和back來建)，將n=0和n=1的先全部填1，然後再將其他地方依照費氏數列的模式(但是變成不是只取兩項，而是取back項加起來)建表即可得解。

P.S.

1. 所有n<0的值都當成n=0來看會比較容易。
2. 此題數字之大要用到unsigned long long才存的下Orz...

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10446 The Marriage Interview                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/25                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  unsigned long long dp[65][65] = {0}, sum;
  int n, back, casenumber = 0;
  for( int i = 0 ; i <= 1 ; i++ )
    for( int j = 0 ; j <= 60 ; j++ )
      dp[i][j] = 1;
  for( int i = 2 ; i <= 61 ; i++ )
    for( int j = 0 ; j <= 60 ; j++ ){
      sum = 0;
      for( int k = 1 ; k <= j ; k++ )
        if( i-k < 0 ) sum += 1;
      else sum += dp[i-k][j];
      dp[i][j] = sum+1;
    }
  while( scanf( "%d%d", &n, &back ) != EOF && n <= 60 ){
    if( n < 0 ) n = 0;
    printf( "Case %d: %llu\n", ++casenumber, dp[n][back] );
  }
  return 0;
}
```
