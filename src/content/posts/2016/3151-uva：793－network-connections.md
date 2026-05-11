---
id: 3151
title: '#UVa：793－Network Connections'
slug: uva：793－network-connections
date: '2016-07-23T10:26:55+08:00'
lastmod: '2016-07-23T10:27:55+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2016/07/23/3151/uva%ef%bc%9a793%ef%bc%8dnetwork-connections/
wp_status: publish
wp_type: post
---

將每台電腦個別當作一組，接著將有相連的電腦將他們兩組整合成一組。要判斷是否相連只要判斷是否同組即可得解。

**C++(0.210)**
```cpp
/*******************************************************/
/* UVa 793 Network Connections                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/23                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int testcase;
  while( scanf("%d", &testcase) != EOF ){

    for( int caseNumber = 0 ; caseNumber < testcase ; ++caseNumber ){
      if( caseNumber >= 1 ){
        printf("\n");
      }

      int numberOfComputers;
      scanf("%d", &numberOfComputers);

      vector<int> connected(numberOfComputers+1);
      for( int i = 1 ; i <= numberOfComputers ; ++i ){
        connected[i] = i;
      }


      int rightAnswer = 0, wrongAnswer = 0;
      string input;
      cin.ignore();
      while( getline(cin, input) && input != "" ){

        stringstream ss(input);
        char type;
        int computerI, computerJ;
        ss >> type >> computerI >> computerJ;
        
        if( type == 'c' ){ 
          int groupI = connected[computerI], groupJ = connected[computerJ];
          for( int i = 1 ; i <= numberOfComputers ; ++i ){
            if( connected[i] == groupI || connected[i] == groupJ ){
              connected[i] = min(groupI, groupJ);
            }
          }
        }
        else if( type == 'q' ){
          if( connected[computerI] != connected[computerJ] ){
            ++wrongAnswer;
          }
          else{
            ++rightAnswer;
          }
        }
      }

      printf("%d,%d\n", rightAnswer, wrongAnswer);
    }
  }

  return 0;
}

```
