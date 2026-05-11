---
id: 2589
title: '#UVa：11044－Searching for Nessy'
slug: uva：11044－searching-for-nessy
date: '2015-01-06T02:42:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 110
- UVa
permalink: /2015/01/06/2589/uva%ef%bc%9a11044%ef%bc%8dsearching-for-nessy/
wp_status: publish
wp_type: post
---

由於邊界可不計，即是指說除不盡則完全捨棄，故只要(n/3)*(m/3)即是答案。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 11044 Searching for Nessy                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const int gridSize = 3;

  int t;
  while( scanf("%d", &t) != EOF ){
    for( int testcase = 1 ; testcase <= t ; ++testcase ){
      int n, m;
      scanf("%d%d", &n, &m);
      
      printf("%d\n", (n / gridSize) * (m / gridSize));
    }
  }
  return 0;
}
```
