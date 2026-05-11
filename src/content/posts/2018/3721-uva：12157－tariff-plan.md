---
id: 3721
title: '#UVa：12157－Tariff Plan'
slug: uva：12157－tariff-plan
date: '2018-10-01T10:05:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 121
- UVa
permalink: /2018/10/01/3721/uva%ef%bc%9a12157%ef%bc%8dtariff-plan/
wp_status: publish
wp_type: post
---

照著題目的公式算出來找出最小的那個計畫即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12157 Tariff Plan                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/01                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
using namespace std;

int main(){
  int T;
  while(scanf("%d", &T) != EOF){
    for(int caseNumber = 1 ; caseNumber <= T ; ++caseNumber){
      int N;
      scanf("%d", &N);

      int mileTotalCost = 0, juiceTotalCost = 0;
      for(int i = 0 ; i < N ; ++i){
        int duration;
        scanf("%d", &duration);

        mileTotalCost += (duration / 30 + 1) * 10;
        juiceTotalCost += (duration / 60 + 1) * 15;
      }

      printf("Case %d: ", caseNumber);
      if(mileTotalCost <= juiceTotalCost) printf("Mile ");
      if(juiceTotalCost <= mileTotalCost) printf("Juice ");
      printf("%d\n", min(mileTotalCost, juiceTotalCost));
    }
  }
  return 0;
}
```
