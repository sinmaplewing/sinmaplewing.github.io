---
id: 1369
title: '#UVa：920－Sunny Mountains'
slug: uva：920－sunny-mountains
date: '2012-01-19T08:05:44+08:00'
lastmod: '2014-12-31T22:54:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 9
- UVa
permalink: /2012/01/19/1369/uva%ef%bc%9a920%ef%bc%8dsunny-mountains/
wp_status: publish
wp_type: post
---

從Ｘ的最後面一個一個山峰搜回來，遇到山峰比之前還高就要進行加線段的動作，如此做完即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 920 Sunny Mountains                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#include<algorithm>
using namespace std;

struct Point{
  double x;
  double y;
  Point( double, double );
};

Point::Point( double nx = 0.0, double ny = 0.0 ):x(nx),y(ny){}
bool compare( Point, Point );
double length( Point, Point );

int main(){
  int C, N;
  Point mountain[105];
  double highest, line, temp, m, c;
  while( scanf( "%d", &C ) != EOF ){
    for( int i = 0 ; i < C ; i++ ){
      scanf( "%d", &N );
      for( int j = 0 ; j < N ; j++)
        scanf( "%lf%lf", &(mountain[j].x), &(mountain[j].y) );
      sort( mountain, mountain+N, compare );

      highest = 0, line = 0;
      for( int j = 1 ; j < N ; j++ ){
        if( mountain[j].y > highest ){
          m = (mountain[j].y-mountain[j-1].y)/(mountain[j].x-mountain[j-1].x);
          c = mountain[j].y - m*mountain[j].x;
          temp = (highest-c)/m;
          line += length( mountain[j], Point( temp, highest ) );
          highest = mountain[j].y;
        }
      }
      printf( "%.2lf\n", line );
    }
  }
  return 0;
}

bool compare( Point a, Point b ){
  return a.x > b.x;
}

double length( Point a, Point b ){
  return sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) );
}
```
