---
id: 3028
title: '#UVa：11057－Exact Sum'
slug: uva：11057－exact-sum
date: '2016-03-15T01:48:17+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 110
- UVa
permalink: /2016/03/15/3028/uva%ef%bc%9a11057%ef%bc%8dexact-sum/
wp_status: publish
wp_type: post
---

兩兩尋找，找出兩者總和剛好為所要求之值並且兩者差距最小的數對即是答案。

**C++(0.209)**
```cpp
/*******************************************************/
/* UVa 11057 Exact Sum                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
#include <algorithm>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    int books[10005] = {0};
    for( int i = 0 ; i < N ; ++i ){
      scanf("%d", &books[i]);
    }

    int sum;
    scanf("%d", &sum);

    sort(books, books+N);

    int exactI, exactJ, diff = INT_MAX;
    for( int i = 0 ; i < N ; ++i ){
      for( int j = i+1 ; j < N ; ++j ){
        if( books[i] + books[j] == sum && books[j] - books[i] < diff ){
          exactI = books[i];
          exactJ = books[j];
        }
      }
    }

    printf("Peter should buy books whose prices are %d and %d.\n\n", exactI, exactJ);
  }
  return 0;
}
```
