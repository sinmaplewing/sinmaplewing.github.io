---
id: 1426
title: '#UVa：495－Fibonacci Freeze'
slug: uva：495－fibonacci-freeze
date: '2012-02-02T14:09:44+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/02/02/1426/uva%ef%bc%9a495%ef%bc%8dfibonacci-freeze/
wp_status: publish
wp_type: post
---

大數加法，並且DP建表將每一項記錄下來即可得解。

**C++(0.460)**
```cpp
/*******************************************************/
/* UVa 495 Fibonacci Freeze                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/02/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int dp[5001][2000] = {0};

int main(){
  dp[1][0] = 1;
  for( int i = 2 ; i <= 5000 ; i++ )
    for( int j = 0 ; j < 2000 ; j++ ){
      dp[i][j] += dp[i-1][j] + dp[i-2][j];
      dp[i][j+1] += dp[i][j]/10;
      dp[i][j] %= 10;
    }

  int n, i;
  while( scanf( "%d", &n ) != EOF ){
    printf( "The Fibonacci number for %d is ", n );
    for( i = 1999 ; i >= 0 ; i-- )
      if( dp[n][i] )
        break;
    if( i == -1 )
      printf( "0" );
    else
      for( ; i >= 0 ; i-- )
        printf( "%d", dp[n][i] );
    printf( "\n" );
  }
  return 0;
}
```
