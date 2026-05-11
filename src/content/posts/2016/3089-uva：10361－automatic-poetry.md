---
id: 3089
title: '#UVa：10361－Automatic Poetry'
slug: uva：10361－automatic-poetry
date: '2016-04-20T08:28:01+08:00'
lastmod: '2020-05-10T01:39:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2016/04/20/3089/uva%ef%bc%9a10361%ef%bc%8dautomatic-poetry/
wp_status: publish
wp_type: post
---

照著所要求的方式去拆解字串再組合起來即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10361 Automatic Poetry                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    getchar();

    for( int caseNumber = 0 ; caseNumber < n ; ++caseNumber ){
      string s[5];
      for( int i = 0 ; i < 5 ; ++i ){
        char c;
        while( (c = getchar()) && c != '<' && c != '>' && c != '\n' ){
          s[i] += c;
        }
      }

      for( int i = 0 ; i < 5 ; ++i ){
        printf("%s", s[i].c_str());
      }
      printf("\n");

      string c2;
      getline(cin, c2);
      c2 = c2.substr(0, c2.length() - 3) + s[3] + s[2] + s[1] + s[4];
      printf("%s\n", c2.c_str());
    }
  }

  return 0;
}
```
