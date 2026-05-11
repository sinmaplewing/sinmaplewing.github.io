---
id: 2284
title: '#UVa：10042－Smith Numbers'
slug: uva：10042－smith-numbers
date: '2014-10-12T02:17:37+08:00'
lastmod: '2014-12-31T23:03:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2014/10/12/2284/uva%ef%bc%9a10042%ef%bc%8dsmith-numbers/
wp_status: publish
wp_type: post
---

將每個值算出其每位數總和以及其所有因數的每位數總和之後再比較即可。

P.S. 題目有寫本身為質數的數字並不能是Smith Number。

**C++(0.095)**
```cpp
/*******************************************************/
/* UVa 10042 Smith Numbers                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

const float ERROR = 1e-9;

int digitsum( int number ){
  int sum = 0;
  while( number > 0 ){
    sum += number % 10;
    number /= 10;
  }

  return sum;
}

int main(){
  int composite[50000] = {true, true, false};
  for( int i = 2 ; i < 50000 ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j < 50000 ; j += i ){
        composite[j] = true;
      }
    }
  }

  int testcase;
  while( scanf("%d", &testcase) != EOF ){
    int n;
    for( int i = 0 ; i < testcase ; ++i ){
      scanf("%d", &n);
      int smith_number = n+1;
      while( true /* break if smith_number is found. */ ){
        int left_sum = 0, right_sum = 0;

        int temp = smith_number;
        int sqrt_temp = (int)(sqrt(temp) + ERROR);
        for( int j = 2 ; j <= sqrt_temp && temp > 1 ; ++j ){
          if( !composite[j] ){
            while( temp % j == 0 ){
              right_sum += digitsum(j);
              temp /= j;
            }
          }
        }

        if( temp != smith_number ){
          if( temp > 1 ) right_sum += digitsum(temp);

          left_sum = digitsum(smith_number);
          if( left_sum == right_sum ) break;
        }

        ++smith_number;
      }

      printf("%d\n", smith_number);
    }
  }
  return 0;
}
```
