---
id: 4854
title: '#UVa：12646－Zero or One'
slug: uva：12646－zero-or-one
date: '2020-04-27T02:01:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 126
permalink: /2020/04/27/4854/uva%ef%bc%9a12646%ef%bc%8dzero-or-one/
wp_status: publish
wp_type: post
---

根據題目規則去比較得到結果即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12646 Zero or One                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main() {
  int aChoose, bChoose, cChoose;
  while (scanf("%d%d%d", &aChoose, &bChoose, &cChoose) != EOF) {
    if (aChoose != bChoose && aChoose != cChoose) printf("A\n");
    else if (bChoose != aChoose && bChoose != cChoose) printf("B\n");
    else if (cChoose != aChoose && cChoose != bChoose) printf("C\n");
    else printf("*\n");
  }
  return 0;
}
```
