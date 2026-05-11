---
id: 1933
title: '#UVa：11689－Soda Surpler'
slug: uva：11689－soda-surpler
date: '2012-10-17T14:43:05+08:00'
lastmod: '2014-12-31T23:21:25+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2012/10/17/1933/uva%ef%bc%9a11689%ef%bc%8dsoda-surpler/
wp_status: publish
wp_type: post
---

照題目算出答案即可。

P.S. 注意換完的瓶子又可再變成空瓶子拿去換。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11689 Soda Surpler                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  int e, f, c;
  int all, change;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ ){
      scanf( "%d%d%d", &e, &f, &c );
      all = e+f;
      change = 0;

      while( all/c ){
        change += all/c;
        all = all/c + all%c;
      }

      printf( "%d\n", change );
    }
  }
  return 0;
}
```
