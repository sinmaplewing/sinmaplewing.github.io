---
id: 1782
title: '#UVa：10152－ShellSort'
slug: uva：10152－shellsort
date: '2012-07-22T23:18:07+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/07/22/1782/uva%ef%bc%9a10152%ef%bc%8dshellsort/
wp_status: publish
wp_type: post
---

將original的那疊與required的那疊兩疊從後面去做比對，找到required中的兩項第一次與original中的同樣兩項前後不一致，則從required中該項之前的都得列出來。

**C++(0.116)**
```cpp
/*******************************************************/
/* UVa 10152 ShellSort                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/22                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int K;
  int n, j;
  string original[205], required[205];
  while( scanf( "%d", &K ) != EOF ){
    for( int testcase = 0 ; testcase < K ; testcase++ ){
      scanf( "%d", &n );
      getchar();
      for( int i = 0 ; i < n ; i++ )
        getline( cin, original[i] );
      for( int i = 0 ; i < n ; i++ )
        getline( cin, required[i] );
      j = n-1;
      for( int i = n-1 ; i >= 0 ; j-- ){
        if( original[i] == required[j] ) i--;
        else if( original[i] != required[j] ){
          while( i >= 0 && original[i] != required[j] ) i--;
          if( i < 0 ) break;
          i--;
        }
      }
      for( ; j >= 0 ; j-- )
        printf( "%s\n", required[j].c_str() );
      printf( "\n" );
    }
  }
  return 0;
}
```
