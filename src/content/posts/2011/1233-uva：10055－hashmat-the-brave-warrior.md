---
id: 1233
title: '#UVa：10055－Hashmat the Brave Warrior'
slug: uva：10055－hashmat-the-brave-warrior
date: '2011-11-29T22:28:29+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1233/uva%ef%bc%9a10055%ef%bc%8dhashmat-the-brave-warrior/
wp_status: publish
wp_type: post
---

這題只要將兩個數絕對值相減即可，唯一的陷阱就是在於數值範圍，剛好到2^32，就連unsigned int也會爆，所以請用long long吧！

**C++(0.136)**
```cpp
/*******************************************************/
/* UVa 10055 Hashmat the brave warrior                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long warrior1, warrior2;
  while( scanf( "%lld%lld", &warrior1, &warrior2 ) != EOF ){
    printf( "%lld\n", (warrior1 > warrior2)? warrior1-warrior2 : warrior2-warrior1 ); 
  }
  return 0;
}
```
