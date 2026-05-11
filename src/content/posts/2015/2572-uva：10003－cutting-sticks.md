---
id: 2572
title: '#UVa：10003－Cutting Sticks'
slug: uva：10003－cutting-sticks
date: '2015-01-03T21:46:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2015/01/03/2572/uva%ef%bc%9a10003%ef%bc%8dcutting-sticks/
wp_status: publish
wp_type: post
---

DP題，所要求的是0~l區間中切在c[1~n]點上最少的切割成本。原本可以使用`cost(x,y) = min(i = 1~n 且x < c[i] < y){ cost(x,c[i]) + cost(c[i],y) + (y - x) } (0 <= x,y <= l)`來求，但其實切點的個數比長度還少，所以可以用切點的個數來算，這樣記錄用的陣列就可以小一點，為此必須將上述公式換成`cost(x,y) = min(i = x+1~y-1){ cost(x, i) + cost(i, y) + (c[y] - c[x]) } (0 <= x, y <= n+1, c[0] = 0, c[n+1] = l)`這樣來算。

**C++(0.362)**
```cpp
/*******************************************************/
/* UVa 10003 Cutting Sticks                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
using namespace std;

const int MAXN = 50;

int minCutCost(int dp[][MAXN+5], int c[], int l, int u){
  if( dp[l][u] != -1 ) return dp[l][u];
  if( l == u-1 ) return dp[l][u] = 0;
  
  dp[l][u] = INT_MAX;
  for( int i = l + 1 ; i < u ; ++i ){
    dp[l][u] = min( dp[l][u], minCutCost(dp, c, l, i) + 
                              minCutCost(dp, c, i, u) + ( c[u] - c[l] ));
  }

  return dp[l][u];

}

int main(){
  int l;
  while( scanf("%d", &l) != EOF && l != 0 ){
    int n;
    scanf("%d", &n);

    int c[MAXN+5] = {0};
    c[0] = 0; 
    for( int i = 1 ; i <= n ; ++i ){
      scanf("%d", &c[i]);
    }
    c[n+1] = l;

    int dp[MAXN+5][MAXN+5];
    for( int i = 0 ; i <= n+1 ; ++i ){
      for( int j = 0 ; j <= n+1 ; ++j ){
        dp[i][j] = -1;
      }
    }

    printf( "The minimum cutting is %d.\n", minCutCost(dp, c, 0, n+1) ); 

  }

  return 0;
}
```

