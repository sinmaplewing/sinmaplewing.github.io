---
id: 1187
title: '#UVa：272－TEX Quotes'
slug: uva：272－tex-quotes
date: '2011-11-25T00:21:28+08:00'
lastmod: '2014-12-30T12:57:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2011/11/25/1187/uva%ef%bc%9a272%ef%bc%8dtex-quotes/
wp_status: publish
wp_type: post
---

照著題目要求，更換雙引號即可。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 272 TEX Quotes                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/24                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string s;
  bool leftorright = 0;
  while( getline( cin, s ) )
  {
    for( int i = 0 ; i < s.length() ; i++ )
      if( s[i] == '"' ){
        if( leftorright )
          printf( "''" );
        else
          printf( "``" );
        leftorright ^= 1;
      }
      else{
        printf( "%c", s[i] );
      }
    printf( "\n" );
  }
  return 0;
}
```
