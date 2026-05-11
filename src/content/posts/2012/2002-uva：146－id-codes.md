---
id: 2002
title: '#UVa：146－ID Codes'
slug: uva：146－id-codes
date: '2012-11-29T07:51:10+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/11/29/2002/uva%ef%bc%9a146%ef%bc%8did-codes/
wp_status: publish
wp_type: post
---

使用STL的next_permutation()即可快速得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 146 ID Codes                                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/29                                 */
/*******************************************************/

#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int main(){
  string code;
  while( getline( cin, code ) && code != "#" ){
    if( next_permutation( code.begin(), code.end() ) ){
      printf( "%s\n", code.c_str() );
    }
    else{
      printf( "No Successor\n" );
    }
  }
  return 0;
}
```
