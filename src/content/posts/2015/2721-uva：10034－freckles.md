---
id: 2721
title: '#UVa：10034－Freckles'
slug: uva：10034－freckles
date: '2015-03-15T11:57:03+08:00'
lastmod: '2015-03-15T12:05:57+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2015/03/15/2721/uva%ef%bc%9a10034%ef%bc%8dfreckles/
wp_status: publish
wp_type: post
---

建立最小生成樹(Minimum Spanning Tree, MST)並算出樹上之權重(也就是兩點之間的距離)的總和即可得解。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 10034 Freckles                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;

struct Point{
  int group;
  double x;
  double y;
};

struct Line{
  int aPointIndex, bPointIndex;
  double length;
};

bool compareByLength(const Line &a, const Line &b){
  return a.length < b.length;
}

double pointDistance(const Point &a, const Point &b){
  double deltaX = a.x - b.x, deltaY = a.y - b.y;
  return sqrt(deltaX * deltaX + deltaY * deltaY);
}

bool isBuildMSTFinished(const Point points[], int n){
  for( int i = 0 ; i < n-1 ; ++i ){
    if( points[i].group != points[i+1].group ){
      return false;
    }
  }
  return true;
}

void putInSameGroup(Point points[], int n, int group1, int group2){
  int minGroup = min(group1, group2);
  for( int i = 0 ; i < n ; ++i ){
    if( points[i].group == group1 || points[i].group == group2 ){
      points[i].group = minGroup;
    }
  }
}

int main(){
  int testcase;
  while( scanf("%d", &testcase) != EOF ){
    for( int caseCount = 0 ; caseCount < testcase ; ++caseCount ){
      if( caseCount > 0 ) printf("\n");

      int n;
      scanf("%d", &n);

      Point points[105];
      for( int i = 0 ; i < n ; ++i ){
        scanf("%lf%lf", &(points[i].x), &(points[i].y));
        points[i].group = i;
      }

      vector<Line> lines;
      for( int i = 0 ; i < n ; ++i ){
        for( int j = i + 1 ; j < n ; ++j ){
          Line l;
          l.aPointIndex = i;
          l.bPointIndex = j;
          l.length = pointDistance(points[i],points[j]);
          lines.push_back(l);
        }
      }

      sort( lines.begin(), lines.end(), compareByLength);

      double pathLengthSum = 0;
      for( int i = 0 ; !isBuildMSTFinished(points, n) ; ++i ){
        if( points[lines[i].aPointIndex].group == points[lines[i].bPointIndex].group ){
          continue;
        }
        pathLengthSum += lines[i].length;
        putInSameGroup(points, n, points[lines[i].aPointIndex].group, points[lines[i].bPointIndex].group);
      }

      printf("%.2lf\n", pathLengthSum);
    }
  }
  return 0;
}
```
