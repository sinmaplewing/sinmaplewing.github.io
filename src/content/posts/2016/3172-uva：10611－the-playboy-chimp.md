---
id: 3172
title: '#UVa：10611－The Playboy Chimp'
slug: uva：10611－the-playboy-chimp
date: '2016-07-30T08:46:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2016/07/30/3172/uva%ef%bc%9a10611%ef%bc%8dthe-playboy-chimp/
wp_status: publish
wp_type: post
---

找出Query所要的數字在不遞減數列中的前後位置找出即可。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 10611 The Playboy Chimp                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main(){
  int N, Q;
  while( scanf("%d", &N) != EOF ){
    int chimps[50005] = {0};
    for( int i = 0 ; i < N ; ++i ){
      scanf("%d", &chimps[i]);
    }

    scanf("%d", &Q);
    int height;
    for( int i = 0 ; i < Q ; ++i ){
      scanf("%d", &height);

      int *lower = lower_bound(chimps, chimps+N, height);
      int *upper = upper_bound(chimps, chimps+N, height);
      if( (lower == chimps+N) || *lower >= height ){
        --lower;
      }
      if( (lower - chimps) < 0 ){
        printf("X ");
      }
      else{
        printf("%d ", *lower);
      }


      if( (upper - chimps) >= N ){
        printf("X\n");
      }
      else{
        printf("%d\n", *upper);
      }
    }
  }
  return 0;
}
```
