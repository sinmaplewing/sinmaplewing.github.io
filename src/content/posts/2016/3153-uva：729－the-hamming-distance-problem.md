---
id: 3153
title: '#UVa：729－The Hamming Distance Problem'
slug: uva：729－the-hamming-distance-problem
date: '2016-07-27T16:19:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2016/07/27/3153/uva%ef%bc%9a729%ef%bc%8dthe-hamming-distance-problem/
wp_status: publish
wp_type: post
---

利用C++中的next_permutation()去列舉所有排列即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 729 The Hamming Distance Problem                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main(){
  int numberOfDataset;
  while( scanf("%d", &numberOfDataset) != EOF ){
    for( int testNumber = 0 ; testNumber < numberOfDataset ; ++testNumber ){
      if( testNumber > 0 ){
        printf("\n");
      }

      int N, H;
      scanf("%d%d", &N, &H);

      string s;
      for( int i = 0 ; i < N-H ; ++i ){
        s += '0';
      }

      for( int i = 0 ; i < H ; ++i ){
        s += '1';
      }
      
      do{
        printf("%s\n", s.c_str());
      } while( next_permutation(s.begin(), s.end()) );
    }
  }

  return 0;
}
```
