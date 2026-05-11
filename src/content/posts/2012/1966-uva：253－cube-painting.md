---
id: 1966
title: '#UVa：253－Cube painting'
slug: uva：253－cube-painting
date: '2012-10-20T23:53:50+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/10/20/1966/uva%ef%bc%9a253%ef%bc%8dcube-painting/
wp_status: publish
wp_type: post
---

要檢驗兩個正方體的塗色是否相同，就檢查兩個正方體的三組對面(1-6,2-5,3-4)是否能夠根據交換順序(每一組對面內的兩個顏色可互換，三組對面的順序可交換)來達成相同的結果，即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 253 Cube painting                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string input;
  string cube[2];
  bool used[3];
  while( getline( cin, input ) ){
    cube[0] = input.substr( 0, 6 );
    cube[1] = input.substr( 6, 6 );

    fill( used, used+3, false ); 
    for( int i = 0 ; i < 3 ; i++ ){
      for( int j = 0 ; j < 3 ; j++ ){
        if( !used[j] && 
            ((cube[1][j] == cube[0][i] && cube[1][5-j] == cube[0][5-i]) ||
              cube[1][5-j] == cube[0][i] && cube[1][j] == cube[0][5-i]) ){
          used[j] = true;
          break;
        }
      }
    }

    if( used[0] && used[1] && used[2] ) printf( "TRUE\n" );
    else printf( "FALSE\n" );
  }
  return 0;
}
```
