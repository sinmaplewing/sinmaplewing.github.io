---
id: 3034
title: '#UVa：640－Self Numbers'
slug: uva：640－self-numbers
date: '2016-03-17T00:56:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2016/03/17/3034/uva%ef%bc%9a640%ef%bc%8dself-numbers/
wp_status: publish
wp_type: post
---

照題目之算式去建表紀錄該數字是否為Self Number即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 640 Self Numbers                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int digitSum(int num){
  int sum = 0;
  while( num > 0 ){
    sum += num % 10;
    num /= 10;
  }

  return sum;
}

int d(int n){
  return n + digitSum(n);
}

int main(){
  bool canGenerate[1000005] = {false};
  for( int i = 1 ; i <= 1000000 ; ++i ){
    int gen = d(i);
    if( gen <= 1000000 ){
      canGenerate[gen] = true;
    }

    if( !canGenerate[i] ){
      printf("%d\n", i);
    }
  }


  return 0;
}
```
