---
id: 3112
title: '#UVa：231－Testing the CATCHER'
slug: uva：231－testing-the-catcher
date: '2016-04-24T11:24:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2016/04/24/3112/uva%ef%bc%9a231%ef%bc%8dtesting-the-catcher/
wp_status: publish
wp_type: post
---

利用LIS之演算法修改為遞減版本即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 231 Testing the CATCHER                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/24                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main(){
  int number;
  vector<int> LIS;
  int caseNumber = 0;
  while( scanf("%d", &number) != EOF ){
    if( number == -1 && LIS.size() == 0 ){
      break;
    }

    if( number == -1 ){
      if( caseNumber > 0 ){
        printf("\n");
      }
      printf("Test #%d:\n", ++caseNumber);
      printf("  maximum possible interceptions: %d\n", LIS.size());
      LIS.clear();
      continue;
    }

    if( LIS.size() == 0 || number <= LIS.back() ){
      LIS.push_back(number);
    }
    else{
      *upper_bound(LIS.begin(), LIS.end(), number, greater<int>()) = number;
    }



  }
  return 0;
}
```
