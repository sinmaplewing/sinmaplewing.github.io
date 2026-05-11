---
id: 2174
title: '#UVa：10520－Determine it'
slug: uva：10520－determine-it
date: '2014-09-25T12:40:36+08:00'
lastmod: '2014-12-31T23:07:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2014/09/25/2174/uva%ef%bc%9a10520%ef%bc%8ddetermine-it/
wp_status: publish
wp_type: post
---

照題目所述，製作出相同的遞迴式，並利用DP加速即可。

P.S. 在a<sub>19,1</sub>為499時，a<sub>1,19</sub>的值為4578345958，故得用long long來存取。

**C++(0.149)**
```cpp
/*******************************************************/
/* UVa 10520 Determine it                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#define A(x,y) (find_answer(dp, n, (x), (y)))
using namespace std;

long long find_answer(long long dp[][30], int n, int i, int j){
  if( dp[i][j] >= 0 ) return dp[i][j];
  
  if( i >= j ){
    long long ipart = 0, jpart = 0;
    if( i < n ){
      long long max_number = 0;
      for( int k = i+1 ; k <= n ; ++k ){
        long long temp = A(k, 1) + A(k, j);
        if( temp > max_number ) max_number = temp;
      }
      ipart = max_number;
    }

    if( j > 0 ){
      long long max_number = 0;
      for( int k = 1 ; k < j ; ++k ){
        long long temp = A(i, k) + A(n, k);
        if( temp > max_number ) max_number = temp;
      }
      jpart = max_number;
    }

    return dp[i][j] = ipart + jpart;
  } 
  else{
    long long max_number = 0;
    for( int k = i ; k < j ; ++k ){
      long long temp = A(i, k) + A(k+1, j);
      if( temp > max_number ) max_number = temp;
    }
    return dp[i][j] = max_number;

  }
}

int main(){
  int n;
  long long dp[30][30];
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i <= n ; ++i ){
      for( int j = 0 ; j <= n ; ++j ){
        dp[i][j] = -1;
      }
    }

    scanf("%lld", &dp[n][1]);

    printf( "%lld\n", A(1, n) );
  }
  return 0;
}
```
