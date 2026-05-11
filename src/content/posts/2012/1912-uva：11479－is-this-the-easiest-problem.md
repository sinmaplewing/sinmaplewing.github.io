---
id: 1912
title: '#UVa：11479－Is this the easiest problem?'
slug: uva：11479－is-this-the-easiest-problem
date: '2012-09-19T08:12:27+08:00'
lastmod: '2014-12-31T23:20:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2012/09/19/1912/uva%ef%bc%9a11479%ef%bc%8dis-this-the-easiest-problem/
wp_status: publish
wp_type: post
---

照著題目去判斷即可。

P.S. 使用加法做驗證記得要用long long，如果是使用減法做驗證則用int即可。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 11479 Is this the easiest problem?              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/19                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstdlib>
using namespace std;

int main(){
  int n;
  int edge[3];
  while( scanf( "%d", &n ) != EOF ){
    for( int i = 1 ; i <= n ; i++ ){
      scanf( "%d%d%d", &edge[0], &edge[1], &edge[2] );
      if( abs(edge[0]-edge[1]) >= edge[2] || 
          abs(edge[1]-edge[2]) >= edge[0] ||
          abs(edge[0]-edge[2]) >= edge[1] )
        printf( "Case %d: Invalid\n", i );
      else if( edge[0] == edge[1] && edge[1] == edge[2] )
        printf( "Case %d: Equilateral\n", i );
      else if( edge[0] == edge[1] || 
               edge[1] == edge[2] || 
               edge[2] == edge[0] )
        printf( "Case %d: Isosceles\n", i );
      else printf( "Case %d: Scalene\n", i );
    }
  }
  return 0;
}
```
