---
id: 2585
title: '#UVa：414－Machined Surfaces'
slug: uva：414－machined-surfaces
date: '2015-01-04T10:49:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/01/04/2585/uva%ef%bc%9a414%ef%bc%8dmachined-surfaces/
wp_status: publish
wp_type: post
---

計算左右兩張圖片接起來後剩下的空白數量即可。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 414 Machined Surfaces                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N) != EOF && N > 0 ){
    string row;
    int spaces[15] = {0};
    int spaceMax = 0, spaceMin = INT_MAX;
    
    getline(cin, row); // for '\n'
    for( int i = 0 ; i < N ; ++i ){
      getline(cin, row);
      
      for( int j = 0 ; j < row.length() ; ++j ){
        if( row[j] == ' ' ){
          ++spaces[i];
        }
      }
      spaceMin = min( spaceMin, spaces[i] );
    }

    int voidCount = 0;
    for( int i = 0 ; i < N ; ++i ){
      voidCount += spaces[i] - spaceMin;
    }

    printf("%d\n", voidCount);
  }
  return 0;
}
```
