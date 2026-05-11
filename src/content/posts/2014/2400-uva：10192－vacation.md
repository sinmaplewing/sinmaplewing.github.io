---
id: 2400
title: '#UVa：10192－Vacation'
slug: uva：10192－vacation
date: '2014-12-16T15:14:24+08:00'
lastmod: '2014-12-31T23:03:37+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2014/12/16/2400/uva%ef%bc%9a10192%ef%bc%8dvacation/
wp_status: publish
wp_type: post
---

尋找其兩者之LCS(Longest common subsequence)即可得解。

**C++(0.013)**
```cpp
/*******************************************************/
/* UVa 10192 Vacation                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  int testcase = 0;
  string city_sequences[2];
  while( getline(cin, city_sequences[0]) && 
       city_sequences[0] != "#"){
    getline(cin, city_sequences[1]);

    int LCS[105][105] = {0};
    for( int i = 1 ; i <= city_sequences[0].length() ; ++i ){
      for( int j = 1 ; j <= city_sequences[1].length() ; ++j ){
        if( city_sequences[0][i-1] == city_sequences[1][j-1] ){
          LCS[i][j] = LCS[i-1][j-1] + 1;
        }
        else {
          LCS[i][j] = max( LCS[i-1][j], LCS[i][j-1] );
        }
      }
    }

    printf("Case #%d: you can visit at most %d cities.\n",
          ++testcase, LCS[city_sequences[0].length()][city_sequences[1].length()] );
  }

  return 0;
}
```
