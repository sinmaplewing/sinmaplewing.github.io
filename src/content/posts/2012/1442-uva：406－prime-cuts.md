---
id: 1442
title: '#UVa：406－Prime Cuts'
slug: uva：406－prime-cuts
date: '2012-02-03T10:40:23+08:00'
lastmod: '2014-12-31T22:21:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2012/02/03/1442/uva%ef%bc%9a406%ef%bc%8dprime-cuts/
wp_status: publish
wp_type: post
---

建立質數表，找出要輸出的上界和下界，再藉著上界和下界把質數都輸出來。

P.S. 這題1也算是要輸出的東西之一。

**C++(0.079)**
```cpp
/*******************************************************/
/* UVa 406 Prime Cuts                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/02/03                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  bool composite[1005] = {true, false};
  int prime_count[1005] = {0,1};
  int count = 1, N, C, start, end, prime_i;
  for( int i = 2 ; i <= 1000 ; i++ ){
    if( !composite[i] ){
      for( int j = i+i ; j <= 1000 ; j+=i )
        composite[j] = 1;
      count++;
    }
    prime_count[i] = count;
  }

  while( scanf( "%d%d", &N, &C ) != EOF ){
    start = prime_count[N]/2 - C + 2;
    end = prime_count[N]/2 + C;
    if( !(prime_count[N] % 2) ) start--;
    if( start < 1 ) start = 1;
    if( end > prime_count[N] ) end = prime_count[N];

    printf( "%d %d:", N, C );
    for( prime_i = 1 ; prime_count[prime_i] < end ; prime_i++ ){
      if( !composite[prime_i] )
        if( prime_count[prime_i] < end && prime_count[prime_i] >= start )
          printf( " %d", prime_i );
    }
    printf( " %d\n\n", prime_i );
  }
  return 0;
}
```
