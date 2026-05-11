---
id: 3629
title: '#UVa：10295－Hay Points'
slug: uva：10295－hay-points
date: '2018-09-27T21:13:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2018/09/27/3629/uva%ef%bc%9a10295%ef%bc%8dhay-points/
wp_status: publish
wp_type: post
---

將單字建成表後，遇到文章就將每個字查表總和即是解答。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10295 Hay Points                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

int main(){
  int m, n;
  while(scanf("%d%d", &m, &n) != EOF){
    map<string, int> dictionary;
    for(int i = 0 ; i < m ; ++i){
      char word[20];
      int hayPoint;
      scanf("%s%d", word, &hayPoint);
      dictionary[string(word)] = hayPoint;
    }
    
    for(int i = 0 ; i < n ; ++i){
      string descriptionWord;
      int totalHayPoints = 0;
      while(cin >> descriptionWord && descriptionWord != "."){
        totalHayPoints += dictionary[descriptionWord];
      }
      printf("%d\n", totalHayPoints);
    }
  }
  return 0;
}
```
