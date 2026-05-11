---
id: 2261
title: '#UVa：679－Dropping Balls'
slug: uva：679－dropping-balls
date: '2014-10-07T16:32:43+08:00'
lastmod: '2014-12-31T22:51:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2014/10/07/2261/uva%ef%bc%9a679%ef%bc%8ddropping-balls/
wp_status: publish
wp_type: post
---

可用二進位來做思考。

首先最後的答案一定會是具有D個二進位位元，又由於球掉在葉節點的意思就是最後掉的位置的最高位必為1，接著可以將整個球掉落過程思考成從第二高位到最低位的高低位反過來的加法，即可得解。

用個例子說明，假設D為4，則最後答案若表示成二進位會有四位位元，而最高位必為1，也就會變成1xxx(x有可能為0，有可能為1)。後面xxx的部分就想成從高位數到低位數的高低位反過來的加法。例如第一顆球掉的位置為8(後三位為000)，第二顆球掉的位置為12(後三位為100)，第三顆球掉的位置為10(後三位為010)，第四顆球掉的位置為14(後三位為110)......以此類推。

**C++(0.062)**
```cpp
/*******************************************************/
/* UVa 679 Dropping Balls                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N) != EOF && N != -1 ){
    for( int i = 0 ; i < N ; ++i ){
      int D, I;
      scanf( "%d%d", &D, &I );

      int answer = 1 << (D-1);
      
      --I;
      for( int j = D-2 ; j >= 0 ; --j ){
        answer |= (I % 2) << j;
        I /= 2;
      }

      printf("%d\n", answer);
    }
  }
  return 0;
}
```
