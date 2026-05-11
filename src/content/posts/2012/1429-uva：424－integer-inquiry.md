---
id: 1429
title: '#UVa：424－Integer Inquiry'
slug: uva：424－integer-inquiry
date: '2012-02-02T14:34:20+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/02/02/1429/uva%ef%bc%9a424%ef%bc%8dinteger-inquiry/
wp_status: publish
wp_type: post
---

大數加法即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 424 Integer Inquiry                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/02/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int answer[1005] = {0};
  int digit = 0;
  string input;
  while( getline( cin, input ) && !(input[0] == '0' && input[1] == 0)){
    digit = input.length();
    for( int i = 0 ; i < digit ; i++ ){
      answer[i] += (input[digit-i-1] - '0');
      answer[i+1] += answer[i]/10;
      answer[i] %= 10;
    }
  }
  int i;
  for( i = 1004 ; i >= 0 ; i-- )
    if( answer[i] ) break;
  if( i < 0 ) i = 0;
  for( ; i >= 0 ; i-- )
    printf( "%d", answer[i] );
  printf( "\n" );
  return 0;
}
```
