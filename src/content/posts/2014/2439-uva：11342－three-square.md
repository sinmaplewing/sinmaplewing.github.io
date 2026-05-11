---
id: 2439
title: '#UVa：11342－Three-square'
slug: uva：11342－three-square
date: '2014-12-23T17:55:58+08:00'
lastmod: '2014-12-31T23:18:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2014/12/23/2439/uva%ef%bc%9a11342%ef%bc%8dthree-square/
wp_status: publish
wp_type: post
---

這題用建表法紀錄答案即可。建表方式像質數篩法那樣，將a*a+b*b+c*c的那格填入答案。

**C++(0.195)**
```cpp
/*******************************************************/
/* UVa 11342 Three-square                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/23                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
#include <string>
using namespace std;

string to_string( int value ){
  string str;
  stringstream ss(str);
  ss << value;
  return ss.str();
}

int main(){
  string threeSquareOutput[50005];
  for( int i = 0 ; i <= 50000 ; ++i ){
    threeSquareOutput[i] = "-1";
  }
  
  for( int i = 0 ; i <= 500 ; ++i ){
    for( int j = i ; j <= 500 ; ++j ){
      for( int k = j ; k <= 500 ; ++k ){
        int n = i*i + j*j + k*k;
        if( n > 50000 ) break;
        if(threeSquareOutput[n][0] == '-'){
          threeSquareOutput[n] = to_string(i) + ' ' + to_string(j) + ' ' + to_string(k);
        }
      }
    }
  }
  
  int N;
  while( scanf("%d", &N) != EOF ){
    int K;
    for( int i = 0 ; i < N ; ++i ){
      scanf("%d", &K);
      printf("%s\n", threeSquareOutput[K].c_str());
    }
  }
  return 0;
}
```
