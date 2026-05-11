---
id: 1458
title: '#UVa：10196－Check The Check'
slug: uva：10196－check-the-check
date: '2012-03-02T21:35:07+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/03/02/1458/uva%ef%bc%9a10196%ef%bc%8dcheck-the-check/
wp_status: publish
wp_type: post
---

照題目所言測試是否我方的King會被對方的旗子吃掉。

P.S.

1. Knight是n,N不是k,K，k,K是King。
2. 注意兩方的Pawn走法不同。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10196 Check The Check                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/09                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;
char kKconv( char c ){
  if( islower(c) ) return 'K';
  else return 'k';
}

void check( char c, bool *black, bool *white ){
  if( islower(c) ) *white = true;
  else *black = true;
}

int main(){
  bool exit = true;
  bool blackcheck = false, whitecheck = false;
  char board[15][15] = {0}, kKchar;
  int gamenum = 1;
  int step;
  while(1){
    for( int i = 2 ; i <= 9 ; i++ ){
      for( int j = 2 ; j <= 9 ; j++ ){
        board[i][j] = getchar();
        if( board[i][j] != '.' )
          exit = false;
      }
      getchar();
    }
    if( exit ) break;
    for( int i = 2 ; i <= 9 ; i++ ){
      for( int j = 2 ; j <= 9 ; j++ ){
        kKchar = kKconv(board[i][j]);
        switch( board[i][j] ){
          case 'p':
          if( board[i+1][j+1] == kKchar ||
            board[i+1][j-1] == kKchar )
            whitecheck = true;
          break;
          case 'P':
          if( board[i-1][j+1] == kKchar ||
            board[i-1][j-1] == kKchar )
            blackcheck = true;
          break;
          case 'n':
          case 'N':
          if( board[i+1][j+2] == kKchar ||
              board[i+1][j-2] == kKchar ||
              board[i-1][j+2] == kKchar ||
              board[i-1][j-2] == kKchar ||
              board[i+2][j+1] == kKchar ||
              board[i+2][j-1] == kKchar ||
              board[i-2][j+1] == kKchar ||
              board[i-2][j-1] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          break;
          case 'r': case 'q':
          case 'R': case 'Q':
          step = 1;
          while( board[i+step][j] == '.' ) step++;
          if( board[i+step][j] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i-step][j] == '.' ) step++;
          if( board[i-step][j] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i][j+step] == '.' ) step++;
          if( board[i][j+step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i][j-step] == '.' ) step++;
          if( board[i][j-step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          if( board[i][j] == 'r' || board[i][j] == 'R' ) break;
          case 'b': case 'B':
          step = 1;
          while( board[i+step][j+step] == '.' ) step++;
          if( board[i+step][j+step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i-step][j+step] == '.' ) step++;
          if( board[i-step][j+step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i+step][j-step] == '.' ) step++;
          if( board[i+step][j-step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          step = 1;
          while( board[i-step][j-step] == '.' ) step++;
          if( board[i-step][j-step] == kKchar )
            check(board[i][j], &blackcheck, &whitecheck );
          break;
        }
        if( blackcheck || whitecheck ) break;
      }
      if( blackcheck || whitecheck ) break;
    }
    printf( "Game #%d: ", gamenum++ );
    if( blackcheck )
      printf( "black king is in check.\n" );
    else if( whitecheck )
      printf( "white king is in check.\n" );
    else
      printf( "no king is in check.\n" );
    blackcheck = false;
    whitecheck = false;
    exit = true;
    getchar();
  }
  return 0;
}
```
