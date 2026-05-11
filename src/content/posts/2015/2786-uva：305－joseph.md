---
id: 2786
title: '#UVa：305－Joseph'
slug: uva：305－joseph
date: '2015-05-13T10:17:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/05/13/2786/uva%ef%bc%9a305%ef%bc%8djoseph/
wp_status: publish
wp_type: post
---

照著模擬砍的過程，去察覺若有某個m能夠讓砍掉前一半的人都在後半部的話就是答案。可以先將答案算出來並儲存起來，這樣可以加速重複要答案的部分。

**C++(0.309)**
```cpp
/*******************************************************/
/* UVa 305 Joseph                                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/13                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int mem[15] = {0};
  for( int i = 1 ; i <= 14 ; ++i ){
    int m = i + 1;
    while( true ){
      int k = i * 2;
      
      int killPerson = -1;
      while( k > i ){
        killPerson += m;
        killPerson %= k;
        if( killPerson < i ){
          break;
        }
        --k;
        --killPerson;
      }
      
      if( k <= i ){
        mem[i] = m;
        break;
      }
      
      ++m;
    }
  }
  
  int k;
  while( scanf("%d", &k) != EOF && k != 0 ){
    printf("%d\n", mem[k]);
  }
  
  return 0;
}
```
