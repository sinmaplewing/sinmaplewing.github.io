---
id: 1689
title: '#UVa：10020－Minimal coverage'
slug: uva：10020－minimal-coverage
date: '2012-04-06T02:56:27+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/04/06/1689/uva%ef%bc%9a10020%ef%bc%8dminimal-coverage/
wp_status: publish
wp_type: post
---

可使用Greedy的方法來解。

先將線段以左界從小到大來排序，接著紀錄兩個值：一個是目前需要的範圍的左界(初始值為0)，另一個是目前能夠包圍到最右邊的邊界(初始值亦為0)。

因為這時左界已從小到大排序，所以從頭到尾，我就取其左界在目前需要範圍的左界的左邊(或相同)並且右界最遠的線段，選完後，再將需要的左界變成目前找到的最右邊，繼續找其左界在目前需要的範圍的左界的左邊(或相同)並且右界最遠的線段，就這樣一直選即可得解。

**Ex. M = 8**

[-2,5],[-1,2],[0,3],[1,8]，我會先選出[-2,5]，因為他的左邊在目前需要的範圍的左界還要左邊(或相等)，而右邊能延展最長，而[1,8]因為會沒包到[0,1]這段，所以還不急著選他，選出[-2,5]後，我現在需要的範圍的左界就變成了5，此時在5的左邊，而又比目前最右邊還要長的線段就非[1,8]莫屬，所以又選了[1,8]出來，答案就找完了。

**C++(0.072)**
```cpp
/*******************************************************/
/* UVa 10020 Minimal coverage                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/04/06                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<vector>
#include<algorithm>
using namespace std;

int M;

struct Segment{
  int start;
  int end;
};

bool cmp( Segment a, Segment b ){
  if( a.start < b.start ) return true;
  return false;
}

int main(){
  int testcase;
  int temp, left, right;
  Segment input;
  vector<Segment> lines, answer;

  while( scanf( "%d", &testcase ) != EOF ){
    for( int i = 0 ; i < testcase ; i++ ){
      if( i ) printf( "\n" );

      scanf( "%d", &M );

      lines.clear();
      while( scanf( "%d%d", &input.start, &input.end ) != EOF && 
             ( input.start != 0 || input.end != 0 ) )
        lines.push_back( input );

      sort( lines.begin(), lines.end(), cmp );

      answer.clear();
      left = 0;
      right = 0;
      for( int i = 0 ; i < lines.size() ; i++ ){
        temp = -1;
        for( ; i < lines.size() && lines[i].start <= left ; i++ )
          if( lines[i].end > right ){
            right = lines[i].end;
            temp = i;
          }
          
        if( temp == -1 ) break;
        answer.push_back( lines[temp] );
        if( right >= M ) break;
        left = right;
        i--;
      }

      if( right < M ){
        printf( "0\n" );
        continue;
      }
      printf( "%d\n", answer.size() );
      for( int i = 0 ; i < answer.size() ; i++ )
        printf( "%d %d\n", answer[i].start, answer[i].end );
    }
  }
  return 0;
}
```
