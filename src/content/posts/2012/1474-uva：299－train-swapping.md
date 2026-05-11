---
id: 1474
title: '#UVa：299－Train Swapping'
slug: uva：299－train-swapping
date: '2012-03-14T15:56:59+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/03/14/1474/uva%ef%bc%9a299%ef%bc%8dtrain-swapping/
wp_status: publish
wp_type: post
---

所求即是做泡沫排序法時所交換的次數。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 299 Train Swapping                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int testcase;
  int L, swap_num;
  int train[55];
  while( scanf( "%d", &testcase ) != EOF ){
    for( int i = 0 ; i < testcase ; i++ ){
      scanf( "%d", &L );
      for( int j = 0 ; j < L ; j++ )
        scanf( "%d", &train[j] );

      swap_num = 0;
      for( int j = 0 ; j < L ; j++ )
        for( int k = L-1 ; k > j ; k-- )
          if( train[k-1] > train[k] ){
            swap( train[k-1], train[k] );
            swap_num++;
          }
      printf( "Optimal train swapping takes %d swaps.\n", swap_num );
    }
  }
  return 0;
}
```
