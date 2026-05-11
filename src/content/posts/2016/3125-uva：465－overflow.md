---
id: 3125
title: '#UVa：465－Overflow'
slug: uva：465－overflow
date: '2016-04-28T02:00:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2016/04/28/3125/uva%ef%bc%9a465%ef%bc%8doverflow/
wp_status: publish
wp_type: post
---

用比較高精度的數值型態儲存去做即可。

P.S. 如果用double型態去做，為了輸出正常，可能還是必須先用字串儲存。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 465 Overflow                                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
#include <string>
#include <sstream>
using namespace std;

int main(){
  double a, b;
  string aString, bString, op;
  while( cin >> aString >> op >> bString ){
    stringstream ss(aString);
    ss >> a;
    ss.clear();
    ss.str(bString);
    ss >> b;
    
    printf("%s %s %s\n", aString.c_str(), op.c_str(), bString.c_str() );
    if( a > INT_MAX ){
      printf("first number too big\n");
    }
    
    if( b > INT_MAX ){
      printf("second number too big\n");
    }
    
    if( (op == "+" && a + b > INT_MAX) ||
        (op == "*" && a * b > INT_MAX) ){
      printf("result too big\n");
    }
  }
  return 0;
}
```
