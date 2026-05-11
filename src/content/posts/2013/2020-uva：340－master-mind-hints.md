---
id: 2020
title: '#UVa：340－Master-Mind Hints'
slug: uva：340－master-mind-hints
date: '2013-05-01T16:38:55+08:00'
lastmod: '2014-12-31T03:24:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2013/05/01/2020/uva%ef%bc%9a340%ef%bc%8dmaster-mind-hints/
wp_status: publish
wp_type: post
---

利用兩個boolean陣列去紀錄答案與猜測的兩陣列中哪些已經被比過了，這樣去找幾A幾B就沒有問題了。

**C++(0.032)**
```cpp
/*******************************************************/
/* UVa 340 Master-Mind Hints                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2013/05/01                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

bool isAllZero( int N, int password[] ){
  for( int i = 0 ; i < N ; i++ )
    if( password[i] != 0 ) return false;
  return true;
}

int main(){
  int gameNum = 1;
  int N;

  while( scanf("%d", &N ) != EOF && N != 0 ){
    int password[1005], guestPassword[1005];

    printf( "Game %d:\n", gameNum++ );

    for( int i = 0 ; i < N ; ++i )
      scanf( "%d", &password[i] );

    while( true ){
      for( int i = 0 ; i < N ; ++i )
        scanf( "%d", &guestPassword[i] );
      if( isAllZero( N, guestPassword ) ) break;

      bool checkCorrect[1005] = {false};
      bool checkGuest[1005] = {false};
      int A = 0, B = 0;
      for( int i = 0 ; i < N ; ++i ){
        if( password[i] == guestPassword[i] ){
          ++A;
          checkCorrect[i] = true;
          checkGuest[i] = true;
        }
      }

      for( int i = 0 ; i < N ; ++i ){
        if( checkCorrect[i] ) continue;
        for( int j = 0 ; j < N ; ++j ){
          if( checkGuest[j] ) continue;
          if( i != j && password[i] == guestPassword[j] &&
              !checkCorrect[i] && !checkGuest[j] ){
            ++B;
            checkCorrect[i] = true;
            checkGuest[j] = true;
          }
        }
      }

      printf( " (%d,%d)\n", A, B );
    }

  }

  return 0;
}
```
