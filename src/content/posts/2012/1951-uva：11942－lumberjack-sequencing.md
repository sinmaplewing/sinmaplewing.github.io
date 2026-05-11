---
id: 1951
title: '#UVa：11942－Lumberjack Sequencing'
slug: uva：11942－lumberjack-sequencing
date: '2012-10-20T21:32:13+08:00'
lastmod: '2014-12-31T23:22:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2012/10/20/1951/uva%ef%bc%9a11942%ef%bc%8dlumberjack-sequencing/
wp_status: publish
wp_type: post
---

照題目要求去做檢查即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11942 Lumberjack Sequencing                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  int lumberjacks[12];
  bool order;
  while( scanf( "%d", &N ) != EOF ){
    printf( "Lumberjacks:\n" );
    for( int i = 0 ; i < N ; i++ ){
      order = true;
      for( int j = 0 ; j < 10 ; j++ )
        scanf( "%d", &lumberjacks[j] );
      for( int j = 2 ; j < 10 ; j++ ){
        if( (lumberjacks[j] > lumberjacks[j-1]) ^ (lumberjacks[j-1] > lumberjacks[j-2]) )
          order = false;
      }

      if( order ) printf( "Ordered\n" );
      else printf( "Unordered\n" );
    }
  }
  return 0;
}
```
