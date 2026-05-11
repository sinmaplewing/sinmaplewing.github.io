---
id: 3068
title: '#UVa：524－Prime Ring Problem'
slug: uva：524－prime-ring-problem
date: '2016-04-17T00:57:09+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2016/04/17/3068/uva%ef%bc%9a524%ef%bc%8dprime-ring-problem/
wp_status: publish
wp_type: post
---

利用Backtracking去將填所有可能性，然後邊填邊判斷兩兩之間之總和是否為質數即可。

**C++(0.120)**
```cpp
/*******************************************************/
/* UVa 524 Prime Ring Problem                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

void findCircle(int circle[], int i, int n, bool hasUsed[], bool isComposite[]){
  if( i == n ){
    if( !isComposite[ circle[n-1] + circle[0] ] ){
      for( int j = 0 ; j < n ; ++j ){
        if( j > 0 ){
          printf(" ");
        }
        printf("%d", circle[j]);
      }
      printf("\n");
    }
    
    return;
  }
  
  for( int j = 2 ; j <= n ; ++j ){
    if( hasUsed[j] ){
      continue;  
    }
    
    if( !isComposite[ circle[i-1] + j ] ){
      hasUsed[j] = true;
      circle[i] = j;
      findCircle(circle, i+1, n, hasUsed, isComposite);
      hasUsed[j] = false;
    }
  }
  
}


int main(){
  bool isComposite[50] = {false};
  for( int i = 2; i < 50 ; ++i ){
    if( !isComposite[i] ){
      for( int j = i+i ; j < 50 ; j += i ){
        isComposite[j] = true;
      }
    }
  }

  int caseNumber = 0;
  int n;
  while( scanf("%d", &n) != EOF ){
    int circle[20] = {1, 0};
    bool hasUsed[20] = {false, true, false};
    
    if( caseNumber > 0 ){
      printf("\n");
    }
    printf("Case %d:\n", ++caseNumber);
    findCircle(circle, 1, n, hasUsed, isComposite);
    
  }
  
  return 0;
}
```
