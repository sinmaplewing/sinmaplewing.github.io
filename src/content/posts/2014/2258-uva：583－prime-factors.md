---
id: 2258
title: '#UVa：583－Prime Factors'
slug: uva：583－prime-factors
date: '2014-10-07T16:06:49+08:00'
lastmod: '2014-12-31T22:50:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2014/10/07/2258/uva%ef%bc%9a583%ef%bc%8dprime-factors/
wp_status: publish
wp_type: post
---

建立質數表做質因數分解即可得解。

**C++(0.902)**
```cpp
/*******************************************************/
/* UVa 583 Prime Factors                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  bool composite[50000] = {true, true, false};
  for( int i = 2 ; i < 50000 ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j < 50000 ; j+=i ){
        composite[j] = true;
      }
    }
  }

  int g;
  while( scanf("%d", &g) != EOF && g != 0 ){
    printf( "%d = ", g );

    bool print_mul = false;
    if( g < 0 ){
      printf("-1");
      print_mul = true;
      g *= -1;
    }

    for( int i = 2 ; i < 50000 ; ++i ){
      if( !composite[i] ){
        while( g % i == 0 ){
          if( print_mul ) printf(" x ");
          printf("%d", i);
          print_mul = true;
          g /= i;
        }
      }

      if( g == 1 ) break;
    }

    if( g != 1 ){
      if( print_mul ) printf(" x ");
      printf( "%d", g );
    }

    printf("\n");
  }
  return 0;
}
```
