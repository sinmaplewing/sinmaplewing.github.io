---
id: 2228
title: '#UVa：357－Let Me Count The Ways'
slug: uva：357－let-me-count-the-ways
date: '2014-10-04T00:52:42+08:00'
lastmod: '2014-12-31T03:24:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2014/10/04/2228/uva%ef%bc%9a357%ef%bc%8dlet-me-count-the-ways/
wp_status: publish
wp_type: post
---

這題是DP當中經典的找零錢問題。

要算出有多少組合，可以用「最後的一枚硬幣為何」的想法去思考來解題，即可列出下列的式子：
```
dp(價錢) = dp(價錢-1c) + dp(價錢-5c) + dp(價錢-10c) + dp(價錢-25c) + dp(價錢-50c) ...?
```
雖然上述式子看起來對，但你還要保證一件事情就是在最後面一枚硬幣放進去之前，所有前面所排的排法的硬幣金額都不能大於(當然你也可以相反過來用小於)最後面一枚放進去的硬幣，否則的話你就會多算。(例如：第一枚放進去的是10c且最後一枚放進去的是5c的組合會和第一枚放進去的是5c且最後一枚放進去的是10c的組合有重覆的組合，只要兩者總和一樣的話。)

P.S. 這題得用long long。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 357 Let Me Count The Ways                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  long long dp[30005] = {1};
  const long long money[] = {1, 5, 10, 25, 50};
  for( int i = 0 ; i < 5 ; ++i ){
    for( int j = money[i] ; j <= 30000 ; ++j ){
      dp[j] += dp[j-money[i]];
    }
  }

  int n;
  while( scanf( "%d", &n ) != EOF ){
    if( dp[n] == 1 ){
      printf("There is only 1 way to produce %lld cents change.\n", n);
    }
    else{
      printf("There are %lld ways to produce %d cents change.\n", dp[n], n);
    }
  }
  return 0;
}
```
