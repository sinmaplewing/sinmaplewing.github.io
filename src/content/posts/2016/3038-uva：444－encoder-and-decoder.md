---
id: 3038
title: '#UVa：444－Encoder and Decoder'
slug: uva：444－encoder-and-decoder
date: '2016-03-17T11:18:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/03/17/3038/uva%ef%bc%9a444%ef%bc%8dencoder-and-decoder/
wp_status: publish
wp_type: post
---

encode就是把字母轉成ASCII碼後反轉即可；decode的話要先知道能用的字母有哪些，一個一個數字接起來後看是否有能用的字母可以對應，有的話就轉成該字母即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 444 Encoder and Decoder                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/17                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
#include <cctype>
#include <string>
#include <algorithm>
using namespace std;

string toString(int n){
  stringstream ss;
  ss << n;

  return ss.str();
}

string encode(string s){
  string answer;
  for( int i = 0 ; i < s.length() ; ++i ){
    answer += toString( (int)s[i] );
  }
  reverse(answer.begin(), answer.end());

  return answer;
}

string decode(bool usedAlphabet[], string s){
  reverse(s.begin(), s.end());

  string answer;
  int word = 0;
  for( int i = 0 ; i < s.length() ; ++i ){
    word = (s[i] - '0') + word * 10;
    if( usedAlphabet[word] ){
      answer += (char)word;
      word = 0;
    }
  }

  return answer;
}


int main(){
  bool usedAlphabet[256] = {false};
  for( int i = 'a' ; i <= 'z' ; ++i ){
    usedAlphabet[i] = true;
  }
  for( int i = 'A' ; i <= 'Z' ; ++i ){
    usedAlphabet[i] = true;
  }
  
  string validCharacter = " !,.:;?";
  for( int i = 0 ; i < validCharacter.length() ; ++i ){
    usedAlphabet[validCharacter[i]] = true;
  }


  string input;
  while( getline( cin, input ) ){
    if( isdigit(input[0]) ){
      printf("%s\n", decode(usedAlphabet, input).c_str());
    }
    else{
      printf("%s\n", encode(input).c_str());
    }
  }
  return 0;
}
```
