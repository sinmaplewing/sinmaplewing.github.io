---
id: 2287
title: '#UVa：10048－Audiophobia'
slug: uva：10048－audiophobia
date: '2014-10-12T03:12:21+08:00'
lastmod: '2014-12-31T23:03:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2014/10/12/2287/uva%ef%bc%9a10048%ef%bc%8daudiophobia/
wp_status: publish
wp_type: post
---

使用Floyd-Warshall演算法，改掉其更新最短路徑的部分變成更新題目所要求的大小。

**C++(0.025)**
```cpp
/*******************************************************/
/* UVa 10048 Audiophobia                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
using namespace std;

int main(){
  int C, S, Q;
  int testcase = 1;
  while( scanf("%d%d%d", &C, &S, &Q) != EOF &&
       C != 0 && S != 0 && Q != 0 ){
    
    int path[105][105] = {0};
    for( int i = 1 ; i <= C ; ++i ){
      for( int j = 1 ; j <= C ; ++j ){
        path[i][j] = INT_MAX;
      }
    }

    int c1, c2, d;
    for( int i = 0 ; i < S ; ++i ){
      scanf("%d%d%d", &c1, &c2, &d);
      path[c1][c2] = d;
      path[c2][c1] = d;
    }

    for( int k = 1 ; k <= C ; ++k ){
      for( int i = 1 ; i <= C ; ++i ){
        for( int j = 1 ; j <= C ; ++j ){
          path[i][j] = min(path[i][j], max(path[i][k], path[j][k]));
        }
      }
    }

    if( testcase > 1 ) printf("\n");
    printf("Case #%d\n", testcase++);
    for( int i = 0 ; i < Q ; ++i ){
      scanf("%d%d", &c1, &c2);

      /* c1 != c2, based on problem statements */ 
      if( path[c1][c2] != INT_MAX ) printf("%d\n", path[c1][c2]);
      else printf("no path\n");
    }
  }
  return 0;
}
```
