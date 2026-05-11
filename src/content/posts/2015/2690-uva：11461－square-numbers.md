---
id: 2690
title: '#UVa：11461－Square Numbers'
slug: uva：11461－square-numbers
date: '2015-01-26T21:52:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2015/01/26/2690/uva%ef%bc%9a11461%ef%bc%8dsquare-numbers/
wp_status: publish
wp_type: post
---

先建表算出1~N有幾個square numbers，接著利用減法就可以算出a~b有幾個square numbers。

**C=+(0.012)**
```cpp
/*******************************************************/
/* UVa 11461 Square Numbers                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

const int LIMIT = 100000;

int main(){
  int dp[LIMIT + 5] = {0};
  for( int i = 1 ; i * i <= LIMIT ; ++i ){
    ++dp[i*i];

    int limit = min(LIMIT, (i+1)*(i+1));
    for( int j = i * i + 1 ; j <= limit ; ++j ){
      dp[j] = dp[j-1];
    }
  }

  int a, b;
  while( scanf("%d%d", &a, &b) != EOF && (a != 0 || b != 0) ){
    printf("%d\n", dp[b] - dp[a-1]);
  }
  return 0;
}
```
