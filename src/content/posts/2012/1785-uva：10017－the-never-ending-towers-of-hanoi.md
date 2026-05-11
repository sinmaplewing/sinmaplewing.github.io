---
id: 1785
title: '#UVa：10017－The Never Ending Towers of Hanoi'
slug: uva：10017－the-never-ending-towers-of-hanoi
date: '2012-08-01T20:30:55+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/08/01/1785/uva%ef%bc%9a10017%ef%bc%8dthe-never-ending-towers-of-hanoi/
wp_status: publish
wp_type: post
---

利用遞迴的方式，將其堆上n-1個盤子先搬到暫時放置的那堆，再將最底下的盤子搬到要放置的那堆上，再將剛剛放在暫時放置的那n-1個放在要放置的那堆的那個盤子上。

寫遞迴式為`hanoi(n,start,end,temp)`：假設要將A的放到C，那麼暫時放置的那堆就是B，遞迴式：`hanoi(n,A,C,B)`。則執行時就為`hanoi(n-1,A,B,C)`=>直接A搬到C=>`hanoi(n-1,B,C,A)`。大概就是這個樣子。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 10017 The Never Ending Towers of Hanoi          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/08/01                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<vector>
using namespace std;

int m;
vector<int> A, B, C;

void print_hanoi(){
  printf( "A=>" );
  if( A.size() ){
    printf( " " );
    for( int i = 0 ; i < A.size() ; i++ )
      printf( " %d", A[i] );
  }
  printf( "\n" );

  printf( "B=>" );
  if( B.size() ){
    printf( " " );
    for( int i = 0 ; i < B.size() ; i++ )
      printf( " %d", B[i] );
  }
  printf( "\n" );

  printf( "C=>" );
  if( C.size() ){
    printf( " " );
    for( int i = 0 ; i < C.size() ; i++ )
      printf( " %d", C[i] );
  }
  printf( "\n" );
  printf( "\n" );
}

void hanoi( int n, vector<int> &start, vector<int> &temp, vector<int> &finish ){
  if( m <= 0 ) return;
  if( n == 1 ){
    finish.push_back( start.back() );
    start.pop_back();
    print_hanoi();
    m--;
    return;
  }
  hanoi( n-1, start, finish, temp );
  if( m <= 0 ) return;

  finish.push_back(start.back());
  start.pop_back();
  print_hanoi();
  m--;
  if( m <= 0 ) return;

  hanoi( n-1, temp, start, finish );
}

int main(){
  int n;
  int problem = 1;

  while( scanf( "%d%d", &n, &m ) != EOF && !(n == 0 && m == 0) ){
    printf( "Problem #%d\n\n", problem++ );
    A.clear();
    B.clear();
    C.clear();

    for( int i = n ; i >= 1 ; i-- )
      A.push_back(i);

    print_hanoi();
    hanoi( n, A, B, C );
  }
  return 0;
}
```
