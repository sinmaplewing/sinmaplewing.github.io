---
id: 3735
title: '#UVa：12503－Robot Instructions'
slug: uva：12503－robot-instructions
date: '2018-10-03T01:17:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 125
permalink: /2018/10/03/3735/uva%ef%bc%9a12503%ef%bc%8drobot-instructions/
wp_status: publish
wp_type: post
---

趙題目模擬指令即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12503 Robot Instructions                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int T;
  while(scanf("%d", &T) != EOF){
    for(int caseNumber = 1 ; caseNumber <= T ; ++caseNumber){
      int n;
      scanf("%d", &n);

      vector<int> instructions(n, 0);
      int position = 0;
      for(int i = 0 ; i < n ; ++i){
        string instruction;
        cin >> instruction;
        if(instruction == "LEFT"){
          instructions[i] = -1;
          --position;
        }
        else if(instruction == "RIGHT"){
          instructions[i] = 1;
          ++position;
        }
        else{
          cin >> instruction; // don't care string "AS"
          int index;
          scanf("%d", &index); 
          position += instructions[i] = instructions[index-1];
        }
      }
      printf("%d\n", position);
    }
  }
  return 0;
}
```
