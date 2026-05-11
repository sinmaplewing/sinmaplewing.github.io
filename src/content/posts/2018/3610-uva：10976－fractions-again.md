---
id: 3610
title: '#UVa：10976－Fractions Again?!'
slug: uva：10976－fractions-again
date: '2018-09-25T23:52:26+08:00'
lastmod: '2018-09-26T02:06:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2018/09/25/3610/uva%ef%bc%9a10976%ef%bc%8dfractions-again/
wp_status: publish
wp_type: post
---

從範圍 [k+1, 2k] 中去窮舉 y 。

至於為什麼是這個範圍，由於相加的兩數至少要比 [latex] \frac{1}{k} [/latex] 小，所以小於 k+1 的數字就不用去考慮；而相加的兩數相等的時候正是 2k ，比 2k 大的話就只是讓之前找的 y 跑到 x 項去而已。故只要從這範圍內找即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10976 Fractions Again?!                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int k;
  while(scanf("%d", &k) != EOF){
    vector<int> answerYs;
    for(int y = k+1 ; y <= 2*k ; ++y){
      if(k * y % (y - k) == 0){
        answerYs.push_back(y);
      }
    }

    printf("%d\n", answerYs.size());
    for(int i = 0 ; i < answerYs.size() ; ++i){
      int y = answerYs[i];
      int x = k * y / (y - k);
      printf("1/%d = 1/%d + 1/%d\n", k, x, y);
    }
  }

  return 0;
}
```
