---
id: 2842
title: '#UVa：12372－Packing for Holiday'
slug: uva：12372－packing-for-holiday
date: '2015-07-15T09:45:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 123
- UVa
permalink: /2015/07/15/2842/uva%ef%bc%9a12372%ef%bc%8dpacking-for-holiday/
wp_status: publish
wp_type: post
---

箱子的大小是20x20x20，所以只要盒子有一邊超過20就裝不下了。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12372 Packing for Holiday                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    for( int caseNumber = 1 ; caseNumber <= T ; ++caseNumber ){
      int L, W, H;
      scanf("%d%d%d", &L, &W, &H);

      if( L <= 20 && W <= 20 && H <= 20 ){
        printf("Case %d: good\n", caseNumber);
      }
      else{
        printf("Case %d: bad\n", caseNumber);
      }
    }
  }

  return 0;
}
```
