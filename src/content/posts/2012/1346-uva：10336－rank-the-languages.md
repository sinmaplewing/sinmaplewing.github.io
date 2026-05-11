---
id: 1346
title: '#UVa：10336－Rank the Languages'
slug: uva：10336－rank-the-languages
date: '2012-01-18T10:46:57+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2012/01/18/1346/uva%ef%bc%9a10336%ef%bc%8drank-the-languages/
wp_status: publish
wp_type: post
---

利用BFS或是DFS把每塊區塊都找出來即可。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10336 Rank the Languages                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

char map[1000][1000] = {0};
bool visited[1000][1000] = {0};

void DFS( int, int );

int main(){
  int N, H, W, maxarea;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 1 ; i <= N ; i++ ){
      scanf( "%d%d", &H, &W );
      getchar();
      memset( visited, 0, sizeof(visited) );
      int letters[30] = {0};
      maxarea = 0;
      for( int j = 1 ; j <= H ; j++ ){
        for( int k = 1 ; k <= W ; k++ )
          scanf( "%c", &map[j][k] );
        getchar();
      }
      for( int j = 1 ; j <= H ; j++ )
        for( int k = 1 ; k <= W ; k++ ){
          if( !visited[j][k] ){
            maxarea = max( ++letters[map[j][k]-'a'], maxarea );
            DFS( j, k );
          }
        }
      printf( "World #%d\n", i );
      for( int j = maxarea ; j >= 1 ; j-- )
        for( int k = 0 ; k < 26 ; k++ )
          if( letters[k] == j )
            printf( "%c: %d\n", 'a'+k, j );
    }
  }
  return 0;
}

void DFS( int x, int y ){
  visited[x][y] = 1;
  if( map[x+1][y] == map[x][y] && !visited[x+1][y] ) DFS(x+1,y);
  if( map[x-1][y] == map[x][y] && !visited[x-1][y] ) DFS(x-1,y);
  if( map[x][y+1] == map[x][y] && !visited[x][y+1] ) DFS(x,y+1);
  if( map[x][y-1] == map[x][y] && !visited[x][y-1] ) DFS(x,y-1);
}
```
