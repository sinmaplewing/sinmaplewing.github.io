---
id: 1375
title: '#UVa：374－Big Mod'
slug: uva：374－big-mod
date: '2012-01-19T12:21:37+08:00'
lastmod: '2014-12-31T03:24:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2012/01/19/1375/uva%ef%bc%9a374%ef%bc%8dbig-mod/
wp_status: publish
wp_type: post
---

首先，要先知道數學式子：(A\*B)%C = (A%C) \* (B%C)。因此我就可以不用把B^P算完再去對M取餘數(避免超過變數範圍)，但是如果是((((B%M)\*B)%M)\*B)%M.....這樣乘的話會TLE的，所以算次方請用次方除二相乘的遞迴來算次方，也就是 (B^P)%M = (B^(P/2)%M) \* (B^(P/2)%M) 這樣遞迴。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 374 Big Mod                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

long long bigmod( long long B, long long P, long long M ){
  if( P == 0 )
    return 1;
  else if( P == 1 )
    return B%M;
  else{
    long long result = bigmod( B, P/2, M );
    if( P%2 )
      return result*result*B % M;
    else
      return result*result % M;
  }
}

int main(){
  long long B, P, M;
  while( scanf( "%lld%lld%lld", &B, &P, &M ) != EOF )
    printf( "%lld\n", bigmod( B, P, M ) );
  return 0;
}
```
