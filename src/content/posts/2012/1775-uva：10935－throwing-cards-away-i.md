---
id: 1775
title: '#UVa：10935－Throwing cards away I'
slug: uva：10935－throwing-cards-away-i
date: '2012-07-22T20:31:46+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/07/22/1775/uva%ef%bc%9a10935%ef%bc%8dthrowing-cards-away-i/
wp_status: publish
wp_type: post
---

利用Queue去照著題目做，即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10935 Throwing cards away I                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/22                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<queue>
using namespace std;

int main(){
  int n;
  queue<int> cards;
  bool comma;
  while( scanf( "%d", &n ) != EOF && n != 0 ){
    for( int i = 1 ; i <= n ; i++ )
      cards.push(i);
    printf( "Discarded cards:" );
    comma = false;
    while( cards.size() != 1 ){
      if( comma ) printf( "," );
      comma = true;
      printf( " " );
      printf( "%d", cards.front() );
      cards.pop();
      cards.push(cards.front());
      cards.pop();
    }
    printf( "\n" );
    printf( "Remaining card: %d\n", cards.front() );
    cards.pop();
  }
  return 0;
}
```
