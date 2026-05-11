---
id: 3018
title: '#UVa：11192－Group Reverse'
slug: uva：11192－group-reverse
date: '2016-02-16T11:21:11+08:00'
lastmod: '2016-03-14T16:30:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2016/02/16/3018/uva%ef%bc%9a11192%ef%bc%8dgroup-reverse/
wp_status: publish
wp_type: post
---

先算出一個Group有多少字，然後以每這個字數在字串中倒轉輸出即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11192 Group Reverse                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/02/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int G;
  string input;

  while( scanf("%d", &G) != EOF && G != 0 ){
    cin >> input;

    int numOfGroupMember = input.length() / G;
    for( int i = 0 ; i < input.length() ; i += numOfGroupMember ){
      for( int j = i + numOfGroupMember - 1 ; j >= i ; j-- ){
        printf("%c", input[j]);
      }
    }

    printf("\n");
  }

  return 0;
}
```
