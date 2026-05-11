---
id: 1954
title: '#UVa：11984－A Change in Thermal Unit'
slug: uva：11984－a-change-in-thermal-unit
date: '2012-10-20T21:40:37+08:00'
lastmod: '2014-12-31T23:22:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2012/10/20/1954/uva%ef%bc%9a11984%ef%bc%8da-change-in-thermal-unit/
wp_status: publish
wp_type: post
---

先換成華氏加完溫差再轉回攝氏輸出即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11984 A Change in Thermal Unit                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  float C, d, F;
  while( scanf( "%d", &T ) != EOF ){
    for( int i = 1 ; i <= T ; i++ ){
      scanf( "%f%f", &C, &d );
      F = (9*C)/5 + 32;
      F += d;
      C = (F-32)*5/9;
      printf( "Case %d: %.2f\n", i, C );
    }
  }
  return 0;
}
```
