---
id: 1525
title: '#UVa：10346－Peter''s Smokes'
slug: uva：10346－peters-smokes
date: '2012-03-26T00:04:57+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2012/03/26/1525/uva%ef%bc%9a10346%ef%bc%8dpeters-smokes/
wp_status: publish
wp_type: post
---

n支紙煙先k支k支的抽，抽完後每k支可變成1支，再將剩下沒抽到的煙加起k支可換成的煙，再重複動作，直到剩下的煙不滿k支再全部抽掉即得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10346 Peter's Smokes                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/25                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, k, temp;
  int cigarette;
  while( scanf( "%d%d", &n, &k ) != EOF ){
    cigarette = n;
    while( n/k ){
      cigarette += n/k;
      n = n/k + n%k;
    }
    printf( "%d\n", cigarette );
  }
  return 0;
}
```
