---
id: 3064
title: '#UVa：10070－Leap Year or Not Leap Year and ...'
slug: uva：10070－leap-year-or-not-leap-year-and
date: '2016-04-15T15:09:13+08:00'
lastmod: '2018-05-17T00:49:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2016/04/15/3064/uva%ef%bc%9a10070%ef%bc%8dleap-year-or-not-leap-year-and/
wp_status: publish
wp_type: post
---

主要是輸入的年代得用大數存放，所以必須了解如何去判斷大數是否為某個數字的倍數。

* 4的倍數：由於[latex]4 \times 25 = 100[/latex]，故百位數字以上基本上一定可被4整除，所以僅看後兩位數字是否為4的倍數即可。
* 100的倍數：與4的倍數相同道理，僅看後兩位數字是否為100的倍數即可。
* 400的倍數：由於[latex]400 \times 25 = 100[/latex]，故萬位數字以上基本上一定可被400整除，所以僅看後四位數字是否為400的倍數即可。
* 15的倍數：看是否為3與5的倍數即可。
* 3的倍數：將每一位數字做總和後，看總和是否為3的倍數即可。
* 5的倍數：看個位數字是否為5或0即可。
* 55的倍數：看是否為5與11的倍數即可。
* 11的倍數：看數字中奇數位數字總和與偶數位數字總和之差是否為11的倍數即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10070 Leap Year or Not Leap Year and ...        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
#include <string>
using namespace std;

bool is3mul(const string &number){
  int sum = 0;
  for( int i = 0 ; i < number.length() ; ++i ){
    sum += number[i] - '0';
  }
  
  return sum % 3 == 0;
}

bool is5mul(const string &number){
  return (number[number.length()-1] - '0') % 5 == 0;
}

bool is11mul(const string &number){
  int sum[2] = {0};
  for( int i = 0 ; i < number.length() ; ++i ){
    sum[i%2] += number[i] - '0';
  }
  
  return (int)abs( sum[0] - sum[1] ) % 11 == 0;
}

int main(){
  string year;
  bool space = false;
  while( cin >> year ){
  
    if( space ) {
      printf("\n");
    }
    space = true;
  
    bool isLeap = false;
    bool hasPrinted = false;
    int lastFourDigit;
    sscanf( year.c_str()+year.length()-4, "%d", &lastFourDigit );
    if( (lastFourDigit % 400 == 0) ||
        (lastFourDigit % 100 != 0 && lastFourDigit % 4 == 0) ){
      printf("This is leap year.\n");
      isLeap = true;
      hasPrinted = true;
    }
    
    if( is3mul(year) && is5mul(year) ){
      printf("This is huluculu festival year.\n");
      hasPrinted = true;
    }
    
    if( isLeap && is5mul(year) && is11mul(year) ){
      printf("This is bulukulu festival year.\n");
      hasPrinted = true;
    }
  
    if( !hasPrinted ){
      printf("This is an ordinary year.\n");
    }
  }
  
  
  return 0;
}
```
