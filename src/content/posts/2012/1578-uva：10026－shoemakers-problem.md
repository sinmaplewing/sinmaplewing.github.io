---
id: 1578
title: '#UVa：10026－Shoemaker''s Problem'
slug: uva：10026－shoemakers-problem
date: '2012-03-29T23:12:36+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/29/1578/uva%ef%bc%9a10026%ef%bc%8dshoemakers-problem/
wp_status: publish
wp_type: post
---

排序就可以得解，順序是以罰金與工作日期的比例大小來當基準。可以想成說，當我開始工作後就不用被罰這個罰金，所以可以當作賺了這個罰金，那當然我就要從每日能賺最多罰金的工作開始做才能使罰金最小了喔！

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10026 Shoemaker’s Problem                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<algorithm>
using namespace std;

struct Work{
  int T;
  int S;
  int num;
};

bool cmp( Work a, Work b ){
  if( (double)a.S/(double)a.T > (double)b.S/(double)b.T ) return true;
  else if ( (double)a.S/(double)a.T == (double)b.S/(double)b.T )
    if( a.num < b.num ) return true;
  return false;
}

int main(){
  int testcase, N;
  Work shoemaker[1005];

  while( scanf( "%d", &testcase ) != EOF ){
    for( int i = 0 ; i < testcase ; i++ ){
      if( i ) printf( "\n" );
      scanf( "%d", &N );
      for( int j = 0 ; j < N ; j++ ){
        scanf( "%d%d", &(shoemaker[j].T), &(shoemaker[j].S) );
        shoemaker[j].num = j+1;
      }
      sort( shoemaker, shoemaker+N, cmp );

      for( int j = 0 ; j < N ; j++ ){
        if( j ) printf( " " );
        printf( "%d", shoemaker[j].num );
      }
      printf( "\n" );
    }
  }

  return 0;
}
```
