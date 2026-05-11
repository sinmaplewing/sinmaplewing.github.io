---
id: 1483
title: '#UVa：10258－Contest Scoreboard'
slug: uva：10258－contest-scoreboard
date: '2012-03-16T12:00:29+08:00'
lastmod: '2014-12-31T23:06:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2012/03/16/1483/uva%ef%bc%9a10258%ef%bc%8dcontest-scoreboard/
wp_status: publish
wp_type: post
---

照著題目說的做即可得解。

P.S. 

1. 已經AC的題目，不管後來再丟的結果如何，都不會讓分數再變動。
2. 只有Incorrect(L == ‘I’)的時候會對分數上有懲罰，其餘錯誤的情況都不會。
3. 兩組測試資料是以一個空白行做分隔，因此讀取資料不可使用scanf( "%d%d%d%c", &contestant, &problem, &time, &L );，要使用讀取一整行的方式來處理Input比較方便。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10258 Contest Scoreboard                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
#include<sstream>
#include<algorithm>
using namespace std;

struct Team{
  bool join;
  int num;
  int score;
  int problem;
  int error[10];
};

bool compare( Team a, Team b ){
  if( a.problem > b.problem ) return true;
  if( a.problem < b.problem ) return false;
  if( a.score < b.score ) return true;
  if( a.score > b.score ) return false;
  if( a.num < b.num ) return true;
  return false;
}

int main(){
  int testcase;
  string entry;
  stringstream ss;
  Team teams[105];
  int contestant, problem, time;
  char L;

  while( scanf( "%d", &testcase ) != EOF ){
    getchar();
    getchar();
    for( int i = 0 ; i < testcase ; i++ ){
      if( i ) printf( "\n" );
      for( int j = 0 ; j < 105 ; j++ ){
        teams[j].join = 0;
        teams[j].num = j;
        teams[j].score = 0;
        teams[j].problem = 0;
        memset( teams[j].error, 0, sizeof(teams[j].error) );
      }

      while( getline( cin, entry ) && entry != "" ){
        ss.clear();
        ss.str(entry); 
        ss >> contestant >> problem >> time >> L;

        teams[contestant].join = true;
        if( teams[contestant].error[problem] == -1 ) continue;
        if( L == 'C' ){
          teams[contestant].score += time+teams[contestant].error[problem]*20;
          teams[contestant].problem++;
          teams[contestant].error[problem] = -1;
        }
        else if( L == 'I' )
          teams[contestant].error[problem]++;
      } 
      sort( teams, teams+105, compare );
      for( int j = 0 ; j < 105 ; j++ )
        if( teams[j].join )
          printf( "%d %d %d\n", teams[j].num, teams[j].problem, teams[j].score );
    }
  }
  return 0;
}
```
