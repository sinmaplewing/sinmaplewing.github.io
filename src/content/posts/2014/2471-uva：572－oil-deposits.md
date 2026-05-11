---
id: 2471
title: '#UVa：572－Oil Deposits'
slug: uva：572－oil-deposits
date: '2014-12-29T16:25:44+08:00'
lastmod: '2014-12-31T22:49:58+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2014/12/29/2471/uva%ef%bc%9a572%ef%bc%8doil-deposits/
wp_status: publish
wp_type: post
---

在計算的時候利用標記將相鄰的地方全部標示起來即可正確計算其數量。

**C++(0.026)**
```cpp
/*******************************************************/
/* UVa 572 Oil Deposits                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAX_MAP_LIMIT = 100;

void visit(bool isVisited[][MAX_MAP_LIMIT+5], 
           char map[][MAX_MAP_LIMIT+5],
           int i, int j ){
  if( map[i][j] == '@' && !isVisited[i][j] ){
    isVisited[i][j] = true;
    visit( isVisited, map, i-1, j );
    visit( isVisited, map, i+1, j );
    visit( isVisited, map, i, j+1 );
    visit( isVisited, map, i, j-1 );
    visit( isVisited, map, i+1, j-1 );
    visit( isVisited, map, i+1, j+1 );
    visit( isVisited, map, i-1, j-1 );
    visit( isVisited, map, i-1, j+1 );
  }

}

int main(){
  int m, n;
  while( scanf("%d%d", &m, &n) != EOF && m > 0 ){
    char map[MAX_MAP_LIMIT+5][MAX_MAP_LIMIT+5] = {0};
    gets(map[0]); // for '\n'
    for( int i = 1 ; i <= m ; ++i ){
      gets(map[i]+1);
    }

    bool isVisited[MAX_MAP_LIMIT+5][MAX_MAP_LIMIT+5] = {0};
    int oilCount = 0;
    for( int i = 1 ; i <= m ; ++i ){
      for( int j = 1 ; j <= n ; ++j ){
        if( map[i][j] == '@' && !isVisited[i][j] ){
          ++oilCount;
          visit( isVisited, map, i, j );
        }
      }
    }

    printf("%d\n", oilCount);
  }
  return 0;
}
```
