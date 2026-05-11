---
id: 1591
title: '#UVa：10994－Simple Addition'
slug: uva：10994－simple-addition
date: '2012-03-31T09:36:01+08:00'
lastmod: '2014-12-31T23:16:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/03/31/1591/uva%ef%bc%9a10994%ef%bc%8dsimple-addition/
wp_status: publish
wp_type: post
---

其實只要看題目推敲一下，大概可以知道其實就是各個數字最低階不是0的數字的總和。

可將題目要加的拆成各個位數來做，每一個位數都要考慮%10和/10的情況要加多少，將這些值全部加起來即可得解。

P.S. 雖然p,q可以在32bits整數下存放，但可沒說總和也可以喔！

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10994 Simple Addition                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/31                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long p, q;
  long long sum;

  while( scanf( "%lld%lld", &p, &q ) != EOF && !( p < 0 && q < 0 )){
    sum = 0;

    while( p || q ){
      sum += (q%10+p%10)*((q%10)-(p%10)+1)/2;
      sum += (q/10-p/10)*45;

      if( p%10 && (p/10 || q/10) ) p += 10;
      p /= 10;
      q /= 10;
    }

    printf( "%lld\n", sum );
  }
  return 0;
}
```
