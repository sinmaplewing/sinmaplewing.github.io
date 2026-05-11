---
id: 2745
title: '#UVa：441－Lotto'
slug: uva：441－lotto
date: '2015-05-08T02:37:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/05/08/2745/uva%ef%bc%9a441%ef%bc%8dlotto/
wp_status: publish
wp_type: post
---

利用遞迴（backtracking）把所有可能性列舉出來並輸出即可。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 441 Lotto                                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/08                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int LOTTO_SIZE = 6;

void printPermutation(int lotto[], int n, int k, int permutation[], int p){
  if( p >= LOTTO_SIZE ){
    for( int i = 0 ; i < LOTTO_SIZE ; ++i ){
      if( i > 0 ) printf(" ");
      printf("%d", permutation[i]);
    }
    printf("\n");
    return;
  }
  
  if( p + (k - n) < LOTTO_SIZE ) return ;
  
  for( int i = n ; i < k ; ++i ){
    permutation[p] = lotto[i];
    printPermutation(lotto, i+1, k, permutation, p+1);
  }
}

int main(){
  bool hasPrinted = false;
  int k;
  while( scanf("%d", &k) != EOF && k != 0 ){
    if( hasPrinted ) printf("\n");
    
    int lotto[15];
    for( int i = 0 ; i < k ; ++i ){
      scanf("%d", &lotto[i]);
    }
    
    int permutation[LOTTO_SIZE] = {0};
    printPermutation(lotto, 0, k, permutation, 0);
    hasPrinted = true;
  }
  return 0;
}
```
