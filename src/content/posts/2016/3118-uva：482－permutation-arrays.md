---
id: 3118
title: '#UVa：482－Permutation Arrays'
slug: uva：482－permutation-arrays
date: '2016-04-27T21:49:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/27/3118/uva%ef%bc%9a482%ef%bc%8dpermutation-arrays/
wp_status: publish
wp_type: post
---

根據第一行的index將第二行的資料放入陣列中。

P.S. 為了保持浮點數型態，可以用字串方式儲存。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 482 Permutation Arrays                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <sstream>
#include <vector>
using namespace std;

int main(){
  int caseCount;
  while( scanf("%d", &caseCount) != EOF ){
    for( int caseNumber = 0 ; caseNumber < caseCount ; ++caseNumber ){
      if( caseNumber > 0 ){
        printf("\n");  
      }
      scanf(" ");
      
      string input;
      getline(cin, input);
      
      stringstream ss(input);
      vector<int> index;
      int x;
      while( ss >> x ){
        index.push_back(x);
      }
      
      vector<string> data(index.size()+1);
      getline(cin, input);
      ss.clear();
      ss.str(input);
      for( int i = 0 ; i < index.size() ; ++i ){
        ss >> data[index[i]];
      }
      
      for( int i = 1 ; i < data.size() ; ++i ){
        printf("%s\n", data[i].c_str());
      }
    }
    
  }
  return 0;
}
```
