---
id: 2790
title: '#UVa：195－Anagram'
slug: uva：195－anagram
date: '2015-05-13T11:28:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/05/13/2790/uva%ef%bc%9a195%ef%bc%8danagram/
wp_status: publish
wp_type: post
---

先對字串做sort，接著利用C++的STL中的next_permutation()即可得解。但這中間的比較得自己重寫，預設是用ASCII碼去排，你必須自己改寫成用字母去排就可以了。

**C++(0.029)**
```cpp
/*******************************************************/
/* UVa 195 Anagram                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/13                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

bool compare(char a, char b){
  char lower_a = tolower(a), lower_b = tolower(b);
  if( lower_a == lower_b ){
    return a < b;
  }
  else return lower_a < lower_b; 
}

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    string input;
    for( int i = 0 ; i < n ; ++i ){
      cin >> input;
      sort(input.begin(), input.end(), compare);
      do {
        printf("%s\n", input.c_str());
      } while( next_permutation(input.begin(), input.end(), compare) );
    }
  }
  return 0;
}
```
