---
id: 1535
title: '#UVa：681－Convex Hull Finding'
slug: uva：681－convex-hull-finding
date: '2012-03-27T13:35:06+08:00'
lastmod: '2014-12-31T22:51:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2012/03/27/1535/uva%ef%bc%9a681%ef%bc%8dconvex-hull-finding/
wp_status: publish
wp_type: post
---

本題是Convex Hull(凸包)的問題，不過要注意的地方很多：

1. 凸包上同條線上的點只要輸出最遠的兩點即可。
2. 輸出的第一個點要是最下面的點。若最下點有很多，則以最左邊的點為第一個點。
3. 題目要以逆時針方向輸出。（這個地方害我死了很多次......）

我是用Quick Hull解的，所以底下的Code也是Quick Hull的作法就是了。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 681 Convex Hull Finding                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/27                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<algorithm>
#include<vector>
using namespace std;

struct Point{
  int x;
  int y;
};

struct Line{
  Point p1, p2;

  int compute( Point p ){
    int a, b, c, temp;

    a = p1.y - p2.y;
    b = p2.x - p1.x;
    c = a*p1.x + b*p1.y;

    return a*p.x + b*p.y - c;
  }

  int side( Point p ){
    int temp = compute(p);

    if( temp > 0 ) return 1;
    else if( temp < 0 ) return -1;
    else return 0;
  }
};

vector<Point> answer;

void qhull( Point *point, int start, int end, Line line ){
  if( start >= end ) return;

  Line line1, line2;
  int max_index = -1, max_dis = -1;
  int part1 = start+1, part2 = end;

  for( int i = start ; i < end ; i++ )
    if( abs(line.compute(point[i])) > max_dis ){
      max_index = i;
      max_dis = abs(line.compute(point[i]));
    }

  swap( point[start], point[max_index] );

  line1.p1 = line.p1;
  line1.p2 = point[start];
  line2.p1 = point[start];
  line2.p2 = line.p2;

  for( int i = start+1 ; i < part2 ; i++ )
    if( line1.side(point[i]) * line1.side(line.p2) < 0 )
      swap( point[i], point[part1++] );
    else if( line2.side(point[i]) * line2.side(line.p1) < 0 )
      swap( point[i--], point[--part2] );

  qhull( point, start+1, part1, line1 );
  answer.push_back( point[start] );
  qhull( point, part2, end, line2 );
}

bool cmp( Point p1, Point p2 ){
  if( p1.x < p2.x ) return true;
  else if( p1.x == p2.x && p1.y < p2.y ) return true;
  return false;
}

int main(){

  int K, N, part1, part2, min_index;
  Point point[1005];
  Line line;
  bool same = false;

  while( scanf( "%d", &K ) != EOF ){
    printf( "%d\n", K );
    for( int i = 0 ; i < K ; i++ ){
      scanf( "%d", &N );
      for( int j = 0 ; j < N ; j++ )
        scanf( "%d%d", &point[j].x, &point[j].y );

      answer.clear();
      sort( point, point+N, cmp );

      part1 = 1;
      part2 = N-1;
      line.p1 = point[0];
      line.p2 = point[N-1];

      for( int j = 1 ; j < part2 ; j++ )
        if( line.side(point[j]) > 0 ) swap( point[part1++], point[j] );
        else if( line.side(point[j]) < 0 ) swap( point[--part2], point[j--] );

      answer.push_back( point[0] );
      qhull( point, 1, part1, line );
      swap( line.p1, line.p2 );
      answer.push_back( point[N-1] );
      qhull( point, part2, N-1, line );

      min_index = 0;
      printf( "%lu\n", answer.size()+1 );
      for( int j = 1 ; j < answer.size() ; j++ )
        if( answer[j].y < answer[min_index].y ) min_index = j;
        else if( answer[j].y == answer[min_index].y && answer[j].x < answer[min_index].x ) min_index = j;
      for( int j = 0 ; j <= answer.size() ; j++ )
        printf( "%d %d\n", answer[(min_index-j+answer.size())%answer.size()].x, answer[(min_index-j+answer.size())%answer.size()].y );

      if( i != K-1 ){
        scanf( "%d", &N );
        printf( "-1\n" );
      }
    }
  }

  return 0;
}
```
