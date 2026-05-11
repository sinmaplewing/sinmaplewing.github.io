---
id: 1452
title: '#UVa：10189－Minesweeper'
slug: uva：10189－minesweeper
date: '2012-03-02T11:06:26+08:00'
lastmod: '2014-12-31T23:03:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/03/02/1452/uva%ef%bc%9a10189%ef%bc%8dminesweeper/
wp_status: publish
wp_type: post
---

利用二維陣列來做計算。

**C++(6ms, 762KB)**
```cpp
/*******************************************************/
/* UVa 10189 Minesweeper                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#define MAX_N 100
#define MAX_M 100
#define MINE -100 // can't be added to positive number
using namespace std;
int main(){
  int n, m, field_num = 0;
  char square;
  while( scanf( "%d%d", &n, &m ) != EOF
         && !(n == 0 && m == 0) ){
    getchar(); //ignore EOL
    if( field_num ) printf( "\n" );
    int field[MAX_N+5][MAX_M+5] = {0};
    for( int i = 1 ; i <= n ; i++ ){
      for( int j = 1 ; j <= m ; j++ ){
        square = getchar();
        if( square == '*' ){
          field[i][j] = MINE;
          for( int k = -1 ; k <= 1 ; k++ )
            for( int l = -1 ; l <= 1 ;l++ )
              field[i+k][j+l]++;
        }
      }
      getchar(); //ignore EOL
    }
    printf( "Field #%d:\n", ++field_num );
    for( int i = 1 ; i <= n ; i++ ){
      for( int j = 1 ; j <= m ; j++ )
        if( field[i][j] < 0 ) printf( "*" );
        else printf( "%d", field[i][j] );
      printf( "\n" );
    }
  }
  return 0;
}
```
