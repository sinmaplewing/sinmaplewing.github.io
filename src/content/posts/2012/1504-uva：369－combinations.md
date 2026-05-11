---
id: 1504
title: '#UVa：369－Combinations'
slug: uva：369－combinations
date: '2012-03-18T00:48:50+08:00'
lastmod: '2014-12-31T03:24:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2012/03/18/1504/uva%ef%bc%9a369%ef%bc%8dcombinations/
wp_status: publish
wp_type: post
---

DP建表即可得解。

P.S. 表中有一些值會超過範圍，因此如果我們把C(M,N)用C(M,N-1)來DP取得的話，中途可能會爆掉，而因此使C(M,N)中N的後半部分可在規定範圍內(int)的值無法得到正確值，所以要用C(M-1,N)來DP。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 369 Combinations                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long C[105][105] = {0};
  int N, M;
  for( int i = 1 ; i <= 100 ; i++ )
    for( int j = 1 ; j <= i ; j++ )
      if( i == j ) C[i][j] = 1;
      else C[i][j] = C[i-1][j]*i/(i-j);

  while( scanf( "%d%d", &N, &M ) != EOF && !( N == 0 && M == 0 ) )
    printf( "%d things taken %d at a time is %lld exactly.\n", N, M, C[N][M] );

  return 0;
}
```
