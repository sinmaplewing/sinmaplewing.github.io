---
id: 3120
title: '#UVa：10530－Guessing Game'
slug: uva：10530－guessing-game
date: '2016-04-27T22:01:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2016/04/27/3120/uva%ef%bc%9a10530%ef%bc%8dguessing-game/
wp_status: publish
wp_type: post
---

在猜數字的過程中一直更新上界與下界，直到猜中時看看是否猜中的數字介在此範圍內即是答案。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10530 Guessing Game                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int guessNumber;
  while( scanf("%d ", &guessNumber) != EOF && guessNumber != 0 ){
    int lowBound = 1, highBound = 10;
    string respond;
    while( getline(cin, respond) && respond != "right on" ){
      if( respond == "too high" ){
        highBound = min(highBound, guessNumber - 1 );
      }
      else if( respond == "too low" ){
        lowBound = max(lowBound, guessNumber + 1 );
      }
      
      scanf("%d ", &guessNumber);
    }
    
    if( guessNumber >= lowBound && guessNumber <= highBound ){
      printf("Stan may be honest\n");
    }
    else{
      printf("Stan is dishonest\n");
    }
  }
  return 0;
}
```
