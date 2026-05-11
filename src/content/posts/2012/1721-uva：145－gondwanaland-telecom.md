---
id: 1721
title: '#UVa：145－Gondwanaland Telecom'
slug: uva：145－gondwanaland-telecom
date: '2012-04-13T11:47:20+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/04/13/1721/uva%ef%bc%9a145%ef%bc%8dgondwanaland-telecom/
wp_status: publish
wp_type: post
---

照題目需求計算即可。

計算時有幾個技巧：

1. 如果是跨日的時段，可以反過來算，再用全部去減掉算出來的結果。
    **Ex.** 12:23~8:50 可以先反過來當 8:50~12:23 來算。
2. Night Rate時段可用0:00(or 24:00)來切割成兩段作計算。
3. 如果時段的開始時間與結束時間相同，表示是打了24個小時，而不是完全沒有時間。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 145 Gondwanaland Telecom                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/13                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

struct Time{
  int hour;
  int minute;
};

bool cmp( Time a, Time b ){
  if( a.hour < b.hour ) return true;
  if( a.hour > b.hour ) return false;
  if( a.minute < b.minute ) return true;
  return false;
}

int time_distance( Time a, Time b ){
  int value = (b.hour-a.hour)*60+(b.minute-a.minute);
  if( value < 0 ) return 0;
  return value;
}

Time min_time( Time a, Time b ){
  if( cmp( a, b ) ) return a;
  return b;
}

Time max_time( Time a, Time b ){
  if( cmp( a, b ) ) return b;
  return a;
}

int main(){
  const float table[5][5] = { { 0.02, 0.10, 0.06, 0.02, 0.10*600+0.06*240+0.02*600 },
                              { 0.05, 0.25, 0.15, 0.05, 0.25*600+0.15*240+0.05*600 },
                              { 0.13, 0.53, 0.33, 0.13, 0.53*600+0.33*240+0.13*600 },
                              { 0.17, 0.87, 0.47, 0.17, 0.87*600+0.47*240+0.17*600 },
                              { 0.30, 1.44, 0.80, 0.30, 1.44*600+0.80*240+0.30*600 } }; 

  char charging_step;
  string number;
  Time start, end;
  Time rateline[5];
  int rateminute[3] = {0};
  float cost;
  bool rev;

  rateline[0].hour = 0, rateline[0].minute = 0;
  rateline[1].hour = 8, rateline[1].minute = 0;
  rateline[2].hour = 18, rateline[2].minute = 0;
  rateline[3].hour = 22, rateline[3].minute = 0;
  rateline[4].hour = 24, rateline[4].minute = 0;

  while( scanf( "%c", &charging_step ) != EOF && ( charging_step != '#') ){
    cin >> number;
    scanf( "%d%d%d%d", &(start.hour), &(start.minute),
      &(end.hour), &(end.minute) );
    getchar();
    rev = false;
    if( !cmp( start, end ) ){
      rev = true;
      swap( start, end );
    }

    cost = 0.0;
    memset( rateminute, 0, sizeof(rateminute) );
    for( int i = 0 ; i < 4 ; i++ ){
      rateminute[i%3] += time_distance(max_time(start, rateline[i]), min_time(end, rateline[i+1]) );
      cost += table[charging_step-'A'][i]*(float)time_distance(max_time(start, rateline[i]), min_time(end, rateline[i+1]) );
    }
    if( rev ){
      cost = table[charging_step-'A'][4] - cost;
      rateminute[0] = 600 - rateminute[0];
      rateminute[1] = 600 - rateminute[1];
      rateminute[2] = 240 - rateminute[2];
    }

    printf( "%10s", number.c_str() );
    for( int i = 1 ; i <= 3 ; i++ )
      printf( "%6d", rateminute[i%3] );
    printf( "%3c%8.2f\n", charging_step, cost );
  }

  return 0;
}
``` 
