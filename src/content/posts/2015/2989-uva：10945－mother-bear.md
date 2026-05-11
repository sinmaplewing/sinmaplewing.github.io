---
id: 2989
title: '#UVa：10945－Mother bear'
slug: uva：10945－mother-bear
date: '2015-12-02T14:07:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2015/12/02/2989/uva%ef%bc%9a10945%ef%bc%8dmother-bear/
wp_status: publish
wp_type: post
---

將輸入的字串忽略掉非英文字母的字，並統一大小寫，最後做迴文判斷即可得解。

**C++(0.003)**
```cpp
/*******************************************************/
/* UVa 10945 Mother bear                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
using namespace std;

bool isPalindrome(string s){
  if( s.length() == 0 ){
    return true;
  }

  for( int i = 0 ; i <= s.length() / 2 ; ++i ){
    if( s[i] != s[s.length()-i-1] ){
      return false;
    }
  }
  return true;
}

int main(){
  string input;
  while( getline(cin, input) && input != "DONE" ){
    string line;
    for( int i = 0 ; i < input.length() ; ++i ){
      if( isalpha(input[i]) ){
        line += tolower(input[i]);
      }
    }

    if( isPalindrome(line) ){
      printf("You won't be eaten!\n");
    }
    else{
      printf("Uh oh..\n");
    }

  }

  return 0;
}
```
