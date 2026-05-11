---
id: 4856
title: '#UVa：10465－Homer Simpson'
slug: uva：10465－homer-simpson
date: '2020-04-28T00:37:40+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2020/04/28/4856/uva%ef%bc%9a10465%ef%bc%8dhomer-simpson/
wp_status: publish
wp_type: post
---

先利用需要花最少時間吃完的漢堡算出最多可能的漢堡數量，接著一個一個扣下來換另外一個漢堡試試看，最後從這過程中找出剩下時間可以最短的組合即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10465 Homer Simpson                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
using namespace std;

int main() {
  int m, n, t;
  while (scanf("%d%d%d", &m, &n, &t) != EOF) {
    int minBurgerTime = min(m, n);
    int maxBurgerTime = max(m, n);

    int maxBurgerAmount = t / minBurgerTime;
    int remainingTime = t - maxBurgerAmount * minBurgerTime;
    for (int i = maxBurgerAmount - 1 ; i >= 0 && remainingTime != 0 ; --i) {
      int currentRemainingTime = t - i * minBurgerTime;
      int anotherBurgerAmount = currentRemainingTime / maxBurgerTime;
      currentRemainingTime -= anotherBurgerAmount * maxBurgerTime;
      
      if (currentRemainingTime < remainingTime) {
        maxBurgerAmount = i + anotherBurgerAmount;
        remainingTime = currentRemainingTime;
      }
    }

    printf("%d", maxBurgerAmount);
    if (remainingTime > 0) printf(" %d", remainingTime);
    printf("\n");
  }
  return 0;
}
```
