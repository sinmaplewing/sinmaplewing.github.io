---
id: 1333
title: '#UVa：155－All Squares'
slug: uva：155－all-squares
date: '2012-01-17T21:25:16+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/01/17/1333/uva%ef%bc%9a155%ef%bc%8dall-squares/
wp_status: publish
wp_type: post
---

利用遞迴找出每一個正方形，然後確定點是否有在此正方形內。有的話，就加一；沒有的話，就不用加任何數字。這樣即可得解。

**C++(0.052)**
```cpp
/*******************************************************/
/* UVa 155 All Squares                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

struct Point{
  int x;
  int y;
  Point( int, int );
};

Point::Point( int nx = 0, int ny = 0 ):x(nx),y(ny){}

int point_in_squares( int, Point, Point );
int main(){
  int k;
  Point surpoint;
  while( scanf( "%d%d%d", &k, &surpoint.x, &surpoint.y) &&
        (k || surpoint.x || surpoint.y) ){
    Point squcen(1024,1024);
    printf( "%3d\n", point_in_squares( k, squcen, surpoint ) );
  }
  return 0;
}

int point_in_squares( int k, Point squcen, Point surpoint ){
  if( !k ) return 0;
  Point left_top( squcen.x-k, squcen.y-k );
  Point right_bottom( squcen.x+k, squcen.y+k );

  if( left_top.x < 0 || left_top.y < 0 )
    return 0;
  if( right_bottom.x > 2048 || right_bottom.y > 2048 )
    return 0;

  int result = 0;
  if( surpoint.x >= left_top.x && surpoint.x <= right_bottom.x )
    if( surpoint.y >= left_top.y && surpoint.y <= right_bottom.y )
      result++;
  result += point_in_squares( k/2, left_top, surpoint );
  result += point_in_squares( k/2, Point( left_top.x, right_bottom.y ), surpoint );
  result += point_in_squares( k/2, right_bottom, surpoint );
  result += point_in_squares( k/2, Point( right_bottom.x, left_top.y ), surpoint );
  return result;
}
```
