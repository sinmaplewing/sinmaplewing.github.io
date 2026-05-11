---
id: 2998
title: '#UVa：446－Kibbles "n" Bits "n" Bits "n" Bits'
slug: uva：446－kibbles-n-bits-n-bits-n-bits
date: '2015-12-02T14:52:19+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/12/02/2998/uva%ef%bc%9a446%ef%bc%8dkibbles-n-bits-n-bits-n-bits/
wp_status: publish
wp_type: post
---

利用%x將十六進位制數字直接輸入，接著利用bit運算輸出二進位格式，至於加減結果直接對數值做加法或減法即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 446 Kibbles "n" Bits "n" Bits "n" Bits          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

void printBinary(int n){
  for( int i = 12 ; i >= 0 ; --i ){
    printf("%d", (n & (1 << i)) >> i );
  }
}

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    int a, b;
    char op;
    for( int i = 0 ; i < N ; ++i ){
      scanf("%x %c %x", &a, &op, &b);

      printBinary(a);
      printf(" %c ", op);
      printBinary(b);

      if( op == '+' ){
        printf(" = %d\n", a+b );
      }
      else if( op == '-' ){
        printf(" = %d\n", a-b );
      }
    }
  }

  return 0;
}
```
