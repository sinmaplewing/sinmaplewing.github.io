---
id: 1492
title: '#UVa：575－Skew Binary'
slug: uva：575－skew-binary
date: '2012-03-17T00:54:12+08:00'
lastmod: '2014-12-31T22:50:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/03/17/1492/uva%ef%bc%9a575%ef%bc%8dskew-binary/
wp_status: publish
wp_type: post
---

善用pow函式即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 575 Skew Binary                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cmath>
#define ERROR 1e-8
using namespace std;

int main(){
  string n;
  int sum;

  while( cin >> n && n != "0" ){
    sum = 0;
    for( int i = n.length()-1 ; i >= 0 ; i-- )
      sum += (n[i]-'0') * ((int)( pow( 2.0, n.length()-i ) + ERROR ) - 1);
    printf( "%d\n", sum );
  }
  return 0;
}
```
