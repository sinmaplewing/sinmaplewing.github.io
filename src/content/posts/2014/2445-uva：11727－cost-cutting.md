---
id: 2445
title: '#UVa：11727－Cost Cutting'
slug: uva：11727－cost-cutting
date: '2014-12-25T15:12:01+08:00'
lastmod: '2014-12-31T23:21:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2014/12/25/2445/uva%ef%bc%9a11727%ef%bc%8dcost-cutting/
wp_status: publish
wp_type: post
---

照題目要求去找中間值即是答案

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 11727 Cost Cutting                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    for( int i = 1 ; i <= T ; ++i ){
      int salary[3];
      scanf("%d%d%d", &salary[0], &salary[1], &salary[2]);
      printf("Case %d: %d\n", i, max( min(salary[0], salary[1]), min( max(salary[0], salary[1]), salary[2] ) ));
    }
  }
  return 0;
}

```
