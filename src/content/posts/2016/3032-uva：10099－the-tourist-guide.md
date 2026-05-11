---
id: 3032
title: '#UVa：10099－The Tourist Guide'
slug: uva：10099－the-tourist-guide
date: '2016-03-17T00:41:25+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2016/03/17/3032/uva%ef%bc%9a10099%ef%bc%8dthe-tourist-guide/
wp_status: publish
wp_type: post
---

利用Floyd-Warshall演算法找出每個點到另外一個點的最大可乘載之容量後，就看以目前的乘客數在此最大可乘載之容量需要幾趟才能全部將乘客送去目的地即可得解。

P.S. 在計算趟數的時候要將可乘載之容量給減掉一位，要將導遊也給考慮進去。

**C++(0.003)**
```cpp
/*******************************************************/
/* UVa 10099 The Tourist Guide                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int scenario = 0;
  int N, R;
  while( scanf("%d%d", &N, &R) != EOF &&
       N != 0 && R != 0 ){
    int capacity[105][105] = {0};
    for( int i = 0 ; i < R ; ++i ){
      int C1, C2, P;
      scanf("%d%d%d", &C1, &C2, &P);
      capacity[C1][C2] = capacity[C2][C1] = P;
    }

    for( int k = 1 ; k <= N ; ++k ){
      for( int i = 1 ; i <= N ; ++i ){
        for( int j = 1 ; j <= N ; ++j ){
          capacity[i][j] = max(capacity[i][j], min(capacity[i][k], capacity[k][j]));
        }
      }
    }

    int S, D, T;
    scanf("%d%d%d", &S, &D, &T);
    printf("Scenario #%d\n", ++scenario);
    printf("Minimum Number of Trips = %d\n\n", T / (capacity[S][D]-1) + ((T % (capacity[S][D]-1) > 0)? 1 : 0) );
  }

  return 0;
}
```
