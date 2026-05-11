---
id: 1382
title: '#UVa：900－Brick Wall Patterns'
slug: uva：900－brick-wall-patterns
date: '2012-01-19T16:13:58+08:00'
lastmod: '2014-12-31T22:54:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 9
- UVa
permalink: /2012/01/19/1382/uva%ef%bc%9a900%ef%bc%8dbrick-wall-patterns/
wp_status: publish
wp_type: post
---

這題的規律其實就是費氏數列。

令牆壁的長度為n，n若等於1，就是1塊；n若等於2，就是2塊；n若大於2，則n長度的牆壁可由n-1長度的牆壁加一塊垂直的方塊以及由n-2長度的牆壁加兩塊平行的方塊而得到。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 900 Brick Wall Patterns                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int dp[55] = {0,1,2};
  int n;
  for( int i = 3 ; i <= 50 ; i++ )
    dp[i] = dp[i-1]+dp[i-2];
  while( scanf( "%d", &n ) != EOF && n )
    printf( "%d\n", dp[n] );
  return 0;
}
```
