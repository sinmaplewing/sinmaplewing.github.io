---
id: 1572
title: '#UVa：118－Mutant Flatworld Explorers'
slug: uva：118－mutant-flatworld-explorers
date: '2012-03-29T00:33:05+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/29/1572/uva%ef%bc%9a118%ef%bc%8dmutant-flatworld-explorers/
wp_status: publish
wp_type: post
---

照題目模擬動作，即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 118 Mutant Flatworld Explorers                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<utility>
using namespace std;

int main(){
  pair<int,int> dis[5];
  char dir_print[5] = {'N', 'E', 'S', 'W'};
  int uprightx, uprighty;
  char dc;
  int x, y, d;
  string action;
  bool lost, scent[55][55] = {0};

  dis[0].first = 0, dis[0].second = 1;
  dis[1].first = 1, dis[1].second = 0;
  dis[2].first = 0, dis[2].second = -1;
  dis[3].first = -1, dis[3].second = 0;

  scanf( "%d%d", &uprightx, &uprighty );
  while( scanf( "%d %d %c", &x, &y, &dc ) != EOF ){
    lost = false;
    switch( dc ){
      case 'N': d = 0; break;
      case 'E': d = 1; break;
      case 'S': d = 2; break;
      case 'W': d = 3; break;
    }
    getchar();
    getline( cin, action );
    for( int i = 0 ; i < action.length() && !lost ; i++ ){
      if( action[i] == 'L' ) d = (d-1+4)%4;
      else if( action[i] == 'R' ) d = (d+1)%4;
      else if( action[i] == 'F' ){
        x += dis[d].first;
        y += dis[d].second;
        if( x > uprightx || x < 0 || y > uprighty || y < 0 ){
          x -= dis[d].first;
          y -= dis[d].second;
          if( !scent[x][y] ){
            lost = true;
            scent[x][y] = true;
          }
        }
      }
    }

    printf( "%d %d %c", x, y, dir_print[d] );
    if( lost ) printf( " LOST" );
    printf( "\n" );
  }
  return 0;
}
```
