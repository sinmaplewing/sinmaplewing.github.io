---
id: 1936
title: '#UVa：11743－Credit Check'
slug: uva：11743－credit-check
date: '2012-10-17T15:51:05+08:00'
lastmod: '2014-12-31T23:21:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2012/10/17/1936/uva%ef%bc%9a11743%ef%bc%8dcredit-check/
wp_status: publish
wp_type: post
---

照題目要求的做即可得解。

**C++(0.044)**
```cpp
/*******************************************************/
/* UVa 11743 Credit Check                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  string s;
  int odd, even, temp;
  while( scanf( "%d", &N ) != EOF ){
    for( int i = 0 ; i < N ; i++ ){
      odd = 0;
      even = 0;

      for( int j = 0 ; j < 4 ; j++ ){
        cin >> s;
        odd += (s[1]-'0')+(s[3]-'0');
        even += ((s[0]-'0')*2)/10 + ((s[0]-'0')*2)%10 + ((s[2]-'0')*2)/10 + ((s[2]-'0')*2)%10;
      }

      if( (odd+even)%10 ) printf( "Invalid\n" );
      else printf( "Valid\n" );
    }
  }
  return 0;
} 
```
