---
id: 1739
title: '#UVa：10812－Beat the Spread!'
slug: uva：10812－beat-the-spread
date: '2012-05-09T23:58:35+08:00'
lastmod: '2014-12-31T23:15:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 108
- UVa
permalink: /2012/05/09/1739/uva%ef%bc%9a10812%ef%bc%8dbeat-the-spread/
wp_status: publish
wp_type: post
---

設大的分數為a，小的分數為b，那麼input的兩個值就為a+b和a-b，找出關係，並判斷哪些分數不可能出現，即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10812 Beat the Spread!                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/05/09                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, s, d;
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d%d", &s, &d );

      if( (s+d)%2 || (s-d)%2 || 
          (s+d)/2 < 0 || (s-d)/2 < 0 )
        printf( "impossible\n" );
      else
        printf( "%d %d\n", (s+d)/2, (s-d)/2 );
    }
  }
  return 0;
}
```
