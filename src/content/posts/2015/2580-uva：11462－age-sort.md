---
id: 2580
title: '#UVa：11462－Age Sort'
slug: uva：11462－age-sort
date: '2015-01-04T01:17:21+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2015/01/04/2580/uva%ef%bc%9a11462%ef%bc%8dage-sort/
wp_status: publish
wp_type: post
---

使用內建的sort排序即可得解。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 11462 Age Sort                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF && n > 0 ){
    int *age = new int [n+5];
    for( int i = 0 ; i < n ; ++i ){
      scanf("%d", &age[i]);
    }

    sort(age, age+n);

    for( int i = 0 ; i < n ; ++i ){
      if( i > 0 ){
        printf(" ");
      }
      printf("%d", age[i]);
    }
    printf("\n");

    delete [] age;
  }
  return 0;
}
```
