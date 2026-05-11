---
id: 1568
title: '#UVa：107－The Cat in the Hat'
slug: uva：107－the-cat-in-the-hat
date: '2012-03-28T23:08:50+08:00'
lastmod: '2014-12-30T03:22:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/28/1568/uva%ef%bc%9a107%ef%bc%8dthe-cat-in-the-hat/
wp_status: publish
wp_type: post
---

一開始的貓的高度會等於(N+1)^m，而工作的貓咪數會等於N^m，這個可以自己算算看。

而沒工作的貓咪數就是：`N^0 + N^1 + N^2 + .... + N^m-1`。而所有貓咪的高度的總和：`N^0 * H/(N+1)^0 + N^1 * H/(N+1)^1 + N^2 * H/(N+1)^2 + ... + N^m * H/(N+1)^m`。可利用等比級數公式來計算。

P.S. 

1. 浮點數轉整數記得會有誤差，所以要加極小的值來修正。
2. 可用pow()，但錯誤率極高Orz...

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 107 The Cat in the Hat                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-8
using namespace std;

int main(){
  int H, num, m, N;

  while( scanf( "%d%d", &H, &num ) != EOF && !(H == 0 && num == 0)){
    if( H == 1 && num == 1 ){
      printf( "0 1\n");
      continue;
    }

    m = 1;
    while( H != (int)(pow(pow(num,1.0/m)+1.0, m)+ERROR) ) m++;
    N = (int)(pow(num,1.0/m)+ERROR);
    if( N != 1 ) printf( "%d %d\n", (1-num)/(1-N), (H-num)*(N+1)+num );
    else printf( "%d %d\n", m, (H-num)*(N+1)+num );
  }
  return 0;
}
```
