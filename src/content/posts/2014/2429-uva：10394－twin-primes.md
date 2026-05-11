---
id: 2429
title: '#UVa：10394－Twin Primes'
slug: uva：10394－twin-primes
date: '2014-12-19T13:04:39+08:00'
lastmod: '2014-12-31T23:06:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2014/12/19/2429/uva%ef%bc%9a10394%ef%bc%8dtwin-primes/
wp_status: publish
wp_type: post
---

邊建立質數表邊可找出所有的Twin Primes，即可得解。

**C++(0.222)**
```cpp
/*******************************************************/
/* UVa 10394 Twin Primes                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/19                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

const int PRIME_MAX_LIMIT = 20000000;

int main(){
  vector<bool> prime(PRIME_MAX_LIMIT + 5, true);
  vector<int> twinPrimes;
  
  prime[0] = false;
  prime[1] = false;
  for( int i = 2 ; i <= PRIME_MAX_LIMIT ; ++i ){
    if( prime[i] ){
      for( int j = i + i ; j <= PRIME_MAX_LIMIT ; j += i ){
        prime[j] = false;
      }
      if( prime[i] && prime[i-2] ){
        twinPrimes.push_back( i-2 );
      }
    }
  }

  int S;
  while( scanf("%d", &S) != EOF ){
    printf("(%d, %d)\n", twinPrimes[S-1], twinPrimes[S-1]+2 );
  }

  return 0;
}
```
