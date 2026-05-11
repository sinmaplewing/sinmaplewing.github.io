---
id: 1945
title: '#UVa：11879－Multiple of 17'
slug: uva：11879－multiple-of-17
date: '2012-10-17T17:11:09+08:00'
lastmod: '2014-12-31T23:22:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 118
- UVa
permalink: /2012/10/17/1945/uva%ef%bc%9a11879%ef%bc%8dmultiple-of-17/
wp_status: publish
wp_type: post
---

雖然題目給了一個方法驗證，不過還是用類似模擬除法的方式來解決。從高位數一位一位加進來去除上17得其餘數，再看結果是否為0來得知是否可被17整除。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11879 Multiple of 17                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string num;
  int divide;
  while( getline( cin, num ) && num != "0" ){
    divide = 0;
    for( int i = 0 ; i < num.length() ; i++ ){
      divide = divide*10 + num[i] - '0';
      divide %= 17;
    }
    if( !divide ) printf("1\n");
    else printf( "0\n" ); 
  }
  return 0;
}
```
