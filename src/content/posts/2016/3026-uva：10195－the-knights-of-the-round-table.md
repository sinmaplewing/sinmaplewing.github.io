---
id: 3026
title: '#UVa：10195－The Knights Of The Round Table'
slug: uva：10195－the-knights-of-the-round-table
date: '2016-03-15T01:35:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2016/03/15/3026/uva%ef%bc%9a10195%ef%bc%8dthe-knights-of-the-round-table/
wp_status: publish
wp_type: post
---

計算其內切圓的半徑即可得解。

P.S. 注意如果三邊長總和為零要另外處理，不然會產生除以零的錯誤。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10195 The Knights Of The Round Table            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  double a, b, c;
  while( scanf("%lf%lf%lf", &a, &b, &c) != EOF ){
    if( a+b+c == 0 ){
      printf("The radius of the round table is: 0.000\n");
      continue;
    }
    
    double s = (a+b+c)/2;
    double area = sqrt(s*(s-a)*(s-b)*(s-c));
    double r = (2*area)/(a+b+c);
    printf("The radius of the round table is: %.3lf\n", r);
  }

  return 0;
}
```
