---
id: 2890
title: '#UVa：10591－Happy Number'
slug: uva：10591－happy-number
date: '2015-11-29T22:18:50+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2015/11/29/2890/uva%ef%bc%9a10591%ef%bc%8dhappy-number/
wp_status: publish
wp_type: post
---

照著題目將數字的各個位數平方之總和求出，若遇到之前已經求過的數字就知道是Unhappy，若能夠到1那就是Happy。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10591 Happy Number                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/11/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <set>
using namespace std;

int squareSum(int n){
  int sum = 0;
  while( n > 0 ){
    sum += (n % 10) * (n % 10);
    n /= 10;
  }

  return sum;
}

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    for( int caseCount = 1 ; caseCount <= n ; ++caseCount ){
      int N;
      scanf("%d", &N);

      set<int> checked;
      checked.insert(N);

      bool isHappy = true;
      int number = N;
      while( number != 1 ){
        number = squareSum(number);
        if( checked.find(number) != checked.end() ){
          isHappy = false;
          break;
        }
        checked.insert(number);
      }

      if( isHappy ){
        printf("Case #%d: %d is a Happy number.\n", caseCount, N);
      }
      else {
        printf("Case #%d: %d is an Unhappy number.\n", caseCount, N);
      }
    }
  }
  return 0;
}
```
