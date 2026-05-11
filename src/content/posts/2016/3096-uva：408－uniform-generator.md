---
id: 3096
title: '#UVa：408－Uniform Generator'
slug: uva：408－uniform-generator
date: '2016-04-20T13:05:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/20/3096/uva%ef%bc%9a408%ef%bc%8duniform-generator/
wp_status: publish
wp_type: post
---

利用一個布林陣列記住所有產出的隨機數，在遇到重複的隨機數時判斷是否已經讓所有0~(mod-1)的數字都出現過即可得解。

**C++(0.050)**
```cpp
/*******************************************************/
/* UVa 408 Uniform Generator                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int step, mod;
  while( scanf("%d%d", &step, &mod) != EOF ){
    bool hasUsed[1000005] = {false};
    int count = 0;
    for( int i = 0; !hasUsed[i] ; i = (i + step) % mod, ++count ){
      hasUsed[i] = true;
    }

    printf("%10d%10d    ", step, mod);
    if( count == mod ){
      printf("Good Choice");
    }
    else{
      printf("Bad Choice");
    }
    printf("\n\n");

  }
  return 0;
}

```
