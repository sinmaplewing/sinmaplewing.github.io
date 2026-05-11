---
id: 2732
title: '#UVa：713－Adding Reversed Numbers'
slug: uva：713－adding-reversed-numbers
date: '2015-05-05T12:17:49+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2015/05/05/2732/uva%ef%bc%9a713%ef%bc%8dadding-reversed-numbers/
wp_status: publish
wp_type: post
---

利用陣列儲存每一位的數字去做倒轉以及加法處理即可。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 713 Adding Reversed Numbers                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

const int MAXDIGIT = 205;

void convertToNumber(int num[], const string &s){
  for( int i = 0 ; i < s.length() ; ++i ){
    num[i] = s[i] - '0';
  }
}

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    string a, b;
    for( int i = 0 ; i < N ; ++i ){
      cin >> a >> b;
      
      int numA[MAXDIGIT] = {0}, numB[MAXDIGIT] = {0};
      convertToNumber(numA, a);
      convertToNumber(numB, b);
      
      numA[0] += numB[0];
      for( int i = 1 ; i < MAXDIGIT ; ++i ){
        numA[i] += numB[i] + numA[i-1] / 10;
        numA[i-1] %= 10;
      }
      
      int upperBound, lowerBound;
      for( upperBound = MAXDIGIT - 1 ; upperBound > 0 && numA[upperBound] == 0 ; --upperBound );
      ++upperBound;
      for( lowerBound = 0 ; lowerBound < upperBound && numA[lowerBound] == 0 ; ++lowerBound );
      
      for( int i = lowerBound ; i < upperBound ; ++i ){
        printf("%d", numA[i]);
      }
      printf("\n");
    }
  }
  return 0;
}
``` 
