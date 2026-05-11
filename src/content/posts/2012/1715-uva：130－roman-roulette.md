---
id: 1715
title: '#UVa：130－Roman Roulette'
slug: uva：130－roman-roulette
date: '2012-04-11T23:28:22+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/04/11/1715/uva%ef%bc%9a130%ef%bc%8droman-roulette/
wp_status: publish
wp_type: post
---

Josephus問題的變形，利用模擬的方式可求出解。可以先看看從1開始算究竟是幾號會活著，接著再將活著的那號轉成1號，看看原本的1號會變成幾號，那麼該號就會是答案。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 130 - Roman Roulette                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/11                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  int n, k;
  int last_dead, dead_num, next, next_count, answer;
  int josephus[105];
  bool dead;

  while( scanf( "%d%d", &n, &k ) != EOF && !( n == 0 && k == 0 ) ){
    memset( josephus, 0, sizeof( josephus ) );
    for( int i = 0 ; i < n ; i++ )
      josephus[i] = i+1;
    dead_num = 0;
    next = 0;
    dead = true;
    while( dead_num < n-1 ){
      next_count = 0;
      while(1){
        if( josephus[next] ) next_count++;
        if( next_count == k ) break;
        next = (next+1)%n;
      }

      if( dead ){
        josephus[next] = 0;
        dead_num++;
        last_dead = next;
      }
      else{
        josephus[last_dead] = josephus[next];
        josephus[next] = 0;
        next = (last_dead+1)%n;
      }
      dead ^= 1;
    }

    for( answer = 0 ; answer < n ; answer++ )
      if( josephus[answer] ) break;
    if( josephus[answer] == 1 ) printf( "1\n" );
    else printf( "%d\n", n-(josephus[answer]-1)+1 );
  }
  return 0;
}
```
