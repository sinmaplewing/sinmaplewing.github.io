---
id: 1763
title: '#UVa：12289－One-Two-Three'
slug: uva：12289－one-two-three
date: '2012-07-15T21:27:11+08:00'
lastmod: '2014-12-31T23:23:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 122
- UVa
permalink: /2012/07/15/1763/uva%ef%bc%9a12289%ef%bc%8done-two-three/
wp_status: publish
wp_type: post
---

由於只會出現1,2,3這三種可能性，所以直接判斷最像三個之中哪一個即可。

**C++(0.024)**
```cpp
/*******************************************************/
/* UVa 12289 - One-Two-Three                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/07/15                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n;
  string s;
  int oneortwo;
  while( scanf( "%d", &n ) != EOF ){
    getchar();
    for( int i = 0 ; i < n ; i++ ){
      getline( cin, s );
      if( s.length() == 5 ) printf( "3\n" );
      else{
        oneortwo = 0;
        if( s[0] == 'o' ) oneortwo++;
        if( s[1] == 'n' ) oneortwo++;
        if( s[2] == 'e' ) oneortwo++;
        if( oneortwo >= 2 ) printf( "1\n" );
        else printf( "2\n" );
      }
    }
  }
  return 0;
}
``` 
