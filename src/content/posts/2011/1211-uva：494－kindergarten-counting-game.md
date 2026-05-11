---
id: 1211
title: '#UVa：494－Kindergarten Counting Game'
slug: uva：494－kindergarten-counting-game
date: '2011-11-29T00:13:46+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2011/11/29/1211/uva%ef%bc%9a494%ef%bc%8dkindergarten-counting-game/
wp_status: publish
wp_type: post
---

尋找字母與非字母之間的交界處有幾個就可以知道有幾個字了。

P.S. 不能單純只用空格來分隔單字，測資當中會有類似 This!has,four.words? 是4個字的這種測資。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 494 Kindergarten Counting Game                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;

int main(){
  string s, temp;
  int count;
  bool alphap = 0;
  while( getline( cin, s ) ){
    count = 0;
    for( int i = 0 ; i < s.length() ; i++ ){
      if( isalpha(s[i]) && !alphap ){
        alphap = 1;
        count++;
      }
      else if( !isalpha(s[i]) && alphap ){
        alphap = 0;
      }
    }
    printf( "%d\n", count );
  }
  return 0;
}
```
