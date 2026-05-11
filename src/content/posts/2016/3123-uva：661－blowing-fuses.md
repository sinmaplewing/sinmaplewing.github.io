---
id: 3123
title: '#UVa：661－Blowing Fuses'
slug: uva：661－blowing-fuses
date: '2016-04-28T01:42:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2016/04/28/3123/uva%ef%bc%9a661%ef%bc%8dblowing-fuses/
wp_status: publish
wp_type: post
---

照著題目要求去紀錄每次開關所用的電流量以及裝置開關狀態即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 661 Blowing Fuses                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int n, m, c;
  int caseNumber = 0;
  while( scanf("%d%d%d", &n, &m, &c) != EOF &&
         ( n != 0 || m != 0 || c != 0 ) ){
    int consumption[25] = {0};
    for( int i = 1 ; i <= n ; ++i ){
      scanf("%d", &consumption[i]);
    }         
    
    bool isTurnOn[25] = {false};
    int nowUsed = 0, maxUsed = 0;
    int operation;
    for( int i = 0 ; i < m ; ++i ){
      scanf("%d", &operation);
      
      if( isTurnOn[operation] ){
        nowUsed -= consumption[operation];
      }
      else{
        nowUsed += consumption[operation];
        maxUsed = max(maxUsed, nowUsed);
      }
      
      isTurnOn[operation] = !isTurnOn[operation];
    }
    
    printf("Sequence %d\n", ++caseNumber);
    if( maxUsed > c ){
      printf("Fuse was blown.\n");
    }
    else{
      printf("Fuse was not blown.\n");
      printf("Maximal power consumption was %d amperes.\n", maxUsed);
    }
    printf("\n");
  }
  return 0;
}
```
