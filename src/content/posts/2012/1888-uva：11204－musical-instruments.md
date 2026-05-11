---
id: 1888
title: '#UVa：11204－Musical instruments'
slug: uva：11204－musical-instruments
date: '2012-09-16T01:13:33+08:00'
lastmod: '2014-12-31T23:18:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 112
- UVa
permalink: /2012/09/16/1888/uva%ef%bc%9a11204%ef%bc%8dmusical-instruments/
wp_status: publish
wp_type: post
---

由於要求的是學生選中理想中第一名的組合數有多少，所以就只看選每個樂器為理想中第一名的學生數有多少，從中就有相同數的選擇可以選。至於其他沒選中的學生要選第二名、第三名......等等，就不再討論範圍內了。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11204 Musical instruments                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  int testcase, N, M;
  int instfirst[35], student, answer;

  while( scanf( "%d", &testcase ) != EOF ){
    for( int i = 0 ; i < testcase ; i++ ){
      scanf( "%d%d", &N, &M );
      memset( instfirst, 0, sizeof(instfirst) );

      for( int j = 0 ; j < M ; j++ )
        for( int k = 0 ; k < N ; k++ ){
          scanf( "%d", &student );
          if( student == 1 ) instfirst[k]++;
        }
      answer = 1;

      for( int j = 0 ; j < N ; j++ )
        if( instfirst[j] > 1 ) answer *= instfirst[j];
      printf( "%d\n", answer );
    }
  }
  return 0;
}
```
