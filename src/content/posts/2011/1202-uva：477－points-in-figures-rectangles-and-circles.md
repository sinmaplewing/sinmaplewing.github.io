---
id: 1202
title: '#UVa：477－Points in Figures: Rectangles and Circles'
slug: uva：477－points-in-figures-rectangles-and-circles
date: '2011-11-28T22:56:25+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/28/1202/uva%ef%bc%9a477%ef%bc%8dpoints-in-figures-rectangles-and-circles/
wp_status: publish
wp_type: post
---

要計算點是否在長方形內，只需要看點之x座標有否在長方形左上角之x座標與長方形右下角之x座標之間，以及點之y座標有否在長方形左上角之y座標與長方形右下角之y座標之間就可以了。

要計算點是否在圓形內，只需要看點與圓心的距離是否小於半徑即可。

**C++(0.028)**
```cpp
/*******************************************************/
/* UVa 477 Points in Figures: Rectangles and Circles   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-9
using namespace std;

bool floatequal( float x, float y ){
  return (fabs(x-y) < ERROR);
}

struct Point{
  float x;
  float y;
};

struct Rectangle{
  Point leftup;
  Point rightdown;
};

struct Circle{
  Point center;
  float radius;
};

struct Figure{
  char type;
  union{
    Rectangle rec;
    Circle cir;
  };
};

float dis( Point p1, Point p2 ){
  return sqrt(pow( (p1.x-p2.x), (float)2.0 ) + pow( (p1.y-p2.y), (float)2.0 ));
}

int main(){
  char condition;
  Figure fig[15];
  int total = 0;
  while( scanf( "%c", &condition ) != EOF && condition != '*' ){
    fig[total].type = condition;
    if( condition == 'r' ){
      scanf( "%f%f%f%f", &(fig[total].rec.leftup.x), 
        &(fig[total].rec.leftup.y), 
        &(fig[total].rec.rightdown.x), 
        &(fig[total].rec.rightdown.y));
    }
    else if( condition == 'c' ){
      scanf( "%f%f%f", &(fig[total].cir.center.x),
        &(fig[total].cir.center.y),
        &(fig[total].cir.radius));
    }
    total++;
    getchar(); /* Delete the enter key */
  }
  Point test;
  int pointnum = 1;
  bool containp = 0;
  while( scanf( "%f%f", &(test.x), &(test.y) ) != EOF ){
    if( floatequal( test.x, 9999.9 ) && floatequal( test.y, 9999.9 ) )
      break;

    containp = 0;
    for( int i = 0 ; i < total ; i++ ){
      if( fig[i].type == 'r' ){
        if( test.x > fig[i].rec.leftup.x && test.x < fig[i].rec.rightdown.x )
          if( test.y < fig[i].rec.leftup.y && test.y > fig[i].rec.rightdown.y ){
            printf( "Point %d is contained in figure %d\n", pointnum, i+1 );
            containp = 1;
          }
      }
      else if( fig[i].type == 'c' ){
        if( dis( test, fig[i].cir.center ) < fig[i].cir.radius ){
          printf( "Point %d is contained in figure %d\n", pointnum, i+1 );
          containp = 1;
        }
      }
    }

    if( !containp )
      printf( "Point %d is not contained in any figure\n", pointnum );
    pointnum++;
  }
  return 0;
}
```
