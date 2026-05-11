---
id: 2937
title: '#UVa：12577－Hajj-e-Akbar'
slug: uva：12577－hajj-e-akbar
date: '2015-12-01T14:25:26+08:00'
lastmod: '2015-12-01T14:26:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 125
permalink: /2015/12/01/2937/uva%ef%bc%9a12577%ef%bc%8dhajj-e-akbar/
wp_status: publish
wp_type: post
---

遇到Hajj就輸出Hajj-e-Akbar，遇到Umrah就輸出Hajj-e-Asghar即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12577 Hajj-e-Akbar                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/01                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int casenumber = 0;
  string input;
  while( cin >> input && input != "*" ){
    if( input == "Hajj" ){
      printf("Case %d: Hajj-e-Akbar\n", ++casenumber );
    }
    else if( input == "Umrah" ){
      printf("Case %d: Hajj-e-Asghar\n", ++casenumber);
    }
  }
  return 0;
}
```
