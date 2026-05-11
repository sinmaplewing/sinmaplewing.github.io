---
id: 1789
title: '#UVa：10101－Bangla Numbers'
slug: uva：10101－bangla-numbers
date: '2012-08-01T22:00:47+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/08/01/1789/uva%ef%bc%9a10101%ef%bc%8dbangla-numbers/
wp_status: publish
wp_type: post
---

去檢查各個需顯示的位數是否為0，若不為0就顯示，若為0就不顯示。

如果輸入的數字為0，即顯示1個0即可。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 10101 Bangla Numbers                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/08/01                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

void print_number( long long n ){
  if( n == 0 ) return;

  if( n/10000000 ){
    print_number( n/10000000 );
    printf( " kuti" );
    n %= 10000000;
  }

  if( n/100000 ){
    print_number( n/100000 );
    printf( " lakh" );
    n %= 100000;
  }

  if( n/1000 ){
    print_number( n/1000 );
    printf( " hajar" );
    n %= 1000;
  }

  if( n/100 ){
    print_number( n/100 );
    printf( " shata" );
    n %= 100;
  }

  if( n ) printf( " %lld", n );
}

int main(){
  long long n;
  int num = 1;
  while( scanf( "%lld", &n ) != EOF ){
    printf( "%4d.", num );
    if( n ) print_number( n );
    else printf( " 0" );
    printf( "\n" );
    num++;
  }
  return 0;
}
```
