---
id: 2740
title: '#UVa：621－Secret Research'
slug: uva：621－secret-research
date: '2015-05-07T10:02:56+08:00'
lastmod: '2015-05-07T10:03:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2015/05/07/2740/uva%ef%bc%9a621%ef%bc%8dsecret-research/
wp_status: publish
wp_type: post
---

由於Pattern不具有混淆性，直接判斷即可。

**C++(0.009)**
```cpp
/*******************************************************/
/* UVa 621 Secret Research                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF ){
    string input;
    for( int i = 0 ; i < n ; ++i ){
      cin >> input;
      if( input[input.length()-2] == '3' && input[input.length()-1] == '5' ){
        printf("-\n");
      }
      else if( input[0] == '9' && input[input.length()-1] == '4' ){
        printf("*\n");
      }
      else if( input[0] == '1' && input[1] == '9' && input[2] == '0' ){
        printf("?\n");
      }
      else{
        printf("+\n");
      }
    }
  }
  return 0;
}
```
