---
id: 1314
title: '#UVa：10699－Count the factors'
slug: uva：10699－count-the-factors
date: '2012-01-17T00:27:44+08:00'
lastmod: '2014-12-31T23:07:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2012/01/17/1314/uva%ef%bc%9a10699%ef%bc%8dcount-the-factors/
wp_status: publish
wp_type: post
---

直接去測試從2開始到根號n中的值除n能不能整除，能整除就知道其質因數有此數，因此就把質因數個數加一，接著把n中所有這個質因數的次方通通除乾淨，再往下一個搜尋。搜尋結束後，若n尚未變為1，表示尚存在一個大於根號n的質數為其因數，再將質因數個數加一。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10699 Count the factors                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-9
using namespace std;

int main(){
  int n, factor, limit;
  while( scanf( "%d", &n ) != EOF && n ){
    printf( "%d : ", n );
    factor = 0;
    limit = (int)(sqrt(n)+ERROR);
    for( int i = 2 ; i <= limit ; i++ ){
      if( n%i == 0 ){
        factor++;
        while( !(n%i) ) n/=i;
      }
    }
    if( n != 1 ) factor++;
    printf( "%d\n", factor );
  }
  return 0;
}
```
