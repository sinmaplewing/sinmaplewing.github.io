---
id: 3363
title: '#UVa：11988－Broken Keyboard (a.k.a. Beiju Text)'
slug: uva：11988－broken-keyboard-k-beiju-text
date: '2017-12-21T23:48:09+08:00'
lastmod: '2017-12-21T23:48:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2017/12/21/3363/uva%ef%bc%9a11988%ef%bc%8dbroken-keyboard-k-beiju-text/
wp_status: publish
wp_type: post
---

利用 List 模擬實際行為即可得解。

**C++(0.170)**
```cpp
/*******************************************************/
/* UVa 11988 Broken Keyboard (a.k.a. Beiju Text)       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2017/12/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <list>
using namespace std;

int main(){
  string input;
  while(getline(cin, input)){
    list<char> text;
    list<char>::iterator textIterator;
    textIterator = text.begin();

    for( int i = 0 ; i < input.length() ; ++i ){
      switch(input[i]){
        case '[':
          textIterator = text.begin();
          break;
        case ']':
          textIterator = text.end();
          break;
        default:
          text.insert(textIterator, input[i]);
          break;
      }  
    }

    for(textIterator = text.begin() ; textIterator != text.end() ; ++textIterator){
      printf("%c", *textIterator);
    }
    printf("\n");
  }

  return 0;
}
```
