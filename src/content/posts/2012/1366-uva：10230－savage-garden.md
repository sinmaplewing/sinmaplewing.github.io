---
id: 1366
title: '#UVa：10230－Savage Garden'
slug: uva：10230－savage-garden
date: '2012-01-19T01:55:21+08:00'
lastmod: '2014-12-31T23:06:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2012/01/19/1366/uva%ef%bc%9a10230%ef%bc%8dsavage-garden/
wp_status: publish
wp_type: post
---

很典型的用Divide&Conquer填L-shaped方塊的問題。

P.S.要注意的是字母鄰居與鄰居之間不能重複，解決方法可以用：左上角剩餘的放'a'，左下角剩餘的放'b'，右上角剩餘的放'c'，右下角剩餘的放'd'，然後左上角和右下角中間的放'e'，左下角和右上角中間的放'f'。

當然還有其他解決方法，可以自己想想看喔！XD

**C++(0.132)**
```cpp
/*******************************************************/
/* UVa 10230 Savage Garden                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 10e-9
using namespace std;

void lshaped( char[][1030] , int, int, int, int, int, char );

int main(){
  int N, X, Y, size;
  char garden[1030][1030] = {0};
  while( scanf( "%d%d%d", &N, &X, &Y ) != EOF ){
    garden[X][Y] = '*';
    lshaped( garden, N, 1, 1, X, Y, 'a');
    size = (int)(pow( 2.0, (double)N ) + ERROR);
    for( int i = 1 ; i <= size ; i++ ){
      for( int j = 1 ; j <= size ; j++ )
        printf( "%c", garden[j][i] );
      printf( "\n" );
    }
    printf( "\n" );
  }
  return 0;
}

void lshaped( char garden[][1030], int N, int startx, int starty, int X, int Y, char c ){
  int size = (int)(pow( 2.0, (double)N )+ERROR);
  if( N == 1 ){
    for( int i = 0; i < size ; i++ )
      for( int j = 0; j < size ; j++ )
        if( startx+i != X || starty+j != Y )
          garden[startx+i][starty+j] = c;
        return;
  }
  int d1x = startx, d2x = startx+size/2;
  int d1y = starty, d2y = starty+size/2;
  if( X >= d1x && X < d2x ){
    if( Y >= d1y && Y < d2y ){
      garden[d2x-1][d2y] = 'e';
      garden[d2x][d2y-1] = 'e';
      garden[d2x][d2y] = 'e';
      lshaped( garden, N-1, d1x, d1y, X, Y, 'a' );
      lshaped( garden, N-1, d1x, d2y, d2x-1, d2y, 'b' );
      lshaped( garden, N-1, d2x, d1y, d2x, d2y-1, 'c' );
      lshaped( garden, N-1, d2x, d2y, d2x, d2y, 'd' );
    }
    else{
      garden[d2x-1][d2y-1] = 'f';
      garden[d2x][d2y-1] = 'f';
      garden[d2x][d2y] = 'f';
      lshaped( garden, N-1, d1x, d1y, d2x-1, d2y-1, 'a' );
      lshaped( garden, N-1, d1x, d2y, X, Y, 'b' );
      lshaped( garden, N-1, d2x, d1y, d2x, d2y-1, 'c' );
      lshaped( garden, N-1, d2x, d2y, d2x, d2y, 'd' );
    }
  }
  else{
    if( Y >= d1y && Y < d2y ){
      garden[d2x-1][d2y-1] = 'f';
      garden[d2x-1][d2y] = 'f';
      garden[d2x][d2y] = 'f';
      lshaped( garden, N-1, d1x, d1y, d2x-1, d2y-1, 'a');
      lshaped( garden, N-1, d1x, d2y, d2x-1, d2y, 'b' );
      lshaped( garden, N-1, d2x, d1y, X, Y, 'c' );
      lshaped( garden, N-1, d2x, d2y, d2x, d2y, 'd' );
    }
    else{
      garden[d2x-1][d2y-1] = 'e';
      garden[d2x-1][d2y] = 'e';
      garden[d2x][d2y-1] = 'e';
      lshaped( garden, N-1, d1x, d1y, d2x-1, d2y-1, 'a' );
      lshaped( garden, N-1, d1x, d2y, d2x-1, d2y, 'b' );
      lshaped( garden, N-1, d2x, d1y, d2x, d2y-1, 'c' );
      lshaped( garden, N-1, d2x, d2y, X, Y, 'd' );
    }
  }
}
```
