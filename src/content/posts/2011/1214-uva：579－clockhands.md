---
id: 1214
title: '#UVa：579－ClockHands'
slug: uva：579－clockhands
date: '2011-11-29T08:49:15+08:00'
lastmod: '2014-12-31T22:50:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2011/11/29/1214/uva%ef%bc%9a579%ef%bc%8dclockhands/
wp_status: publish
wp_type: post
---

先把時鐘刻劃360格，一格1度，則再將時針指向的位置的度數去跟分針指向的位置的度數進行絕對值相減，即可得解。(若大於180度，就利用360去減其值的絕對值去把它減到小於180度為止)

P.S. 時針指的刻度算法： `小時*30(一個小時30度) + 分/60 * 30(因為分針走一圈，時針就走30度)`。分針指的刻度算法： `分*6(五分鐘走30度，則一分鐘走6度)`。

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 579 ClockHands                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;

int main(){
  int H, M;
  float H_angle, M_angle, angle;
  while( scanf( "%d:%d", &H, &M ) != EOF && (H || M) ){
    H_angle = H*30.0 + M/60.0 * 30.0;
    M_angle = M*6.0;
    angle = fabs( H_angle-M_angle );
    printf( "%.3f\n", (angle > 180.0)? 360.0 - angle : angle );
  }
  return 0;
}
```
