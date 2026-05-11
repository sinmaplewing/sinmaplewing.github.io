---
id: 1772
title: '#UVa：514－Rails'
slug: uva：514－rails
date: '2012-07-22T20:07:58+08:00'
lastmod: '2014-12-31T22:50:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/07/22/1772/uva%ef%bc%9a514%ef%bc%8drails/
wp_status: publish
wp_type: post
---

利用要排成的組合狀況，試試看是否能用Stack辦到即可得解。

**C++(0.080)**
```cpp
/*******************************************************/
/* UVa 514 Rails                                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/22                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<stack>
using namespace std;

int main(){
  stack<int> station;
  int N, p, now;
  bool exit, yon;
  while( scanf( "%d", &N ) != EOF && N != 0 ){
    exit = false;
    while( !exit ){
      now = 1;
      yon = true;
      for( int i = 0 ; i < N ; i++ ){
        scanf( "%d", &p );
        if( p == 0 ){
          exit = true;
          break;
        }
        if( yon ){
          if( now < p ){
            for( ; now < p ; now++ ) station.push(now);
              now++;
          }
          else if( now == p ) now++;
          else{
            if( p != station.top() ){
              yon = false;
            }
            else station.pop();
          }
        }
      }

      if( exit ) break;
      else if( yon ) printf( "Yes\n" );
      else printf( "No\n" );
    }
    printf( "\n" );
  }

  return 0;
}
```
