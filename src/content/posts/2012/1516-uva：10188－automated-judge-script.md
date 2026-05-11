---
id: 1516
title: '#UVa：10188－Automated Judge Script'
slug: uva：10188－automated-judge-script
date: '2012-03-23T14:03:31+08:00'
lastmod: '2014-12-31T23:03:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2012/03/23/1516/uva%ef%bc%9a10188%ef%bc%8dautomated-judge-script/
wp_status: publish
wp_type: post
---

可以將每行字串全部接在一起，中間用'\n'來隔離，這樣AC只要比較這個接起來的字串是否相等即可；而PE只要將字串中非數字的字元刪掉，再看看有沒有相等即可；剩下的就是WA了。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10188 Automated Judge Script                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/23                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
using namespace std;

int main(){
  int n, m, max_index;
  int runcase = 0;
  string answer, output;
  string input;
  bool ac, pe;

  while( scanf( "%d", &n ) != EOF && n != 0 ){
    getchar();

    answer = "";
    output = "";

    for( int i = 0 ; i < n ; i++ ){
      getline( cin, input );
      if( i ) answer += '\n', answer += input;
      else answer = input;
    }
    scanf( "%d", &m );
    getchar();
    for( int i = 0 ; i < m ; i++ ){
      getline( cin, input );
      if( i ) output += '\n', output += input;
      else output = input;
    }

    ac = true;
    if( answer != output ) ac = false;

    if( ac ){
      printf( "Run #%d: Accepted\n", ++runcase );
      continue;
    }

    pe = true;
    for( int i = 0 ; i < answer.length() ; i++ )
      if( !isdigit(answer[i]) ) answer.erase(i,1), i--;
    for( int i = 0 ; i < output.length() ; i++ )
      if( !isdigit(output[i]) ) output.erase(i,1), i--;

    max_index = max( m, n );
    if( answer != output ) pe = false;

    if( pe ){
      printf( "Run #%d: Presentation Error\n", ++runcase );
      continue;
    }

    printf( "Run #%d: Wrong Answer\n", ++runcase );

  }

  return 0;
}
```
