---
id: 1581
title: '#UVa：445－Marvelous Mazes'
slug: uva：445－marvelous-mazes
date: '2012-03-30T23:30:32+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/03/30/1581/uva%ef%bc%9a445%ef%bc%8dmarvelous-mazes/
wp_status: publish
wp_type: post
---

解讀輸入的字元代表的是什麼意思，在照意思輸出即可。

P.S. 數字的輸入若有兩位數以上，並不是指其數字值，而是各位數相加的值。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 445 Marvelous Mazes                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/30                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;

int main(){
  char s;
  int times = 0;

  while( ( s = getchar() ) != EOF ){
    if( isdigit(s) )
      times += (int)(s-'0');
    else if( s == '!' )
      printf( "\n" );
    else if( s == 'b' ){
      while( times-- ) printf( " " );
      ++times;
    }
    else if( isgraph(s) ){
      while( times-- ) printf( "%c", s );
      ++times;
    }
    else if( s == '\n' )
      printf( "\n" );
  }
  return 0;
}
```
