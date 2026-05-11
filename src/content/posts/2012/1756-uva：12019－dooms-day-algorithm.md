---
id: 1756
title: '#UVa：12019－Doom''s Day Algorithm'
slug: uva：12019－dooms-day-algorithm
date: '2012-07-15T09:22:21+08:00'
lastmod: '2014-12-31T23:22:50+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 120
- UVa
permalink: /2012/07/15/1756/uva%ef%bc%9a12019%ef%bc%8ddooms-day-algorithm/
wp_status: publish
wp_type: post
---

先記住1月0號(如果有0號的話)是禮拜幾，接下來以1月0號開始跳至所輸入當天是禮拜幾即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 12019 - Doom's Day Algorithm                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/15                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  int M, D;
  const int ZERO_DAY = 5;
  const int MONTH_DAYS[] = { 0, 31, 28, 31, 30, 31, 30, 
                            31, 31, 30, 31, 30, 31 };
  const string DAYS[] = { "Sunday", "Monday", "Tuesday", "Wednesday",
                          "Thursday", "Friday", "Saturday" };
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d%d", &M, &D );
      D += ZERO_DAY;
      D %= 7;
      for( int j = 1 ; j < M ; j++ ){
        D += MONTH_DAYS[j] % 7;
        D %= 7;
      }
      printf( "%s\n", DAYS[D].c_str() );
    }
  }
  return 0;
}
```
