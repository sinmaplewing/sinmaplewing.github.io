---
id: 1948
title: '#UVa：11936－The Lazy Lumberjacks'
slug: uva：11936－the-lazy-lumberjacks
date: '2012-10-20T21:19:17+08:00'
lastmod: '2014-12-31T23:22:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2012/10/20/1948/uva%ef%bc%9a11936%ef%bc%8dthe-lazy-lumberjacks/
wp_status: publish
wp_type: post
---

利用三角不等式判斷即得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11936 The Lazy Lumberjacks                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  int tri[3];
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ ){
      scanf( "%d%d%d", &tri[0], &tri[1], &tri[2] );
      if( tri[0]+tri[1] > tri[2] &&
          tri[1]+tri[2] > tri[0] &&
          tri[0]+tri[2] > tri[1] ) 
        printf( "OK\n" );
      else printf( "Wrong!!\n" );
    }
  }
  return 0;
}
```
