---
id: 1236
title: '#UVa：10062－Tell me the frequencies!'
slug: uva：10062－tell-me-the-frequencies
date: '2011-11-29T22:44:03+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1236/uva%ef%bc%9a10062%ef%bc%8dtell-me-the-frequencies/
wp_status: publish
wp_type: post
---

這題的話，我是先一個一個字看它的ASCII碼是多少，把陣列中它的ASCII碼那格加1，表示這個字多出現了一次。

我用了三個變數，一個存最大出現的ASCII碼，一個存最小出現的ASCII碼，一個存最多出現的次數。

然後我就從出現一次開始搜尋，直到最多出現的次數，每次搜尋都是從最大ASCII碼搜尋到最小ASCII碼這樣，搜尋到次數一樣就輸出。

(當然這題用Sort也是OK啦XD)

**C++(0.036)**
```cpp
/*******************************************************/
/* UVa 10062 Tell me the frequencies!                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
using namespace std;

int main(){
  string s;
  int min_ASCII, max_ASCII, max_count;
  bool blankline = 0;
  while( getline( cin , s ) ){
    if( blankline ) printf( "\n" );

    int ASCII[130] = {0};
    min_ASCII = 200;
    max_ASCII = 0;
    max_count = 0;

    for( int i = 0 ; i < s.length() ; i++ ){
      ASCII[(int)s[i]]++;
      min_ASCII = min( min_ASCII, (int)s[i] );
      max_ASCII = max( max_ASCII, (int)s[i] );
      max_count = max( max_count, ASCII[(int)s[i]] );
    }

    for( int i = 1 ; i <= max_count ; i++ )
      for( int j = max_ASCII ; j >= min_ASCII ; j-- )
        if( ASCII[j] == i )
          printf( "%d %d\n", j, i );
        blankline = 1;
  }
  return 0;
}
```
