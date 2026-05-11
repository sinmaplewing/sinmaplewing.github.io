---
id: 2684
title: '#UVa：438－The Circumference of the Circle'
slug: uva：438－the-circumference-of-the-circle
date: '2015-01-23T16:39:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
featured_image: /uploads/2015/01/428.png
permalink: /2015/01/23/2684/uva%ef%bc%9a438%ef%bc%8dthe-circumference-of-the-circle/
wp_status: publish
wp_type: post
---

如下圖所示可得到公式，按照公式解即可。
![438](/uploads/2015/01/428.png)

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 438 The Circumference of the Circle             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/23                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

struct Point{
  double x;
  double y;
};

double getDistance(const Point &a, const Point &b){
  double xDistance = a.x - b.x;
  double yDistance = a.y - b.y;
  return sqrt(xDistance * xDistance + yDistance * yDistance);
}

int main(){
  const double PI = 3.141592653589793;

  Point points[3];
  while( scanf("%lf%lf%lf%lf%lf%lf", &(points[0].x), &(points[0].y),
                                     &(points[1].x), &(points[1].y),
                                     &(points[2].x), &(points[2].y)) != EOF ){
    double area = abs( points[0].x * points[1].y + 
                       points[1].x * points[2].y + 
                       points[2].x * points[0].y -
                       points[0].y * points[1].x -
                       points[1].y * points[2].x - 
                       points[2].y * points[0].x );

    double lines[3] = { getDistance(points[0], points[1]), 
                        getDistance(points[1], points[2]),
                        getDistance(points[2], points[0]) };
    double radius = lines[0] * lines[1] * lines[2] / (2 * area); 
    printf("%.2lf\n", 2 * radius * PI );
  }

  return 0;
}
```
