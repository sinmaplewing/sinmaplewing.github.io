---
id: 1996
title: '#UVa：10315－Poker Hands'
slug: uva：10315－poker-hands
date: '2012-11-10T20:11:55+08:00'
lastmod: '2014-12-31T23:06:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2012/11/10/1996/uva%ef%bc%9a10315%ef%bc%8dpoker-hands/
wp_status: publish
wp_type: post
---

照題目要求的做即可，把牌先以大小排好順序會比較好做。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10315 Poker Hands                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <algorithm>
using namespace std;

struct Card{
  char value;
  int valueint;
  char suit;
};

struct Rank{
  Rank( int t, int v0, int v1 = 0, int v2 = 0, int v3 = 0, int v4 = 0 ):type(t){
    value[0] = v0;
    value[1] = v1;
    value[2] = v2;
    value[3] = v3;
    value[4] = v4;
  }

  int value[5];
  int type;
};

int valuetoint( char c ){
  if( isdigit(c) ) return c-'0';
  if( c == 'T' ) return 10;
  if( c == 'J' ) return 11;
  if( c == 'Q' ) return 12;
  if( c == 'K' ) return 13;
  if( c == 'A' ) return 14;
  return 0;
}

int cmpRank( Rank a, Rank b ){
  if( a.type > b.type ) return 1;
  if( a.type < b.type ) return -1;
  for( int i = 0 ; i < 5 ; i++ ){
    if( a.value[i] > b.value[i] ) return 1;
    if( a.value[i] < b.value[i] ) return -1;
  }
  return 0;
}

bool isStraight( Card input[] ){
  for( int i = 1 ; i < 5 ; i++ )
    if( input[i].valueint != input[i-1].valueint+1 ) return false;
  return true;
}

bool isFlush( Card input[] ){
  for( int i = 1 ; i < 5 ; i++ )
    if( input[i].suit != input[i-1].suit ) return false;
  return true;
}

bool isFourKind( Card input[] ){
  if( input[0].valueint == input[3].valueint ||
      input[1].valueint == input[4].valueint )
    return true;
  return false;
}

bool isThreeKind( Card input[] ){
  if( input[0].valueint == input[2].valueint ||
      input[1].valueint == input[3].valueint ||
      input[2].valueint == input[4].valueint )
    return true;
  return false;
}

bool isFullHouse( Card input[] ){
  if((input[0].valueint == input[2].valueint &&
      input[3].valueint == input[4].valueint)||
     (input[2].valueint == input[4].valueint &&
      input[0].valueint == input[1].valueint))
    return true;
  return false;
}

Rank pokerHandsRank( Card input[] ){

  if( isFlush(input) && isStraight(input))
    return Rank( 8, input[4].valueint );

  if( isFourKind(input) )
    return Rank( 7, input[1].valueint );

  if( isFullHouse(input) )
    return Rank( 6, input[2].valueint );

  if( isFlush(input) )
    return Rank( 5, input[4].valueint,
      input[3].valueint,
      input[2].valueint,
      input[1].valueint,
      input[0].valueint );

  if( isStraight(input) )
    return Rank( 4, input[4].valueint );

  if( isThreeKind(input) )
    return Rank( 3, input[2].valueint );

/* two pair */
  if( input[0].valueint == input[1].valueint &&
      input[2].valueint == input[3].valueint )
    return Rank( 2, input[3].valueint,
                    input[1].valueint,
                    input[4].valueint );
  if( input[0].valueint == input[1].valueint &&
      input[3].valueint == input[4].valueint )
    return Rank( 2, input[4].valueint,
                    input[1].valueint,
                    input[2].valueint );
  if( input[1].valueint == input[2].valueint &&
      input[3].valueint == input[4].valueint )
    return Rank( 2, input[4].valueint,
                    input[2].valueint,
                    input[0].valueint );
/* pair */
  if( input[0].valueint == input[1].valueint )
    return Rank( 1, input[1].valueint,
                    input[4].valueint,
                    input[3].valueint,
                    input[2].valueint );
  if( input[1].valueint == input[2].valueint )
    return Rank( 1, input[2].valueint,
                    input[4].valueint,
                    input[3].valueint,
                    input[0].valueint );
  if( input[2].valueint == input[3].valueint )
    return Rank( 1, input[3].valueint,
                    input[4].valueint,
                    input[1].valueint,
                    input[0].valueint );
  if( input[3].valueint == input[4].valueint )
    return Rank( 1, input[4].valueint,
                    input[2].valueint,
                    input[1].valueint,
                    input[0].valueint );

  return Rank( 0, input[4].valueint,
                  input[3].valueint,
                  input[2].valueint,
                  input[1].valueint,
                  input[0].valueint );
}

bool cmp( Card a, Card b ){
  if( a.valueint < b.valueint ) return true;
  return false;
}

int main(){

  Card temp;
  while( scanf( "%c%c", &(temp.value), &(temp.suit) ) != EOF ){
    getchar();
    Card black[5], white[5];
    black[0] = temp;
    black[0].valueint = valuetoint(temp.value);

    for( int i = 1 ; i < 5 ; i++ ){
      scanf( "%c%c", &(temp.value), &(temp.suit) );
      getchar();
      black[i] = temp;
      black[i].valueint = valuetoint(temp.value);
    }

    for( int i = 0 ; i < 5 ; i++ ){
      scanf( "%c%c", &(temp.value), &(temp.suit) );
      getchar();
      white[i] = temp;
      white[i].valueint = valuetoint(temp.value);
    }

    sort( black, black+5, cmp );
    sort( white, white+5, cmp );

    Rank black_value = pokerHandsRank( black );
    Rank white_value = pokerHandsRank( white );
    int cmpvalue = cmpRank( black_value, white_value );

    if( cmpvalue > 0 ) printf( "Black wins.\n" );
    else if( cmpvalue < 0 ) printf( "White wins.\n" );
    else printf( "Tie.\n" );
  }
  return 0;
}
```
