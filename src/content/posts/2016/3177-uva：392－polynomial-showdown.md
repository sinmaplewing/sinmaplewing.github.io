---
id: 3177
title: '#UVa：392－Polynomial Showdown'
slug: uva：392－polynomial-showdown
date: '2016-08-03T10:06:36+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2016/08/03/3177/uva%ef%bc%9a392%ef%bc%8dpolynomial-showdown/
wp_status: publish
wp_type: post
---

依照題目的規則去寫判斷式決定輸出的格式長相即可。

**C++(0.050)**
```cpp
/*******************************************************/
/* UVa 392 Polynomial Showdown                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/08/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int coefficients[9];
  while( scanf("%d", &coefficients[0]) != EOF ){
    for( int i = 1 ; i < 9 ; ++i ){
      scanf("%d", &coefficients[i]);
    }

    bool firstTerm = false;
    for( int i = 0 ; i < 9 ; ++i ){
      if( coefficients[i] != 0 ){
        int coefficientTemp = coefficients[i];
        if( firstTerm ){
          coefficientTemp = abs(coefficientTemp);
          if( coefficients[i] > 0 ){
            printf(" + ");
          }
          else{
            printf(" - ");
          }
        }
          
        if( 8 - i == 0 ){
          printf("%d", coefficientTemp);
        }
        else{
          if( abs( coefficientTemp ) != 1 ){
            printf("%d", coefficientTemp);
          }
          else if( coefficientTemp == -1 ){
            printf("-");
          }
          printf("x");
          if( 8 - i > 1 ){
            printf("^%d", 8-i);
          }
        }

        firstTerm = true;
      }
    }

    if( !firstTerm ){
      printf("0");
    }
    printf("\n");
  }
  
  return 0;
}
```
