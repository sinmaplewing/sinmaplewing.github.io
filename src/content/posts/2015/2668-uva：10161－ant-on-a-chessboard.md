---
id: 2668
title: '#UVa：10161－Ant on a Chessboard'
slug: uva：10161－ant-on-a-chessboard
date: '2015-01-14T20:52:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2015/01/14/2668/uva%ef%bc%9a10161%ef%bc%8dant-on-a-chessboard/
wp_status: publish
wp_type: post
---

先找出N應該位在哪一層，再找出那層的中間數，與中間數比較後即可求得x與y值。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 10161 Ant on a Chessboard                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

const double EPSILON = 1e-9;

int main(){
  int N;
  while( scanf("%d", &N) != EOF && N != 0 ){
    int layer = (int)(sqrt((double)(N-1)) + EPSILON) + 1;
    int mid = (layer-1) * (layer-1) + layer;
    int x = layer, y = layer;

    if( layer % 2 == 0 ){
      if( N > mid ){
        y -= N - mid;
      }
      else {
        x -= mid - N;
      }
    }
    else{
      if( N > mid ){
        x -= N - mid;
      }
      else {
        y -= mid - N;
      }
    }

    printf("%d %d\n", x, y);
  }
  return 0;
}
```
