---
id: 2407
title: '#UVa：10285－Longest Run on a Snowboard'
slug: uva：10285－longest-run-on-a-snowboard
date: '2014-12-17T13:14:16+08:00'
lastmod: '2014-12-31T23:06:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2014/12/17/2407/uva%ef%bc%9a10285%ef%bc%8dlongest-run-on-a-snowboard/
wp_status: publish
wp_type: post
---

對於每個點當作起點去做DFS求解，並且計算過程中可以將每個點的最長距離記下來以加快速度，簡而言之就是運用DP的作法。

P.S. 對於DFS，可以在外圍包一圈不可能行走進去的障礙來避免撰寫麻煩的判斷出界的程式碼。

**C++(0.026)**
```cpp
/*******************************************************/
/* UVa 10285 Longest Run on a Snowboard                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

const int HEIGHT_LIMIT = 100;
const int RC_LIMIT = 100;

int computeLongestRun( int longestrun[][RC_LIMIT+5], int map[][RC_LIMIT+5], int row, int col ){
  if( longestrun[row][col] != -1 ) return longestrun[row][col];

  longestrun[row][col] = 1;

  static int direction[4][2] = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };
  for( int i = 0 ; i < 4 ; ++i ){
    if( map[row + direction[i][0]][col + direction[i][1]] < map[row][col] ){
      longestrun[row][col] = max( longestrun[row][col], 
                    1 + computeLongestRun(longestrun, map, 
                                row + direction[i][0],
                                col + direction[i][1]) );
    }
  }

  return longestrun[row][col];
}

int main(){
  int N;
  scanf("%d", &N);

  string cityname;
  int R, C;
  int map[RC_LIMIT+5][RC_LIMIT+5] = {0};
  for( int i = 0 ; i < N ; ++i ){
    cin >> cityname;
    scanf("%d%d", &R, &C);

    int longestrun[RC_LIMIT+5][RC_LIMIT+5] = {0};
    for( int row = 1 ; row <= R ; ++row ){
      for( int col = 1 ; col <= C ; ++col ){
        scanf("%d", &map[row][col]);
        longestrun[row][col] = -1;
      }
      map[row][0] = HEIGHT_LIMIT + 5;
      map[row][C+1] = HEIGHT_LIMIT + 5; 
    }

    for( int col = 0 ; col <= C+1 ; ++col ){
      map[0][col] = HEIGHT_LIMIT + 5;
      map[R+1][col] = HEIGHT_LIMIT + 5;
    }

    int maxLongestRun = 0;
    for( int i = 1 ; i <= R ; ++i ){
      for( int j = 1 ; j <= C ; ++j ){
        maxLongestRun = max( maxLongestRun, computeLongestRun(longestrun, map, i, j ));
      }
    }

    printf("%s: %d\n", cityname.c_str(), maxLongestRun);

  }

  return 0;
}
```
