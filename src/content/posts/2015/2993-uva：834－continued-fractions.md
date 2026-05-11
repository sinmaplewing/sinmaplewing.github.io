---
id: 2993
title: '#UVa：834－Continued Fractions'
slug: uva：834－continued-fractions
date: '2015-12-02T14:24:17+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 8
- UVa
permalink: /2015/12/02/2993/uva%ef%bc%9a834%ef%bc%8dcontinued-fractions/
wp_status: publish
wp_type: post
---

將分數之整數部分輸出，並將之減掉整數部分後做分母分子反轉再重複以上步驟，直到分子的數值變為零即是答案。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 834 Continued Fractions                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int numerator, denominator;
  while( scanf("%d%d", &numerator, &denominator) != EOF ){
    printf("[%d;", numerator / denominator);
    numerator -= numerator / denominator * denominator;

    bool isPrint = false;
    while( numerator > 0 ){
      swap(numerator, denominator);
      if( isPrint ){
        printf(",");
      }
      printf("%d", numerator / denominator);
      isPrint = true;
      numerator -= numerator / denominator * denominator;
    }

    printf("]\n");
  }
  return 0;
}
```
