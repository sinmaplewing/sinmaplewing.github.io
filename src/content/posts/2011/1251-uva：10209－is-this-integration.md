---
id: 1251
title: '#UVa：10209－Is This Integration ?'
slug: uva：10209－is-this-integration
date: '2011-12-01T21:22:41+08:00'
lastmod: '2014-12-31T23:06:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2011/12/01/1251/uva%ef%bc%9a10209%ef%bc%8dis-this-integration/
wp_status: publish
wp_type: post
---

要算面積，令邊長為a，一塊斜線的面積為x，一塊點狀的面積為y，一塊格子狀的面積為z。

則首先正方形的面積減去四分之一以a為半徑的圓的面積 = a\*a - a\*a\*π/4 = y+2\*z ->(1)

再來六分之一以a為半徑的圓的面積減去以a為邊長的正三角形(想想看在哪裡...) = a\*a\*π/6 - a\*a\*sqrt(3.0)/4 = 假設為某個面積w(想想看在哪裡...) ->(2)

接著把四分之一以a為半徑的圓的面積減去六分之一以a為半徑的圓的面積 = a\*a\*π/4 - a\*a\*π/6 = y+z+w ->(3)

則z=(y+2\*z)-(y+z+w)+w=(1)-(3)+(2)就出來了，那麼y=(y+2\*z)-(2\*z)=(1)-2\*z也出來了，而x=a\*a-4\*y-4\*z也跟著出來了！

**C++(0.044)**
```cpp
/*******************************************************/
/* UVa 10209 Is This Integration?                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/01                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define PI (2.0*acos(0.0))
using namespace std;

int main(){
  double a;
  while( scanf( "%lf", &a ) != EOF ){
    double x, y, z;
    z = a*a - a*a*PI/4.0;
    z -= a*a*PI/4.0 - a*a*PI/6.0 - ( a*a*PI/6.0 - a*a*sqrt(3.0)/4.0 );
    y = a*a - a*a*PI/4.0 - 2.0*z;
    x = a*a - 4.0*y - 4.0*z;
    printf( "%.3lf %.3lf %.3lf\n", x, 4*y, 4*z );
  }
  return 0;
}
```
