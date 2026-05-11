---
id: 1724
title: '#UVa：847－A Multiplication Game'
slug: uva：847－a-multiplication-game
date: '2012-04-20T10:12:20+08:00'
lastmod: '2014-12-31T22:54:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 8
- UVa
permalink: /2012/04/20/1724/uva%ef%bc%9a847%ef%bc%8da-multiplication-game/
wp_status: publish
wp_type: post
---

解法是：先假設剛開始n的範圍如果是在1~9，那麼Stan乘上9就一定會贏。

再來假設n的範圍如果是在10~18，那麼Stan會發現他不論將p乘上多少都一定會輸，所以就假設最小的情況Stan乘上2，而Ollie是最大的情況去乘上9。

接著範圍如果到了19~162，最小範圍19是因為Ollie上一個乘法的最極限範圍只能到18，只要到了19以上，Stan就一定可以想辦法湊出勝利。

而最大範圍162來自於：Stan想要贏，所以拼命去乘9，Ollie不想讓對方贏，所以拼命去乘2，所以就可以得到最大極限範圍就是162。

簡單來說，這題只要不斷乘2乘9，就可以解決了！

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 847 A Multiplication Game                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long n, p;
  bool stan_win;
  while( scanf( "%lld", &n ) != EOF ){
    stan_win = false;
    p = 1;
    do{
      stan_win ^= 1;
      if( stan_win ) p *= 9 ;
      else p *= 2;
    } while( p < n );

    if( stan_win ) printf( "Stan wins.\n" );
    else printf( "Ollie wins.\n" );
  }
  return 0;
}
```
