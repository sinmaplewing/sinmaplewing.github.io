---
id: 1588
title: '#UVa：10327－Flip Sort'
slug: uva：10327－flip-sort
date: '2012-03-31T08:17:07+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2012/03/31/1588/uva%ef%bc%9a10327%ef%bc%8dflip-sort/
wp_status: publish
wp_type: post
---

即是計算Bubble Sort的交換次數。

**C++(0.080)**
```cpp
/*******************************************************/
/* UVa 10327 Flip Sort                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/31                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  int flipsort[1005];
  int M;

  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ )
      scanf( "%d", &flipsort[i] );

    M = 0;
    for( int i = 0 ; i < N ; i++ )
      for( int j = N-1 ; j > i ; j-- )
        if( flipsort[j] < flipsort[j-1] ){
          swap( flipsort[j], flipsort[j-1] );
          M++;
        }

    printf( "Minimum exchange operations : %d\n", M );
  }
  return 0;
} 
```
