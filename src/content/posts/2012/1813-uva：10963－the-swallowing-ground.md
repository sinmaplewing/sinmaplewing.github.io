---
id: 1813
title: '#UVa：10963－The Swallowing Ground'
slug: uva：10963－the-swallowing-ground
date: '2012-09-14T19:07:10+08:00'
lastmod: '2014-12-31T23:15:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2012/09/14/1813/uva%ef%bc%9a10963%ef%bc%8dthe-swallowing-ground/
wp_status: publish
wp_type: post
---

檢查每個y1與y2差是否一致即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10963 The Swallowing Ground                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, W;
  int y1, y2, dis;
  bool ok;

  while( scanf( "%d", &n ) != EOF ){
    for( int i = 0 ; i < n ; i++ ){
      if( i ) printf( "\n" );
      scanf( "%d", &W );
      ok = true;
      if( W ){
        scanf( "%d%d", &y1, &y2 );
        dis = y1-y2;
        for( int j = 1 ; j < W ; j++ ){
          scanf( "%d%d", &y1, &y2 );
          if( y1-y2 != dis ) ok = false;
        }
      }
      if( ok ) printf( "yes\n" );
      else printf( "no\n" );
    }
  }
  return 0;
}
```
