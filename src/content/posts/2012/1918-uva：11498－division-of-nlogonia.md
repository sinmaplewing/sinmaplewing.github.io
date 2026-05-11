---
id: 1918
title: '#UVa：11498－Division of Nlogonia'
slug: uva：11498－division-of-nlogonia
date: '2012-09-19T19:43:39+08:00'
lastmod: '2014-12-31T23:20:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2012/09/19/1918/uva%ef%bc%9a11498%ef%bc%8ddivision-of-nlogonia/
wp_status: publish
wp_type: post
---

照題目要求的把五種條件判斷出來即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11498 Division of Nlogonia                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int K, N, M, search_N, search_M;
  while( scanf( "%d", &K ) != EOF && K ){
    scanf( "%d%d", &N, &M );
    for( int i = 0 ; i < K ; i++ ){
      scanf( "%d%d", &search_N, &search_M );
      if( N == search_N || M == search_M ) printf( "divisa\n" );
      else{
        if( M > search_M ) printf( "S" );
        else printf( "N" );
        if( N > search_N ) printf( "O" );
        else printf( "E" );
        printf( "\n" );
      }
    }
  }
  return 0;
}
```
