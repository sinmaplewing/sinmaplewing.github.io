---
id: 2193
title: '#UVa：972－Horizon Line'
slug: uva：972－horizon-line
date: '2014-09-29T16:33:46+08:00'
lastmod: '2014-12-31T22:54:37+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 9
- UVa
permalink: /2014/09/29/2193/uva%ef%bc%9a972%ef%bc%8dhorizon-line/
wp_status: publish
wp_type: post
---

從頭到尾依序比較線段之值即可得解。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 972 Horizon Line                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int f_step, g_step;
  while( scanf("%d", &f_step) != EOF ){
    float f_value[105] = {0}, f_end[105] = {0};
    float g_value[105] = {0}, g_end[105] = {0};

    for( int i = 0 ; i < f_step ; ++i ){
      scanf("%f%f", &f_value[i], &f_end[i] );
      if( i > 0 ){
        f_end[i] += f_end[i-1];
      }
    }

    scanf("%d", &g_step);
    for( int i = 0 ; i < g_step ; ++i ){
      scanf("%f%f", &g_value[i], &g_end[i]);
      if( i > 0 ){
        g_end[i] += g_end[i-1];
      }
    }

    float answer = 2147483647;
    int f_now = 0, g_now = 0;
    while( f_now < f_step && g_now < g_step ){
      answer = min(answer, max(f_value[f_now], g_value[g_now]));
      if( f_end[f_now] > g_end[g_now] ){
        ++g_now;
      }
      else if( f_end[f_now] < g_end[g_now] ){
        ++f_now;
      }
      else{
        ++f_now;
        ++g_now;
      }
    }

    while( f_now < f_step ){
      answer = min(answer, max(f_value[f_now], g_value[g_now-1]));
      ++f_now;
    }

    while( g_now < g_step ){
      answer = min(answer, max(f_value[f_now-1], g_value[g_now]));
      ++g_now;
    }

    printf("%.3f\n", answer);
  }

  return 0;
}
```
