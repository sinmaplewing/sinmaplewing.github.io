---
id: 4138
title: '#UVa：1586－Molar mass'
slug: uva：1586－molar-mass
date: '2019-03-31T01:22:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 15
- UVa
permalink: /2019/03/31/4138/uva%ef%bc%9a1586%ef%bc%8dmolar-mass/
wp_status: publish
wp_type: post
---

剖析字串後再查表加總即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 1586 Molar mass                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/31                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
#include <map>
using namespace std;

map<char, double> getMassMap(){
  map<char, double> mass;
  mass['C'] = 12.01;
  mass['H'] = 1.008;
  mass['O'] = 16.00;
  mass['N'] = 14.01;

  return mass;
}

int getNumberToken(const string& formula, int& index){
  if(!isdigit(formula[index])) return 1;

  int number = 0;
  while(index < formula.length() && isdigit(formula[index])){
    number = number * 10 + formula[index] - '0';
    ++index;
  }

  return number;
}

int main(){
  const map<char, double> MASS = getMassMap();

  int T;
  while(scanf("%d", &T) != EOF){
    for(int caseNumber = 1 ; caseNumber <= T ; ++caseNumber){
      string formula;
      cin >> formula;

      double totalMass = 0;
      for(int i = 0 ; i < formula.length() ;){
        char symbol = formula[i];
        ++i;
        int number = getNumberToken(formula, i);
        totalMass += MASS.at(symbol) * number;
      }

      printf("%.3lf\n", totalMass);
    }
  }

  return 0;
}
```
