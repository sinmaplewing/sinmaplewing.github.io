---
id: 1674
title: '#Zerojudge：a001－哈囉'
slug: zerojudge：a001－哈囉
date: '2012-04-03T22:05:52+08:00'
lastmod: '2014-08-28T00:54:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Zerojudge
permalink: /2012/04/03/1674/zerojudge%ef%bc%9aa001%ef%bc%8d%e5%93%88%e5%9b%89/
wp_status: publish
wp_type: post
---

照題目要求輸出即可。

**C++(4ms, 430KB)**
```cpp
/*******************************************************/
/* Zerojudge a001                                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/03                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string s;
  while( getline( cin, s ) ){
    printf( "hello, %s\n", s.c_str() );
  }
  return 0;
}
```
