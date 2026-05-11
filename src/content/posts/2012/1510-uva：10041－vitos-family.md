---
id: 1510
title: '#UVa：10041－Vito''s Family'
slug: uva：10041－vitos-family
date: '2012-03-18T09:18:30+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/18/1510/uva%ef%bc%9a10041%ef%bc%8dvitos-family/
wp_status: publish
wp_type: post
---

取數列之中位數(其實取離中位數最近的兩點所連成的線上任何點皆可)，即可求得相減絕對值最小總和。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 10041 Vito's Family                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<algorithm>
using namespace std;

int main(){
  int testcase;
  int r, s[505];
  int house, d;
  while( scanf( "%d", &testcase ) != EOF ){
    for( int i = 0 ; i < testcase ; i++ ){
      scanf( "%d", &r );
      for( int j = 0 ; j < r ; j++ )
        scanf( "%d", &s[j] );
      sort( s, s+r );

      d = 0;
      house = s[r/2];
      for( int j = 0 ; j < r ; j++ )
        d += abs( house-s[j] );
      printf( "%d\n", d );
    }
  }
  return 0;
}
```
