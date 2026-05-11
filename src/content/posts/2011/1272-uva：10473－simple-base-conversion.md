---
id: 1272
title: '#UVa：10473－Simple Base Conversion'
slug: uva：10473－simple-base-conversion
date: '2011-12-17T07:41:26+08:00'
lastmod: '2014-12-31T23:07:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2011/12/17/1272/uva%ef%bc%9a10473%ef%bc%8dsimple-base-conversion/
wp_status: publish
wp_type: post
---

利用C++中的hex,dec以及C語言的%X,%x,%d來讓輸入輸出自己做轉換即可。

**C++(0.124)**
```cpp
/*******************************************************/
/* UVa 10473 Simple Base Conversion                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/17                                 */
/*******************************************************/
#include<iostream>
#include<sstream>
#include<cstdio>
using namespace std;

int main(){
  string s;
  stringstream ss;
  int num;
  while( cin >> s ){
    if( s[0] == '-' )
      break;
    ss.clear();
    ss.str(s);
    if( s[1] == 'x' ){
      ss >> hex >> num;
      printf( "%d\n", num );
    }
    else{
      ss >> dec >> num;
      printf( "0x%X\n", num );
    }
  }
  return 0;
}
```
