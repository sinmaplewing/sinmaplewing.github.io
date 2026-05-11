---
id: 1544
title: '#UVa：499－What''s The Frequency, Kenneth?'
slug: uva：499－whats-the-frequency-kenneth
date: '2012-03-27T23:16:36+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/03/27/1544/uva%ef%bc%9a499%ef%bc%8dwhats-the-frequency-kenneth/
wp_status: publish
wp_type: post
---

利用ASCII碼對應陣列的index來做即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 499 What's The Frequency, Kenneth?              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/27                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
#include<cctype>
using namespace std;

int main(){
  string s;
  int ascii[256], maxnum;
  while( getline( cin, s ) ){
    memset( ascii, 0, sizeof(ascii) );
    maxnum = 0;
    for( int i = 0 ; i < s.length() ; i++ ){
      if( !isalpha(s[i]) ) continue;
      ascii[s[i]]++;
      if( ascii[s[i]] > maxnum ) maxnum = ascii[s[i]];
    }

    for( int i = 'A' ; i <= 'Z' ; i++ )
      if( ascii[i] == maxnum ) printf( "%c", i );
    for( int i = 'a' ; i <= 'z' ; i++ )
      if( ascii[i] == maxnum ) printf( "%c", i );
    printf( " %d\n", maxnum );
  }
  return 0;
}
```
