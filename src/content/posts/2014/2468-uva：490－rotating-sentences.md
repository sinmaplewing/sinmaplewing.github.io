---
id: 2468
title: '#UVa：490－Rotating Sentences'
slug: uva：490－rotating-sentences
date: '2014-12-29T16:01:32+08:00'
lastmod: '2014-12-31T22:21:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2014/12/29/2468/uva%ef%bc%9a490%ef%bc%8drotating-sentences/
wp_status: publish
wp_type: post
---

先將輸入存進二維陣列中，再用題目所要求的順序輸出答案。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 490 Rotating Sentences                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int main(){
  const int MAX_LENGTH = 100;
  char sentences[MAX_LENGTH+5][MAX_LENGTH+5] = {0};

  int rowLimit = 0, colLimit = 0;
  while( gets(sentences[rowLimit]) ){
    colLimit = max( colLimit, (int)strlen(sentences[rowLimit]) );
    ++rowLimit;
  }

  for( int i = 0 ; i < colLimit ; ++i ){
    for( int j = rowLimit-1 ; j >= 0 ; --j ){
      if( sentences[j][i] == 0 ){
        printf(" ");
        continue;
      }
      printf("%c", sentences[j][i]);
    }
    printf("\n");
  }

  return 0;
}
```
