---
id: 1439
title: '#UVa：485－Pascal''s Triangle of Death'
slug: uva：485－pascals-triangle-of-death
date: '2012-02-02T23:28:05+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/02/02/1439/uva%ef%bc%9a485%ef%bc%8dpascals-triangle-of-death/
wp_status: publish
wp_type: post
---

大數加法+DP建表得解。

P.S. 須注意這題不用全部的數字記下來，不然記憶體會炸掉。只要記住一行，輸出完後再從該行推出下一行，然後下一行的資料蓋掉原本那行的資料，這樣一行一行運算完就可以了。

**C++(0.292)**
```cpp
/*******************************************************/
/* UVa 485 Pascal's Triangle of Death                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/02/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int dp[1500][150] = {0};

int main(){
  dp[0][0] = 1;
  int row = 1, digit;
  bool exit = 0;
  do{
    for( int i = row-2 ; i > 0 ; i-- ){
      for( int j = 0 ; j < 150 ; j++ ){
        dp[i][j] += dp[i-1][j];
        dp[i][j+1] += dp[i][j]/10;
        dp[i][j] %= 10;
      }
    }
    for( int i = 0 ; i < row ; i++ ){
      for( digit = 149 ; digit >= 0 ; digit-- )
        if( dp[i][digit] ) break;
      if( digit >= 60 ) exit = 1;

      for( ; digit >= 0 ; digit-- )
        printf( "%d", dp[i][digit] );

      if( i != row-1 ) printf( " " );
      else printf( "\n" );
    }
    dp[row++][0] = 1;
  } while( !exit );
  return 0;
}
```
