---
id: 2576
title: '#UVa：10921－Find the Telephone'
slug: uva：10921－find-the-telephone
date: '2015-01-03T22:21:17+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2015/01/03/2576/uva%ef%bc%9a10921%ef%bc%8dfind-the-telephone/
wp_status: publish
wp_type: post
---

利用對照表對映得解即可。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 10921 Find the Telephone                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
using namespace std;

int main(){
  const int table[30] = { 2, 2, 2,
                          3, 3, 3,
                          4, 4, 4,
                          5, 5, 5,
                          6, 6, 6,
                          7, 7, 7, 7,
                          8, 8, 8,
                          9, 9, 9, 9 };
  string input;
  while( getline( cin, input ) ){
    for( int i = 0 ; i < input.length() ; ++i ){
      if( isdigit(input[i] ) || input[i] == '-' ){
        printf("%c", input[i]);
      }
      else{
        printf("%d", table[(int)(input[i]-'A')]);
      }
    }
    printf("\n");
  }

  return 0;
}
```
