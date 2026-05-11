---
id: 4700
title: '#UVa：11614－Etruscan Warriors Never Play Chess'
slug: uva：11614－etruscan-warriors-never-play-chess
date: '2020-01-28T10:38:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2020/01/28/4700/uva%ef%bc%9a11614%ef%bc%8detruscan-warriors-never-play-chess/
wp_status: publish
wp_type: post
---

利用每一層總和所形成的等差數列 `1 + 2 + 3 + ... + n` 的一元二次方程式之公式解即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11614 Etruscan Warriors Never Play Chess        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/01/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  int totalCaseCount;
  while(scanf("%d", &totalCaseCount) != EOF){
    for(int caseNumber = 1 ; caseNumber <= totalCaseCount ; ++caseNumber){
      long long int n;
      scanf("%lld", &n);
      
      long long int result = (-1 + sqrt(1 + 4 * 2 * n)) / 2;
      printf("%lld\n", result);
    }
  }
  return 0;
}
```
