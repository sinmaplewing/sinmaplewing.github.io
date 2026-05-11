---
id: 1205
title: '#UVa：478－Points in Figures: Rectangles, Circles, Triangles'
slug: uva：478－points-in-figures-rectangles-circles-triangles
date: '2011-11-28T23:42:30+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/28/1205/uva%ef%bc%9a478%ef%bc%8dpoints-in-figures-rectangles-circles-triangles/
wp_status: publish
wp_type: post
---

要計算點是否在長方形內，只需要看點之x座標有否在長方形左上角之x座標與長方形右下角之x座標之間，以及點之y座標有否在長方形左上角之y座標與長方形右下角之y座標之間就可以了。

要計算點是否在圓形內，只需要看點與圓心的距離是否小於半徑即可。

要計算點是否在三角形內，假設要求的點是n，三角形三個點分別是a,b,c，則若n點在三角形內則 nab面積 + nac面積 + nbc面積 跟 abc面積 會相等。若要判斷n點是否在三角形線上，利用nab面積 和 nac面積 和 nbc面積 其中一塊為0就在線上。

再來最麻煩的部份就是浮點數的誤差，這導致浮點數去與另外一個浮點數做相等的判斷時可能會出錯，因此我們可以利用浮點數減去另外一個浮點數小於一個極小的誤差(0.000001之類)當做等於來用。

P.S. 本題我用float沒過，換成double後就過了，越精確會越好喔~XD

**C++(0.024)**
```cpp
/*******************************************************/
/* UVa 478 Points in Figures: Rectangles and Circles,  */
/* and Triangles                                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-9
using namespace std;

bool doubleequal( double x, double y ){
  return (fabs(x-y) < ERROR);
}

struct Point{
  double x;
  double y;
};

struct Rectangle{
  Point leftup;
  Point rightdown;
};

struct Circle{
  Point center;
  double radius;
};

struct Triangle{
  Point angle[3];
};

struct Figure{
  char type;
  union{
    Rectangle rec;
    Circle cir;
    Triangle tri;
  };
};

double dis( Point p1, Point p2 ){
  return sqrt(pow( (p1.x-p2.x), (double)2.0 ) + pow( (p1.y-p2.y), (double)2.0 ));
}

double area( Point p1, Point p2, Point p3 ){
  return fabs((p1.x*p2.y + p2.x*p3.y + p3.x*p1.y) - (p2.x*p1.y+p3.x*p2.y+p1.x*p3.y));
}

int main(){
  char condition;
  Figure fig[15];
  int total = 0;
  while( scanf( "%c", &condition ) != EOF && condition != '*' ){
    fig[total].type = condition;
    if( condition == 'r' ){
      scanf( "%lf%lf%lf%lf", &(fig[total].rec.leftup.x), 
        &(fig[total].rec.leftup.y), 
        &(fig[total].rec.rightdown.x), 
        &(fig[total].rec.rightdown.y));
    }
    else if( condition == 'c' ){
      scanf( "%lf%lf%lf", &(fig[total].cir.center.x),
        &(fig[total].cir.center.y),
        &(fig[total].cir.radius));
    }
    else if( condition == 't' ){
      scanf( "%lf%lf%lf%lf%lf%lf", &(fig[total].tri.angle[0].x),
        &(fig[total].tri.angle[0].y),
        &(fig[total].tri.angle[1].x),
        &(fig[total].tri.angle[1].y),
        &(fig[total].tri.angle[2].x),
        &(fig[total].tri.angle[2].y));
    }
    total++;
    getchar(); /* Delete the enter key */
  }
  Point test;
  int pointnum = 1;
  bool containp = 0;
  double areas[3];
  while( scanf( "%lf%lf", &(test.x), &(test.y) ) != EOF ){
    if( doubleequal( test.x, 9999.9 ) && doubleequal( test.y, 9999.9 ) )
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
      else if( fig[i].type == 't' ){
        areas[0] = area( test, fig[i].tri.angle[0], fig[i].tri.angle[1]);
        areas[1] = area( test, fig[i].tri.angle[1], fig[i].tri.angle[2]);
        areas[2] = area( test, fig[i].tri.angle[2], fig[i].tri.angle[0]); 
        if( doubleequal( areas[0]+areas[1]+areas[2],
          area( fig[i].tri.angle[0], fig[i].tri.angle[1], fig[i].tri.angle[2]) ) && 
          !doubleequal( areas[0] , 0.0 ) && 
          !doubleequal( areas[1] , 0.0 ) && 
          !doubleequal( areas[2] , 0.0 ) ){
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
