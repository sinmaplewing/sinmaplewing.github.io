---
id: 2204
title: '#UVa：116－Unidirectional TSP'
slug: uva：116－unidirectional-tsp
date: '2014-09-30T10:58:38+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2014/09/30/2204/uva%ef%bc%9a116%ef%bc%8dunidirectional-tsp/
wp_status: publish
wp_type: post
---

利用DP去紀錄一層一層每一列的最短路徑該往哪走即可得解。

**C++(0.135)**
```cpp
/*******************************************************/
/* UVa 116 Unidirectional TSP                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
using namespace std;

int main(){
  int m, n;
  while( scanf("%d%d", &m, &n) != EOF ){
    int weight[105][105] = {0}, dp[105][105] = {0}, path[105][105] = {0};
    for( int i = 0 ; i < m ; ++i ){
      for( int j = 0 ; j < n ; ++j ){
        scanf("%d", &weight[i][j]);
        dp[i][j] = weight[i][j];
      }
    }

    for( int j = n-2 ; j >= 0 ; --j ){
      for( int i = 0 ; i < m ; ++i ){
        int up, middle, down;
        up = weight[i][j] + dp[(i-1+m)%m][j+1];
        middle = weight[i][j] + dp[i][j+1];
        down = weight[i][j] + dp[(i+1)%m][j+1];

        path[i][j] = INT_MAX;
        if( up <= middle && up <= down ){
          dp[i][j] = up;
          path[i][j] = min( path[i][j], (i-1+m)%m );
        }
        if( middle <= up && middle <= down ){
          dp[i][j] = middle;
          path[i][j] = min( path[i][j], i );
        }
        if( down <= up && down <= middle ){
          dp[i][j] = down;
          path[i][j] = min( path[i][j], (i+1)%m );
        }
      }
    }

    int minPath = INT_MAX, mini = -1; 
    for( int i = 0 ; i < m ; ++i ){
      if( dp[i][0] < minPath ){
        minPath = dp[i][0];
        mini = i;
      }
    }

    int next = mini;
    printf("%d", mini+1);
    for( int i = 0 ; i < n-1 ; ++i ){
      printf(" %d", path[next][i]+1);
      next = path[next][i];
    }
    printf("\n%d\n", dp[mini][0]);
  }
  return 0;
}
```
