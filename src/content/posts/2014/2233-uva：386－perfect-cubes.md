---
id: 2233
title: '#UVa：386－Perfect Cubes'
slug: uva：386－perfect-cubes
date: '2014-10-04T01:47:20+08:00'
lastmod: '2014-12-31T03:24:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2014/10/04/2233/uva%ef%bc%9a386%ef%bc%8dperfect-cubes/
wp_status: publish
wp_type: post
---

硬爆解，直接搜尋a,b,c,d，符合的就輸出。

**C++(0.136)**
```cpp
/*******************************************************/
/* UVa 386 Perfect Cubes                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  for( int a = 2 ; a <= 200 ; ++a ){
    for( int b = 2 ; b < a ; ++b ){
      for( int c = b ; c < a ; ++c ){
        for( int d = c ; d < a ; ++d ){
          if( a*a*a == b*b*b + c*c*c + d*d*d ){
            printf( "Cube = %d, Triple = (%d,%d,%d)\n", a, b, c, d );
          }
        }
      }
    }
  }
  return 0;
}
```
