---
id: 1259
title: '#UVa：10300－Ecological Premium'
slug: uva：10300－ecological-premium
date: '2011-12-04T14:21:25+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2011/12/04/1259/uva%ef%bc%9a10300%ef%bc%8decological-premium/
wp_status: publish
wp_type: post
---

只要把所有農夫各自的農場面積和環境等級相乘之後再求總和即是解答。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10300 Ecological Premium                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/04                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, f, area, animal, eco, money;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      money = 0;
      scanf( "%d", &f );
      for( int j = 0 ; j < f ; j++ ){
        scanf( "%d%d%d", &area, &animal, &eco );
        money += area * eco;
      }
      printf( "%d\n", money );
    }
  }
  return 0;
}
```
