---
id: 2666
title: '#UVa：568－Just the Facts'
slug: uva：568－just-the-facts
date: '2015-01-14T20:22:06+08:00'
lastmod: '2019-03-28T10:06:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2015/01/14/2666/uva%ef%bc%9a568%ef%bc%8djust-the-facts/
wp_status: publish
wp_type: post
---

<del>循序從1~10000一直乘上去，由於最大值是到10000，因此每次計算完留下結尾非零的五位數再去做乘法，即可得到正確的最後一位非零數字。</del>

循序從 1 到 10000 一直乘上去，雖然最大值是到 10000 ，但無法在每次計算完僅留結尾，因為這個乘法去零的動作其實隱性的位數有再一直提升，所以前面截掉的部分到越後面就越有可能影響，所以最後就是利用大數乘法先乘完後，將答案都先記下來後，再輸出它要的答案即可。

**C++(0.110)**
```cpp
/*******************************************************/
/* UVa 568 Just the Facts                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int dp[10005] = {1, 1};
  int num[10000] = {1};
  int minDigit = 0;
  int maxDigit = 1;

  for(int i = 2 ; i <= 10000 ; ++i){
    for(int j = minDigit ; j < maxDigit ; ++j){
      num[j] *= i;
    }

    for(int j = minDigit ; j < maxDigit || num[j] >= 10000 ; ++j){
      num[j+1] += num[j] / 10000;
      num[j] %= 10000;
    }

    while(num[minDigit] == 0) ++minDigit;
    while(num[maxDigit] != 0) ++maxDigit;

    int digit = num[minDigit];
    while(digit % 10 == 0) digit /= 10;
    dp[i] = digit % 10;
  }

  int N;
  while( scanf("%d", &N) != EOF ){
    printf("%5d -> %d\n", N, dp[N]);
  }
  return 0;
}
```
