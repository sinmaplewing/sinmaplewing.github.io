---
id: 3052
title: '#UVa：11340－Newspaper'
slug: uva：11340－newspaper
date: '2016-04-14T16:56:03+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2016/04/14/3052/uva%ef%bc%9a11340%ef%bc%8dnewspaper/
wp_status: publish
wp_type: post
---

照著所給的字的價錢去算出所給的文章能賺多少稿費即可得解。

P.S. 注意輸入的字元是unsigned char才夠存，若只用char會錯。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 11340 Newspaper                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    for( int caseNumber = 0 ; caseNumber < N ; ++caseNumber ){
      int K;
      scanf("%d", &K);
      
      int price[256] = {0};
      for( int i = 0 ; i < K ; ++i ){
        unsigned char key;
        int value;
        scanf(" %c %d", &key, &value);
        price[key] = value;
      }
      
      int M;
      scanf("%d ", &M);
      
      int totalMoney = 0;
      for( int i = 0 ; i < M ; ++i ){
        unsigned char character;
        while( (character = getchar()) != EOF && character != '\n' ){
          totalMoney += price[character];
        }
      }
      
      printf("%.2lf$\n", totalMoney / 100.0);
      
    }
  }
  
  return 0;
}
```
