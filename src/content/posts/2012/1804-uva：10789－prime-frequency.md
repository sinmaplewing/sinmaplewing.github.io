---
id: 1804
title: '#UVa：10789－Prime Frequency'
slug: uva：10789－prime-frequency
date: '2012-09-11T23:51:04+08:00'
lastmod: '2014-12-31T23:14:57+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 107
- UVa
permalink: /2012/09/11/1804/uva%ef%bc%9a10789%ef%bc%8dprime-frequency/
wp_status: publish
wp_type: post
---

利用質數表和ASCII碼即可得解。

**C++(0.025)**
```cpp
/*******************************************************/
/* UVa 10789 Prime Frequency                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/11                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  bool composite[2005] = {true, true, false}, empty;
  int T, ascii[260];
  string s;

  for( int i = 2 ; i <= 2001 ; i++ ){
    if( !composite[i] ){
      for( int j = i+i ; j <= 2001 ; j+=i )
        composite[j] = true;
    }
  }

  while( scanf( "%d", &T ) != EOF ){
    getchar();
    for( int i = 1 ; i <= T ; i++ ){
      getline( cin, s );
      memset( ascii, 0, sizeof(ascii) );
      for( int j = 0 ; j < s.length() ; j++ )
        ascii[s[j]]++;
      empty = true;
      printf( "Case %d: ", i );
      for( int j = 0 ; j < 260 ; j++ ){
        if( ascii[j] && !composite[ascii[j]] ){
          printf( "%c", j );
          empty = false;
        }
      }
      if( empty ) printf( "empty" );
      printf( "\n" );
    }
  }
  return 0;
}
```
