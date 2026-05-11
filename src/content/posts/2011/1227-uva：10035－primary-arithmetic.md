---
id: 1227
title: '#UVa：10035－Primary Arithmetic'
slug: uva：10035－primary-arithmetic
date: '2011-11-29T21:49:07+08:00'
lastmod: '2014-12-31T23:03:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1227/uva%ef%bc%9a10035%ef%bc%8dprimary-arithmetic/
wp_status: publish
wp_type: post
---

將輸入的兩個數字的每個位數分開來加加看，記得也要加上前一位數的進位值，這樣就可以做完這題了。

**C++(0.044)**
```cpp
/*******************************************************/
/* UVa 10035 Primary Arithmetic                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int add1, add2, carry, count;
  while( scanf( "%d%d", &add1, &add2 ) != EOF && (add1 || add2) ){
    carry = 0;
    count = 0;
    while( add1 || add2 ){
      carry = add1%10 + add2%10 + carry;
      carry /= 10;
      add1 /= 10;
      add2 /= 10;
      if( carry )
        count++;
    }
    if( count == 1 )
      printf( "1 carry operation.\n" );
    else if( count > 1 )
      printf( "%d carry operations.\n", count );
    else
      printf( "No carry operation.\n" );
  }
  return 0;
}
```
