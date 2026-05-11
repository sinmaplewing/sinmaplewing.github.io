---
id: 2799
title: '#UVa：10130－SuperSale'
slug: uva：10130－supersale
date: '2015-05-22T10:51:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2015/05/22/2799/uva%ef%bc%9a10130%ef%bc%8dsupersale/
wp_status: publish
wp_type: post
---

將每個人當作一個背包，去對所有物品做背包問題，然後將得到的最高價值給總和起來即是答案。

**C++(0.139)**
```cpp
/*******************************************************/
/* UVa 10130 SuperSale                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/22                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

struct Item{
  int weight;
  int price;
};

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    for( int testcase = 0 ; testcase < T ; ++testcase ){
      int N;
      scanf("%d", &N);
      
      Item items[1005];
      for( int i = 0 ; i < N ; ++i ){
        scanf("%d%d", &items[i].price, &items[i].weight);
      }
      
      int G;
      scanf("%d", &G);
      
      int MW;
      int maxValue = 0;
      for( int i = 0 ; i < G ; ++i ){
        scanf("%d", &MW);
        
        int dp[35] = {0};
        for( int j = 0 ; j < N ; ++j ){
          for( int k = MW ; k >= 0 ; --k ){
            if( k >= items[j].weight ){
              dp[k] = max(dp[k], dp[k-items[j].weight]+items[j].price);
            }
          }
        }
        
        maxValue += dp[MW];
      }
      
      printf("%d\n", maxValue);
    }
  }
  return 0;
}
```
