---
id: 2734
title: '#UVa：156－Ananagrams'
slug: uva：156－ananagrams
date: '2015-05-05T12:29:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/05/05/2734/uva%ef%bc%9a156%ef%bc%8dananagrams/
wp_status: publish
wp_type: post
---

先將文字改成全小寫並照字母排序，接著就看每個詞轉換後的字串是否有相等的。有相等的就不輸出，而沒有相等的就照原字串輸出即可。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 156 Ananagrams                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
#include <string>
#include <map>
#include <algorithm>
#include <queue>
using namespace std;

int main(){
  map<string, string> ananagrams;
  string word;
  while( cin >> word && word != "#"){
    string query = word;
    transform(word.begin(), word.end(), query.begin(), ::tolower);
    sort(query.begin(), query.end());
    
    if( ananagrams.find(query) == ananagrams.end() ){
      ananagrams[query] = word;
    }
    else{
      ananagrams[query] = "#";
    }
  }
  
  priority_queue< string, vector<string>, greater<string> > sortByValue;
  for( map<string, string>::iterator it = ananagrams.begin() ; it != ananagrams.end() ; ++it ){
    if( it->second != "#" ){
      sortByValue.push(it->second);
    }
  }
  
  while( !sortByValue.empty() ){
    printf("%s\n", sortByValue.top().c_str() );
    sortByValue.pop();
  }
  
  return 0;
}
```
