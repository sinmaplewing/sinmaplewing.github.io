---
id: 1489
title: '#UVa：10008－What''s Cryptanalysis?'
slug: uva：10008－whats-cryptanalysis
date: '2012-03-16T22:37:17+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/16/1489/uva%ef%bc%9a10008%ef%bc%8dwhats-cryptanalysis/
wp_status: publish
wp_type: post
---

照題目計算各個英文字母出現的次數即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10008 What's Cryptanalysis?                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
#include<utility>
#include<algorithm>
using namespace std;

typedef pair<char,int> Pair;

bool compare( Pair a, Pair b ){
  if( a.second > b.second ) return true;
  if( a.second < b.second ) return false;
  if( a.first < b.first ) return true;
  return false;
}

int main(){
  int n;
  string s;
  Pair ASCII[130];

  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < 130 ; i++ ){
      ASCII[i].first = i;
      ASCII[i].second = 0;
    }
    getchar();

    for( int i = 0 ; i < n ; i++ ){
      getline( cin, s );
      for( int j = 0 ; j < s.length() ; j++ )
        if( isalpha(s[j]) )
          ASCII[toupper(s[j])].second++;
    }

    sort( ASCII, ASCII+130, compare );
    for( int i = 0 ; i < 130 ; i++ ){
      if( ASCII[i].second )
        printf( "%c %d\n", ASCII[i].first, ASCII[i].second ); 
    }
  }
  return 0;
}
```
