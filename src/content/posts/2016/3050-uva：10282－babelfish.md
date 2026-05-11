---
id: 3050
title: '#UVa：10282－Babelfish'
slug: uva：10282－babelfish
date: '2016-04-14T00:53:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2016/04/14/3050/uva%ef%bc%9a10282%ef%bc%8dbabelfish/
wp_status: publish
wp_type: post
---

將字典用Map存下後再將輸入拿去查詢即可得解。

**C++(0.310)**
```cpp
/*******************************************************/
/* UVa 10282 Babelfish                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <sstream>
#include <map>
using namespace std;

int main(){
  string input;
  map<string, string> dictionary;
  while( getline(cin, input) && input != "" ){
   stringstream ss(input);
   string key, value;
   ss >> value >> key;
   dictionary[key] = value;
  }
  
  while( getline(cin, input) ){
    if( dictionary.find(input) == dictionary.end() ){
      printf("eh\n");
    }
    else {
      printf("%s\n", dictionary[input].c_str());
    }
  }
  
  return 0;
}
```
