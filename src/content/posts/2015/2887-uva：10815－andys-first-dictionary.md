---
id: 2887
title: '#UVa：10815－Andy''s First Dictionary'
slug: uva：10815－andys-first-dictionary
date: '2015-11-27T11:34:43+08:00'
lastmod: '2015-11-29T22:17:50+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 108
- UVa
permalink: /2015/11/27/2887/uva%ef%bc%9a10815%ef%bc%8dandys-first-dictionary/
wp_status: publish
wp_type: post
---

一個字一個字去讀，將連續的英文字連在一起形成單字再丟到集合內，最後將集合內的字串排序輸出即可。

P.S. 注意像是time-consuming或是andy's這樣的詞要當作time、consuming以及andy、s這樣的雙單字來看。

**C++(0.013)**
```cpp
/*******************************************************/
/* UVa 10815 Andy's First Dictionary                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/11/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
#include <set>
using namespace std;

int main(){
  set<string> dictionary;
  char word;
  string alphaWord;
  while( scanf("%c", &word) != EOF ){
    if( isalpha(word) ){
      alphaWord += tolower(word);
    }
    else if( alphaWord != "" ){
      dictionary.insert(alphaWord);
      alphaWord = "";
    }
  }

  if( alphaWord != "" ){
    dictionary.insert(alphaWord);
  }

  for( set<string>::iterator it = dictionary.begin() ; it != dictionary.end() ; it++ ){
    printf("%s\n", it->c_str());
  }

  return 0;
}
```
