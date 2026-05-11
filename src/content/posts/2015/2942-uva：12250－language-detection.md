---
id: 2942
title: '#UVa：12250－Language Detection'
slug: uva：12250－language-detection
date: '2015-12-02T09:10:14+08:00'
lastmod: '2015-12-02T09:11:16+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 122
- UVa
permalink: /2015/12/02/2942/uva%ef%bc%9a12250%ef%bc%8dlanguage-detection/
wp_status: publish
wp_type: post
---

根據題目去對應輸入去輸出其語言為何，記得遇到不能對應的輸入要輸出UNKNOWN。

**C++(0.003)**
```cpp
/*******************************************************/
/* UVa 12250 Language Detection                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  string keys[] = { "HELLO",
                    "HOLA",
                    "HALLO",
                    "BONJOUR",
                    "CIAO",
                    "ZDRAVSTVUJTE" };

  string values[] = { "ENGLISH",
                      "SPANISH",
                      "GERMAN",
                      "FRENCH",
                      "ITALIAN",
                      "RUSSIAN" };

  int caseNumber = 0;
  string S;
  while( cin >> S && S != "#" ){

    bool isFind = false;
    for( int i = 0 ; i < 6 ; ++i ){
      if( keys[i] == S ){
        printf("Case %d: %s\n", ++caseNumber, values[i].c_str());
        isFind = true;
        break;
      }
    }

    if( !isFind ){
      printf("Case %d: UNKNOWN\n", ++caseNumber);
    }

  }

  return 0;
}
```
