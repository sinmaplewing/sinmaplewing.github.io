---
id: 3044
title: '#UVa：443－Humble Numbers'
slug: uva：443－humble-numbers
date: '2016-03-17T12:05:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/03/17/3044/uva%ef%bc%9a443%ef%bc%8dhumble-numbers/
wp_status: publish
wp_type: post
---

利用Heap或是Priority Queue從小到大找出其2、3、5、7之倍數去建表即可。

**C++(0.003)**
```cpp
/*******************************************************/
/* UVa 443 Humble Numbers                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/17                                 */
/*******************************************************/
#include <iostream>
#include <climits>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

int main(){
  vector<int> DP;
  priority_queue< int, vector<int>, greater<int> > findHumberNumbers;
  int primeFactor[] = {2, 3, 5, 7};
  int primeFactorSize = sizeof(primeFactor) / sizeof(int);
  findHumberNumbers.push(1);
  for( int i = 0 ; i < primeFactorSize ; ++i ){
    findHumberNumbers.push(primeFactor[i]);
  }

  while( DP.size() < 5842 ){
    int number = findHumberNumbers.top();
    DP.push_back(number);
    for( int i = 0 ; i < primeFactorSize ; ++i ){
      if( number > INT_MAX / primeFactor[i] ){
        break;
      }
      
      findHumberNumbers.push(number * primeFactor[i]);
    }
    while( findHumberNumbers.top() == number ){
      findHumberNumbers.pop();
    }
  }

  int n;
  while( scanf("%d", &n) != EOF && n != 0 ){
    printf("The %d", n);
    if( n % 10 == 1 && n % 100 != 11 ){
      printf("st");
    }
    else if( n % 10 == 2 && n % 100 != 12 ){
      printf("nd");
    }
    else if( n % 10 == 3 && n % 100 != 13 ){
      printf("rd");
    }
    else {
      printf("th");
    }
    printf(" humble number is %d.\n", DP[n-1]);
  }


  return 0;
}
```
