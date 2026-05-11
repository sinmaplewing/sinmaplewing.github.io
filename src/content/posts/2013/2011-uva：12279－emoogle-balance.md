---
id: 2011
title: '#UVa：12279－Emoogle Balance'
slug: uva：12279－emoogle-balance
date: '2013-01-21T17:20:51+08:00'
lastmod: '2014-12-31T23:23:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 122
- UVa
permalink: /2013/01/21/2011/uva%ef%bc%9a12279%ef%bc%8demoogle-balance/
wp_status: publish
wp_type: post
---

計算零與非零的數量，並相減即可得解。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 12279 Emoogle Balance                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2013/01/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int N;
  int case_number = 1;
  while( scanf("%d", &N) != EOF && N != 0 ){
    int emoogle_balance = 0;
    int event;

    for( int i = 0 ; i < N ; i++ ){
      scanf("%d", &event);
      emoogle_balance += (event != 0)? 1 : -1;
    }

    printf( "Case %d: %d\n", case_number++, emoogle_balance );
  }
  return 0;
}
```
