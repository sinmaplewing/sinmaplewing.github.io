---
id: 1987
title: '#UVa：10267－Graphical Editor'
slug: uva：10267－graphical-editor
date: '2012-11-10T10:40:06+08:00'
lastmod: '2014-12-31T23:06:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2012/11/10/1987/uva%ef%bc%9a10267%ef%bc%8dgraphical-editor/
wp_status: publish
wp_type: post
---

照著題目要求去對二維字元陣列做處理即可，此題有兩點需要注意：

1. V與H當中的X1,X2以及Y1,Y2，並不一定是第一個小於第二個，有可能會是第二個小於第一個，要注意。
2. 做DFS(或BFS)去填滿顏色時，若要填滿的顏色與該點已經填上的顏色一樣時，即可不用去做DFS(或BFS)了，做了可能會炸掉。

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 10267 Graphical Editor                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
using namespace std;

struct Graph{
  
  Graph(){ fill( *content, (*content)+255*255, 'O' ); }

  char content[255][255];
  int M;
  int N;
};

void fill_color( Graph& graph, char C, int x, int y, int w, int h ){
  for( int i = y ; i < y+h ; i++ )
    for( int j = x ; j < x+w ; j++ )
      graph.content[i][j] = C;
}

void fill_DFS_color( Graph& graph, char C, int x, int y, char R ){
  if( C == R ) return; 
  graph.content[y][x] = C;

  if( x+1 <= graph.M && graph.content[y][x+1] == R ) fill_DFS_color( graph, C, x+1 , y, R );
  if( x-1 >= 1 && graph.content[y][x-1] == R ) fill_DFS_color( graph, C, x-1 , y, R );
  if( y+1 <= graph.N && graph.content[y+1][x] == R ) fill_DFS_color( graph, C, x , y+1, R );
  if( y-1 >= 1 && graph.content[y-1][x] == R ) fill_DFS_color( graph, C, x , y-1, R ); 
}

int main(){
  char trash[100];
  char command;
  int X1, X2, Y1, Y2;
  char C;
  string name;
  Graph now_graph;

  while( scanf( "%c", &command ) && command != 'X'){
    switch( command ){
      case 'I':
        scanf( "%d%d", &(now_graph.M), &(now_graph.N) );
        // pass through
      case 'C':
        fill_color( now_graph, 'O', 1, 1, now_graph.M, now_graph.N );
        break;
      case 'L':
        scanf( "%d %d %c", &X1, &Y1, &C );
        fill_color( now_graph, C, X1, Y1, 1, 1 );
        break;
      case 'V':
        scanf( "%d %d %d %c", &X1, &Y1, &Y2, &C );
        fill_color( now_graph, C, X1, min(Y1, Y2), 1, abs(Y2-Y1)+1 );
        break;
      case 'H':
        scanf( "%d %d %d %c", &X1, &X2, &Y1, &C );
        fill_color( now_graph, C, min(X1, X2), Y1, abs(X2-X1)+1, 1 );
        break;
      case 'K':
        scanf( "%d %d %d %d %c", &X1, &Y1, &X2, &Y2, &C );
        fill_color( now_graph, C, X1, Y1, X2-X1+1, Y2-Y1+1 );
        break;
      case 'F':
        scanf( "%d %d %c", &X1, &Y1, &C );
        fill_DFS_color( now_graph, C, X1, Y1, now_graph.content[Y1][X1] );
        break;
      case 'S':
        cin >> name;
        printf( "%s\n", name.c_str() );
        for( int i = 1 ; i <= now_graph.N ; i++ ){
          for( int j = 1 ; j <= now_graph.M ; j++ )
            printf( "%c", now_graph.content[i][j] );
          printf( "\n" );
        }
        break;
      default:
        break;
    }
    gets(trash);
  }
  return 0;
}
```
