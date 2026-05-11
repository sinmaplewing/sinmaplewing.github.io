---
id: 1766
title: '#UVa：12405－Scarecrow'
slug: uva：12405－scarecrow
date: '2012-07-15T22:02:13+08:00'
lastmod: '2014-12-31T23:23:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2012/07/15/1766/uva%ef%bc%9a12405%ef%bc%8dscarecrow/
wp_status: publish
wp_type: post
---

從最左邊開始找目前最左邊的田地，找到後在其與其+1和其+2三個地區放上一個稻草人來保護，再繼續往下找下一塊田地，直到又遇到田地，就再把其與其+1和其+2三個地區放上一個稻草人來保護，以此類推，即可得知最小需放置之稻草人之數量。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 12405 - Scarecrow                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/15                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  int N;
  int scarecrow;
  string field;
  while( scanf( "%d", &T ) != EOF ){
    for( int i = 1 ; i <= T ; i++ ){
      scanf( "%d", &N );
      getchar();
      getline( cin, field );
      scarecrow = 0;
      for( int j = 0 ; j < field.length() ; j++ ){
        if( field[j] == '.' ){
          scarecrow++;
          if( j+1 < field.length() ) field[j+1] = '#';
          if( j+2 < field.length() ) field[j+2] = '#';
        }
      }
      printf( "Case %d: %d\n", i, scarecrow );
    }
  }
  return 0;
}
```
