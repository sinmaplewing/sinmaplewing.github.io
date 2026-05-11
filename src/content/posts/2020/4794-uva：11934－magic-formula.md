---
id: 4794
title: '#UVa：11934－Magic Formula'
slug: uva：11934－magic-formula
date: '2020-04-11T17:46:26+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2020/04/11/4794/uva%ef%bc%9a11934%ef%bc%8dmagic-formula/
wp_status: publish
wp_type: post
---

照著題目要求的循序去找即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11934 Magic Formula                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/11                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int a, b, c, d, L;
  while(scanf("%d%d%d%d%d", &a, &b, &c, &d, &L) != EOF &&
        (a != 0 || b != 0 || c != 0 || d != 0 || L != 0)){
    int count = 0;
    for(int i = 0 ; i <= L ; ++i){
      if((a*i*i + b*i + c) % d == 0) ++count;
    }   
    
    printf("%d\n", count);
  }
  return 0;
}
```
