---
id: 1519
title: '#UVa：10079－Pizza Cutting'
slug: uva：10079－pizza-cutting
date: '2012-03-25T20:10:32+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/25/1519/uva%ef%bc%9a10079%ef%bc%8dpizza-cutting/
wp_status: publish
wp_type: post
---

題目其實就是要問幾條線最多能切出幾塊平面的意思。

我們可以知道1條線最多可以切2塊平面，2條線最多可以切4塊平面。假設n-1條線已經切了k塊平面，現在要問n條線可以切出幾塊平面，那麼就好像是n-1條線又要再加上一條線，這條線怎麼切會增加最多的平面呢？

答案是和前n-1條線都有交到會最多，那麼這條線從邊緣~第一條線的交點地方可以多切出一塊平面，第一條線的交點~第二條線的交點的地方也可以多切出一塊平面......以此類推，一直到第n-2條線的交點~第n-1條線的交點又可以多切出一塊平面，第n-1條線到另外一邊的邊緣又會多切出一塊平面，總共就比n-1條線的情況多切出了n個平面，那麼公式就呼之欲出了。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10079 Pizza Cutting                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/25                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long N;
  while( scanf( "%lld", &N ) != EOF && N >= 0 )
    printf( "%lld\n", (N+1)*N/2+1 );
  return 0;
}
```
