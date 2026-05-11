---
id: 2688
title: '#UVa：344－Roman Digititis'
slug: uva：344－roman-digititis
date: '2015-01-26T18:13:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/01/26/2688/uva%ef%bc%9a344%ef%bc%8droman-digititis/
wp_status: publish
wp_type: post
---

一位一位數的去處理轉換成羅馬數字的個數，並建表記下即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 344 Roman Digititis                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

enum RomanDigit { I = 0, V = 1, X = 2, L = 3, C = 4 };

void getRomanDigitCount(int count[], int number){
  int digits[] = { number % 10, number % 100 / 10, number / 100 };

  // digits[0]
  if( digits[0] == 4 ){
    ++count[I];
    ++count[V];
  }
  else if( digits[0] == 9 ){
    ++count[I];
    ++count[X];
  }
  else{
    count[I] += digits[0] % 5;
    count[V] += digits[0] / 5;
  }

  // digits[1]
  if( digits[1] == 4 ){
    ++count[X];
    ++count[L];
  }
  else if( digits[1] == 9 ){
    ++count[X];
    ++count[C];
  }
  else{
    count[X] += digits[1] % 5;
    count[L] += digits[1] / 5;
  }

  if( digits[2] == 1 ) ++count[C];
}


int main(){
  
  char romanDigit[] = { 'i', 'v', 'x', 'l', 'c' };

  int dp[105][5] = {0};
  for( int i = 1 ; i <= 100 ; ++i ){
    getRomanDigitCount(dp[i], i);

    for( int j = 0 ; j < 5 ; ++j ){
      dp[i][j] += dp[i-1][j];
    }
  }

  int number;
  while( scanf("%d", &number) != EOF && number != 0 ){
    printf("%d:", number);
    for( int i = 0 ; i < 5 ; ++i ){
      if( i > 0 ) printf(",");
      printf(" %d %c", dp[number][i], romanDigit[i]);
    }
    printf("\n");
  }
  return 0;
}
```
