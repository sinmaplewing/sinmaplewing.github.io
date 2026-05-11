---
id: 4272
title: '#UVa：389－Basically Speaking'
slug: uva：389－basically-speaking
date: '2019-04-15T09:35:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2019/04/15/4272/uva%ef%bc%9a389%ef%bc%8dbasically-speaking/
wp_status: publish
wp_type: post
---

將數字的表示法依照原本的進位制轉換至目標的進位制即可。

**C++(0.130)**
```cpp
/*******************************************************/
/* UVa 389 Basically Speaking                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <map>
using namespace std;

int getValueFromBase(map<char, int> &digitConvertMap, string& input, int base){
  int value = 0;
  for(int i = 0 ; i < input.length() ; ++i){
    int digit = digitConvertMap[input[i]];
    value = value * base + digit;
  }

  return value;
}

string getRepresentWithBase(map<int, char> &valueConvertMap, int value, int base){
  if(value == 0) return "0";

  string represent;
  while(value > 0){
    int digitValue = value % base;
    represent = valueConvertMap[digitValue] + represent;
    value /= base;
  }

  return represent;
}

int main(){
  map<char, int> digitConvertMap;
  map<int, char> valueConvertMap;
  for(char c = '0' ; c <= '9' ; ++c){
    int value = c - '0';
    digitConvertMap[c] = value;
    valueConvertMap[value] = c;
  }
  for(char c = 'A' ; c <= 'F' ; ++c){
    int value = c - 'A' + 10;
    digitConvertMap[c] = value;
    valueConvertMap[value] = c;
  }

  string input;
  int originBase, targetBase;
  while(cin >> input >> originBase >> targetBase){
    int value = getValueFromBase(digitConvertMap, input, originBase);
    string represent = getRepresentWithBase(valueConvertMap, value, targetBase);
    printf("%7s\n", 
      (represent.length() > 7) ? 
        "ERROR" : represent.c_str());
  }
  return 0;
}
```
