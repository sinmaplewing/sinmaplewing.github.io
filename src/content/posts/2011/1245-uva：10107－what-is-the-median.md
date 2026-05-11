---
id: 1245
title: '#UVa：10107－What is the Median?'
slug: uva：10107－what-is-the-median
date: '2011-11-30T13:23:15+08:00'
lastmod: '2014-12-31T23:03:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2011/11/30/1245/uva%ef%bc%9a10107%ef%bc%8dwhat-is-the-median/
wp_status: publish
wp_type: post
---

數值一直由小到大插入陣列中，即可得其中位數。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 10107 What is the Median?                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/30                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N[10005], top = 0, temp;
  while( scanf( "%d", &N[top++] ) != EOF ){
    for( int i = 0 ; i < top ; i++ )
      if( N[top-1] > N[i] ){
        temp = N[top-1];
        for( int j = top-1 ; j > i ; j-- )
          N[j] = N[j-1];
        N[i] = temp;
        break;
      }
      if( top % 2 )
        printf( "%d\n", N[top/2] );
      else
        printf( "%d\n", (N[top/2]+N[top/2-1])/2 );
  }
  return 0;
}
```
