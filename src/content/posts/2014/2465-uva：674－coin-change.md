---
id: 2465
title: '#UVa：674－Coin Change'
slug: uva：674－coin-change
date: '2014-12-29T15:46:12+08:00'
lastmod: '2014-12-31T22:51:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2014/12/29/2465/uva%ef%bc%9a674%ef%bc%8dcoin-change/
wp_status: publish
wp_type: post
---

利用類似質數建表的方式把方法數的對照表建出來，一次先以一種硬幣去加方法數，全部加完再加下一種硬幣的方法數，這樣可以去避免方法重複的部分(`ex. 6 = 1+5 = 5+1`)。

**C++(0.058)**
```cpp
/*******************************************************/
/* UVa 674 Coin Change                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const int MAX_COIN_VALUE = 7489;
  const int coinValues[] = { 1, 5, 10, 25, 50 };
  const int MAX_COIN_TYPE = sizeof(coinValues) / sizeof(int);

  int ways[MAX_COIN_VALUE + 5] = {1};
  for( int i = 0 ; i < MAX_COIN_TYPE ; ++i ){
    for(int j = 0 ; j <= MAX_COIN_VALUE ; ++j ){
      if( j + coinValues[i] > MAX_COIN_VALUE ) break;
      ways[j+coinValues[i]] += ways[j];
    }
  }

  int amount;
  while( scanf("%d", &amount) != EOF ){
    printf("%d\n", ways[amount]);
  }

  return 0;
}
```
