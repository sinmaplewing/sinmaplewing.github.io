---
id: 1308
title: '#UVa：11172－Relational Operator'
slug: uva：11172－relational-operator
date: '2012-01-16T15:08:21+08:00'
lastmod: '2014-12-31T23:17:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2012/01/16/1308/uva%ef%bc%9a11172%ef%bc%8drelational-operator/
wp_status: publish
wp_type: post
---

照題意判斷大小輸出所求即可。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 11172 Relational Operators                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int t, a, b;
  while( scanf( "%d", &t ) != EOF ){
    for( int i = 0 ; i < t ; i++ ){
      scanf( "%d%d", &a, &b );
      if( a > b ) printf( ">\n" );
      else if( a < b ) printf( "<\n" );
      else printf( "=\n" );
    }
  }
  return 0;
}
```
