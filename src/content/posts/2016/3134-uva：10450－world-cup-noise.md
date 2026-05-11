---
id: 3134
title: '#UVa：10450－World Cup Noise'
slug: uva：10450－world-cup-noise
date: '2016-04-29T11:13:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2016/04/29/3134/uva%ef%bc%9a10450%ef%bc%8dworld-cup-noise/
wp_status: publish
wp_type: post
---

剛開始如果長度是2的話有0和1的可能，接著對於下一次的可能性，如果尾巴是0則可增加0或1(...00, ...01)，而如果尾巴是1則只能增加0(...10)，可以得到其成長為一個費氏數列的形式。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10450 World Cup Noise                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  long long fib[60] = {1, 2};
  for( int i = 2 ; i <= 51 ; ++i ){
    fib[i] = fib[i-1] + fib[i-2];
  }
  
  int caseCount;
  while( scanf("%d", &caseCount) != EOF ){
    for( int caseNumber = 1 ; caseNumber <= caseCount ; ++caseNumber ){
      int n;
      scanf("%d", &n);
      printf("Scenario #%d:\n", caseNumber);
      printf("%lld\n\n", fib[n]);
    }
  }
  return 0;
}
```
