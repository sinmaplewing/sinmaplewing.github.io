---
id: 1538
title: '#UVa：10405－Longest Common Subsequence'
slug: uva：10405－longest-common-subsequence
date: '2012-03-27T22:31:29+08:00'
lastmod: '2014-12-31T23:07:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2012/03/27/1538/uva%ef%bc%9a10405%ef%bc%8dlongest-common-subsequence/
wp_status: publish
wp_type: post
---

此題為LCS(Longest Common Subsequence)的問題，由於本題只問長度，可只用一維陣列來求解。

P.S. 輸入要讀一整行，中間會有空白。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10405 Longest Common Subsequence                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/27                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  string s1, s2;
  int LCS[1005];

  while( getline( cin, s1 ) ){
    getline( cin, s2 );

    memset( LCS, 0, sizeof(LCS) );
    for( int i = 1 ; i <= s1.length() ; i++ ){
      for( int j = s2.length() ; j >= 1 ; j-- )
        if( s1[i-1] == s2[j-1] ) LCS[j] = LCS[j-1] + 1;
      for( int j = 1 ; j <= s2.length() ; j++ ){
        if( s1[i-1] != s2[j-1] ) LCS[j] = max( LCS[j], LCS[j-1] );
      }
    }
    printf( "%d\n", LCS[s2.length()] );
  }
  return 0;
}
```
