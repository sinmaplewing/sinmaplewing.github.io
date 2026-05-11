---
id: 1431
title: '#UVa：10013－Super long sums'
slug: uva：10013－super-long-sums
date: '2012-02-02T15:03:54+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/02/02/1431/uva%ef%bc%9a10013%ef%bc%8dsuper-long-sums/
wp_status: publish
wp_type: post
---

大數加法即可得解。

**C++(0.932)**
```cpp
/*******************************************************/
/* UVa 10013 Super long sums                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/02/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int answer[1000005] = {0};
int main(){
  bool blank_line = 0;
  int N, M, num1, num2;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ ){
      scanf( "%d", &M );
      memset( answer, 0, sizeof(answer) );
      for( int j = M-1 ; j >= 0 ; j-- ){
        scanf( "%d%d", &num1, &num2 );
        answer[j] += num1+num2;
        answer[j+1] += answer[j]/10;
        answer[j] %= 10;
      }
      for( int j = 0 ; j < M ; j++ ){
        answer[j+1] += answer[j]/10;
        answer[j] %= 10;
      }
      if( answer[M] ) M++;

      if( blank_line ) printf( "\n" );
      blank_line = 1;

      for( int j = M-1 ; j >= 0 ; j-- )
        printf( "%d", answer[j] );
      printf( "\n" );
    }
  }
  return 0;
}
```
