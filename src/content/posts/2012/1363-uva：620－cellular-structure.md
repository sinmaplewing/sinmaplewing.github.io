---
id: 1363
title: '#UVa：620－Cellular Structure'
slug: uva：620－cellular-structure
date: '2012-01-19T00:31:35+08:00'
lastmod: '2015-02-26T10:31:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2012/01/19/1363/uva%ef%bc%9a620%ef%bc%8dcellular-structure/
wp_status: publish
wp_type: post
---

由於題目只要求輸出的是最主要第一層所見到的格式，所以第一我們可以先知道，長度為偶數的一定屬於MUTANT，再來如果長度為1的話，是'A'就是SIMPLE，而是'B'的話就是MUTANT，再來看整個大結構：OAB和BOA，只要往下遞迴搜尋O的部分並非為MUTANT，則該格式分別為FULLY-GROWN和MUTAGENIC，反之只要O在其中一層回傳為MUTANT則整個格式就為MUTANT。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 620 Cellular Structure                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/02/26                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

enum TYPE { SIMPLE, FULLYGROWN, MUTAGENIC, MUTANT };

TYPE check(const string& s, int front, int back){
  if( (back-front+1) % 2 == 0 ) return MUTANT;

  if( front == back ){
    if( s[front] == 'A' ) return SIMPLE;
    else return MUTANT;
  }

  if( s[back] == 'B' && s[back-1] == 'A' ){
    if( check(s, front, back-2) != MUTANT ) return FULLYGROWN;
  }

  if( s[front] == 'B' && s[back] == 'A' ){
    if( check(s, front+1, back-1) != MUTANT ) return MUTAGENIC;
  }

  return MUTANT;
}


int main(){
  int n;
  string s;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      cin >> s;
      switch(check( s, 0, s.length()-1 )){
        case SIMPLE: printf("SIMPLE\n"); break;
        case FULLYGROWN: printf("FULLY-GROWN\n"); break;
        case MUTAGENIC: printf("MUTAGENIC\n"); break;
        case MUTANT: printf("MUTANT\n"); break;
      }
    }
  }
  return 0;
}
```
