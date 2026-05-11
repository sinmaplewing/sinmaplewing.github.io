---
id: 1963
title: '#UVa：170－Clock Patience'
slug: uva：170－clock-patience
date: '2012-10-20T23:25:20+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/10/20/1963/uva%ef%bc%9a170%ef%bc%8dclock-patience/
wp_status: publish
wp_type: post
---

輸入的敘述有誤，應是從第K堆排到第1堆，並且第1行到第4行分別是從最上層到最底層。將這個修正過來後，模擬其作法即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 170 Clock Patience                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/20                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
#include<stack>
using namespace std;

struct Card{
  char rank;
  char suit;
};

int RankToInt( char rank ){
  if( isdigit(rank) ) return rank-'0'-1;
  if( rank == 'A' ) return 0;
  if( rank == 'T' ) return 9;
  if( rank == 'J' ) return 10;
  if( rank == 'Q' ) return 11;
  if( rank == 'K' ) return 12; 
}

int main(){
  stack<Card> pile[13];
  Card cards[52], pick;
  string tmp;
  int next_pile, cardnum;
  while( cin >> tmp && tmp[0] != '#' ){
    cards[0].rank = tmp[0];
    cards[0].suit = tmp[1];
    for( int i = 1 ; i < 52 ; i++ ){
      cin >> tmp;
      cards[i].rank = tmp[0];
      cards[i].suit = tmp[1];
    }

    for( int i = 0 ; i < 13 ; i++ )
      while( !pile[i].empty() ) pile[i].pop();
    for( int i = 51 ; i >= 0 ; i-- ){
      pile[12-(i%13)].push(cards[i]);
    }

    next_pile = 12;
    cardnum = 0;
    while( !pile[next_pile].empty() ){
      pick = pile[next_pile].top();
      pile[next_pile].pop();
      next_pile = RankToInt(pick.rank);
      cardnum++;
    }
    printf( "%02d,%c%c\n", cardnum, pick.rank, pick.suit );
  }
  return 0;
}
```
