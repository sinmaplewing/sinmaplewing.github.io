---
id: 1278
title: '#UVa：10550－Combination Lock'
slug: uva：10550－combination-lock
date: '2011-12-17T08:55:28+08:00'
lastmod: '2014-12-31T23:07:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2011/12/17/1278/uva%ef%bc%9a10550%ef%bc%8dcombination-lock/
wp_status: publish
wp_type: post
---

此題感覺很簡單，但是請你一定要想一想，如果你順時針轉數字鎖的時候，數字卻是會逆時針轉動的！= = 我被這個騙了三次......

P.S. 不過這次我沒被騙^^b

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10550 Combination Lock                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int num[4], angle;
  while( scanf( "%d%d%d%d",
                &num[0],
                &num[1],
                &num[2],
                &num[3] ) != EOF ){
    if( !num[0] && !num[1] && !num[2] && !num[3] )
      break;
    angle = 1080;
    angle += ((num[0]-num[1])+40)%40*9;
    angle += ((num[2]-num[1])+40)%40*9;
    angle += ((num[2]-num[3])+40)%40*9;
    printf( "%d\n", angle );
  }
  return 0;
}
```
