---
id: 1327
title: '#UVa：574－Sum It Up'
slug: uva：574－sum-it-up
date: '2012-01-17T15:56:30+08:00'
lastmod: '2014-12-31T22:50:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/01/17/1327/uva%ef%bc%9a574%ef%bc%8dsum-it-up/
wp_status: publish
wp_type: post
---

每個數有[有加]或[沒有加]兩種狀況，直接利用遞迴把所有狀況都跑出來看看即可得解。

P.S. 為了避免印出重複的組合，在你有把某一個數加進去的情況，重複再找與其相同值的數是OK的；但是若你已經不打算把這個數字加進去的時候，記得要跳掉所有跟這個數相同值的數。例：今天你找到+2，那麼你可以再繼續遞迴+2沒關係，這樣不會發生找出來的數字會重複的情況。除非+2已經沒有要加進去了，那麼之後都不要讓遞迴再遞到+2。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 574 Sum It Up                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int sump( int, int, int, int*, int, int*, int );

int main(){
  int t, n;
  int x[20], ans[20];
  while( scanf( "%d %d", &t, &n ) != EOF && ( t || n ) ){
    for( int i = 0 ; i < n ; i++ )
      scanf( "%d", &x[i] );
    printf( "Sums of %d:\n", t );
    if( !sump( 0, 0, t, x, n, ans, 0 ) )
      printf( "NONE\n" );
  }
  return 0;
} 

int sump( int i, int sum, int t, int x[], int n, int ans[], int ansp ){
  if( i == n ) return 0;
  sum += x[i];
  if( sum > t ){
    sum -= x[i];
    for( i++ ; i < n ; i++ )
      if( x[i-1] != x[i] ) break;
    return sump( i, sum, t, x, n, ans, ansp );
  }
  else if( sum < t ){
    ans[ansp++] = x[i];
    int result = sump( i+1, sum, t, x, n, ans, ansp );
    sum -= x[i];
    for( i++ ; i < n ; i++ )
      if( x[i-1] != x[i] ) break;
    return result + sump( i, sum, t, x, n, ans, ansp-1 );
  }
  else{
    bool notfirst = 0;
    for( int j = 0 ; j < ansp ; j++ ){
      if( notfirst ) printf( "+" );
      printf( "%d", ans[j] );
      notfirst = 1;
    }
    if( notfirst ) printf( "+" );
    printf( "%d", x[i] );
    printf( "\n" );
    sum -= x[i];
    for( i++ ; i < n ; i++ )
      if( x[i-1] != x[i] ) break;
    return 1 + sump( i, sum, t, x, n, ans, ansp );
  }
}
```
