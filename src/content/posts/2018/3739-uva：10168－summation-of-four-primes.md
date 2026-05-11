---
id: 3739
title: '#UVa：10168－Summation of Four Primes'
slug: uva：10168－summation-of-four-primes
date: '2018-10-04T00:50:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2018/10/04/3739/uva%ef%bc%9a10168%ef%bc%8dsummation-of-four-primes/
wp_status: publish
wp_type: post
---

首先，由於 4 個數字最小一定是 2 ，所以比 8 小的數字絕對不可能拼出來。那麼等於 8 或比 8 的數字，偶數可以先拆成 `2 + 2 + (N-4)` ，奇數可以先拆成 `2 + 3 + (N-5)`，而透過[哥德巴赫猜想](https://zh.wikipedia.org/wiki/%E5%93%A5%E5%BE%B7%E5%B7%B4%E8%B5%AB%E7%8C%9C%E6%83%B3)可以知道任意數字皆可分解成兩個質數，故迴圈找出即可。

P.S. 質數表的建立可以利用篩法。

**參考解法：**[NaiveRed's Blog](http://naivered.github.io/2016/07/03/Problem_Solving/UVa/UVa-10168-Summation-of-Four-Primes/)

**C++(0.090)**
```cpp
/*******************************************************/
/* UVa 10168 Summation of Four Primes                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const int N_MAX_LIMIT = 10000000;
  bool isComposite[N_MAX_LIMIT + 5] = {true, true, false};
  for(int i = 2 ; i <= N_MAX_LIMIT ; ++i){
    if(isComposite[i]) continue;

    for(int j = i+i ; j <= N_MAX_LIMIT ; j += i){
      isComposite[j] = true;
    }
  } 

  int N;
  while(scanf("%d", &N) != EOF){
    if(N < 8){
       printf("Impossible.\n");
       continue;
    }

    if(N % 2 == 0){
      printf("2 2 ");
      N -= 4;
    }
    else{
      printf("2 3 ");
      N -= 5;
    }

    for(int i = 2 ; i <= N ; ++i){
      if(!isComposite[i] && !isComposite[N-i]){
        printf("%d %d\n", i, N-i);
        break;
      }
    }
  }
  return 0;
}
```
