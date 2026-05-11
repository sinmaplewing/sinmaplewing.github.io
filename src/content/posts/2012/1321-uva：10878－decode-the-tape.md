---
id: 1321
title: '#UVa：10878－Decode the tape'
slug: uva：10878－decode-the-tape
date: '2012-01-17T10:54:43+08:00'
lastmod: '2014-12-31T23:15:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 108
- UVa
permalink: /2012/01/17/1321/uva%ef%bc%9a10878%ef%bc%8ddecode-the-tape/
wp_status: publish
wp_type: post
---

解碼的依據就是二進位的ASCII碼。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10878 Decode the tape                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string s;
  int ASCII;
  while( getline( cin, s ) ){
    if( s[0] == '_' )
      continue;
    ASCII = 0;
    for( int i = 0 ; i < s.length() ; i++ )
      if( s[i] == ' ' )
        ASCII *= 2;
      else if( s[i] == 'o' )
        ASCII = ASCII * 2 + 1;
    printf( "%c", ASCII );
  }
  return 0;
}
```
