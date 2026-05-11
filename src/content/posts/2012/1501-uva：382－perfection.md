---
id: 1501
title: '#UVa：382－Perfection'
slug: uva：382－perfection
date: '2012-03-17T20:21:06+08:00'
lastmod: '2014-12-31T03:24:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2012/03/17/1501/uva%ef%bc%9a382%ef%bc%8dperfection/
wp_status: publish
wp_type: post
---

先建質數表，將輸入值給質因數分解，利用質因數分解的結果求出所有因數之和，將所有因數之和扣除掉自己本身，再比較大小即是答案。

P.S. 利用質因數分解的結果求出所有因數之和是數學的公式，是每一個質因數從自己的0次方加到自己在質因數分解中的最高次方，接著在把求出來所有的和相乘起來即可得解。

Ex. 12: 2^2 * 3^1

* 12所有因數之和：(2^0+2^1+2^2)*(3^0+3^1) = (1+2+4) * (1+3) = 28
* 驗證：12之因數：1,2,3,4,6,12
* 12所有因數之和：1+2+3+4+6+12=28

**C++(0.018)**
```cpp
/*******************************************************/
/* UVa 382 Perfection                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-8
using namespace std;

int main(){
  int N, temp, sqrt_N, product, sum, single;
  bool composite[60005] = { true, true };

  for( int i = 2 ; i <= 60000 ; i++ )
    if( !composite[i] )
      for( int j = i+i ; j <= 60000 ; j += i )
        composite[j] = true;


  printf( "PERFECTION OUTPUT\n" );
  while( scanf( "%d", &N ) != EOF && N != 0 ){
    int divisor[60005] = {0};
    temp = N;
    sqrt_N = (int)(sqrt(N) + ERROR);

    for( int i = 2 ; i <= sqrt_N ; i++ )
      if( !composite[i] )
        while( temp % i == 0 ){
          temp /= i;
          divisor[i]++;
        }

    product = 1;
    for( int i = 2 ; i <= sqrt_N ; i++ )
      if( divisor[i] ){
        sum = 1;
        single = 1;
        for( int j = 1 ; j <= divisor[i] ; j++ ){
          single *= i;
          sum += single;
        }
        product *= sum;
      }
    if( temp != 1 ) product *= temp+1;

    product -= N;
    printf( "%5d  ", N );
    if( product == N ) printf( "PERFECT\n" );
    else if( product > N ) printf( "ABUNDANT\n" );
    else printf( "DEFICIENT\n" );
  }
  printf( "END OF OUTPUT\n" );

  return 0;
}
```
