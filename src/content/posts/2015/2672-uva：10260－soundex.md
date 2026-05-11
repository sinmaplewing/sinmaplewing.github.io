---
id: 2672
title: '#UVa：10260－Soundex'
slug: uva：10260－soundex
date: '2015-01-14T23:21:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2015/01/14/2672/uva%ef%bc%9a10260%ef%bc%8dsoundex/
wp_status: publish
wp_type: post
---

照著題目要求的進行編碼即可。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 10260 Soundex                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const int soundexCoding[] = {0, 1, 2, 3, 0, 1, 2,
                               0, 0, 2, 2, 4, 5, 5,
                               0, 1, 2, 6, 2, 3, 0,
                               1, 0, 2, 0, 2 };

  string word;
  while( cin >> word ){
    if( soundexCoding[(int)(word[0]-'A')] > 0 ){
      printf("%d", soundexCoding[(int)(word[0]-'A')]);
    }

    for( int i = 1 ; i < word.length() ; ++i ){
      if( soundexCoding[(int)(word[i]-'A')] > 0 &&
          soundexCoding[(int)(word[i]-'A')] != soundexCoding[(int)(word[i-1]-'A')] ){
        printf("%d", soundexCoding[(int)(word[i]-'A')]);
      }
    }

    printf("\n");
  }
  return 0;
}
```
