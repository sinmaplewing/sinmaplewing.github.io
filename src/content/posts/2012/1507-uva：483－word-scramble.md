---
id: 1507
title: '#UVa：483－Word Scramble'
slug: uva：483－word-scramble
date: '2012-03-18T01:02:28+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/03/18/1507/uva%ef%bc%9a483%ef%bc%8dword-scramble/
wp_status: publish
wp_type: post
---

可利用sscanf或是stringstream會用空白來隔開輸入的特性來做。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 483 Word Scramble                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/18                                 */
/*******************************************************/
#include<iostream>
#include<sstream>
#include<cstdio>
using namespace std;

int main(){
  string s, word;
  stringstream ss;
  bool space;
  while( getline( cin, s ) ){
    ss.clear();
    ss.str(s);
    space = false;
    while( ss >> word ){
      if( space ) printf( " " );
      space = true;
      for( int i = word.length()-1 ; i >= 0 ; i-- )
        printf( "%c", word[i] );
    }
    printf( "\n" );
  }
  return 0;
}
```
