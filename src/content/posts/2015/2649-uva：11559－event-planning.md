---
id: 2649
title: '#UVa：11559－Event Planning'
slug: uva：11559－event-planning
date: '2015-01-09T12:47:49+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2015/01/09/2649/uva%ef%bc%9a11559%ef%bc%8devent-planning/
wp_status: publish
wp_type: post
---

照題目要求，找所有旅館中某一周可以容納所有人且花費最少的金額。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 11559 Event Planning                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int N, B, H, W;
  while( scanf("%d%d%d%d", &N, &B, &H, &W) != EOF ){
    int minCost = B+1;
    int p, a;
    for( int i = 0 ; i < H ; ++i ){
      scanf("%d", &p);
      
      for( int j = 0 ; j < W ; ++j ){
        scanf("%d", &a);
        if( a >= N && N*p < minCost ){
          minCost = N*p;
        }
      }
    }

    if( minCost > B ){
      printf("stay home\n");
    }
    else{
      printf("%d\n", minCost);
    }
  }

  return 0;
}
```
