---
id: 1275
title: '#UVa：10499－The Land of Justice'
slug: uva：10499－the-land-of-justice
date: '2011-12-17T08:40:30+08:00'
lastmod: '2014-12-31T23:07:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2011/12/17/1275/uva%ef%bc%9a10499%ef%bc%8dthe-land-of-justice/
wp_status: publish
wp_type: post
---

如果是沒切的情形(1塊)利潤就是0%，因為與原本的價格一樣。

分2塊的時候，表面積會比原本球的表面積多2塊半圓，一塊半圓會佔利潤的25%(π\*r/4\*π\*r=1/4=25%)，所以2塊的時候是50%的利潤。

分3塊的時候，表面積會比原本球的表面積多3塊半圓=>75%。分4塊的時候，表面積會比原本球的表面積多4塊半圓=>100%。以此類推......

P.S. 注意(2^31)*25會超過unsigned int的範圍喔！

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10499 The Land of Justice                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long n;
  while( scanf( "%lld", &n ) != EOF && n > 0 ){
    if( n == 1 )
      printf( "0%%\n" );
    else
      printf( "%lld%%\n", n*25 );
  }
  return 0;
}
```
