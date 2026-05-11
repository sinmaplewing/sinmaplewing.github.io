---
id: 1810
title: '#UVa：10924－Prime Words'
slug: uva：10924－prime-words
date: '2012-09-14T00:30:57+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/09/14/1810/uva%ef%bc%9a10924%ef%bc%8dprime-words/
wp_status: publish
wp_type: post
---

建質數表及使用ASCII碼即可得解。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 10924 Prime Words                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/13                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;

int main(){
  bool composite[1100] = {true, false, false};
  string L;
  int total;

  for( int i = 2 ; i < 1100 ; i++ )
    if( !composite[i] )
      for( int j = i+i ; j < 1100 ; j += i )
        composite[j] = true;

  while( getline( cin, L ) ){
    total = 0;
    for( int i = 0 ; i < L.length() ; i++ )
      if( isupper(L[i]) )
        total += L[i]-'A'+27;
      else if( islower(L[i]) )
        total += L[i]-'a'+1;

    if( composite[total] ) printf( "It is not a prime word.\n" );
    else printf( "It is a prime word.\n");
  }
  return 0;
}
```
