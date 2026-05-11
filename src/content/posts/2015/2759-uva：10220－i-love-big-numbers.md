---
id: 2759
title: '#UVa：10220－I Love Big Numbers !'
slug: uva：10220－i-love-big-numbers
date: '2015-05-11T10:26:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2015/05/11/2759/uva%ef%bc%9a10220%ef%bc%8di-love-big-numbers/
wp_status: publish
wp_type: post
---

利用大數乘法將數字算出來後加總各個位數即可。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 10220 I Love Big Numbers !                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/11                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int mem[1005] = {1, 1};
  int num[3000] = {1}, digits = 1;
  for( int i = 2 ; i <= 1000 ; ++i ){
    for( int j = 0 ; j < digits ; ++j ){
      num[j] *= i;
    }
    for( int j = 0 ; j < digits ; ++j ){
      num[j+1] += num[j] / 10;
      if( j + 1 >= digits && num[j+1] > 0 ) ++digits;
      
      num[j] %= 10;
      mem[i] += num[j];
    }  
  }
  
  int n;
  while( scanf("%d", &n) != EOF ){
    printf("%d\n", mem[n]);
  }
  
  
  return 0;
}
```
