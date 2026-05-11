---
id: 1906
title: '#UVa：11369－Shopaholic'
slug: uva：11369－shopaholic
date: '2012-09-19T01:23:27+08:00'
lastmod: '2014-12-31T23:18:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2012/09/19/1906/uva%ef%bc%9a11369%ef%bc%8dshopaholic/
wp_status: publish
wp_type: post
---

全部從最大的三樣開始買，買完再從剩餘裡面最大的三樣開始買，以此類推，即可得解。

**C++(0.112)**
```cpp
/*******************************************************/
/* UVa 11369 Shopaholic                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<algorithm>
using namespace std;

bool cmp( int a, int b ){
  return a > b;
}

int main(){
  int t, n, item[20005], price;
  while( scanf( "%d", &t ) != EOF ){
    for( int i = 0 ; i < t ; i++ ){
      scanf( "%d", &n );
      for( int j = 0 ; j < n ; j++ )
        scanf( "%d", &item[j] );
      sort( item, item+n, cmp );

      price = 0;
      for( int j = 2 ; j < n ; j += 3 )
        price += item[j];
      printf( "%d\n", price );
    }
  }
  return 0;
}
```
