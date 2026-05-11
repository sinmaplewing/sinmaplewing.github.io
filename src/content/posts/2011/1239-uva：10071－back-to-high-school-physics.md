---
id: 1239
title: '#UVa：10071－Back to High School Physics'
slug: uva：10071－back-to-high-school-physics
date: '2011-11-29T22:54:09+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1239/uva%ef%bc%9a10071%ef%bc%8dback-to-high-school-physics/
wp_status: publish
wp_type: post
---

這題只要套公式即可得解。

P.S. 因為是一等速度運動，所以位移的公式就是 平均速度 * 經過的時間，而因為正好是要兩倍時間後的位移，所以此時的速度即為平均速度，再乘上2倍時間即得解。

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 10071 Back to High School Physics               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int v, t;
  while( scanf( "%d%d", &v, &t ) != EOF ){
    printf( "%d\n", 2*v*t );
  }
  return 0;
}
```
