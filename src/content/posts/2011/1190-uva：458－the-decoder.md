---
id: 1190
title: '#UVa：458－The Decoder'
slug: uva：458－the-decoder
date: '2011-11-25T00:49:34+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/25/1190/uva%ef%bc%9a458%ef%bc%8dthe-decoder/
wp_status: publish
wp_type: post
---

利用ASCII碼找出Sample Input和Sample Output相差的k值，將輸入的每個字都以此k值做加減即可得解。

**C++(0.172)**
```cpp
/*******************************************************/
/* UVa 458 The Decoder                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/25                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  const int K = (int)('*'-'1');
  string s;
  while( getline( cin, s ) ){
    for( int i = 0 ; i < s.length() ; i++ )
      printf( "%c", s[i]+K );
    printf( "\n" );
  }
  return 0;
}
```
