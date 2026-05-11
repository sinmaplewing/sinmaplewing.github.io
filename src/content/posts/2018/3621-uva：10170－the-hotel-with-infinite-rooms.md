---
id: 3621
title: '#UVa：10170－The Hotel with Infinite Rooms'
slug: uva：10170－the-hotel-with-infinite-rooms
date: '2018-09-26T23:21:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2018/09/26/3621/uva%ef%bc%9a10170%ef%bc%8dthe-hotel-with-infinite-rooms/
wp_status: publish
wp_type: post
---

根據題目敘述可以得到答案即為第 S 團 ~ 第 n 團所待的天數大於等於 D 天中 n 最小的那位，寫成數學式：
[latex] S + (S+1) + (S+2) + ...... + n = \frac{(S + n) \times (n - S + 1)}{2} \text{(等差級數梯形公式)} \leq D \text{(n 為最小符合此式的整數值)} [/latex]

經過整理後可以得到一個一元二次方程式，利用公式解得到相等時 `n` 應為多少。如果 `n` 剛好是整數就是答案；如果有小數位則對其大於它的最小整數即是答案。

P.S. 注意此題數值大小需使用到 `long long int` 。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10170 The Hotel with Infinite Rooms             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  int S, D;
  while(scanf("%d%d", &S, &D) != EOF){
    printf("%d\n", (int)ceil((-1 + sqrt(1 - 4 * (-S*S + S - 2*D))) / 2));
  }

  return 0;
}
```
