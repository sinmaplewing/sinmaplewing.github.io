---
id: 1981
title: '#UVa：300－Maya Calendar'
slug: uva：300－maya-calendar
date: '2012-10-21T12:13:32+08:00'
lastmod: '2014-12-31T03:24:32+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2012/10/21/1981/uva%ef%bc%9a300%ef%bc%8dmaya-calendar/
wp_status: publish
wp_type: post
---

算出該日為第幾天，再轉成第二種日期表示法即可得解。

P.S. 第二種日期表示法類似我們的天干地支。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 300 Maya Calendar                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/10/21                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int string_to_haab_month( string s ){
  if( s == "pop" ) return 0;
  if( s == "no" ) return 1;
  if( s == "zip" ) return 2;
  if( s == "zotz" ) return 3;
  if( s == "tzec" ) return 4;

  if( s == "xul" ) return 5;
  if( s == "yoxkin" ) return 6;
  if( s == "mol" ) return 7;
  if( s == "chen" ) return 8;
  if( s == "yax" ) return 9;

  if( s == "zac" ) return 10;
  if( s == "ceh" ) return 11;
  if( s == "mac" ) return 12;
  if( s == "kankin" ) return 13;
  if( s == "muan" ) return 14;

  if( s == "pax" ) return 15;
  if( s == "koyab" ) return 16;
  if( s == "cumhu" ) return 17;
  if( s == "uayet" ) return 18;
}

int main(){
  int n;
  int day, year;
  string month;
  int daynum;
  const string TZOLKIN_DAYS[] = { "imix", "ik", "akbal", "kan", "chicchan", 
                                  "cimi", "manik", "lamat", "muluk", "ok", 
                                  "chuen", "eb", "ben", "ix", "mem", 
                                  "cib", "caban", "eznab", "canac", "ahau" };

  while( scanf( "%d", &n ) != EOF ){
    printf( "%d\n", n );
    for( int i = 0 ; i < n ; i++ ){
      scanf( "%d.", &day );
      cin >> month;
      scanf( "%d", &year );

      daynum = year*365;
      daynum += string_to_haab_month( month )*20;
      daynum += day;

      printf( "%d %s %d\n", (daynum%260)%13+1, TZOLKIN_DAYS[(daynum%260)%20].c_str(), daynum/260 );

    }
  }
  return 0;
}
```
