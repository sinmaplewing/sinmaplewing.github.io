---
id: 1957
title: '#UVa：12459－Bees'' ancestors'
slug: uva：12459－bees-ancestors
date: '2012-10-20T21:59:42+08:00'
lastmod: '2014-12-31T23:23:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2012/10/20/1957/uva%ef%bc%9a12459%ef%bc%8dbees-ancestors/
wp_status: publish
wp_type: post
---

即是費氏數列。

P.S. 小心，會超過int的範圍喔！

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 12459 Bees' ancestors                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long f[85] = { 1, 1 };
  int n;

  for( int i = 2 ; i <= 80 ; i++ )
    f[i] = f[i-1] + f[i-2];
  while( scanf( "%d", &n ) != EOF && n != 0 ){
    printf( "%lld\n", f[n] );
  }
  return 0;
}
```
