---
id: 4813
title: '#UVa：11827－Maximum GCD'
slug: uva：11827－maximum-gcd
date: '2020-04-14T01:01:14+08:00'
lastmod: '2020-04-14T01:03:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 118
- UVa
permalink: /2020/04/14/4813/uva%ef%bc%9a11827%ef%bc%8dmaximum-gcd/
wp_status: publish
wp_type: post
---

直接巡覽所有數字對，找最大的 GCD 即可。

P.S. 輸入數字的部分可以使用 stringstream 來做整行數字分割的處理。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11827 Maximum GCD                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string>
#include <sstream>
#include <vector>
using namespace std;

int gcd(int a, int b){
  if( a != 0 && b != 0 ){ 
    while((a %= b) && (b %= a));
  }
  return a + b; 
}

int main(){
  int N;
  while(scanf("%d ", &N) != EOF){
    for(int caseNumber = 1 ; caseNumber <= N ; ++caseNumber){
      string input;
      getline(cin, input);
      stringstream ss(input);

      vector<int> integers;
      int inputNumber;
      while(ss >> inputNumber) integers.push_back(inputNumber);

      int maxGCD = 1;
      for(int i = 0 ; i < integers.size() ; ++i){
        for(int j = i+1 ; j < integers.size() ; ++j){
          maxGCD = max(maxGCD, gcd(integers[i], integers[j]));
        }
      }

      printf("%d\n", maxGCD);
    }
  }
  return 0;
}
```
