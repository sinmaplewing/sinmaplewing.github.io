---
id: 1230
title: '#UVa：10038－Jolly Jumpers'
slug: uva：10038－jolly-jumpers
date: '2011-11-29T22:14:13+08:00'
lastmod: '2014-12-31T23:03:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2011/11/29/1230/uva%ef%bc%9a10038%ef%bc%8djolly-jumpers/
wp_status: publish
wp_type: post
---

簡單來說，就是要檢查1~n-1的差值是否都存在，差值不一定要3->2->1，也可以是2->3->1，總而言之就是1~n-1的差值都要存在就是Jolly了！

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10038 Jolly Jumpers                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
using namespace std;
int main(){
  int n;
  int jolly[3005];
  bool jollyp = 1;
  while( scanf( "%d", &n ) != EOF ){
    bool jump[3005] = {0};
    jollyp = 1;
    for( int i = 0 ; i < n ; i++ )
      scanf( "%d", &jolly[i] );
    for( int i = 1 ; i < n ; i++ ){
      if( abs(jolly[i] - jolly[i-1]) >= n ||
        abs(jolly[i] - jolly[i-1]) <= 0 || 
        jump[abs(jolly[i] - jolly[i-1])] ){
        
        jollyp = 0;
        break;
      }
      jump[abs(jolly[i] - jolly[i-1])] = 1;
    }
    if( jollyp )
      printf( "Jolly\n" );
    else
      printf( "Not jolly\n" );
  }
  return 0;
}
```
