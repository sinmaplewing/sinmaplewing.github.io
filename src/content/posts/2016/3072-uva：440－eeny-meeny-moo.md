---
id: 3072
title: '#UVa：440－Eeny Meeny Moo'
slug: uva：440－eeny-meeny-moo
date: '2016-04-20T02:01:57+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/20/3072/uva%ef%bc%9a440%ef%bc%8deeny-meeny-moo/
wp_status: publish
wp_type: post
---

先迭代計算出每一個n應該用哪一個m算時會讓最後一個數字是2，記下來後要什麼就直接給答案即可。

**C++(0.730)**
```cpp
/*******************************************************/
/* UVa 440 Eeny Meeny Moo                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

bool isLast2(int n, int m){
    bool city[200] = {0};
    int now = 1;
    for( int count = 0, next = 0 ; count < n ; ++count, next = m ){
      if( now == 2 ) return false;

      while( next != 0 ){
        now = (now + 1) % n;
        if( !city[now] ){
          --next;
        }
      }

      city[now] = true;
    }

    if( now == 2 ) return true;
    else return false;
}

int main(){
  int m[200] = {0};
  for( int n = 3 ; n <= 150 ; ++n ){
    int guessM = 2;
    while( !isLast2(n, guessM) ){
      ++guessM;
    }

    m[n] = guessM;
  }

  int n;
  while( scanf("%d", &n) != EOF && n != 0 ){
    printf("%d\n", m[n]);
  }

  return 0;
}
```
