---
id: 1352
title: '#UVa：750－8 Queens Chess Problem'
slug: uva：750－8-queens-chess-problem
date: '2012-01-18T16:41:45+08:00'
lastmod: '2014-12-31T22:53:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2012/01/18/1352/uva%ef%bc%9a750%ef%bc%8d8-queens-chess-problem/
wp_status: publish
wp_type: post
---

8皇后問題，利用backtracking得解。

P.S. 要輸出的是COLUMN多少的時候ROW的值，注意不要相反了！

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 750 8 Queens Chess Problem                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int n;
void backtracking( int, int*, int*, int*, int*, int* );
int main(){
  int N;
  int row, col, array[8];
  bool blank_line;
  while( scanf( "%d", &N ) != EOF ){
    blank_line = 0;
    for( int i = 0 ; i < N ; i++ ){
      scanf( "%d%d", &row, &col );
      row--, col--;
      if( blank_line ) printf( "\n" );
      printf( "SOLN COLUMN\n" );
      printf( " # 1 2 3 4 5 6 7 8\n" );
      printf( "\n" );
      blank_line = 1;
      int rowput[8] = {0}, colput[8] = {0}, leftslash[15] = {0}, rightslash[15] = {0};
      rowput[row] = 1;
      colput[col] = 1;
      leftslash[row+col] = 1;
      rightslash[row-col+7] = 1;
      n = 0;
      array[col] = row;
      backtracking( 0, array, rowput, colput, leftslash, rightslash );
    }
  }
  return 0;
}

void backtracking( int i, int array[], int rowput[], int colput[], int leftslash[] , int rightslash[] ){
  if( i == 8 ){
    printf( "%2d ", ++n );
    for( int j = 0 ; j < 8 ; j++ ){
      if( j ) printf( " " );
      printf( "%d", array[j]+1 );
    }
    printf( "\n" );
    return;
  }
  if( colput[i] ){
    backtracking( i+1, array, rowput, colput, leftslash, rightslash );
    return;
  }
  for( int j = 0 ; j < 8 ; j++ ){
    if( rowput[j] || leftslash[j+i] || rightslash[j-i+7] )
      continue;
    rowput[j] = 1;
    leftslash[i+j] = 1;
    rightslash[j-i+7] = 1;
    array[i] = j;
    backtracking( i+1, array, rowput, colput, leftslash, rightslash );
    rowput[j] = 0;
    leftslash[i+j] = 0;
    rightslash[j-i+7] = 0;
  }
}
```
