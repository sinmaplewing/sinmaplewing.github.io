---
id: 1924
title: '#UVa：11577－Letter Frequency'
slug: uva：11577－letter-frequency
date: '2012-09-19T20:46:30+08:00'
lastmod: '2014-12-31T23:21:01+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2012/09/19/1924/uva%ef%bc%9a11577%ef%bc%8dletter-frequency/
wp_status: publish
wp_type: post
---

照題目所要求的去算出答案即可。

P.S. 大小寫要一起算，且空白字元不用計算。

**C++(0.088)**
```cpp
/*******************************************************/
/* UVa 11577 Letter Frequency                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
#include<cstring>
using namespace std;

int main(){
  int n;
  string str;
  int freq[256], max_num;
  while( scanf( "%d", &n ) != EOF ){
    getchar();
    for( int i = 0 ; i < n ; i++ ){
      getline( cin, str );
      memset( freq, 0, sizeof(freq) );
      max_num = 0;
      for( int j = 0 ; j < str.length() ; j++ ){
        if( str[j] == ' ' ) continue;
        freq[(int)tolower(str[j])]++;
        if( freq[(int)tolower(str[j])] > max_num ) max_num = freq[(int)tolower(str[j])];
      }
      for( int j = 0 ; j < 256 ; j++ )
        if( max_num == freq[j] ) printf( "%c", (char)j );
      printf( "\n" );
    }
  }
  return 0;
}
```
