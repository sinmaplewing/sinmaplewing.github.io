---
id: 1909
title: '#UVa：11398－The Base-1 Number System'
slug: uva：11398－the-base-1-number-system
date: '2012-09-19T07:48:17+08:00'
lastmod: '2014-12-31T23:18:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2012/09/19/1909/uva%ef%bc%9a11398%ef%bc%8dthe-base-1-number-system/
wp_status: publish
wp_type: post
---

照著題目的過程做即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11398 The Base-1 Number System                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string baseone_num_part;
  string basetwo_num = "";
  int num;
  char flag;
  while( cin >> baseone_num_part && baseone_num_part != "~"){
    if( baseone_num_part == "#" ){
      num = 0;
      for( int i = 0 ; i < basetwo_num.length() ; i++ ){
        if( i ) num *= 2;
        if( basetwo_num[i] == '1' ) num += 1;
      }
      basetwo_num = "";
      printf( "%d\n", num );
    }
    else if( baseone_num_part.length() == 1 )
      flag = '1';
    else if( baseone_num_part.length() == 2 )
      flag = '0';
    else
      for( int i = 0 ; i < baseone_num_part.length()-2 ; i++ )
        basetwo_num += flag;
  }
  return 0;
}
```
