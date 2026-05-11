---
id: 4805
title: '#UVa：10347－Medians'
slug: uva：10347－medians
date: '2020-04-12T23:34:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2020/04/12/4805/uva%ef%bc%9a10347%ef%bc%8dmedians/
wp_status: publish
wp_type: post
---

這題比較是數學題。

首先先證明三條從各個角連到各邊中點的線所切割出的六塊三角形面積相等，接著可以證明三條線互相將對方切成的兩等份是`2 : 1`長的關係(利用剛剛所知道的六塊三角形面積相等)，最後往三角形的其中一邊延伸出一個一樣的三角形，可以找到一個小三角形是由六塊三角形的兩塊組成的三角形，其邊長各為三條線的三分之二長。利用海龍公式求得其面積後，就可反推出整塊大三角形的面積。

P.S. 在求面積時，記得要先確認三條邊的長能不能形成一個三角形。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10347 Medians                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

bool isTriangle(double a, double b, double c){
  return a + b > c && a + c > b && b + c > a;
}

int main(){
  double medianA, medianB, medianC;
  while(scanf("%lf%lf%lf", &medianA, &medianB, &medianC) != EOF){
    double medianTriangleA = 2.0 / 3.0 * medianA;
    double medianTriangleB = 2.0 / 3.0 * medianB;
    double medianTriangleC = 2.0 / 3.0 * medianC;

    if(!isTriangle(medianTriangleA, medianTriangleB, medianTriangleC)){
      printf("-1.000\n");
      continue;
    }

    double medianTriangleS = (medianTriangleA + medianTriangleB + medianTriangleC) / 2;
    double medianArea = sqrt(medianTriangleS * (medianTriangleS - medianTriangleA) * (medianTriangleS - medianTriangleB) * (medianTriangleS - medianTriangleC));
    double area = medianArea * 3;

    printf("%.3lf\n", area);
  }
  return 0;
}
```
