---
id: 2574
title: '#UVa：11799－Horror Dash'
slug: uva：11799－horror-dash
date: '2015-01-03T22:06:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2015/01/03/2574/uva%ef%bc%9a11799%ef%bc%8dhorror-dash/
wp_status: publish
wp_type: post
---

找尋最大值即是答案。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 11799 Horror Dash                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    for( int testcase = 1 ; testcase <= T ; ++testcase ){
      int N;
      scanf("%d", &N);

      int speed, speedMax = 0;
      for( int i = 0 ; i < N ; ++i ){
        scanf("%d", &speed);
        speedMax = max( speed, speedMax ); 
      }

      printf("Case %d: %d\n", testcase, speedMax);
    }
  
  }
  return 0;
}
```
