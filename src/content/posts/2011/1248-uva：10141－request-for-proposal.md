---
id: 1248
title: '#UVa：10141－Request for Proposal'
slug: uva：10141－request-for-proposal
date: '2011-11-30T15:18:48+08:00'
lastmod: '2014-12-31T23:03:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2011/11/30/1248/uva%ef%bc%9a10141%ef%bc%8drequest-for-proposal/
wp_status: publish
wp_type: post
---

照著題目要求的做即可。

P.S. 所有名稱都有可能中間有空白。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10141 Request for Proposal                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/30                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

struct Factory{
  string name;
  float d;
  int r;
};

int main(){
  int n, p;
  int RFP = 0;
  string requirement;
  Factory fac, best; 
  while( scanf( "%d%d", &n, &p ) != EOF && ( n || p ) ){
    if( RFP ) printf( "\n" );
    getchar(); /* delete the enter key */
    for( int i = 0 ; i < n ; i++ )
      getline( cin, requirement );

    best.r = 0;
    for( int i = 0 ; i < p ; i++ ){
      getline( cin, fac.name );
      scanf( "%f%d", &(fac.d), &(fac.r) );
      getchar(); /* delete the enter key */
      for( int j = 0 ; j < fac.r ; j++ )
        getline( cin, requirement );
      if( best.r < fac.r )
        best = fac;
      else if( best.r == fac.r && best.d > fac.d )
        best = fac;
    }
    printf( "RFP #%d\n%s\n", ++RFP, best.name.c_str() );
  }
  return 0;
}
```
