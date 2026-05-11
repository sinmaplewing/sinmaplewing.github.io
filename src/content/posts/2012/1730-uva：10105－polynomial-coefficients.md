---
id: 1730
title: '#UVa：10105－Polynomial Coefficients'
slug: uva：10105－polynomial-coefficients
date: '2012-04-20T21:49:45+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/04/20/1730/uva%ef%bc%9a10105%ef%bc%8dpolynomial-coefficients/
wp_status: publish
wp_type: post
---

根據二項式定理可以求出解。

公式是`C(n,n1)*C(n-n1,n2)*C(n-n1-n2,n3)*...*C(n-n1-n2-n3-...-n(k-1), nk)`，化簡可得`n!/(n1!*n2!*n3!*...*nk!)`。

Ex. `(x1+x2+x3+x4)^5 = (x1+x2+x3+x4)*(x1+x2+x3+x4)*(x1+x2+x3+x4)*(x1+x2+x3+x4)*(x1+x2+x3+x4)`

相乘時，最後出現的每一項就好像是從這五個一樣的式子中的四個變數，各取一個出來相乘。

要知道x1\*x2\*x3^3這項的可能性，可能是第一個(x1+x2+x3+x4)中取x1，第二個(x1+x2+x3+x4)中取x2，第三、四、五個(x1+x2+x3+x4)中取x3，把取出來的相乘起來。也有可能是第一個(x1+x2+x3+x4)中取x2，第三個(x1+x2+x3+x4)中取x1，第二、四、五個(x1+x2+x3+x4)中取x3，把取出來的相乘起來。

而所有的可能性就是：C(5,1)\*C(4,1)\*C(3,3) (意思如同：[取x1，從五個(x1+x2+x3+x4)裡面取一個]\*[取x2，從剩下四個(x1+x2+x3+x4)裡面取一個]\*[取x3，從剩下三個(x1+x2+x3+x4)裡面取三個]) 而所有乘出來的同樣的項，最後會加起來，所以所有的可能性就是係數，即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10105 Polynomial Coefficients                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, k, power;
  long long answer;
  while( scanf( "%d%d", &n, &k ) != EOF ){
    answer = 1;
    for( int i = n ; i >= 1 ; i-- ) answer *= i;
    for( int i = 0 ; i < k ; i++ ){
      scanf( "%d", &power );
      for( int j = power ; j >= 1 ; j-- ) answer /= j;
    }
    printf( "%lld\n", answer );
  }
  return 0;
}
```
