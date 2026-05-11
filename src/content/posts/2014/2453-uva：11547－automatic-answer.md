---
id: 2453
title: '#UVa：11547－Automatic Answer'
slug: uva：11547－automatic-answer
date: '2014-12-26T00:28:50+08:00'
lastmod: '2014-12-31T23:21:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2014/12/26/2453/uva%ef%bc%9a11547%ef%bc%8dautomatic-answer/
wp_status: publish
wp_type: post
---

照著題目之公式算出答案即可。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 11547 Automatic Answer                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
using namespace std;

int main(){
  int t;
  while( scanf("%d", &t) != EOF ){
    for( int i = 0 ; i < t ; ++i ){
      int n;
      scanf("%d", &n);

      printf("%d\n", abs(((n * 567 / 9 + 7492) * 235 / 47 - 498) / 10 % 10 ));
    }
  }

  return 0;
}
```
