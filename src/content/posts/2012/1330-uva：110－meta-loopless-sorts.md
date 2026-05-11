---
id: 1330
title: '#UVa：110－Meta-Loopless Sorts'
slug: uva：110－meta-loopless-sorts
date: '2012-01-17T17:09:38+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/01/17/1330/uva%ef%bc%9a110%ef%bc%8dmeta-loopless-sorts/
wp_status: publish
wp_type: post
---

這題還蠻麻煩的，但是要如何做這個排序法的方法其實還蠻好玩的XD

首先假設我"排好的"數列為 x1,x2,x3,x4....xn，今天我要加入一個數字x(n+1)，我就檢查 x(n+1)有沒有大於 xn，如果有，我就知道x(n+1)放在xn後面，如果沒有，我再檢查x(n+1)有沒有大於x(n-1)，如果有，我就知道x(n+1)放在x(n-1)和xn中間，如果沒有，我就再檢查x(n+1)有沒有大於x(n-2)，以此類推，直到檢查到x1的時候，如果x(n+1)大於x1，就放在x1和x2中間，如果x(n+1)小於x1，就放在x1前面。

就這樣利用遞迴把所有值都丟進去就結束了！

**C++(0.100)**
```cpp
/*******************************************************/
/* UVa 110 Meta-Loopless Sorts                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

void condition( int, int, int* );
int main(){
  int M, n, blankline = 0;
  bool comma;
  while( scanf( "%d", &M ) != EOF ){
    for( int i = 0 ; i < M ; i++ ){
      scanf( "%d", &n );

      if( blankline ) printf( "\n" );
      blankline = 1;
      printf( "program sort(input,output);\n" );
      printf( "var\n" );
      comma = 0;
      for( int j = 0 ; j < n ; j++ ){
        if( comma ) printf( "," );
        printf( "%c", 'a'+j );
        comma = 1;
      }
      printf( " : integer;\n" );
      printf( "begin\n" );
      printf( " readln(" );
      comma = 0;
      for( int j = 0 ; j < n ; j++ ){
        if( comma ) printf( "," );
        printf( "%c", 'a'+j );
        comma = 1;
      }
      printf( ");\n" );
      int array[10] = {0};
      condition( 1, n, array );
      printf( "end.\n");
    }
  }
  return 0;
}

void condition( int i, int n, int array[] ){
  if( i > n ) return;
  if( i == n ){
    for( int j = 0 ; j < i ; j++ )
      printf( " " );
    printf( "writeln(" );
    bool comma = 0;
    for( int j = 0 ; j < n ; j++ ){
      if( comma ) printf( "," );
      printf( "%c", 'a'+array[j] );
      comma = 1;
    }
    printf( ")\n" );
    return;
  }
  for( int j = i ; j >= 0 ; j-- ){
    for( int k = 0 ; k < i ; k++ )
      printf( " " );
    if( j == i ) printf( "if %c < %c then\n", 'a'+array[j-1], 'a'+i );
    else if( !j ) printf( "else\n");
    else printf( "else if %c < %c then\n", 'a'+array[j-1], 'a'+i );
    int newarray[10] = {0};
    for( int k = 0 ; k < j ; k++ )
      newarray[k] = array[k];
    newarray[j] = i;
    for( int k = j+1 ; k <= i ; k++ )
      newarray[k] = array[k-1];
    condition( i+1, n, newarray );
  }
} 
```
