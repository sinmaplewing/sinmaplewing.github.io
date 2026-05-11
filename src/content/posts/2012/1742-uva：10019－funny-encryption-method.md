---
id: 1742
title: '#UVa：10019－Funny Encryption Method'
slug: uva：10019－funny-encryption-method
date: '2012-05-11T00:04:56+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/05/11/1742/uva%ef%bc%9a10019%ef%bc%8dfunny-encryption-method/
wp_status: publish
wp_type: post
---

照著題目做即可。

P.S. 可使用sscanf()

**C++(0.004)**
```cpp
/*******************************************************/
/* UVa 10019 Funny Encryption Method                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/05/11                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  string M;
  int N, X1, X2, B1, B2;

  while( scanf( "%d", &N ) != EOF ){
    getchar();

    for( int i = 0 ; i < N ; i++ ){
      getline( cin, M );
      B1 = 0;
      B2 = 0;
      sscanf( M.c_str(), "%d", &X1 );
      while( X1 ){
        if( X1%2 ) B1++;
        X1 /= 2;
      }

      sscanf( M.c_str(), "%x", &X2 );
      while( X2 ){
        if( X2%2 ) B2++;
        X2 /= 2;
      }

      printf( "%d %d\n", B1, B2 );
    }
  }
  return 0;
}
```
