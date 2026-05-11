---
id: 1978
title: '#UVa：294－Divisors'
slug: uva：294－divisors
date: '2012-10-21T09:19:50+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/10/21/1978/uva%ef%bc%9a294%ef%bc%8ddivisors/
wp_status: publish
wp_type: post
---

使用質因數分解求出其因數個數並取範圍內最大的即可得解。

**C++(0.768)**
```cpp
/*******************************************************/
/* UVa 294 Divisors                                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/21                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;

int main(){
  int N, L, U;
  int D[100005], max_num, max_divisor, now, sqrt_now, now_divisor; 
  bool is_prime[100005];
  const float ERROR = 1e-9;
  fill( is_prime, is_prime+100005, true );
  is_prime[0] = false, is_prime[1] = false;

  for( int i = 2 ; i <= 100005 ; i++ )
    if( is_prime[i] )
      for( int j = i+i ; j <= 100005 ; j+=i )
        is_prime[j] = false;

  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ ){
      scanf( "%d%d", &L, &U );
      max_divisor = 0;
      max_num = -1;

      for( int j = L ; j <= U ; j++ ){
        fill( D, D+100005, 0 );
        now = j;
        sqrt_now = (int)(sqrt(now)+ERROR);
        now_divisor = 1;

        for( int k = 2 ; k <= sqrt_now ; k++ ){
          if( is_prime[k] ){
            while( !(now % k) ){
              now /= k;
              D[k]++;
            }
            now_divisor *= D[k]+1;
          }
        }
        if( now != 1 ) now_divisor *= 2;
        if( now_divisor > max_divisor ){
          max_divisor = now_divisor;
          max_num = j;
        }
      }

      printf( "Between %d and %d, %d has a maximum of %d divisors.\n", L, U, max_num, max_divisor );
    }
  }
  return 0;
}
```
