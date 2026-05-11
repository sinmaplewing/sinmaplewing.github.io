---
id: 1921
title: '#UVa：11541－Decoding'
slug: uva：11541－decoding
date: '2012-09-19T20:33:55+08:00'
lastmod: '2014-12-31T23:21:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2012/09/19/1921/uva%ef%bc%9a11541%ef%bc%8ddecoding/
wp_status: publish
wp_type: post
---

照題目的意思解碼即可。要小心得分開數字和英文字母喔！

P.S. 數字會有2位數以上。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11541 Decoding                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  char letter;
  int num;
  while( scanf( "%d", &T ) != EOF ){
    getchar();
    for( int i = 1 ; i <= T ; i++ ){
      printf( "Case %d: ", i );
      while( letter = getchar() ){
        if( letter == '\n' ){
          printf( "\n" );
          break;
        }
        scanf( "%d", &num );
        for( int j = 0 ; j < num ; j++ )
          printf( "%c", letter );
      }
    }
  }
  return 0;
}
```
