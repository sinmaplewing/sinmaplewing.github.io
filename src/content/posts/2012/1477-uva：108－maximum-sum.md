---
id: 1477
title: '#UVa：108－Maximum Sum'
slug: uva：108－maximum-sum
date: '2012-03-14T17:35:24+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/14/1477/uva%ef%bc%9a108%ef%bc%8dmaximum-sum/
wp_status: publish
wp_type: post
---

先建立一個存sum的二維陣列，此sum為該行第一列加到該列的數值。(Ex. sum[2][5] = array[0][5] + array[1][5] + array[2][5])當建完這個陣列後，要求array[i...j][k](某個k行i~j列之間的總和)就可以很容易算出來。接著窮舉所有第i列到第j列的所有可能性，對於每一次窮舉皆可當作是array[i...j][k]以k為其index的一個一維陣列，利用這個一維陣列算出所有可能性的其最大連續和即是答案。

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 108 Maximum Sum                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<climits>
using namespace std;

int main(){
  int N;
  int array[105][105];
  int max_sum, sum;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 1 ; i <= N ; i++ )
      for( int j = 1 ; j <= N ; j++ )
        scanf( "%d", &array[i][j] );

    int column_array[105][105] = {0};
    for( int i = 1 ; i <= N ; i++ )
      for( int j = 1 ; j <= N ; j++ )
        column_array[i][j] = column_array[i-1][j] + array[i][j];

    max_sum = INT_MIN;
    for( int i = 1 ; i <= N ; i++ )
      for( int j = i ; j <= N ; j++ ){
        sum = 0;
        for( int k = 1 ; k <= N ; k++ ){
          sum += column_array[j][k] - column_array[i-1][k];
          if( sum > max_sum ) max_sum = sum;
          if( sum < 0 ) sum = 0;
        }
      }
    printf( "%d\n", max_sum );
  }
  return 0;
}
```
