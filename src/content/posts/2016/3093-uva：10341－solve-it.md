---
id: 3093
title: '#UVa：10341－Solve It'
slug: uva：10341－solve-it
date: '2016-04-20T12:03:18+08:00'
lastmod: '2016-04-20T12:03:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2016/04/20/3093/uva%ef%bc%9a10341%ef%bc%8dsolve-it/
wp_status: publish
wp_type: post
---

首先，由於要計算的函數先拆解每一項來看：

* [latex]e^{-x}[/latex]:在[latex]0 \leq x \leq 1[/latex]區間內為遞減函數
* [latex]\sin{x}[/latex]:在[latex]0 \leq x \leq 1[/latex]區間內為遞增函數
* [latex]\cos{x}[/latex]:在[latex]0 \leq x \leq 1[/latex]區間內為遞減函數
* [latex]\tan{x}[/latex]:在[latex]0 \leq x \leq 1[/latex]區間內為遞增函數
* [latex]x^{2}[/latex]:在[latex]0 \leq x \leq 1[/latex]區間內為遞增函數

接著配合係數限制：

* [latex]p \times e^{-x}[/latex]:在[latex]0 \leq p \leq 20[/latex]區間內為遞減函數
* [latex]q \times \sin{x}[/latex]:在[latex]-20 \leq q \leq 0[/latex]區間內，由於係數為負，故倒向為遞減函數。
* [latex]r \times \cos{x}[/latex]:在[latex]0 \leq r \leq 20[/latex]區間內為遞減函數
* [latex]s \times \tan{x}[/latex]:在[latex]-20 \leq s \leq 0[/latex]區間內，由於係數為負，故倒向為遞減函數。
* [latex]t \times x^{2}[/latex]:在[latex]-20 \leq t \leq 0[/latex]區間內，由於係數為負，故倒向為遞減函數。

由於五項皆為遞減函數，和亦為遞減函數。利用遞減函數的性質與二分搜尋法即可找到解。

P.S. 小心兩浮點數之間不能直接做等於運算，會有誤差，必須算兩數相減小於某個可容忍的誤差值去判斷相等。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 10341 Solve It                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

bool isEqual(double a, double b){
  return (a - b) < 1e-9 && (a - b) > -1e-9;
}

struct Formula{
  double p;
  double q;
  double r;
  double s;
  double t;
  double u;

  double calculate(double x){
    return p * exp(-x) + q * sin(x) + r * cos(x) + s * tan(x) + t * x * x + u;
  }
};

int main(){
  Formula f;
  while( scanf("%lf%lf%lf%lf%lf%lf", &(f.p), &(f.q), &(f.r), &(f.s), &(f.t), &(f.u)) != EOF){
    double lowerBound = 0, upperBound = 1;
    double lowerValue = f.calculate(lowerBound), upperValue = f.calculate(upperBound);
    if( isEqual(lowerValue, 0) ){
      printf("%.4lf\n", lowerBound);
      continue;
    }

    if( isEqual(upperValue, 0) ){
      printf("%.4lf\n", upperBound);
      continue;
    }

    if( lowerValue * upperValue > 0 ){
      printf("No solution\n");
      continue;
    }

    double mid;
    double midValue;
    do{
      mid = (lowerBound + upperBound) / 2;
      midValue = f.calculate(mid);

      if( midValue < 0 ){
        upperBound = mid;
      }
      else {
        lowerBound = mid;
      }
    } while( !isEqual(midValue, 0) );

    printf("%.4lf\n", mid);

  }

  return 0;
}

```
