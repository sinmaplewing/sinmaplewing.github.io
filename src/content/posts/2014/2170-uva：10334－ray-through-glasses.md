---
id: 2170
title: '#UVa：10334－Ray Through Glasses'
slug: uva：10334－ray-through-glasses
date: '2014-09-25T11:36:24+08:00'
lastmod: '2014-12-31T23:06:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2014/09/25/2170/uva%ef%bc%9a10334%ef%bc%8dray-through-glasses/
wp_status: publish
wp_type: post
---

前一次射穿兩個界面的射線，在下一次的反射可以生出兩條射線(打到前面的界面反射和打到後面的界面反射)；前一次射穿一個界面的射線，在下一次的反射可以生出一條射線。故為費氏數列，可用DP解。

P.S. 費氏數列第1000項有210位數字，得利用大數。

**C++(0.026)**
```cpp
/*******************************************************/
/* UVa 10334 Ray Through Glasses                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAX_DIGITS = 250;

void add(int result[], int a[], int b[]){
  for( int i = 0 ; i < MAX_DIGITS; ++i ){
    result[i] = a[i] + b[i];
    if( i ){
      result[i] += result[i-1] / 10;
      result[i-1] %= 10;
    }
  }
}

void print(int a[]){
  bool is_print = false;
  for( int i = MAX_DIGITS-1 ; i >= 0 ; --i ){
    if( a[i] == 0 && !is_print ) continue;
    
    printf("%d", a[i]);
    is_print = true;
  }

  if( !is_print ){
    printf("0");
  }

  printf("\n");
}

int main(){ 
  int dp[1005][MAX_DIGITS] = {0};
  dp[0][0] = 1;
  dp[1][0] = 2;
  
  for( int i = 2 ; i <= 1000 ; ++i ){
    add(dp[i], dp[i-1], dp[i-2]);
  }

  int n;
  while( scanf( "%d", &n ) != EOF ){
    print(dp[n]);
  }

  return 0;
}
```
