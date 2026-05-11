---
id: 1565
title: '#UVa：105－The Skyline Problem'
slug: uva：105－the-skyline-problem
date: '2012-03-28T17:13:33+08:00'
lastmod: '2014-12-30T03:22:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/28/1565/uva%ef%bc%9a105%ef%bc%8dthe-skyline-problem/
wp_status: publish
wp_type: post
---

這題就使用陣列儲存該位置的最高點即可，但是要注意左邊界及右邊界的狀況。

還有一個要注意的地方就是：無論建築物最左邊是蓋到哪裡，你都得從1開始輸出。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 105 The Skyline Problem                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int skyline[10005] = {0};
  int L, H, R;
  int rightest = 0;
  bool space = false;

  while( scanf( "%d%d%d", &L, &H, &R ) != EOF ){
    for( int i = L ; i < R ; i++ )
      if( H > skyline[i] ) skyline[i] = H;
    if( R > rightest ) rightest = R;
  }

  for( int i = 1 ; i <= rightest ; i++ )
    if( skyline[i-1] != skyline[i] ){
      if( space ) printf( " " );
      space = true;
      printf( "%d %d", i, skyline[i] );
    }

  printf( "\n" );

  return 0;
}
```
