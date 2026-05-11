---
id: 2564
title: '#UVa：111－History Grading'
slug: uva：111－history-grading
date: '2015-01-02T03:22:24+08:00'
lastmod: '2015-01-02T03:24:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/01/02/2564/uva%ef%bc%9a111%ef%bc%8dhistory-grading/
wp_status: publish
wp_type: post
---

利用LCS解題即可。

注意輸入。輸入給的是編號從1~n號的事件是在哪時執行的順序。例如：`1 3 4 2 5`並**不是**代表`1號事件做完換3號事件，3號事件做完換4號事件`這樣以此類推，而**是**代表`1號事件會在順序中的第1個位置，2號事件會在順序中的第3個位置，3號事件會在順序中的第4個位置`這樣以此類推。

**C++(0.025)**
```cpp
/*******************************************************/
/* UVa 111 History Grading                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAX_LIMIT = 20;

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    int correct_order[MAX_LIMIT + 5] = {0};
    for( int i = 1 ; i <= n ; ++i ){
      scanf("%d", &correct_order[i]);
    }

    int correct[MAX_LIMIT + 5] = {0};
    for( int i = 1 ; i <= n ; ++i ){
      correct[correct_order[i]] = i;
    }

    int events_order[MAX_LIMIT + 5] = {0};
    while( scanf("%d", &events_order[1]) != EOF ){
      for( int i = 2 ; i <= n ; ++i ){
       scanf("%d", &events_order[i]); 
      }

      int events[MAX_LIMIT + 5] = {0};
      for( int i = 1 ; i <= n ; ++i ){
        events[events_order[i]] = i;
      }

      int LCS[MAX_LIMIT + 5][MAX_LIMIT + 5] = {0};
      for( int i = 1 ; i <= n ; ++i ){
        for( int j = 1 ; j <= n ; ++j ){
          if( correct[i] == events[j] ){
            LCS[i][j] = LCS[i-1][j-1] + 1;
          }
          else {
            LCS[i][j] = max( LCS[i][j-1], LCS[i-1][j] );
          }
        }
      }

      printf("%d\n", LCS[n][n]);
    }

  }

  return 0;
}
```
