---
id: 1349
title: '#UVa：439－Knight Moves'
slug: uva：439－knight-moves
date: '2012-01-18T15:34:05+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/01/18/1349/uva%ef%bc%9a439%ef%bc%8dknight-moves/
wp_status: publish
wp_type: post
---

利用BFS找出最佳解即可。

P.S. 騎士的走法：(1,2),(1,-2),(-1,2),(-1,-2),(2,1),(2,-1),(-2,1),(-2,-1)

**C++(0.388)**
```cpp
/*******************************************************/
/* UVa 439 Knight Moves                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<queue>
#include<map>
using namespace std;

struct Position{
  string s;
  int step;
};

bool check( Position );
Position next_position( Position, int, int );

int main(){
  Position start, end, front, temp;
  queue<Position> BFS;
  map<string,bool> visited;
  bool find;
  const int offset[8][2] = { {1,2}, {1,-2}, {-1,2}, {-1,-2}, {2,1}, {2,-1}, {-2,1}, {-2,-1} };
  while( cin >> start.s >> end.s ){

    if( start.s == end.s ){
      printf( "To get from %s to %s takes 0 knight moves.\n", start.s.c_str(), end.s.c_str() );
      continue;
    }

    while( !BFS.empty() ) BFS.pop();
    visited.clear();
    find = 0;
    start.step = 0;
    BFS.push(start);

    do{
      front = BFS.front();
      for( int i = 0 ; i < 8 ; i++ ){
        temp = next_position( front, offset[i][0], offset[i][1] );
        if( check(temp) && !visited[temp.s] ){
          if( temp.s == end.s ){
            find = 1;
            break;
          }
          BFS.push(temp);
          visited[temp.s] = true;
        }
      }
      BFS.pop();
    } while( !find );
    printf( "To get from %s to %s takes %d knight moves.\n", start.s.c_str(), end.s.c_str(), temp.step );
  }
  return 0;
}

bool check( Position p ){
  if( p.s[0] > 'h' || p.s[0] < 'a' )
    return false;
  if( p.s[1] > '8' || p.s[1] < '1' )
    return false;
  return true;
}

Position next_position( Position p, int x, int y ){
  Position ret;
  ret.s = "";
  ret.s += (char)(p.s[0]+x);
  ret.s += (char)(p.s[1]+y);
  ret.step = p.step+1;
  return ret;
}
```
