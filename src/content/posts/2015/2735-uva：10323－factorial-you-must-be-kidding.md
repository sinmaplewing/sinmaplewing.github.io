---
id: 2735
title: '#UVa：10323－Factorial! You Must be Kidding!!!'
slug: uva：10323－factorial-you-must-be-kidding
date: '2015-05-06T00:43:01+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2015/05/06/2735/uva%ef%bc%9a10323%ef%bc%8dfactorial-you-must-be-kidding/
wp_status: publish
wp_type: post
---

照題目算出n階是否落於範圍內、大於範圍或是小於範圍。但這題最雷的是**會有負數的狀況**，根據目前[algorithmist](http://www.algorithmist.com/index.php/UVa_10323)的說法，若要算F(-1)，就用F(0)/0去算；算F(-2)，就用F(-1)/-1，以此類推去輸出Overflow或是Underflow。（照上例，F(-1)為正無限大，F(-2)多了個負號，所以變成負無限大）

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 10323 Factorial! You Must be Kidding!!!         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const long long int UPPER_BOUND = 6227020800;
  const long long int LOWER_BOUND = 10000;
  long long int mem[10005] = { 1, 1 };
  
  int lower_n = -1, upper_n = -1;
  for( int i = 2 ; mem[i-1] <= UPPER_BOUND && i < 10000 ; ++i ){
    mem[i] = mem[i-1] * i;
    if( lower_n == -1 && mem[i] >= LOWER_BOUND ){
      lower_n = i;
    }
    
    if( upper_n == -1 && mem[i] > UPPER_BOUND ){
      upper_n = i-1;
      break;
    }
  }
  
  int n;
  while( scanf("%d", &n) != EOF ){
    if( n < 0 ){
      if( n % 2 == 0 ){
        printf("Underflow!\n");
      }
      else{
        printf("Overflow!\n");
      }
    }
    else if( n < lower_n ){
      printf("Underflow!\n");
    }
    else if( n > upper_n ){
      printf("Overflow!\n");
    }
    else{
      printf("%lld\n", mem[n]);
    }
  }
  
  
  return 0;
}
```
