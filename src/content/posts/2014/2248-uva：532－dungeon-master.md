---
id: 2248
title: '#UVa：532－Dungeon Master'
slug: uva：532－dungeon-master
date: '2014-10-06T17:39:47+08:00'
lastmod: '2014-12-31T22:50:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2014/10/06/2248/uva%ef%bc%9a532%ef%bc%8ddungeon-master/
wp_status: publish
wp_type: post
---

使用BFS即可得解。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 532 Dungeon Master                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <climits>
#include <queue>
using namespace std;

struct Point{
  int l;
  int r;
  int c;
  int value;
  Point(int l, int r, int c, int value):
    l(l), r(r), c(c), value(value) {}
};

int BFS( string map[][35],
         int L, int R, int C,
         int pos_l, int pos_r, int pos_c ){

  queue<Point> BFS_mem;
  BFS_mem.push(Point(pos_l, pos_r, pos_c, 0));
  while( !BFS_mem.empty() ){
    Point p = BFS_mem.front();

    if( p.l < 0 || p.r < 0 || p.c < 0 ||
        p.l >= L || p.r >= R || p.c >= C ){
      BFS_mem.pop();
      continue;
    }

    if( map[p.l][p.r][p.c] == 'E' ){
      return p.value;
    }

    if( map[p.l][p.r][p.c] != '.' ){
      BFS_mem.pop();
      continue;
    }

    map[p.l][p.r][p.c] = '#';
    BFS_mem.push(Point(p.l+1, p.r, p.c, p.value+1));
    BFS_mem.push(Point(p.l-1, p.r, p.c, p.value+1));
    BFS_mem.push(Point(p.l, p.r+1, p.c, p.value+1));
    BFS_mem.push(Point(p.l, p.r-1, p.c, p.value+1));
    BFS_mem.push(Point(p.l, p.r, p.c+1, p.value+1));
    BFS_mem.push(Point(p.l, p.r, p.c-1, p.value+1));

    BFS_mem.pop();
  }

  return -1;
}

int main(){
  int L, R, C;
  while( scanf("%d%d%d", &L, &R, &C) != EOF && 
       L != 0 && R != 0 && C != 0 ){
    string map[35][35];
    int start_pos_l, start_pos_r, start_pos_c;
    for( int i = 0 ; i < L ; ++i ){
      for( int j = 0 ; j < R ; ++j ){
        cin >> map[i][j];
        for( int k = 0 ; k < C ; ++k ){
          if( map[i][j][k] == 'S' ){
            start_pos_l = i;
            start_pos_r = j;
            start_pos_c = k;
            map[i][j][k] = '.';
          }
        }
      }
    }

    int x = BFS(map, L, R, C, start_pos_l, start_pos_r, start_pos_c);
    if( x == -1 ){
      printf("Trapped!\n");
    }
    else{
      printf("Escaped in %d minute(s).\n", x);
    }
  }
  return 0;
}
```
