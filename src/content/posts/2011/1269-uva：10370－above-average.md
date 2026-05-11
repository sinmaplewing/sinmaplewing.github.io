---
id: 1269
title: '#UVa：10370－Above Average'
slug: uva：10370－above-average
date: '2011-12-14T23:31:28+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2011/12/14/1269/uva%ef%bc%9a10370%ef%bc%8dabove-average/
wp_status: publish
wp_type: post
---

照著題目算即可得解。

**C++(0.024)**
```cpp
/*******************************************************/
/* UVa 10370 Above Average                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int C, N;
  float score[1005], average, percent;
  while( scanf( "%d", &C ) != EOF ){
    for( int i = 1 ; i <= C ; i++ ){
      scanf( "%d", &N );
      average = 0.0;
      for( int j = 0 ; j < N ; j++ ){
        scanf( "%f", &score[j] );
        average += score[j];
      }
      average /= N;
      percent = 0.0;
      for( int j = 0 ; j < N ; j++ ){
        if( score[j] > average ) percent++;
      }
      percent /= N;
      percent *= 100;
      printf( "%.3f%%\n", percent );
    }
  }
  return 0;
}
```
