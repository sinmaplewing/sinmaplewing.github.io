---
id: 4809
title: '#UVa：11152－Colourful Flowers'
slug: uva：11152－colourful-flowers
date: '2020-04-14T00:36:18+08:00'
lastmod: '2020-04-14T00:37:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2020/04/14/4809/uva%ef%bc%9a11152%ef%bc%8dcolourful-flowers/
wp_status: publish
wp_type: post
---

基本上就是給三角形三個邊，求三角形面積、內接圓面積和外接圓面積的題目。

三角形面積有三個邊的長度時，可以使用海龍公式解。

內接圓面積則要先求內接圓半徑，若從內接圓圓心向三頂點畫線可分割出三個三角形，分別是以三個邊為底、內接圓半徑為高的三個三角形，而三個三角形的面積總和為整個三角形的面積，故可利用這些已知求得內接圓面積，進而得到內接圓面積。

外接圓面積則可以利用正弦定理[latex]\frac{c}{\sin{C}} = 2R[/latex]以及三角形面積公式[latex]\frac{1}{2}ab\sin{C}[/latex]去求得外接圓半徑 R 後即可得解。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 11152 Colourful Flowers                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  double a, b, c;
  while(scanf("%lf%lf%lf", &a, &b, &c) != EOF){
    double s = (a + b + c) / 2;
    double area = sqrt(s * (s - a) * (s - b) * (s - c));
    double innerR = area / s;
    double outerR = a * b * c / (4 * area);

    double rosesArea = innerR * innerR * M_PI;
    double violetsArea = area - rosesArea;
    double sunflowersArea = outerR * outerR * M_PI - area;

    printf("%.4lf %.4lf %.4lf\n",
      sunflowersArea,
      violetsArea,
      rosesArea);
  }
  return 0;
}
```
