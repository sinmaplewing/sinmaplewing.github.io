---
id: 3202
title: '#UVa：725－Division'
slug: uva：725－division
date: '2016-10-19T08:23:50+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2016/10/19/3202/uva%ef%bc%9a725%ef%bc%8ddivision/
wp_status: publish
wp_type: post
---

羅列所有可能的分母出來，與N相乘找到分子，再檢查分母和分子是否剛好用完0~9的數字，即可得解。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 725 Division                                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/10/19                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

bool iterateAllPossibleAnswer(int N, bool digitsUsed[], int digit, int denominator){
  if( digit == 5 ){
    int numerator = denominator * N;
    if( numerator >= 100000 ) return false;

    bool checkAllDigitUsed[10];
    memcpy( checkAllDigitUsed, digitsUsed, sizeof(checkAllDigitUsed) );

    for( int checkDigit = 10; checkDigit <= 100000 ; checkDigit *= 10 ){
      int numeratorDigit = numerator % checkDigit / (checkDigit / 10);
      if( checkAllDigitUsed[numeratorDigit] ) return false;
      checkAllDigitUsed[numeratorDigit] = true;
    }
    
    printf("%05d / %05d = %d\n", numerator, denominator, N);

    return true;
  }

  bool haveAnswer = false;
  for( int i = 0 ; i < 10 ; ++i ){
    if( digitsUsed[i] ) continue;

    digitsUsed[i] = true;
    denominator = denominator * 10 + i;
    haveAnswer |= iterateAllPossibleAnswer(N, digitsUsed, digit + 1, denominator);
    denominator /= 10;
    digitsUsed[i] = false;
  }

  return haveAnswer;
}


int main(){
  int N;
  bool separationLine = false;
  while( scanf("%d", &N) != EOF && N != 0 ){
    if( separationLine ){
      printf("\n");
    }
    separationLine = true;

    bool digitsUsed[10] = {false};
    bool haveAnswer = iterateAllPossibleAnswer(N, digitsUsed, 0, 0);

    if( !haveAnswer ){
      printf("There are no solutions for %d.\n", N );
    }
  }


  return 0;
}
```
