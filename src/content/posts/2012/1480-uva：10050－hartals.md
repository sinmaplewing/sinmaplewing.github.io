---
id: 1480
title: '#UVa：10050－Hartals'
slug: uva：10050－hartals
date: '2012-03-16T10:36:48+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/16/1480/uva%ef%bc%9a10050%ef%bc%8dhartals/
wp_status: publish
wp_type: post
---

照題目要求去計算因罷工而損失掉的工作日有幾天即可，可用陣列來記錄是否已經有計算過某天來避免掉重複計算。

P.S. 

1. 休假日若罷工不能計算，而休假日是禮拜五和禮拜六，並非如我們平時所認為的禮拜六和禮拜日。
2. day1是禮拜日，day2是禮拜一…。在判斷是否為禮拜五和禮拜六的時候，記得餘七時不要判斷錯。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10050 - Hartals                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;
int main(){
  int T;
  int N, P, h[105];
  int lose_day;
  while( scanf( "%d", &T ) != EOF ){
    for( int i = 0 ; i < T ; i++ ){
      scanf( "%d%d", &N, &P );
      for( int j = 0 ; j < P ; j++ )
        scanf( "%d", &h[j] );
      lose_day = 0;
      bool day[3700] = {0};
      for( int j = 0 ; j < P ; j++ )
        for( int k = h[j] ; k <= N ; k += h[j] )
          if( !day[k] && ((k-1) % 7 < 5) ){
            lose_day++;
            day[k] = 1;
          }
      printf( "%d\n", lose_day );
    }
  }
  return 0;
}
```
