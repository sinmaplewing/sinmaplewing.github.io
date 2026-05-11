---
id: 1285
title: '#UVa：10673－Play with Floor and Ceil'
slug: uva：10673－play-with-floor-and-ceil
date: '2011-12-17T11:32:03+08:00'
lastmod: '2014-12-31T23:07:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2011/12/17/1285/uva%ef%bc%9a10673%ef%bc%8dplay-with-floor-and-ceil/
wp_status: publish
wp_type: post
---

首先，要先知道兩個括號的意義：

* ┌ ┐ => 取無條件進位(即是取ceil值) Ex. ┌1/3┐ = 1
* └ ┘ => 取無條件捨去(即是取floor值) Ex. └1/3┘ = 0

接著p和q就刷過各種可能即可得解。

**C++(0.376)**
```cpp
/*******************************************************/
/* UVa 10673 Play with Floor and Ceil                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;

long long div( long long x, long long k, double (*func)(double) ){
  return (long long)func( (double)x/(double)k );
}

int main(){
  int n;
  long long x, k, p, q, temp;
  bool answerp;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%lld%lld", &x, &k );
      answerp = 0;
      for( p = 0 ; !answerp ; p++ )
        for( q = 0 ; !answerp ; q++ ){
          temp = p*div(x,k,floor)+q*div(x,k,ceil);
          if( temp == x )
            answerp = 1;
          else if( temp > x )
            break;
        }
      printf( "%lld %lld\n", --p, --q );
    }
  }
  return 0;
}
```

