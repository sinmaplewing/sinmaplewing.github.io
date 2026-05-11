---
id: 3048
title: '#UVa：133－The Dole Queue'
slug: uva：133－the-dole-queue
date: '2016-04-12T03:14:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2016/04/12/3048/uva%ef%bc%9a133%ef%bc%8dthe-dole-queue/
wp_status: publish
wp_type: post
---

雙向Joseph問題。照著題目要求的模擬去做，從前面與從後面兩邊個別去數數然後砍人，砍完即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 133 The Dole Queue                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int N, k, m;
  while( scanf("%d%d%d", &N, &k, &m) != EOF &&
         N > 0 && k > 0 && m > 0 ){
    bool dolls[25] = {false};
    int counter = N-1, backCounter = 0;
    
    int number = 0;
    while( number < N ){
      for( int i = 0 ; i < k ; ++i ){
        do{
          counter = (counter + 1) % N;
        } while( dolls[counter] );
      }
      
      for( int i = 0 ; i < m ; ++i ){
        do{
          backCounter = (backCounter - 1 + N) % N;
        } while( dolls[backCounter] );
      }
      
      if( counter == backCounter ){
        dolls[counter] = true;
      
        if( number > 0 ){
          printf(",");
        }
        printf("%3d", counter+1);
        
        ++number;
      }
      else {
        dolls[counter] = true;
        dolls[backCounter] = true;
        
        if( number > 0 ){
          printf(",");
        }
        printf("%3d%3d", counter+1, backCounter+1);
        
        number += 2;
      }
      
    }
    
    printf("\n");
  }
  
  return 0;
}
```
