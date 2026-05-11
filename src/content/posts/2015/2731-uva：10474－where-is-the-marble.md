---
id: 2731
title: '#UVa：10474－Where is the Marble?'
slug: uva：10474－where-is-the-marble
date: '2015-05-05T12:15:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2015/05/05/2731/uva%ef%bc%9a10474%ef%bc%8dwhere-is-the-marble/
wp_status: publish
wp_type: post
---

對數字做排序再搜尋即可得解。

**C++(0.119)**
```cpp
/*******************************************************/
/* UVa 10474 Where is the Marble?                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
using namespace std;

int main(){
  int caseNumber = 0;
  int N, Q;
  int marbles[10005];
  while( scanf("%d%d", &N, &Q) != EOF && N != 0 && Q != 0 ){
    printf("CASE# %d:\n", ++caseNumber);
    for( int i = 0 ; i < N ; ++i ){
      scanf("%d", &marbles[i]);
    }

    sort(marbles, marbles+N);

    int query;
    for( int i = 0 ; i < Q ; ++i ){
      scanf("%d", &query);
      int *position = lower_bound( marbles, marbles+N, query );
      if( position == marbles+N || *position != query ){
        printf("%d not found\n", query);
      }
      else{
        printf("%d found at %d\n", query, (int)(position-marbles)+1);
      }
    }
  }

  return 0;
}
```
