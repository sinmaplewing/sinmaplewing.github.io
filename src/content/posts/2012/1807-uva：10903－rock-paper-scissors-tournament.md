---
id: 1807
title: '#UVa：10903－Rock-Paper-Scissors Tournament'
slug: uva：10903－rock-paper-scissors-tournament
date: '2012-09-12T22:33:33+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/09/12/1807/uva%ef%bc%9a10903%ef%bc%8drock-paper-scissors-tournament/
wp_status: publish
wp_type: post
---

比較輸贏可只使用字串第一個字即可，紀錄輸贏次數即可得解。

P.S. 平手可不用紀錄。

**C++(0.676)**
```cpp
/*******************************************************/
/* UVa 10903 Rock-Paper-Scissors                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/12                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
#define WIN 0
#define LOSE 1
using namespace std;

int main(){
  int n, k;
  int state[105][2];
  int p1, p2;
  string m1, m2;
  bool space = false;

  while( scanf( "%d", &n ) != EOF && n != 0 ){
    scanf( "%d", &k );
    if( space ) printf( "\n" );
    space = true;
    memset( state, 0, sizeof(state) );
    for( int i = 0 ; i < k*n*(n-1)/2 ; i++ ){
      scanf( "%d", &p1 );
      cin >> m1;
      scanf( "%d", &p2 );
      cin >> m2;
      if( m1[0] != m2[0] ){
        if( m1[0] == 'r' && m2[0] == 's' ||
            m1[0] == 's' && m2[0] == 'p' ||
            m1[0] == 'p' && m2[0] == 'r' ){
          state[p1][WIN]++;
          state[p2][LOSE]++;
        }
        else{
          state[p1][LOSE]++;
          state[p2][WIN]++;
        }
      }
    }
    for( int i = 1 ; i <= n ; i++ ){
      if( state[i][WIN] + state[i][LOSE] == 0 ){
        printf( "-\n" );
      }
      else{
        printf( "%.3lf\n", (double)state[i][WIN] / (double)(state[i][WIN]+state[i][LOSE]) );
      }
    }
  }
  return 0;
}
```
