---
id: 2754
title: '#UVa：11805－Bafana Bafana'
slug: uva：11805－bafana-bafana
date: '2015-05-10T02:03:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 118
- UVa
permalink: /2015/05/10/2754/uva%ef%bc%9a11805%ef%bc%8dbafana-bafana/
wp_status: publish
wp_type: post
---

先將編號從1~N轉成0~(N-1)，再算球移到哪一個人上，最後轉換編號從0~(N-1)轉回1~N的編號即可得解。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 11805 Bafana Bafana                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    for( int t = 1 ; t <= T ; ++t ){
      int N, K, P;
      scanf("%d%d%d", &N, &K, &P);
      printf("Case %d: %d\n", t, ( (K-1) + P ) % N + 1);
    }
  }
  return 0;
}

```
