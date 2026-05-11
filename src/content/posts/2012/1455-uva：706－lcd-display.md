---
id: 1455
title: '#UVa：706－LCD Display'
slug: uva：706－lcd-display
date: '2012-03-02T11:10:36+08:00'
lastmod: '2014-12-31T22:53:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2012/03/02/1455/uva%ef%bc%9a706%ef%bc%8dlcd-display/
wp_status: publish
wp_type: post
---

先將每一個數字每行會出現的可能性紀錄下來，再對數字字串進行分析及顯示。

P.S. 請注意測資有可能會出現類似01234、00253這類前面有0的測資。

**C++(8ms, 804KB)**
```cpp
/*******************************************************/
/* UVa 706 LCD Display                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/02                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;
const char DISPLAY[10][10] = { " ", " - ", " |", "| ", "| |" };
void draw( int s, int display_num ){
  printf( "%c", DISPLAY[display_num][0] );
  for( int i = 0 ; i < s ; i++ )
    printf( "%c", DISPLAY[display_num][1] );
  printf( "%c", DISPLAY[display_num][2] );
}
int main(){
  int s;
  string n;
  while( scanf( "%d", &s ) != EOF ){
    cin >> n;
    if( s == 0 && n == "0" ) break;
    //first line
    for( int i = 0 ; i < n.length() ; i++ ){
      switch( n[i]-'0' ){
        case 1: case 4:
        draw(s,0);
        break;
        default:
        draw(s,1);
        break;
      }
      if( i != n.length()-1 ) printf( " " );
    }
    printf( "\n" );
    //second line
    for( int i = 0 ; i < s ; i++ ){
      for( int j = 0 ; j < n.length() ; j++ ){
        switch( n[j]-'0' ){
          case 1: case 2: case 3: case 7:
          draw(s,2);
          break;
          case 5: case 6:
          draw(s,3);
          break;
          default:
          draw(s,4);
          break;
        }
        if( j != n.length()-1 ) printf( " " );
      }
      printf( "\n" );
    }
    //third line
    for( int i = 0 ; i < n.length() ; i++ ){
      switch( n[i]-'0' ){
        case 1: case 7: case 0:
        draw(s,0);
        break;
        default:
        draw(s,1);
        break;
      }
      if( i != n.length()-1 ) printf( " " );
    }
    printf( "\n" );
    //fourth line
    for( int i = 0 ; i < s ; i++ ){
      for( int j = 0 ; j < n.length() ; j++ ){
        switch( n[j]-'0' ){
          case 1: case 3: case 4: case 5:
          case 7: case 9:
          draw(s,2);
          break;
          case 2:
          draw(s,3);
          break;
          default:
          draw(s,4);
          break;
        }
        if( j != n.length()-1 ) printf( " " );
      }
      printf( "\n" );
    }
    //fifth line
    for( int i = 0 ; i < n.length() ; i++ ){
      switch( n[i]-'0' ){
        case 1: case 4: case 7:
        draw(s,0);
        break;
        default:
        draw(s,1);
        break;
      }
      if( i != n.length()-1 ) printf( " " );
    }
    printf( "\n\n" );
  }
  return 0;
}
```
