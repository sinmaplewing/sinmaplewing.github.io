---
id: 2793
title: '#UVa：12444－Bits and Pieces'
slug: uva：12444－bits-and-pieces
date: '2015-05-20T01:19:34+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2015/05/20/2793/uva%ef%bc%9a12444%ef%bc%8dbits-and-pieces/
wp_status: publish
wp_type: post
---

先思考bits運算的特性，C表示的是原本兩個數A和B在該位數皆為1的數值，而D表示的是原本兩個數A和B在該位數其中一個數或是兩個數為1的數值。故判斷是否有解的條件就是C為1的位數至少在D裡面皆為1。

再來若將D-C所得到的數值就為該位數只在其中一邊為1的數值，為了得到B-A要最小，就將D-C的最高位為1的丟到B去，其餘位數丟到A裡面去，最後兩個數再加上共同為1的部分（也就是C），算出來的就會是答案。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 12444 Bits and Pieces                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int findLargestBit(int a){
  for( int i = 30 ; i >= 0 ; --i ){
    if( (a & (1 << i)) > 0 ){
      return a & (1 << i);
    }
  }
  
  return 0;
}

bool hasSolution( int C, int D ){
  for( int i = 0 ; i < 31 ; ++i ){
    if( (C & (1 << i)) > (D & (1 << i)) ){
      return false;
    }
  }
  
  return true;
}

int main(){
  int T, C, D;
  while( scanf("%d", &T) != EOF ){
    for( int i = 0 ; i < T ; ++i ){
      scanf("%d%d", &C, &D);
      if( !(hasSolution(C, D)) ){
        printf("-1\n");
        continue;
      }
      
      int diff = D - C;
      int A = 0, B = 0;
      B = findLargestBit(diff);
      A = diff - B;
      
      B += C;
      A += C;
      
      printf("%d %d\n", A, B);
    }
  }
  return 0;
}
```
