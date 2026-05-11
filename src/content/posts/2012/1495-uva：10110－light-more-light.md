---
id: 1495
title: '#UVa：10110－Light, more light'
slug: uva：10110－light-more-light
date: '2012-03-17T08:34:48+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/03/17/1495/uva%ef%bc%9a10110%ef%bc%8dlight-more-light/
wp_status: publish
wp_type: post
---

判斷該燈是否為亮或暗，會因為其因數個數而決定。

Ex. 8: 1, 2, 4, 8 －表示按下1號、2號、4號、8號都會影響該燈的亮暗。

當因數個數為偶數，則該燈會是暗的；當因數個數為奇數，則該燈會是亮的。而如何判斷因數個數的奇偶只要知道該數是否為完全平方數即可，若為完全平方數則因數個數即為奇數。

P.S. 範圍最大會到2^32-1，記得要用unsigned int。

**C++(0.028)**
```cpp
/*******************************************************/
/* UVa 10110 Light, more light                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-8
using namespace std;

int main(){
  double n;
  while( scanf( "%lf", &n ) != EOF && n != 0.0 ){
    unsigned int sqrt_num = (int)(sqrt(n)+ERROR);
    if( (double)(sqrt_num * sqrt_num) == n )
      printf( "yes\n" );
    else
      printf( "no\n" );
  }
  return 0;
}
```
