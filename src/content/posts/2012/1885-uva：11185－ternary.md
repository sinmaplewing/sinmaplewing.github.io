---
id: 1885
title: '#UVa：11185－Ternary'
slug: uva：11185－ternary
date: '2012-09-16T00:28:22+08:00'
lastmod: '2014-12-31T23:17:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2012/09/16/1885/uva%ef%bc%9a11185%ef%bc%8dternary/
wp_status: publish
wp_type: post
---

利用迴圈轉換成3進位數字即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11185 Ternary                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int N;
  string output;

  while( scanf( "%d", &N ) != EOF && N >= 0 ){

    output = "";
    do{
      output = (char)((N%3)+(int)'0') + output;
      N /= 3;
    }while( N );

    printf( "%s\n", output.c_str() );
  }
  return 0;
}
```
