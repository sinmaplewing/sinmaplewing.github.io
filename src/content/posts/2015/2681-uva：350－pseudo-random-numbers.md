---
id: 2681
title: '#UVa：350－Pseudo-Random Numbers'
slug: uva：350－pseudo-random-numbers
date: '2015-01-15T11:18:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/01/15/2681/uva%ef%bc%9a350%ef%bc%8dpseudo-random-numbers/
wp_status: publish
wp_type: post
---

利用陣列紀錄每次抵達某數字是在第幾次運算的時候，到最後發現重複就可以停下來算出循環的長度。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 350 Pseudo-Random Numbers                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int caseNumber = 1;
  int Z, I, M, L;
  while( scanf("%d%d%d%d", &Z, &I, &M, &L) != EOF &&
         ( Z != 0 || I != 0 || M != 0 || L != 0 ) ){
    int isVisited[10000] = {0};
    int length = 0;
    while( isVisited[L] == 0 ){
      ++length;
      isVisited[L] = length;
      L = (Z * L + I) % M;
    }

    printf("Case %d: %d\n", caseNumber++, length - isVisited[L] + 1);
  }
  return 0;
}
```
