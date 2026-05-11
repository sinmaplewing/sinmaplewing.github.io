---
id: 1220
title: '#UVa：913－Joana and the Odd Numbers'
slug: uva：913－joana-and-the-odd-numbers
date: '2011-11-29T09:34:49+08:00'
lastmod: '2014-12-31T22:54:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 9
- UVa
permalink: /2011/11/29/1220/uva%ef%bc%9a913%ef%bc%8djoana-and-the-odd-numbers/
wp_status: publish
wp_type: post
---

首先先找到行數跟那行有幾個值的關係而求得行數，再來透過行數找出最後一個值，接著就求出答案了=D

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 913 Joana and the Odd Numbers                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long N, sum;
  while( scanf( "%lld", &N ) != EOF ){
    sum = (N+1)/2; // row number;
    sum = sum*sum*2-1; // the last number of that row;
    sum = 3*sum - 6;
    printf( "%lld\n", sum );
  }
  return 0;
}
```
