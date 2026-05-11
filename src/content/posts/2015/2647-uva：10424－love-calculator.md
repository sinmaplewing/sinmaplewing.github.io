---
id: 2647
title: '#UVa：10424－Love Calculator'
slug: uva：10424－love-calculator
date: '2015-01-08T15:45:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2015/01/08/2647/uva%ef%bc%9a10424%ef%bc%8dlove-calculator/
wp_status: publish
wp_type: post
---

照題目要求之方法計算即可。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10424 Love Calculator                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/08                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
using namespace std;

int valueCalculator(string name){
  int value = 0;
  for( int i = 0 ; i < name.length() ; ++i ){
    if( isalpha(name[i]) ){
      value += (int)tolower(name[i]) - (int)'a' + 1;
    }
  }
  while( value >= 10 ){
    value = value / 10 + value % 10;
  }

  return value;
}

int main(){
  string name1, name2;
  while( getline(cin, name1) ){
    getline(cin, name2);

    double value1 = valueCalculator(name1), value2 = valueCalculator(name2);
    printf("%.2lf %%\n", min(value1, value2) / max(value1, value2) * 100);
  }

  return 0;
}
```
