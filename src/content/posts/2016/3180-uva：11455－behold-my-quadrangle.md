---
id: 3180
title: '#UVa：11455－Behold my quadrangle'
slug: uva：11455－behold-my-quadrangle
date: '2016-08-03T11:07:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2016/08/03/3180/uva%ef%bc%9a11455%ef%bc%8dbehold-my-quadrangle/
wp_status: publish
wp_type: post
---

根據所給的邊長去判斷是哪種四邊形，唯一比較難的應該是quadrangle的判斷，其判斷為：[latex]最長的邊長 \leq 其餘三邊長之和[/latex]。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11455 Behold my quadrangle                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/08/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main(){
  int numTestcase;
  while( scanf("%d", &numTestcase) != EOF ){
    for( int testcase = 0 ; testcase < numTestcase ; ++testcase ){
      int sides[4];
      for( int i = 0 ; i < 4 ; ++i ){
        scanf("%d", &sides[i]);
      }
      sort(sides, sides+4);

      if( sides[0] == sides[3] ){ // Four sides are the same.
        printf("square\n");
      }
      else if( sides[0] == sides[1] && sides[2] == sides[3] ){
        printf("rectangle\n");
      }
      else if( sides[0] + sides[1] + sides[2] >= sides[3] ){
        printf("quadrangle\n");
      }
      else{
        printf("banana\n");
      }
    }
  }

  return 0;
}
```
