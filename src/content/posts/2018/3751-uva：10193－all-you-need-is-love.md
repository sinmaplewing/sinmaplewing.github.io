---
id: 3751
title: '#UVa：10193－All You Need Is Love'
slug: uva：10193－all-you-need-is-love
date: '2018-10-06T01:30:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2018/10/06/3751/uva%ef%bc%9a10193%ef%bc%8dall-you-need-is-love/
wp_status: publish
wp_type: post
---

先將二進位字串轉成數字後，求兩數的最大公因數即可知道解答。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10193 All You Need Is Love                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int binaryStringToInt(string s){
  int num = 0;
  for(int i = 0 ; i < s.length() ; ++i){
    num <<= 1;
    num += s[i] - '0';
  }
  return num;
}

int gcd(int a, int b){
  if(a == 0 || b == 0) return a + b;
  while((a %= b) != 0 && (b %= a) != 0);
  return a + b;
}

int main(){
  int N;
  while(scanf("%d", &N) != EOF){
    for(int caseNumber = 1 ; caseNumber <= N ; ++caseNumber){
      string s1, s2;
      cin >> s1 >> s2;
      
      int num1 = binaryStringToInt(s1), num2 = binaryStringToInt(s2);
      printf("Pair #%d: ", caseNumber);
      if(gcd(num1, num2) != 1){
        printf("All you need is love!\n");
      }
      else{
        printf("Love is not all you need!\n");
      }
    }
  }
  return 0;
}
```
