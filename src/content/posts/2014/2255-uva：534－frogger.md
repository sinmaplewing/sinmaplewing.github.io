---
id: 2255
title: '#UVa：534－Frogger'
slug: uva：534－frogger
date: '2014-10-07T15:48:49+08:00'
lastmod: '2014-12-31T22:50:07+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2014/10/07/2255/uva%ef%bc%9a534%ef%bc%8dfrogger/
wp_status: publish
wp_type: post
---

利用Dijkstra演算法並修改其更新路徑的方法後，即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 534 Frogger                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

struct Point{
  int x, y;
  Point(int x = 0, int y = 0):x(x), y(y) {}

  static float distance(Point a, Point b){
    float xdis = a.x - b.x, ydis = a.y - b.y;
    return sqrt(xdis*xdis + ydis*ydis);
  }
};

int main(){
  int n;
  int testcase = 0;
  while( scanf("%d", &n) != EOF && n != 0 ){
    Point p[205];
    float all_distance[205];
    for( int i = 0 ; i < n ; ++i ){
      scanf("%d%d", &(p[i].x), &(p[i].y));
      
      if( i == 0 ) all_distance[i] = 0.0f;
      else all_distance[i] = 1e10;
    }

    bool picked[205] = {true, false};
    int pick_node = 0;
    float answer = 0;
    do{
      int will_pick_node = 0;
      float min_distance = 1e10;
      for( int i = 0 ; i < n ; ++i ){
        all_distance[i] = min( all_distance[i], Point::distance(p[pick_node], p[i]) );
        if( !picked[i] && all_distance[i] < min_distance ){
          min_distance = all_distance[i];
          will_pick_node = i;
        }
      }

      pick_node = will_pick_node;
      picked[pick_node] = true;
      answer = max( answer, all_distance[pick_node] );
    } while( pick_node != 1 );
  
    printf("Scenario #%d\nFrog Distance = %.3f\n\n", ++testcase, answer);
  }
  return 0;
}

```
