---
id: 1471
title: '#UVa：113－Power of Cryptography'
slug: uva：113－power-of-cryptography
date: '2012-03-14T15:27:56+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/14/1471/uva%ef%bc%9a113%ef%bc%8dpower-of-cryptography/
wp_status: publish
wp_type: post
---

善用pow()函式來解題。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 113 Power of Cryptography                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;

int main(){
  double n, p, k;
  while( scanf( "%lf%lf", &n, &p ) != EOF )
    printf( "%.0lf\n", pow( p, 1.0/n ) );

  return 0;
}
```
