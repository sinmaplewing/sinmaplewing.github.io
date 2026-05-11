---
id: 1262
title: '#UVa：10340－All in All'
slug: uva：10340－all-in-all
date: '2011-12-05T01:32:41+08:00'
lastmod: '2014-12-31T23:06:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2011/12/05/1262/uva%ef%bc%9a10340%ef%bc%8dall-in-all/
wp_status: publish
wp_type: post
---

利用兩個變數i,sindex，i從t開始搜，搜到與s[sindex]一樣就讓sindex++，這樣到最後如果sindex與s字串的長度一樣，即表示答案是Yes，反之則是No。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 10340 All in All                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/12/05                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string s, t;
  while( cin >> s >> t ){
    int sindex = 0;
    for( int i = 0 ; i < t.length() ; i++ ){
      if( t[i] == s[sindex] ){
        sindex++;
        if( sindex == s.length() ) break;
      }
    }
    if( sindex == s.length() )
      printf( "Yes\n" );
    else
      printf( "No\n" );
  }
  return 0;
}
```
