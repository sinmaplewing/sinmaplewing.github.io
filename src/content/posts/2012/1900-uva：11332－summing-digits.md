---
id: 1900
title: '#UVa：11332－Summing Digits'
slug: uva：11332－summing-digits
date: '2012-09-17T23:12:54+08:00'
lastmod: '2014-12-31T23:18:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2012/09/17/1900/uva%ef%bc%9a11332%ef%bc%8dsumming-digits/
wp_status: publish
wp_type: post
---

從低位慢慢往高位加即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11332 Summing Digits                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  while( scanf( "%d", &n ) != EOF && n ){
    while( n/10 ) n = n/10 + n%10;
    printf( "%d\n", n );
  }
  return 0;
}
```
