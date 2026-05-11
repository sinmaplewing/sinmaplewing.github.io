---
id: 4242
title: '#UVa：190－Circle Through Three Points'
slug: uva：190－circle-through-three-points
date: '2019-04-12T09:09:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2019/04/12/4242/uva%ef%bc%9a190%ef%bc%8dcircle-through-three-points/
wp_status: publish
wp_type: post
---

利用兩點向量先求出中垂線方程式，接著將兩個中垂線方程式求其交點即可得其圓的圓心，即可得到圓的方程式。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 190 Circle Through Three Points                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cmath>
using namespace std;

struct Vector{
  double x;
  double y;

  void normalized(){
    double length = sqrt(x*x + y*y);
    x = x / length;
    y = y / length;
  }

  double getLength(Vector point){
    double xLength = x - point.x;
    double yLength = y - point.y;
    return sqrt(xLength * xLength + yLength * yLength);
  }
};

/* ax + by = c */
struct Line{
  double a;
  double b;
  double c;

  Vector getCrossLinePoint(Line &anotherLine){
    /* a1x + b1y = c1 -- (1)*/
    /* a2x + b2y = c2 -- (2) */
    /* a1a2x + b1a2y = c1a2 -- (1) x a2 -- (3) */
    /* a1a2x + b2a1y = c2a1 -- (2) x a1 -- (4) */
    /* y = (c1a2 - c2a1) / (b1a2 - b2a1) -- (3) - (4) */
    /* a1b2x + b1b2y = c1b2 -- (1) x b2 -- (5) */
    /* a2b1x + b1b2y = c2b1 -- (2) x b1 -- (6) */
    /* x = (c1b2 - c2b1) / (a1b2 - a2b1) -- (5) - (6) */

    return Vector {
      (c * anotherLine.b - anotherLine.c * b) / (a * anotherLine.b - anotherLine.a * b),
      (c * anotherLine.a - anotherLine.c * a) / (b * anotherLine.a - anotherLine.b * a)
    };
  }
};

char getSign(double value){
  return (value < 0) ? '-' : '+';
}

int main(){
  Vector A, B, C;
  while(scanf("%lf%lf%lf%lf%lf%lf", &A.x, &A.y, &B.x, &B.y, &C.x, &C.y) != EOF){
    Vector abMiddle { (A.x + B.x) / 2.0, (A.y + B.y) / 2.0 };
    Vector bcMiddle { (B.x + C.x) / 2.0, (B.y + C.y) / 2.0 };
    Vector abVector { B.x - A.x, B.y - A.y };
    Vector bcVector { C.x - B.x, C.y - B.y };
    abVector.normalized();
    bcVector.normalized();

    Line abVerticalLine {abVector.x, abVector.y, abMiddle.x * abVector.x + abMiddle.y * abVector.y}; 
    Line bcVerticalLine {bcVector.x, bcVector.y, bcMiddle.x * bcVector.x + bcMiddle.y * bcVector.y};
    Vector center = abVerticalLine.getCrossLinePoint(bcVerticalLine);
    double radius = A.getLength(center);

    double h = -center.x;
    double k = -center.y;
    printf("(x %c %.3lf)^2 + (y %c %.3lf)^2 = %.3lf^2\n", 
      getSign(h), 
      abs(h), 
      getSign(k),
      abs(k),
      radius);

    double c = 2 * h;
    double d = 2 * k;
    double e = -(radius * radius) + h * h + k * k;
    printf("x^2 + y^2 %c %.3lfx %c %.3lfy %c %.3lf = 0\n\n",
      getSign(c),
      abs(c),
      getSign(d),
      abs(d),
      getSign(e),
      abs(e));
  }

  return 0;
}
```
