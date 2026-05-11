---
id: 1208
title: '#UVa：488－Triangle Wave'
slug: uva：488－triangle-wave
date: '2011-11-28T23:54:25+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/28/1208/uva%ef%bc%9a488%ef%bc%8dtriangle-wave/
wp_status: publish
wp_type: post
---

照題目做即可。

P.S. 關於後面空白行的部分，是指每個波(不管是同筆資料或不同筆資料)之間用空白行隔開的意思。

**C++(0.548)**
```cpp
/*******************************************************/
/* UVa 488 Triangle Wave                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  int A, F;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d%d", &A, &F );
      if( i ) printf( "\n" );
      for( int j = 0 ; j < F ; j++ ){
        if( j ) printf( "\n" );
        for( int k = 1 ; k <= A ; k++ ){
          for( int l = 1 ; l <= k ; l++ )
            printf( "%d", k );
          printf( "\n" );
        }
        for( int k = A-1 ; k >= 1 ; k-- ){
          for( int l = 1 ; l <= k ; l++ )
            printf( "%d", k );
          printf( "\n" );
        }
      }
    }
  }
  return 0;
}
```
