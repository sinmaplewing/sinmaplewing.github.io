---
id: 2733
title: '#UVa：324－Factorial Frequencies'
slug: uva：324－factorial-frequencies
date: '2015-05-05T12:27:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/05/05/2733/uva%ef%bc%9a324%ef%bc%8dfactorial-frequencies/
wp_status: publish
wp_type: post
---

利用大數乘法的方式算出每一個階層的答案，並將算出來的答案事先先存起來即可。 

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 324 Factorial Frequencies                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAXDIGIT = 785;
const int MAXNUMBER = 368;

int main(){
  int num[MAXDIGIT] = {1}, mem[MAXNUMBER][10] = {0};
  mem[0][0] = 1;
  mem[1][1] = 1;
  for( int i = 2 ; i < MAXNUMBER ; ++i ){
    int carry = 0;
    for( int j = 0 ; j < MAXDIGIT ; ++j ){
      num[j] *= i;
      num[j] += carry;
      carry = num[j] / 10;
      num[j] %= 10;
    }
    
    int upperBound;
    for( upperBound = MAXDIGIT-1 ; upperBound > 0 && num[upperBound] == 0 ; --upperBound );
    
    for( int j = upperBound ; j >= 0 ; --j ){
      ++mem[i][num[j]];
    }
  }
  
  int n;
  while( scanf("%d", &n) != EOF && n != 0 ){
    printf("%d! --\n", n);
    
    for( int i = 0 ; i < 10 ; ++i ){
      if( i == 5 ) printf("\n");
      if( i % 5 == 0 ){
        printf("   ");
      }
      else{
        printf("    ");  
      }
      
      printf("(%d)%5d", i, mem[n][i]);
    }
    printf("\n");
  }
  
  return 0;
}
```
