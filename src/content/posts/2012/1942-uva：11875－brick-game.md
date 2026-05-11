---
id: 1942
title: '#UVa：11875－Brick Game'
slug: uva：11875－brick-game
date: '2012-10-17T16:54:10+08:00'
lastmod: '2014-12-31T23:22:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 118
- UVa
permalink: /2012/10/17/1942/uva%ef%bc%9a11875%ef%bc%8dbrick-game/
wp_status: publish
wp_type: post
---

找其中位數即可，由於輸入的資料皆已排序過，找其一半的地方即是答案。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11875 Brick Game */
/* Author: LanyiKnight [at] knightzone.studio */
/* Version: 2012/10/17 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  int N;
  int teammate[15];
  while( scanf( "%d", &T ) != EOF ){
    for( int i = 1 ; i <= T ; i++ ){
      scanf( "%d", &N );
      for( int j = 0 ; j < N ; j++ )
        scanf( "%d", &teammate[j] );

      printf( "Case %d: %d\n", i, teammate[N/2] );
    }
  }
  return 0;
}
```
