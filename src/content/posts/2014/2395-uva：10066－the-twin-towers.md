---
id: 2395
title: '#UVa：10066－The Twin Towers'
slug: uva：10066－the-twin-towers
date: '2014-12-04T11:18:17+08:00'
lastmod: '2014-12-31T23:03:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2014/12/04/2395/uva%ef%bc%9a10066%ef%bc%8dthe-twin-towers/
wp_status: publish
wp_type: post
---

LCS(Longest common subsequence)的問題。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 10066 The Twin Towers                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  int testcase = 1;
  int N1, N2;
  int towers[2][105];
  while( (scanf( "%d%d", &N1, &N2 ) != EOF) && ( N1 != 0 || N2 != 0 ) ){
    for( int i = 1 ; i <= N1 ; ++i ){
      scanf("%d", &towers[0][i]);
    }
    for( int i = 1 ; i <= N2 ; ++i ){
      scanf("%d", &towers[1][i]);
    }

    int LCS[105][105] = {0};
    for( int i = 1 ; i <= N1; ++i ){
      for( int j = 1 ; j <= N2 ; ++j ){
        if( towers[0][i] == towers[1][j] ){
          LCS[i][j] = LCS[i-1][j-1] + 1;
        } 
        else {
          LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1]);
        }
      }
    }

    printf("Twin Towers #%d\n", testcase++);
    printf("Number of Tiles : %d\n\n", LCS[N1][N2]);
  }
  return 0;
}
```
