---
id: 4885
title: '#UVa：11900－Boiled Eggs'
slug: uva：11900－boiled-eggs
date: '2020-05-06T10:53:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2020/05/06/4885/uva%ef%bc%9a11900%ef%bc%8dboiled-eggs/
wp_status: publish
wp_type: post
---

利用 Q 的容量對雞蛋的重量做 0-1 背包問題，得出來可放入 Q 容量的最大雞蛋數後，再與 P 數量取最小值即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11900 Boiled Eggs                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
using namespace std;

int main() {
  int T;
  while (scanf("%d", &T) != EOF) {
    for (int caseNumber = 1 ; caseNumber <= T ; ++caseNumber) {
      int n, P, Q;
      scanf("%d%d%d", &n, &P, &Q);

      vector<int> eggs;
      for (int i = 0 ; i < n ; ++i) {
        int egg;
        scanf("%d", &egg);
        eggs.push_back(egg);
      }

      vector<int> weightDPTable(Q + 1, 0);
      for (int i = 0 ; i < n ; ++i) {
        for (int j = Q ; j >= eggs[i] ; --j) {
          weightDPTable[j] = max(weightDPTable[j], weightDPTable[j - eggs[i]] + 1);
        }
      }

      printf("Case %d: %d\n", caseNumber, min(weightDPTable[Q], P));
    }
  }

  return 0;
}
```
