---
id: 3066
title: '#UVa：459－Graph Connectivity'
slug: uva：459－graph-connectivity
date: '2016-04-17T00:30:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/17/3066/uva%ef%bc%9a459%ef%bc%8dgraph-connectivity/
wp_status: publish
wp_type: post
---

先將每個點想成各是一個群組，各給一個群組編號，當兩個群組連在一起就把這兩群人掛上同樣的群組編號，最後看剩下幾個不重複的群組編號即是解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 459 Graph Connectivity                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int caseTotal;
  while( scanf("%d", &caseTotal) != EOF ){
    for( int caseNumber = 0 ; caseNumber < caseTotal ; ++caseNumber ){
      if( caseNumber > 0 ){
        printf("\n");
      }  
      
      string maxChar;
      cin >> maxChar;
      
      int subgroup[30] = {0};
      for( int i = 0 ; i <= maxChar[0] - 'A' ; ++i ){
        subgroup[i] = i;
      }
      
      string connect;
      getline(cin, connect);
      while( getline(cin, connect) && connect != "" ){
        int minGroup = min( subgroup[connect[0]-'A'], 
                            subgroup[connect[1]-'A'] );
        int maxGroup = max( subgroup[connect[0]-'A'], 
                            subgroup[connect[1]-'A'] );
                            
        for( int i = 0 ; i <= maxChar[0] - 'A' ; ++i ){
          if( subgroup[i] == maxGroup ){
            subgroup[i] = minGroup;
          }
        }
      }
      
      bool hasAppeared[30] = {false};
      int groupCount = 0;
      for( int i = 0 ; i <= maxChar[0] - 'A' ; ++i ){
        if( !hasAppeared[subgroup[i]] ){
          hasAppeared[subgroup[i]] = true;
          ++groupCount;
        }
      }
      printf("%d\n", groupCount);
      
      
    }
  }
  return 0;
}
```
