---
id: 1745
title: '#UVa：846－Steps'
slug: uva：846－steps
date: '2012-05-17T00:52:57+08:00'
lastmod: '2014-12-31T22:54:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 8
- UVa
permalink: /2012/05/17/1745/uva%ef%bc%9a846%ef%bc%8dsteps/
wp_status: publish
wp_type: post
---

找出步數與距離的關係即可得解。

* 0步最多能抵達的距離是0
* 1步最多能抵達的距離是1(1)
* 2步最多能抵達的距離是2(1 1)
* 3步最多能抵達的距離是4(1 2 1)
* 4步最多能抵達的距離是6(1 2 2 1)
* 5步最多能抵達的距離是9(1 2 3 2 1)
* 6步最多能抵達的距離是12(1 2 3 3 2 1)
* ......以此類推

**C++(0.004)**
```cpp
/*******************************************************/
/* UVa 846 Steps                                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/05/18                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-10
using namespace std;
int main(){
  int n, x, y;
  int dis, step;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d%d", &x, &y );

      dis = y-x;
      if( dis == 0 ){ 
        printf( "0\n" );
        continue;
      }

      step = (int)(sqrt((double)dis)+ERROR);
      if( step * step == dis ) step = step * 2 - 1;
      else if( step * step + step < dis ) step = step * 2 + 1;
      else step = step * 2;

      printf( "%d\n", step );
    }
  }
  return 0;
}
```
