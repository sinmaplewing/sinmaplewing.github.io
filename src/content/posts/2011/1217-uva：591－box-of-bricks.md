---
id: 1217
title: '#UVa：591－Box of Bricks'
slug: uva：591－box-of-bricks
date: '2011-11-29T09:20:20+08:00'
lastmod: '2014-12-31T22:50:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2011/11/29/1217/uva%ef%bc%9a591%ef%bc%8dbox-of-bricks/
wp_status: publish
wp_type: post
---

先找出平均數，就可以知道後來每一堆積木的個數。將每一堆大於平均數的積木，將其個數減去平均數的數字(也就意味這堆要搬多少個盒子到別堆去)加起來就是答案。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 591 Box of Bricks                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/29                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
using namespace std;

int main(){
  int setnum = 1;
  int n, box[55], average, count;
  while( scanf( "%d", &n ) != EOF && n ){
    average = 0;
    count = 0;
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d", &box[i] );
      average += box[i];
    }
    average /= n;
    for( int i = 0 ; i < n ; i++ )
      count += abs(average - box[i]);
    count /= 2;
    printf( "Set #%d\nThe minimum number of moves is %d.\n\n", setnum++, count );
  }
  return 0;
}
```
