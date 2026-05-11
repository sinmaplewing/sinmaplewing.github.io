---
id: 1759
title: '#UVa：12149－Feynman'
slug: uva：12149－feynman
date: '2012-07-15T10:33:54+08:00'
lastmod: '2014-12-31T23:23:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 121
- UVa
permalink: /2012/07/15/1759/uva%ef%bc%9a12149%ef%bc%8dfeynman/
wp_status: publish
wp_type: post
---

N\*N的正方形，先算1邊長的個數，即是N\*N。再算2邊長的個數，N長度可以分成N-1個2邊長的邊，長有N-1個可以取，寬也有N-1個可以取，所以就是(N-1)\*(N-1)。再算3邊長的個數，N長度可以分成N-2個3邊長的邊，長有N-2個可以取，寬也有N-2個可以取，所以就是(N-2)\*(N-2)。以此類推，一直算到N邊長的個數，也就是1\*1=1個。故總和即為N^2 + (N-1)^2 + ... + 1^2 = 即是1~N之平方和。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 12149 - Feynman                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/15                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  while( scanf( "%d", &N ) != EOF && N ){
    printf( "%d\n", N*(N+1)*(2*N+1)/6 );
  }
  return 0;
}
```
