---
id: 1597
title: '#UVa：127－"Accordian" Patience'
slug: uva：127－accordian-patience
date: '2012-03-31T18:58:45+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/31/1597/uva%ef%bc%9a127%ef%bc%8daccordian-patience/
wp_status: publish
wp_type: post
---

照著題目所要求的模擬即可得解。

P.S. 注意空堆疊的處理。

**C++(0.696)**
```cpp
/*******************************************************/
/* UVa 127 "Accordian" Patience                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/31                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<stack>
using namespace std;

struct Card{
  char suit;
  char value;
};

int main(){
  stack<Card> pile[60];
  Card input;
  int left1, left3, count1, count3, pilenum;

  while( ( input.value = getchar() ) != EOF && input.value != '#' ){
    for( int i = 0 ; i < 55 ; i++ )
      while( !pile[i].empty() )pile[i].pop();

    input.suit = getchar();
    getchar();
    pile[3].push(input);

    for( int i = 1 ; i < 52 ; i++ ){
      scanf( "%c%c", &input.value, &input.suit );
      getchar();
      pile[i+3].push(input);
    }

    for( int i = 3 ; i < 55 ; i++ ){
      if( pile[i].empty() ) continue;

      left1 = i, left3 = i;
      count1 = 1, count3 = 3;
      while( count3 ){
        if( count1 ) left1--;
        left3--;
        if( left3 < 3 ) break;
        if( !pile[left3].empty() ){
          if( count1 ) count1--;
          count3--;
        }
      }

      if( !pile[left3].empty() &&
          (pile[left3].top().suit == pile[i].top().suit ||
           pile[left3].top().value == pile[i].top().value) ){
        pile[left3].push(pile[i].top());
        pile[i].pop();
        i = left3-1;
        continue;
      }
      else if( !pile[left1].empty() &&
               (pile[left1].top().suit == pile[i].top().suit ||
                pile[left1].top().value == pile[i].top().value) ){
        pile[left1].push(pile[i].top());
        pile[i].pop();
        i = left1-1;
      }

    }

    pilenum = 0;
    for( int i = 3 ; i < 55 ; i++ )
      if( !pile[i].empty() ) pilenum++;

    printf( "%d pile", pilenum );
    if( pilenum > 1 ) printf( "s" );
    printf( " remaining:" );
    for( int i = 3 ; i < 55 ; i++ )
      if( !pile[i].empty() ) printf( " %d", pile[i].size() );
    printf( "\n" );
  }
  return 0;
}
```
