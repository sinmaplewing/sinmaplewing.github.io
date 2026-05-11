---
id: 1975
title: '#UVa：275－Expanding Fractions'
slug: uva：275－expanding-fractions
date: '2012-10-21T01:00:51+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/10/21/1975/uva%ef%bc%9a275%ef%bc%8dexpanding-fractions/
wp_status: publish
wp_type: post
---

一位一位開始除，並注意餘數是否曾經出現過，若有出現過則表示是循環小數，長度為目前位數-當初出現的位數-1。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 275 Expanding Fractions                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/21                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, m;
  int visited[1005];
  string output;
  while( scanf( "%d%d", &n, &m ) != EOF && ( n != 0 || m != 0 ) ){
    fill( visited, visited+1005, -1 );
    output = ".";
    visited[n] = 0;
    while( n ){
      n *= 10;
      output += (n/m)+'0';
      n %= m;
      if( visited[n%m] != -1 ) break;
      visited[n] = output.length()-1;
    }

    for( int i = 0 ; i < output.length() ; i++ ){
      if( i && !(i % 50) ) printf( "\n" );
      printf( "%c", output[i] );
    }
    printf( "\n" );
    if( n ) printf( "The last %d digits repeat forever.\n\n", output.length()-visited[n%m]-1 );
    else printf( "This expansion terminates.\n\n" );
  }
  return 0;
}
```
