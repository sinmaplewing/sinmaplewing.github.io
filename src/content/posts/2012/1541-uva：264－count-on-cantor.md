---
id: 1541
title: '#UVa：264－Count on Cantor'
slug: uva：264－count-on-cantor
date: '2012-03-27T23:02:42+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/03/27/1541/uva%ef%bc%9a264%ef%bc%8dcount-on-cantor/
wp_status: publish
wp_type: post
---

找出n所在的那排斜排編號以及該斜排的最末項編號，並找出此兩編號與第n項的分母分子的關係即可得解。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 264 Count on Cantor                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/27                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  int slash, term;
  int part1, part2;

  while( scanf( "%d", &n ) != EOF ){
    slash = 1;
    term = 1;
    while( term < n ) term += ++slash;

    part1 = 1 + term - n;
    part2 = slash - part1 + 1;

    printf( "TERM %d IS ", n );
    if( slash % 2 ) printf( "%d/%d\n", part1, part2 );
    else printf( "%d/%d\n", part2, part1 );
  }
  return 0;
}
``` 
