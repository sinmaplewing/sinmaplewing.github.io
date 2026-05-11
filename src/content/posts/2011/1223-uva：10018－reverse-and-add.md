---
id: 1223
title: '#UVa：10018－Reverse and Add'
slug: uva：10018－reverse-and-add
date: '2011-11-29T09:45:54+08:00'
lastmod: '2014-12-31T23:03:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1223/uva%ef%bc%9a10018%ef%bc%8dreverse-and-add/
wp_status: publish
wp_type: post
---

一直反轉數字然後加起來，就可以得解。

P.S. 

1. 數字的反轉可以看reverse()這部份是怎麼寫的。
2. 本題至少要加1次。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10018 Reverse and Add */
/* Author: LanyiKnight [at] knightzone.studio */
/* Version: 2011/11/29 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

unsigned int reverse( unsigned int num ){
  int rev = 0;
  while( num ){
    rev = rev*10 + num%10;
    num /= 10;
  }
  return rev;
}

int main(){
  int N, times;
  unsigned int num, rev;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 1 ; i <= N ; i++ ){
      scanf( "%u", &num );
      times = 0;
      rev = reverse(num);
      do{
        num = num + rev;
        times++;
        rev = reverse(num);
      }while( num != rev );
      printf( "%d %u\n", times, num );
    }
  }
  return 0;
}
```
