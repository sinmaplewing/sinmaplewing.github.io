---
id: 1969
title: '#UVa：256－Quirksome Squares'
slug: uva：256－quirksome-squares
date: '2014-08-21T01:15:42+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2014/08/21/1969/uva%ef%bc%9a256%ef%bc%8dquirksome-squares/
wp_status: publish
wp_type: post
---

照題目做完用表記錄下來，之後就把它輸出即可。

**C++(0.919)**
```cpp
/*******************************************************/
/* UVa 256 Quirksome Squares                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/08/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int dp[4][50], size[4] = {0};
  for( int i = 0 ; i < 10000 ; ++i ){
    for( int j = 0 ; j < 10000 ; ++j ){

      int length = 10;
      for( int k = 0 ; k < 4 ; ++k, length *= 10 ){
        if( (i+j)*(i+j) == i * length + j &&
            i / length == 0 && j / length == 0 ){
          dp[k][size[k]++] = i * length + j;
        }
      }
    }
  }

  int n;
  while( scanf( "%d", &n ) != EOF ){
    int dp_index = n / 2 - 1;
    for( int i = 0 ; i < size[dp_index] ; ++i ){
      printf( "%0*d\n", n, dp[dp_index][i] );
    }
  }

  return 0;
}

```
