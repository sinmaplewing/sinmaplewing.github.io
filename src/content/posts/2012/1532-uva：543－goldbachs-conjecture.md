---
id: 1532
title: '#UVa：543－Goldbach''s Conjecture'
slug: uva：543－goldbachs-conjecture
date: '2012-03-26T00:51:35+08:00'
lastmod: '2014-12-31T22:50:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/03/26/1532/uva%ef%bc%9a543%ef%bc%8dgoldbachs-conjecture/
wp_status: publish
wp_type: post
---

建質數表，從1~n/2都減減看即可得解。

**C++(0.055)**
```cpp
/*******************************************************/
/* UVa 543 Goldbach's Conjecture                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/26                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  bool composite[1000005] = { true, true };
  bool find;
  int a;

  for( int i = 2 ; i <= 1000000 ; i++ )
    if( !composite[i] )
      for( int j = i+i ; j <= 1000000 ; j += i )
        composite[j] = true;

  int n;
  while( scanf( "%d", &n ) != EOF && n != 0 ){
    find = false;
    for( a = 2 ; a <= n/2 ; a++ )
      if( !composite[a] )
        if( !composite[n-a] ){
          find = true;
          break;
        }
    if( find ) printf( "%d = %d + %d\n", n, a, n-a );
    else printf( "Goldbach's conjecture is wrong.\n" );
  }

  return 0;
}
```
