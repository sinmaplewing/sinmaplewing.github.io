---
id: 2404
title: '#UVa：10235－Simply Emirp'
slug: uva：10235－simply-emirp
date: '2014-12-17T12:44:03+08:00'
lastmod: '2014-12-31T23:06:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2014/12/17/2404/uva%ef%bc%9a10235%ef%bc%8dsimply-emirp/
wp_status: publish
wp_type: post
---

建立質數表並查詢即可得解。

P.S. 翻轉過來的數值必須要與原本的質數是不同的質數才算是Emirp。

**C++(0.032)**
```cpp
/*******************************************************/
/* UVa 10235 Simply Emirp                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int LIMIT = 1000000;

int reverse( int a ){
  int b = 0;
  while( a != 0 ){
    b *= 10;
    b += a%10;
    a /= 10;
  }
  return b;
}

int main(){
  bool composite[LIMIT+5] = {true, true};
  for( int i = 2; i <= LIMIT ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j <= LIMIT ; j += i ){
        composite[j] = true;
      }
    }
  }

  int N;
  while( scanf("%d", &N) != EOF ){
    if( composite[N] ){
      printf( "%d is not prime.\n", N );
      continue;
    }

    int reverseN = reverse(N);
    if( reverseN != N && !composite[reverseN] ){
      printf( "%d is emirp.\n", N );
    }
    else{
      printf( "%d is prime.\n", N );
    }

  }
  return 0;
}
```
