---
id: 1903
title: '#UVa：11364－Parking'
slug: uva：11364－parking
date: '2012-09-19T01:06:11+08:00'
lastmod: '2014-12-31T23:18:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2012/09/19/1903/uva%ef%bc%9a11364%ef%bc%8dparking/
wp_status: publish
wp_type: post
---

將車停在最小與最大編號中間任一處即可，便可得最小值為最大編號的店與最小編號的店之間的距離再乘以2，可以試著觀察看看如果在最小編號的店更小處或是最大編號的店更大處停車會是怎樣的狀況。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11364 Parking                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<algorithm>
using namespace std;

int main(){
  int t, n, shop[25];
  while( scanf( "%d", &t ) != EOF ){
    for( int i = 0 ; i < t ; i++ ){
      scanf( "%d", &n );
      for( int j = 0 ; j < n ; j++ )
        scanf( "%d", &shop[j] );
      sort( shop, shop+n );
      printf( "%d\n", (shop[n-1]-shop[0])*2 );
    }
  }
  return 0;
}
```
