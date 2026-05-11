---
id: 2008
title: '#UVa：686－Goldbach''s Conjecture (II)'
slug: uva：686－goldbachs-conjecture-ii
date: '2012-11-29T08:38:42+08:00'
lastmod: '2014-12-31T22:51:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2012/11/29/2008/uva%ef%bc%9a686%ef%bc%8dgoldbachs-conjecture-ii/
wp_status: publish
wp_type: post
---

建質數表，開始從質數表中尋找1~n/2之所有質數p，檢查n-p是否為質數即可。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 686 Goldbach's Conjecture (II) */
/* Author: LanyiKnight [at] knightzone.studio */
/* Version: 2012/11/29 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  bool composite[33000] = {true,true,false};
  for( int i = 2 ; i < 33000 ; i++ )
    if( !composite[i] )
      for( int j = i+i ; j < 33000 ; j += i )
        composite[j] = true;

  int n, count;
  while( scanf( "%d", &n ) != EOF && n ){

    count = 0;
    for( int i = 2 ; i <= n/2 ; i++ )
      if( !composite[i] && !composite[n-i] ) count++;

    printf( "%d\n", count );
  }
  return 0;
}
```
