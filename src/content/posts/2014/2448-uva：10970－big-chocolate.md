---
id: 2448
title: '#UVa：10970－Big Chocolate'
slug: uva：10970－big-chocolate
date: '2014-12-25T15:58:00+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2014/12/25/2448/uva%ef%bc%9a10970%ef%bc%8dbig-chocolate/
wp_status: publish
wp_type: post
---

切巧克力如果是`1*n`的大小，則最好的切法就是n-1次。若大小為`m*n 且 m > 1`，則就是切成m條`1*n`的巧克力塊，則先切了m-1次，接著m條`1*n`的巧克力塊都要切成`1*1`的巧克力塊，則又再切了`m*(n-1)`次，總和就是切了`(m-1)+(m*(n-1)) = m-1+m*n-m = m*n-1`。則整合一下上述兩種狀況後，可得答案即為`m*n-1`。

**C++(0.065)**
```cpp
/*******************************************************/
/* UVa 10970 Big Chocolate                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int M, N;
  while( scanf("%d%d", &M, &N) != EOF ){
    printf("%d\n", M*N-1 );
  }
  return 0;
}
```
