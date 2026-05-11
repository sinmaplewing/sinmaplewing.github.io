---
id: 2713
title: '#UVa：11636－Hello World!'
slug: uva：11636－hello-world
date: '2015-03-15T01:46:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2015/03/15/2713/uva%ef%bc%9a11636%ef%bc%8dhello-world/
wp_status: publish
wp_type: post
---

找出N是2的幾次方，並取其次方上界之整數即可得解。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 11636 Hello World!                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  int caseNumber = 1;
  int N;
  while( scanf("%d", &N) != EOF && N > 0 ){
    int Y = ceil(log2(N));
    printf("Case %d: %d\n", caseNumber++, Y);
  }
  return 0;
}
```
