---
id: 1960
title: '#UVa：12468－Zapping'
slug: uva：12468－zapping
date: '2012-10-20T22:06:43+08:00'
lastmod: '2014-12-31T23:23:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2012/10/20/1960/uva%ef%bc%9a12468%ef%bc%8dzapping/
wp_status: publish
wp_type: post
---

兩個方向算完找最小即得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 12468 Zapping                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int a, b;
  while( scanf( "%d%d", &a, &b ) != EOF && a != -1 || b != -1 ){
    printf( "%d\n", min(max(a,b)-min(a,b), min(a,b)-max(a,b)+100) );
  }
  return 0;
}
```
