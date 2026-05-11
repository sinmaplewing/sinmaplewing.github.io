---
id: 2679
title: '#UVa：10252－Common Permutation'
slug: uva：10252－common-permutation
date: '2015-01-15T01:53:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2015/01/15/2679/uva%ef%bc%9a10252%ef%bc%8dcommon-permutation/
wp_status: publish
wp_type: post
---

計算兩個字串共同有的字母有哪些且有幾個，求出來即是答案。

**C++(0.018)**
```cpp
/*******************************************************/
/* UVa 10252 Common Permutation                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

void countLetters(const string &s, int letterCount[]){
  for( int i = 0 ; i < s.length() ; ++i ){
    ++letterCount[(int)(s[i]-'a')];
  }
}

int main(){
  string a, b;
  while( getline(cin, a) ){
    getline(cin, b);
    int aLetterCount[30] = {0}, bLetterCount[30] = {0};
    countLetters(a, aLetterCount);
    countLetters(b, bLetterCount);

    for( int i = 0 ; i < 26 ; ++i ){
      int commonCount = min(aLetterCount[i], bLetterCount[i]);
      for( int j = 0 ; j < commonCount ; ++j ){
        printf("%c", (char)(i+'a'));
      }
    }
    printf("\n");
  }
  return 0;
}
```
