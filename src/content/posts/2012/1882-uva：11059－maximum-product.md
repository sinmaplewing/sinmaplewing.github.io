---
id: 1882
title: '#UVa：11059－Maximum Product'
slug: uva：11059－maximum-product
date: '2012-09-16T00:00:46+08:00'
lastmod: '2014-12-31T23:16:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 110
- UVa
permalink: /2012/09/16/1882/uva%ef%bc%9a11059%ef%bc%8dmaximum-product/
wp_status: publish
wp_type: post
---

直接硬爆解即可得解。

**C++(0.024)**
```cpp
/*******************************************************/
/* UVa 11059 Maximum Product                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/15                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N, casenum = 1;
  long long S[20], maxproduct, temp;

  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0; i < N ; i++ )
      scanf( "%lld", &S[i] );

    maxproduct = 0;
    for( int i = 0 ; i < N ; i++ ){
      temp = 1;
      for( int j = i ; j < N ; j++ ){
        temp *= S[j];
        if( temp > maxproduct ) maxproduct = temp;
      }
    }
    printf( "Case #%d: The maximum product is %lld.\n\n", casenum++, maxproduct );

  }
  return 0;
} 
```
