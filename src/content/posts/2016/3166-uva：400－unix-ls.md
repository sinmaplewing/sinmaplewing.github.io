---
id: 3166
title: '#UVa：400－Unix ls'
slug: uva：400－unix-ls
date: '2016-07-29T02:17:37+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/07/29/3166/uva%ef%bc%9a400%ef%bc%8dunix-ls/
wp_status: publish
wp_type: post
---

將最大檔名長度找出，算出最大行列各為多少，利用printf("%-*s",...)這個方便技法排版印出即可。

P.S. 當檔名長度+2是有可能會超過60個字的，在算最大行列時要小心，超過的話就是一行一個即可。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 400 Unix ls                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    vector<string> filename(N);

    int maxLength = 0;
    for( int i = 0 ; i < N ; ++i ){
      cin >> filename[i];
      maxLength = max((int)filename[i].length(), maxLength);
    }

    sort(filename.begin(), filename.end());

    int column = 60 / (maxLength + 2);
    if( column == 0 ){
      column = 1;
    }
    int maxRow = N / column + ((N % column != 0)? 1 : 0);

    for( int i = 0 ; i < 60 ; ++i ){
      printf("-");
    }
    printf("\n");

    for( int i = 0 ; i < maxRow ; ++i ){
      for( int j = 0 ; j < column ; ++j ){
        if( i + j * maxRow >= N ){
          break;
        }
        printf("%-*s", maxLength+2, filename[i + j * maxRow].c_str());
      }
      printf("\n");
    }


  }
  return 0;
}
```
