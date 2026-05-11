---
id: 1358
title: '#UVa：11038－How Many O''s?'
slug: uva：11038－how-many-os
date: '2012-01-18T23:53:19+08:00'
lastmod: '2014-12-31T23:16:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 110
- UVa
permalink: /2012/01/18/1358/uva%ef%bc%9a11038%ef%bc%8dhow-many-os/
wp_status: publish
wp_type: post
---

令f(x)為求0~x之間0的個數有多少，即可將題目換化成[m,n]之間0的個數=f(n)-f(m-1)。接著就來思考該如何解決0~x之間0的個數的問題，我們將x分為各個位數去用排列組合的方式算其出現0的個數，並假設x的第k位數為xk。若xk不等於0的話，x的第k位數出現0的情況就會是(比xk高位的數字)\*10^k。而xk等於0的話，x的第k位數出現0的情況就會是(比xk高位的數字-1)\*10^k + (比xk低位的數字+1)。把每個位數依照上述公式算出並加總，再加上會忽略掉的0即是f(x)的答案。這樣即可得解。

Ex.32053

* 個位數會出現0的情況(不包含0)=3205\*10^0=3205 (Ex. 1**0**、2**0**、3**0**、......、3204**0**、3205**0**)
* 十位數會出現0的情況=320\*10^1=3200 (Ex. 1**0**0~1**0**9、2**0**0~2**0**9、3**0**0~3**0**9、......、319**0**0~319**0**9、320**0**0~320**0**9)
* 百位數會出現0的情況=(32-1)\*10^2+(53+1)=3100+54=3154 (Ex. 1**0**00~1**0**99、2**0**00~2099、3**0**00~3**0**99、......、31**0**00~31**0**99、32**0**00~32**0**53)
* 千位數會出現0的情況=3\*10^3=3000 (Ex. 1**0**000~1**0**999、2**0**000~2**0**999、3**0**000~3**0**999)

總和=個位數會出現0的情況(不包含0)+十位數會出現0的情況+百位數會出現0的情況+千位數會出現0的情況+是0的情況=3205+3200+3154+3000+1=12560

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
