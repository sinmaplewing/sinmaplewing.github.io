---
id: 1779
title: '#UVa：11995－I Can Guess the Data Structure!'
slug: uva：11995－i-can-guess-the-data-structure
date: '2012-07-22T08:07:00+08:00'
lastmod: '2017-12-21T08:08:59+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2012/07/22/1779/uva%ef%bc%9a11995%ef%bc%8di-can-guess-the-data-structure/
wp_status: publish
wp_type: post
---

三種資料結構都做出來實際操作一遍試試看有哪些會符合即可。

P.S. 要小心有可能會有沒東西但卻要pop出來的情況。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 11995 I Can Guess the Data Structure!           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/22                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<stack>
#include<queue>
using namespace std;

int main(){
  stack<int> st;
  queue<int> qu;
  priority_queue<int> pq;
  int n, cmd, x;
  bool stack, queue, pqueue;

  while( scanf( "%d", &n ) != EOF ){
    stack = true;
    queue = true;
    pqueue = true;
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d%d", &cmd, &x );
      if( cmd == 1 ){
        st.push(x);
        qu.push(x);
        pq.push(x);
      }
      else if( cmd == 2 ){
        if( stack ){
          if( !st.empty() && st.top() == x ) st.pop();
          else stack = false;
        }
        if( queue ){
          if( !qu.empty() && qu.front() == x ) qu.pop();
          else queue = false;
        }
        if( pqueue ){
          if( !pq.empty() && pq.top() == x ) pq.pop();
          else pqueue = false;
        }
      }
    }
    if( (stack && queue) || (queue && pqueue) || (stack && pqueue ) )
      printf( "not sure\n" );
    else if( stack ) printf( "stack\n" );
    else if( queue ) printf( "queue\n" );
    else if( pqueue ) printf( "priority queue\n" );
    else printf( "impossible\n" );

    while( !st.empty() ) st.pop();
    while( !qu.empty() ) qu.pop();
    while( !pq.empty() ) pq.pop();

  }
  return 0;
}
```
