---
id: 4185
title: '#UVa：10784－Diagonal'
slug: uva：10784－diagonal
date: '2019-04-03T09:20:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 107
- UVa
permalink: /2019/04/03/4185/uva%ef%bc%9a10784%ef%bc%8ddiagonal/
wp_status: publish
wp_type: post
---

多邊形的對角線公式為 [latex] \frac{(n-3) \times n}{2} [/latex]，公式的原因是每個點都可以與除了自己與相鄰兩點進行對角線連線，所以會是 [latex] (n-3) \times n [/latex]，但因為兩兩會重複，所以要再除以 2 。

接著主要要求的是在有總數的情況下， n 是多少，也就是這個方程式 [latex] \frac{(n-3) \times n}{2} = N [/latex]，利用二次方程式的公式解，可以得到 [latex] N = \lceil \frac{3 + \sqrt{9 + 8 \times N}}{2} \rceil [/latex]，即可得解。

P.S. 此題數字必須使用 64 位元整數儲存，已經超過了 32 位元整數能儲存的範圍。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10784 Diagonal                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  long long int N;
  int caseNumber = 1;
  while(scanf("%lld", &N) != EOF && N != 0){
    long long int sideCount = (long long int)ceil((3 + sqrt(9 + 8 * N)) / 2);
    printf("Case %d: %lld\n", caseNumber++, sideCount);
  }
  return 0;
}
```
