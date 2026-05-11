---
id: 1197
title: '#UVa：476－Points in Figures: Rectangles'
slug: uva：476－points-in-figures-rectangles
date: '2011-11-28T16:48:28+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/28/1197/uva%ef%bc%9a476%ef%bc%8dpoints-in-figures-rectangles/
wp_status: publish
wp_type: post
---

要計算點是否在長方形內，只需要看點之x座標有否在長方形左上角之x座標與長方形右下角之x座標之間，以及點之y座標有否在長方形左上角之y座標與長方形右下角之y座標之間就可以了。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 476 Points in Figures: Rectangles               */
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

int main(){
  char condition;
  Rectangle rec[15];
  int total = 0;
  while( scanf( "%c", &condition ) != EOF && condition != '*' ){
    scanf( "%f%f%f%f", &(rec[total].leftup.x), 
      &(rec[total].leftup.y), 
      &(rec[total].rightdown.x), 
      &(rec[total].rightdown.y));
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
      if( test.x > rec[i].leftup.x && test.x < rec[i].rightdown.x )
        if( test.y < rec[i].leftup.y && test.y > rec[i].rightdown.y ){
          printf( "Point %d is contained in figure %d\n", pointnum, i+1 );
          containp = 1;
        }
    }

    if( !containp )
      printf( "Point %d is not contained in any figure\n", pointnum );
    pointnum++;
  }
  return 0;
}
```
