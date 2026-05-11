---
id: 2208
title: '#UVa：291－The House Of Santa Claus'
slug: uva：291－the-house-of-santa-claus
date: '2014-09-30T17:03:12+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2014/09/30/2208/uva%ef%bc%9a291%ef%bc%8dthe-house-of-santa-claus/
wp_status: publish
wp_type: post
---

利用backtracking把所有解跑一遍並輸出出來即可。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 291 The House Of Santa Claus                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

void backtracking( bool house[][6], int nowPoint, int path[], int pathsize ){
  path[pathsize] = nowPoint;

  if( pathsize == 8 ){
    for( int i = 0 ; i <= pathsize ; ++i ){
      printf( "%d", path[i] );
    }
    printf("\n");
    return;
  }
  
  for( int i = 1 ; i <= 5 ; ++i ){
    if( house[nowPoint][i] ){
      house[nowPoint][i] = house[i][nowPoint] = false;
      backtracking( house, i, path, pathsize + 1);
      house[nowPoint][i] = house[i][nowPoint] = true;
    }
  }
}

int main(){

  bool house[6][6] = {0};
  house[1][2] = house[2][1] = true;
  house[1][3] = house[3][1] = true;
  house[1][5] = house[5][1] = true;
  house[2][3] = house[3][2] = true;
  house[2][5] = house[5][2] = true;
  house[3][4] = house[4][3] = true;
  house[3][5] = house[5][3] = true;
  house[4][5] = house[5][4] = true;

  int path[10] = {0};
  backtracking( house, 1, path, 0 );
  return 0;
}
```
