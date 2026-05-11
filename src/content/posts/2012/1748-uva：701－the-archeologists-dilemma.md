---
id: 1748
title: '#UVa：701－The Archeologists'' Dilemma'
slug: uva：701－the-archeologists-dilemma
date: '2012-05-18T10:41:53+08:00'
lastmod: '2014-12-31T22:53:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2012/05/18/1748/uva%ef%bc%9a701%ef%bc%8dthe-archeologists-dilemma/
wp_status: publish
wp_type: post
---

可以利用數學式子先推：`2^E = N*10^k + C (C為正整數)` (省略C)-> `N*10^k` (同取log2)-> `log2(N) + k*log2(10)` 故找`log2(N) + k*log2(10)`到`log2(N+1) + k*log2(10)`之值之中是否具有整數，若有即是解。

P.S. `(log2(N+1) + k*log2(10))`絕對不會為整數，在k>=1的情況下。

**C++(0.136)**
```cpp
/*******************************************************/
/* UVa 701 The Archeologists' Dilemma                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/05/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;

int digit( int x ){
  int value = 0;
  while(x){
    x /= 10;
    value++;
  }
  return value;
}

int main(){
  int N, k, lower, upper;
  while( scanf( "%d", &N ) != EOF ){
    k = digit(N)+1;
    while(1){
      lower = (int)(log2(N)+k*log2(10));
      upper = (int)(log2(N+1)+k*log2(10));
      if( lower != upper ){
        printf( "%d\n", upper );
        break;
      }
      k++;
    }
  }
  return 0;
}
```
