---
id: 1385
title: '#UVa：11069－A Graph Problem'
slug: uva：11069－a-graph-problem
date: '2012-01-19T16:40:17+08:00'
lastmod: '2014-12-31T23:16:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 110
- UVa
permalink: /2012/01/19/1385/uva%ef%bc%9a11069%ef%bc%8da-graph-problem/
wp_status: publish
wp_type: post
---

重要的點在於題目的兩條規矩：

1. 是選取的子集合內沒有任何一點會連在一起。
2. 是選取的子集合內在需維持符合第一條規矩的情況下無法再加入額外的點。

這題在挑選子集合的時候，一定得從1或2開始，不然要是從3(或更大的值)開始取的話，我可以在這個子集合內加入1，這樣並不會破壞題目所說的第一條規矩，也因此不符合題目的第二條規矩。

再者選好初始值後，接下來只會不斷加入的是+2的值或是+3的值，不然假設加入了+4(或+更大的值)的值，那麼我可以在這個子集合內加入+2的值，並且不會破壞題目所說的第一條規矩，而因此不符合題目的第二條規矩。

所以dp式子可以寫成dp[i] = dp[i-2] + dp[i-3]

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11069 A Graph Problem                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  int dp[80] = {0,1,2,2};
  for( int i = 4 ; i <= 76 ; i++ )
    dp[i] = dp[i-2] + dp[i-3];
  while( scanf( "%d", &n ) != EOF )
    printf( "%d\n", dp[n] );
  return 0;
}
```
