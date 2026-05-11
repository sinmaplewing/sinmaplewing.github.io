---
id: 1498
title: '#UVa：10004－Bicoloring'
slug: uva：10004－bicoloring
date: '2012-03-17T12:00:10+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/17/1498/uva%ef%bc%9a10004%ef%bc%8dbicoloring/
wp_status: publish
wp_type: post
---

利用DFS塗塗看，如果兩種顏色交替塗不會使相鄰兩點顏色相同即OK，反之則反。

另外，題外話，根據離散數學的定理，只要沒有長度為奇數的環路，若且唯若此圖可以用兩種顏色完成著色。

**C++(0.032)**
```cpp
/*******************************************************/
/* UVa 10004 Bicoloring                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

bool edge[205][205];

bool DFS( int point[], int i, int n, int color ){
  int change_color = color ^ 3;
  bool answer = true;

  if( point[i] ){
    if( point[i] != color ) return false;
    if( point[i] == color ) return true;
  }

  point[i] = color;


  for( int j = i+1 ; j < n ; j++ )
    if( edge[i][j] )
      answer &= DFS( point, j, n, change_color );

  return answer;
}

int main(){
  int n, l, n1, n2;
  int point[205];

  while( scanf( "%d", &n ) != EOF && n != 0 ){
    scanf( "%d", &l );
    memset( point, 0, sizeof(point) );
    memset( edge, false, sizeof(edge) );

    for( int i = 0 ; i < l ; i++ ){
      scanf( "%d%d", &n1, &n2 );
      edge[n1][n2] = true;
      edge[n2][n1] = true;
    }

    if( DFS( point, 0, n, 1 ) )
      printf( "BICOLORABLE.\n" );
    else
      printf( "NOT BICOLORABLE.\n" );

  }

  return 0;
}
```
