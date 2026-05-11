---
id: 3168
title: '#UVa：537－Artificial Intelligence?'
slug: uva：537－artificial-intelligence
date: '2016-07-29T08:43:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2016/07/29/3168/uva%ef%bc%9a537%ef%bc%8dartificial-intelligence/
wp_status: publish
wp_type: post
---

照著文法從題目敘述中將資訊剖析出來即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 537 Artificial Intelligence                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/29                                 */
/*******************************************************/
#include <iostream>
#include <string>
#include <cstdio>
#include <cctype>
using namespace std;

const int P = 0, U = 1, I = 2;

double dataField( const string &statement, int index ){
  if( statement[++index] != '=' ){
    return -1;
  }

  double value = 0;
  while( isdigit( statement[++index] ) ){
    value = value * 10 + (statement[index] - '0');
  }

  if( statement[index] == '.' ){
    double position = 0.1;
    while( isdigit( statement[++index] ) ){
      value += (statement[index] - '0') * position;
      position *= 0.1;
    }
  }

  // Prefix Check
  if( statement[index] == 'm' ){
    value *= 1e-3;
    ++index;
  }
  else if( statement[index] == 'k' ){
    value *= 1e3;
    ++index;
  }
  else if( statement[index] == 'M' ){
    value *= 1e6;
    ++index;
  }

  // Unit
  if( statement[index] == 'W' || statement[index] == 'V' || statement[index] == 'A' ){
    return value;
  }
  else{
    return -1;
  }
}

int main(){
  int numTestcase;
  while( scanf("%d", &numTestcase) != EOF ){
    getchar(); // for '\n'
    for( int testcase = 1 ; testcase <= numTestcase ; ++testcase ){
      string statement;
      getline(cin, statement);

      double value[3] = {-1, -1, -1};
      for( int i = 0 ; i < statement.length() ; ++i ){
        if( statement[i] == 'P' ){
          value[P] = dataField(statement, i);
        }
        else if( statement[i] == 'U' ){
          value[U] = dataField(statement, i);
        }
        else if( statement[i] == 'I' ){
          value[I] = dataField(statement, i);
        }
      }

      printf("Problem #%d\n", testcase);
      if( value[P] == -1 ){
        printf("P=%.2fW\n", value[U] * value[I]);
      }
      else if( value[U] == -1 ){
        printf("U=%.2fV\n", value[P] / value[I]);
      }
      else if( value[I] == -1 ){
        printf("I=%.2fA\n", value[P] / value[U]);
      }
      printf("\n");
    }
  }

  return 0;
}
```
