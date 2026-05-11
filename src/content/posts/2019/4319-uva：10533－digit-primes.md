---
id: 4319
title: '#UVa：10533－Digit Primes'
slug: uva：10533－digit-primes
date: '2019-04-21T23:03:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2019/04/21/4319/uva%ef%bc%9a10533%ef%bc%8ddigit-primes/
wp_status: publish
wp_type: post
---

利用篩法將所要範圍內的質數找出，並在找出的時候順便算一下是否更進一步是 Digit Prime ，並且加總紀錄到該數之間 Digit Prime 的數量即可得解。

**C++(0.190)**
```cpp
/*******************************************************/
/* UVa 10533 Digit Primes                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

struct Number{
  bool isComposite;
  int totalDigitPrimeCount;
};

int bitSum(int number){
  int sum = 0;
  while(number > 0){
    sum += number % 10;
    number /= 10;
  }
  return sum;
}

int main(){
  const int TOTAL_NUMBER = 1000000;

  vector<Number> numbers(TOTAL_NUMBER, Number{false, 0});
  for(int i = 2; i < TOTAL_NUMBER ; ++i){
    if(numbers[i].isComposite){
      numbers[i].totalDigitPrimeCount = numbers[i-1].totalDigitPrimeCount;
      continue;
    }

    for(int j = i + i ; j < TOTAL_NUMBER ; j += i){
      numbers[j].isComposite = true;
    }

    numbers[i].totalDigitPrimeCount = numbers[i-1].totalDigitPrimeCount + 
      ((!numbers[bitSum(i)].isComposite)? 1 : 0);
  }

  int N;
  while(scanf("%d", &N) != EOF){
    for(int caseNumber = 1 ; caseNumber <= N ; ++caseNumber){
      int t1, t2;
      scanf("%d%d", &t1, &t2);
      printf("%d\n", numbers[t2].totalDigitPrimeCount - numbers[t1-1].totalDigitPrimeCount);
    }
  }
  return 0;
}
```
