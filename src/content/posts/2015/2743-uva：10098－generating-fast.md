---
id: 2743
title: '#UVa：10098－Generating Fast'
slug: uva：10098－generating-fast
date: '2015-05-07T10:17:37+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2015/05/07/2743/uva%ef%bc%9a10098%ef%bc%8dgenerating-fast/
wp_status: publish
wp_type: post
---

先排序完後，利用next_permutation即可得解。

**C++(0.029)**
```cpp
/*******************************************************/
/* UVa 10098 Generating Fast                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/07                                 */
/*******************************************************/
#include <iostream>
#include <string>
#include <algorithm>
#include <cstdio>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    
    string input;
    for( int i = 0 ; i < n ; ++i ){
      cin >> input;
      
      sort(input.begin(), input.end());
      do{
        printf("%s\n", input.c_str());
      } while( next_permutation(input.begin(), input.end()) );
      printf("\n");
    }
  }
  return 0;
}
```
