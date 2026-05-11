---
id: 2582
title: '#UVa：530－Binomial Showdown'
slug: uva：530－binomial-showdown
date: '2015-01-04T03:48:32+08:00'
lastmod: '2015-01-26T23:51:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2015/01/04/2582/uva%ef%bc%9a530%ef%bc%8dbinomial-showdown/
wp_status: publish
wp_type: post
---

所求為排列組合中的C(n,k)，可利用化簡後的公式`C(n,k) = n*(n-1)*...*(n-k+1) / k!`，接著在計算乘積的過程中，可以利用在乘上該值之前先除以其gcd的方式來將計算過程不要超過int的範圍。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 530 Binomial Showdown                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int gcd(int a, int b){
  while( (a %= b) && (b %= a) );
  return a + b;
}

int main(){
  int n, k;
  while( scanf("%d%d", &n, &k) != EOF && ( n != 0 || k != 0 ) ){
    int cnk = 1;
    if( k > n-k ) k = n - k;

    for( int i = 1 ; i <= k ; ++i ){
      if( (n - i + 1) % i == 0 ){
        cnk *= (n - i + 1) / i;
      }
      else if( cnk % i == 0 ){
        cnk /= i;
        cnk *= n - i + 1;
      }
      else {
        int gcdValue = gcd(cnk, i);
        cnk /= gcdValue;
        cnk *= (n - i + 1) / ( i / gcdValue );
      }
    }

    printf("%d\n", cnk);
  
  }

  return 0;
}
```
