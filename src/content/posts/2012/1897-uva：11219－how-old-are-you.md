---
id: 1897
title: '#UVa：11219－How old are you?'
slug: uva：11219－how-old-are-you
date: '2012-09-17T22:57:27+08:00'
lastmod: '2014-12-31T23:18:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 112
- UVa
permalink: /2012/09/17/1897/uva%ef%bc%9a11219%ef%bc%8dhow-old-are-you/
wp_status: publish
wp_type: post
---

把出生日期中的年月日與現在日期中的年月日各自對應去找其發生該大小關係時，應該會得出來的答案即可。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 11219 How old are you?                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/09/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int T;
  int now_day, now_month, now_year;
  int birth_day, birth_month, birth_year;
  while( scanf( "%d", &T ) != EOF ){
    for( int i = 1 ; i <= T ; i++ ){
      scanf( "%d/%d/%d", &now_day, &now_month, &now_year );
      scanf( "%d/%d/%d", &birth_day, &birth_month, &birth_year );
      printf( "Case #%d: ", i );
      if( birth_year > now_year ) printf( "Invalid birth date\n" );
      else if( birth_year == now_year ){
        if( birth_month > now_month ) printf( "Invalid birth date\n" );
        else if( birth_month == now_month ){
          if( birth_day > now_day ) printf( "Invalid birth date\n" );
          else printf( "0\n" );
        }
        else printf( "0\n" );
      }
      else{
        if( birth_month > now_month )
          if( now_year-birth_year-1 > 130 ) printf( "Check birth date\n" );
          else printf( "%d\n", now_year-birth_year-1 );
        else if( birth_month == now_month ){
          if( birth_day > now_day )
            if( now_year-birth_year-1 > 130 ) printf( "Check birth date\n" );
            else printf( "%d\n", now_year-birth_year-1 );
          else 
            if( now_year-birth_year > 130 ) printf( "Check birth date\n" );
            else printf( "%d\n", now_year-birth_year );
        }
        else 
          if( now_year-birth_year > 130 ) printf( "Check birth date\n" );
          else printf( "%d\n", now_year-birth_year );
      }
    }
  }
  return 0;
}
```
