---
id: 1984
title: '#UVa：10137－The Trip'
slug: uva：10137－the-trip
date: '2012-11-10T00:17:50+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/11/10/1984/uva%ef%bc%9a10137%ef%bc%8dthe-trip/
wp_status: publish
wp_type: post
---

此題雖然照題目要求即可，但會要注意這兩點：

1. 在算平均數時必須先進行四捨五入。
2. 在算差距時，要從比平均數大的差距總和以及比平均數小的差距總和之間取最小的輸出。

這樣應該就可以AC了。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10137 The Trip                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){ 
  int n;
  double pay[1005], average, high_exchange, low_exchange;

  while( scanf( "%d", &n ) != EOF && n ){
    average = 0;
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%lf", &pay[i] );
      average += pay[i];
    }

    average = ((double)(int)(average*100/n+0.5))/100;

    high_exchange = 0;
    low_exchange = 0;

    for( int i = 0 ; i < n ; i++ ){
      if( average < pay[i] ) high_exchange += ( pay[i] - average );
      if( average > pay[i] ) low_exchange += ( average - pay[i] );
    }
    printf( "$%.2lf\n", ( high_exchange < low_exchange )? high_exchange : low_exchange );
  }
  return 0;
}
```
