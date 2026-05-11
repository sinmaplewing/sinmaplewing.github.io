---
id: 1256
title: '#UVa：10222－Decode the Mad man'
slug: uva：10222－decode-the-mad-man
date: '2011-12-01T22:47:54+08:00'
lastmod: '2014-12-31T23:06:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2011/12/01/1256/uva%ef%bc%9a10222%ef%bc%8ddecode-the-mad-man/
wp_status: publish
wp_type: post
---

先把鍵盤輸入成一個字元陣列，這樣比較好轉換。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10222 Decode the Mad man                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/01                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  const char keyboard[] = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./";
  const int kblength = strlen( keyboard );
  string s;

  while( getline( cin, s ) ){
    for( int i = 0 ; i < s.length() ; i++ )
      if( s[i] == ' ' )
        printf( " " );
      else
        for( int j = 0 ; j < kblength ; j++ )
          if( keyboard[j] == s[i] ){
            printf( "%c", keyboard[j-2] );
            break;
          }
    printf( "\n" );
  }
  return 0;
}
```
