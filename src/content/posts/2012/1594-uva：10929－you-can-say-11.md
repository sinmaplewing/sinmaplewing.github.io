---
id: 1594
title: '#UVa：10929－You can say 11'
slug: uva：10929－you-can-say-11
date: '2012-03-31T11:15:45+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/03/31/1594/uva%ef%bc%9a10929%ef%bc%8dyou-can-say-11/
wp_status: publish
wp_type: post
---

1. 此題數字過大，需用字串存取，轉成數值必須經過ASCII碼的換算。
2. 判斷11的倍數：偶數位和與奇數位和之差需要是11的倍數。
3. 判斷N是否為0，若用C字串(字元陣列)必須判斷N[0]=='0'和N[1]=='\0'，不然只判斷N[0]=='0'會WA。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 10929 You can say 11                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/31                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string N;
  int odd, even;

  while( getline( cin, N ) && N != "0" ){
    odd = 0;
    even = 0;
    for( int i = 0 ; i < N.length() ; i++ )
      if( i%2 ) odd += N[i] - '0';
    else even += N[i] - '0';

    printf( "%s is ", N.c_str() );
    if( (odd-even) % 11 ) printf( "not " );
    printf( "a multiple of 11.\n" );
  }
  return 0;
}
```
