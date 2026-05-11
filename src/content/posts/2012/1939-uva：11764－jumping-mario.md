---
id: 1939
title: '#UVa：11764－Jumping Mario'
slug: uva：11764－jumping-mario
date: '2012-10-17T16:33:48+08:00'
lastmod: '2014-12-31T23:21:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2012/10/17/1939/uva%ef%bc%9a11764%ef%bc%8djumping-mario/
wp_status: publish
wp_type: post
---

照著題目要求的算出來即得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11764 Jumping Mario                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  int N;
  int wall_last, wall_now;
  int high_jump, low_jump;

  while( scanf( "%d", &T ) != EOF ){
    for( int i = 1 ; i <= T ; i++ ){
      scanf( "%d", &N );

      if( !N ){
        printf( "Case %d: 0 0\n", i );
        continue;
      }

      scanf( "%d", &wall_last );
      high_jump = 0;
      low_jump = 0;
      for( int j = 1 ; j < N ; j++ ){
        scanf( "%d", &wall_now );
        if( wall_now > wall_last ) high_jump++;
        else if( wall_now < wall_last ) low_jump++;
        wall_last = wall_now;
      }

      printf( "Case %d: %d %d\n", i, high_jump, low_jump );
    }
  }
  return 0;
}
```
