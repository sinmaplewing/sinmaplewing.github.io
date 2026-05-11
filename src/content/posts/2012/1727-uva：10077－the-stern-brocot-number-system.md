---
id: 1727
title: '#UVa：10077－The Stern-Brocot Number System'
slug: uva：10077－the-stern-brocot-number-system
date: '2012-04-20T21:46:29+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/04/20/1727/uva%ef%bc%9a10077%ef%bc%8dthe-stern-brocot-number-system/
wp_status: publish
wp_type: post
---

使用Binary Search Tree的方式去找即可。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10077 The Stern-Brocot Number System            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

struct Fraction{
  int m;
  int n;
};

bool slt( Fraction a, Fraction b ){
  return (a.m * b.n) < (b.m * a.n);
}

bool sne( Fraction a, Fraction b ){
  return (a.m != b.m) || (a.n != b.n);
}

int main(){
  Fraction left, right;
  Fraction dest, trace;
  string path;

  while( scanf( "%d %d", &dest.m, &dest.n ) != EOF &&
         !(dest.m == 1 && dest.n == 1 )){
    path = "";
    trace.m = 1;
    trace.n = 1;

    left.m = 0;
    left.n = 1;
    right.m = 1;
    right.n = 0;

    do{
      if( slt( dest, trace ) ){
        path += "L";
        right = trace;
        trace.m += left.m;
        trace.n += left.n;
      }
      else{
        path += "R";
        left = trace;
        trace.m += right.m;
        trace.n += right.n;
      }
    } while( sne( dest, trace ) );
    printf( "%s\n", path.c_str() );
  }

  return 0;
}
```
