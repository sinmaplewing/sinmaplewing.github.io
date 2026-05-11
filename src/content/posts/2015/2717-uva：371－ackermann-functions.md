---
id: 2717
title: '#UVa：371－Ackermann Functions'
slug: uva：371－ackermann-functions
date: '2015-03-15T04:06:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/03/15/2717/uva%ef%bc%9a371%ef%bc%8dackermann-functions/
wp_status: publish
wp_type: post
---

照題目算出區間內能夠產生最長序列的數字為何即可。要注意的事情是，輸入不見得是直接輸入`L H`，有可能會輸入`H L`，如果發現輸入的第一個數字比第二個數字大的時候要記得交換。然後雖然題目說不會超過32 bits的整數，但用64 bits還是比較保險。

**C++(0.242)**
```cpp
/*******************************************************/
/* UVa 371 Ackermann Functions                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

const int RANGE = 5000000;

int ackermann(long long int n, bool isFirst){
  if( !isFirst && n == 1 ) return 1;
  if( n % 2 == 0 ) {
    return ackermann( n / 2, false ) + (isFirst? 0 : 1);
  }
  else {
    return ackermann( 3 * n + 1, false ) + (isFirst? 0 : 1);
  }
}

int main(){
  long long int L, H;
  while( scanf("%lld%lld", &L, &H) != EOF && L != 0 && H != 0 ){
    if( L > H ) swap(L, H);
    int maxLength = 0;
    long long int V = 0;
    for( long long int i = L ; i <= H ; ++i ){
      int length = ackermann(i, true);
      if( length > maxLength ){
        maxLength = length;
        V = i;
      }
    }

    printf("Between %lld and %lld, %lld generates the longest sequence of %d values.\n", L, H, V, maxLength);
  }
  return 0;
}
```
