---
id: 1584
title: '#UVa：401－Palindromes'
slug: uva：401－palindromes
date: '2012-03-31T00:41:06+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/03/31/1584/uva%ef%bc%9a401%ef%bc%8dpalindromes/
wp_status: publish
wp_type: post
---

依照題目要求去比對字串的值即可得解。

**C++(0.028)**
```cpp
/*******************************************************/
/* UVa 401 Palindromes                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/31                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;

const char mirror[36] = "A000300HIL0JM0O0002TUVMXY51SE0Z0080";

int main(){
  string s;
  bool palindrome, mirrored;
  while( getline( cin, s ) ){
    palindrome = true;
    mirrored = true;
    for( int i = 0; i <= s.length()/2 ; i++ ){
      if( s[i] != s[s.length()-i-1] )
        palindrome = false;
      if( isupper(s[s.length()-i-1]) && (s[i] != mirror[s[s.length()-i-1]-'A']) )
        mirrored = false;
      if( isdigit(s[s.length()-i-1]) && (s[i] != mirror[s[s.length()-i-1]-'1'+26]) )
        mirrored = false;
    }
    printf( "%s -- is ", s.c_str() );
    if( palindrome && mirrored ) printf( "a mirrored palindrome.\n" );
    else if( palindrome ) printf( "a regular palindrome.\n" );
    else if( mirrored ) printf( "a mirrored string.\n" );
    else printf( "not a palindrome.\n" );
    printf( "\n" );
  }
  return 0;
}
```
