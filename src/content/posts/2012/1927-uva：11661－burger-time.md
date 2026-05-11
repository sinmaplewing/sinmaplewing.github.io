---
id: 1927
title: '#UVa：11661－Burger Time?'
slug: uva：11661－burger-time
date: '2012-09-20T23:20:58+08:00'
lastmod: '2014-12-31T23:21:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2012/09/20/1927/uva%ef%bc%9a11661%ef%bc%8dburger-time/
wp_status: publish
wp_type: post
---

照題目找出最近的兩店的距離即可。

**C++(0.092)**
```cpp
/*******************************************************/
/* UVa 11661 Burger Time                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int L;
  char road, state;
  int position, distance;
  while( scanf( "%d", &L ) != EOF && L ){
    getchar();
    state = '.';
    position = -1;
    distance = 2000001;
    for( int i = 0 ; i < L ; i++ ){
      road = getchar();
      if( road == 'Z' ) distance = 0;
      if( road != '.' ){
        if( state != road && state != '.' )
          if( i - position < distance ) distance = i - position;
        state = road;
        position = i;
      }
    }
    printf( "%d\n", distance );
  }
  return 0;
}
```
