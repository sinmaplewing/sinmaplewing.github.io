---
id: 4807
title: '#UVa：11713－Abstract Names'
slug: uva：11713－abstract-names
date: '2020-04-13T00:52:47+08:00'
lastmod: '2020-04-14T00:47:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2020/04/13/4807/uva%ef%bc%9a11713%ef%bc%8dabstract-names/
wp_status: publish
wp_type: post
---

比較兩個字串的時候，遇到兩邊都是母音的狀況就不比較即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11713 Abstract Names                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/13                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

bool isVowel(char c){
  return c == 'a' || c == 'e' || 
    c == 'i' || c == 'o' || c == 'u';
}

int main(){
  int n;
  while(scanf("%d ", &n) != EOF){
    for(int caseNumber = 1 ; caseNumber <= n ; ++caseNumber){
      string a, b;
      getline(cin, a);
      getline(cin, b);

      if(a.length() != b.length()){
        printf("No\n");
        continue;
      }

      bool isSame = true;
      for(int i = 0 ; i < a.length() ; ++i){
        if(a[i] != b[i] && (!isVowel(a[i]) || !isVowel(b[i]))){
          isSame = false;
          break;
        }
      }

      printf("%s\n", isSame ? "Yes" : "No");
    }
  }

  return 0;
}
```
