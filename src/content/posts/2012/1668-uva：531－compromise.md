---
id: 1668
title: '#UVa：531－Compromise'
slug: uva：531－compromise
date: '2012-04-03T08:05:23+08:00'
lastmod: '2014-12-31T22:50:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/04/03/1668/uva%ef%bc%9a531%ef%bc%8dcompromise/
wp_status: publish
wp_type: post
---

LCS(Longest Common Subsequence)的問題，不過要輸出一組解出來。

P.S. 測資並非就只有一組兩個字串，它會有好幾組的兩個字串，Input是以EOF作為結尾。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 531 Compromise                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/03                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
#define MAX_NUM 105
using namespace std;

int LCS[MAX_NUM][MAX_NUM];
int dir[MAX_NUM][MAX_NUM];
bool space;

void printLCS( string s1[], string s2[], int i, int j ){
  if( i == 0 || j == 0 ) return;
  if( dir[i][j] == 1 ){
    printLCS( s1, s2, i-1, j-1 );
    if( space ) printf( " " );
    printf( "%s", s1[i].c_str() );
    space = true;
  }
  else if( dir[i][j] == 2 ) printLCS( s1, s2, i-1, j );
  else printLCS( s1, s2, i, j-1 );
}

int main(){
  string input, s1[MAX_NUM], s2[MAX_NUM];
  int s1word = 1, s2word = 1;
  int str = 0;

  while( cin >> input ){
    if( input == "#" ){
      if( str ){
        --s1word;
        --s2word;
        memset( LCS, 0, sizeof(LCS) );
        for( int i = 1 ; i <= s1word ; i++ )
          for( int j = 1 ; j <= s2word ; j++ )
            if( s1[i] == s2[j] ){
              LCS[i][j] = LCS[i-1][j-1]+1;
              dir[i][j] = 1;
            }
            else if( LCS[i-1][j] > LCS[i][j-1] ){
              LCS[i][j] = LCS[i-1][j];
              dir[i][j] = 2;
            }
            else{
              LCS[i][j] = LCS[i][j-1];
              dir[i][j] = 3;
            }

        space = false;
        printLCS( s1, s2, s1word, s2word );
        printf( "\n" );
        s1word = 1;
        s2word = 1;
      }

      str ^= 1;
      continue;
    }

    if( str ) s2[s2word++] = input;
    else s1[s1word++] = input;

  }

  return 0;
}
```
