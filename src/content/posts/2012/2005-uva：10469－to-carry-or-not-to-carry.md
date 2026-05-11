---
id: 2005
title: '#UVa：10469－To Carry or not to Carry'
slug: uva：10469－to-carry-or-not-to-carry
date: '2012-11-29T07:58:47+08:00'
lastmod: '2014-12-31T23:07:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2012/11/29/2005/uva%ef%bc%9a10469%ef%bc%8dto-carry-or-not-to-carry/
wp_status: publish
wp_type: post
---

將加運算換成XOR運算即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10469 To Carry or not to Carry                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  unsigned int a, b;
  while( scanf( "%u%u", &a, &b ) != EOF ){
    printf( "%u\n", a^b );
  }
  return 0;
}
```
