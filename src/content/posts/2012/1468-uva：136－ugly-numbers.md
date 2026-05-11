---
id: 1468
title: '#UVa：136－Ugly Numbers'
slug: uva：136－ugly-numbers
date: '2012-03-14T08:20:08+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/14/1468/uva%ef%bc%9a136%ef%bc%8dugly-numbers/
wp_status: publish
wp_type: post
---

這題要算第1500個Ugly Number是誰。假設我現在要算第N項，那麼我就從前面這N-1項中找出：「最小乘2會大於第N-1項的那項」以及「最小乘3會大於第N-1項的那項」還有「最小乘5會大於第N-1項的那項」。找出來後比較他們三個的大小，最小的就是第N項。

接著要找N+1項，我再從前N項中一樣找出：「最小乘2會大於第N項的那項」以及「最小乘3會大於第N項的那項」還有「最小乘5會大於第N項的那項」。那其實你再找「最小乘2會大於第N項的那項」，你可以從「最小乘2會大於第N-1項的那項」開始往後搜，就不用再從第0項開始搜。找「最小乘3會大於第N項的那項」還有「最小乘5會大於第N項的那項」也可以比照辦理、以此類推。

這樣就可以很快速的找到第1500個Ugly Number了。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 136 Ugly Numbers                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int ugly_number[1505] = {1};
  int n2 = 0, n3 = 0, n5 = 0;

  for( int i = 1 ; i < 1500 ; i++ ){
    for( ; n2 < i ; n2++ )
      if( ugly_number[n2]*2 > ugly_number[i-1] ) break;

    for( ; n3 < i ; n3++ )
      if( ugly_number[n3]*3 > ugly_number[i-1] ) break;

    for( ; n5 < i ; n5++ )
      if( ugly_number[n5]*5 > ugly_number[i-1] ) break;

    ugly_number[i] = min( ugly_number[n2]*2, ugly_number[n3]*3 );
    ugly_number[i] = min( ugly_number[i], ugly_number[n5]*5 );
  }

  printf( "The 1500'th ugly number is %d.\n", ugly_number[1499] );
  return 0;
}
```
