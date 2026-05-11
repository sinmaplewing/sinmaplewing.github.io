---
id: 2866
title: '#UVa：10432－Polygon Inside A Circle'
slug: uva：10432－polygon-inside-a-circle
date: '2015-07-26T00:50:34+08:00'
lastmod: '2015-08-29T16:58:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2015/07/26/2866/uva%ef%bc%9a10432%ef%bc%8dpolygon-inside-a-circle/
wp_status: publish
wp_type: post
---

利用已知兩邊(即半徑r)及其夾角(將360度分成n等份)之三角形面積公式即可求解。

面積公式：[latex] S = \frac{1}{2}ab\sin{C} [/latex]

**C++(0.002)**
```cpp
/*******************************************************/
/* UVa 10432 Polygon Inside A Circle                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  double r, n;
  while( scanf("%lf%lf", &r, &n) != EOF ){
    printf("%.3lf\n", 0.5 * r * r * sin(2 * M_PI / n) * n );
  }
  return 0;
}
```
