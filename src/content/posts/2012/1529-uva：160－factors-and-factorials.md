---
id: 1529
title: '#UVa：160－Factors and Factorials'
slug: uva：160－factors-and-factorials
date: '2012-03-26T00:37:59+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/26/1529/uva%ef%bc%9a160%ef%bc%8dfactors-and-factorials/
wp_status: publish
wp_type: post
---

先建質數表，再去做階乘的質因數分解即可得解。

階乘的質因數分解可以根據階乘的最高數字來進行。例如17!裡面有幾個2呢？可以將17先除以2得到8表示17!裡面至少已有8個2(2的部分)，再將8拿去除以2得到4表示17!裡面還有4個2(4的部分)，再將4拿去除以2得到2表示17!裡面還有2個2(8的部分)，再接2拿去除以2得到1表示17!裡面還有1個2(16的部分)，所以總共有15個2。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 160 Factors and Factorials                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/26                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  bool composite[105] = { true, true };
  int prime_num[105];
  int N, temp, output;

  for( int i = 2 ; i <= 100 ; i++ )
    if( !composite[i] )
      for( int j = i+i ; j <= 100 ; j += i )
        composite[j] = true;

  while( scanf( "%d", &N ) != EOF && N != 0 ){
    memset( prime_num, 0, sizeof(prime_num) );
    for( int i = 2 ; i <= N ; i++ )
      if( !composite[i] ){
        temp = N;
        while( temp / i ){
          prime_num[i] += temp / i;
          temp /= i;
        } 
      }

    output = 0;
    printf( "%3d! =", N );
    for( int i = 2 ; i <= N ; i++ )
      if( !composite[i] ){
        if( output == 15 ){
          printf( "\n      " );
          output = 0;
        }
        printf( "%3d", prime_num[i] );
        output++;
      }
    printf( "\n" );
  }

  return 0;
}
```
