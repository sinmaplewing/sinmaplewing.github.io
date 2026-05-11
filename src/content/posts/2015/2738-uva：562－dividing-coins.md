---
id: 2738
title: '#UVa：562－Dividing coins'
slug: uva：562－dividing-coins
date: '2015-05-07T09:42:04+08:00'
lastmod: '2015-05-07T09:42:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2015/05/07/2738/uva%ef%bc%9a562%ef%bc%8ddividing-coins/
wp_status: publish
wp_type: post
---

利用Dynamic Programming去做，題目其實就是要求利用這些硬幣能夠塞到的最接近總和平均的數值。

**C++(0.029)**
```cpp

/*******************************************************/
/* UVa 562 Dividing coins                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    for( int testcase = 0 ; testcase < n ; ++testcase ){
      int m;
      scanf("%d", &m);
      
      int sum = 0;
      int coins[105] = {0};
      for( int i = 1 ; i <= m ; ++i ){
        scanf("%d", &coins[i]);
        sum += coins[i];
      }
      
      int average = sum / 2;
      vector<int> dp( average+5, 0 );
      for( int i = 1 ; i <= m ; ++i ){
        for( int j = average ; j >= coins[i] ; --j ){
          dp[j] = max( dp[j], dp[j-coins[i]] + coins[i] );
        }
      }
      
      printf("%d\n", (sum-dp[average]) - dp[average]);
    }
  }
  return 0;
}
```
