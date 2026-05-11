---
id: 1972
title: '#UVa：263－Number Chains'
slug: uva：263－number-chains
date: '2012-10-21T00:31:48+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/10/21/1972/uva%ef%bc%9a263%ef%bc%8dnumber-chains/
wp_status: publish
wp_type: post
---

照著題目做即可得解，可多善用C++中的string。

**C++(0.600)**
```cpp
/*******************************************************/
/* UVa 263 Number Chains                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/21                                 */
/*******************************************************/
#include<iostream>
#include<sstream>
#include<cstdio>
#include<algorithm>
#include<set>
using namespace std;

bool big_cmp( char a, char b ){
  return a > b;
}

long long StringToLL( string s ){
  stringstream ss;
  long long num;
  ss << s;
  ss >> num;
  return num;
}

string LLToString( long long ll ){
  stringstream ss;
  string s;
  ss << ll;
  ss >> s;
  return s;
}

int main(){
  string s;
  long long a, b;
  set<long long> visited;
  while( getline( cin, s ) && s != "0" ){
    visited.clear();

    printf( "Original number was %s\n", s.c_str() );
    while(1){
      sort( s.begin(), s.end(), big_cmp );
      a = StringToLL(s);
      sort( s.begin(), s.end() );
      b = StringToLL(s);
      printf( "%lld - %lld = %lld\n", a, b, a-b );
      if( visited.find(a-b) != visited.end() ) break;
      visited.insert(a-b);
      s = LLToString(a-b);
    }
    printf( "Chain length %d\n\n", visited.size()+1 );
  }
  return 0;
}
```
