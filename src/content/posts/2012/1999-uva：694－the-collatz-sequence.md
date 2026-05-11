---
id: 1999
title: '#UVa：694－The Collatz Sequence'
slug: uva：694－the-collatz-sequence
date: '2012-11-28T23:54:43+08:00'
lastmod: '2014-12-31T22:51:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2012/11/28/1999/uva%ef%bc%9a694%ef%bc%8dthe-collatz-sequence/
wp_status: publish
wp_type: post
---

照著題目要求去進行遞迴，即可得解。

**C++(0.024)**
```cpp
/*******************************************************/
/* UVa 694 The Collatz Sequence                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int f( long long A, long long L ){
  if( A == 1 ) return 1;
  else if( A % 2 == 0 ) return 1+f(A/2,L);
  else{
    if( 3*A+1 > L ) return 1;
    return 1+f(3*A+1,L);
  }
}

int main(){
  long long A, L;
  int testcase = 1;
  while( scanf( "%lld%lld", &A, &L ) != EOF && !(A < 0 && L < 0)){
    printf( "Case %d: A = %lld, limit = %lld, number of terms = %d\n", testcase++, A, L, f(A,L) );
  }
  return 0;
}
```
