---
id: 3030
title: '#UVa：417－Word Index'
slug: uva：417－word-index
date: '2016-03-15T14:40:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/03/15/3030/uva%ef%bc%9a417%ef%bc%8dword-index/
wp_status: publish
wp_type: post
---

先將前一項的編號算出再加1即可得解。

利用排列組合將字串長度比較小的部分個數算出，再來對於該字串每一位去算出前面包含的字串個數，將這些個數總和起來即是前一項之編號。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 417 Word Index                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

bool isValid(string s){
  for( int i = 0 ; i < s.length() ; ++i ){
    if( s[i] <= s[i-1] ){
      return false;
    }
  }

  return true;
}

int main(){
  int C[30][30] = {0};
  C[0][0] = 1;
  for( int i = 1 ; i <= 26 ; ++i ){
    C[i][0] = 1;
    C[i][i] = 1;
    for( int j = 1 ; j < i ; ++j ){
      C[i][j] = C[i-1][j-1] + C[i-1][j];
    }
  }

  string word;
  while( cin >> word ){
    if( !isValid(word) ){
      printf("0\n");
      continue;
    }

    int index = 0;
    for( int i = 1 ; i < word.length() ; ++i ){
      index += C[26][i];
    }

    for( int i = 0 ; i < word.length() ; ++i ){
      int laterLength = word.length() - i - 1;
      for( char c = ((i == 0)? 'a' : word[i-1]+1) ; c < word[i] ; ++c ){
        int canUseAlphabetCount = 'z' - c;
        index += C[canUseAlphabetCount][laterLength];
      }
    }
    printf("%d\n", index+1);

  }

  return 0;
}
```
