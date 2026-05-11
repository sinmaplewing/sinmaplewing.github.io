---
id: 3083
title: '#UVa：455－Periodic Strings'
slug: uva：455－periodic-strings
date: '2016-04-20T03:12:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/20/3083/uva%ef%bc%9a455%ef%bc%8dperiodic-strings/
wp_status: publish
wp_type: post
---

從週期1開始往後迭代找尋週期長度為字串長度之因數者是否為該字串之週期即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 455 Periodic Strings                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

bool isPeriod(const string &periodString, int period){
  for( int i = 0 ; i < period ; ++i ){
    for( int j = i+period ; j < periodString.length() ; j += period ){
      if( periodString[i] != periodString[j] ){
        return false;
      }
    }
  }

  return true;
}

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    string periodString;
    for( int caseNumber = 0 ; caseNumber < N ; ++caseNumber ){
      if( caseNumber > 0 ){
        printf("\n");
      }
      cin >> periodString;

      for( int period = 1 ; period <= periodString.length() ; ++period ){
        if( periodString.length() % period == 0 && isPeriod(periodString, period) ){
          printf("%d\n", period);
          break;
        }
      }
    }
  }

  return 0;
}
```
