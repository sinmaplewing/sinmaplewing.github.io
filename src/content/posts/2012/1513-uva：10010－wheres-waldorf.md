---
id: 1513
title: '#UVa：10010－Where''s Waldorf?'
slug: uva：10010－wheres-waldorf
date: '2012-03-23T11:09:27+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/03/23/1513/uva%ef%bc%9a10010%ef%bc%8dwheres-waldorf/
wp_status: publish
wp_type: post
---

先試著找到在文字矩陣中找到所要尋找的字串的第一個字，接著八方位去尋找即可得解。

P.S. 無關乎大小寫。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10010 Where's Waldorf?                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/23                                 */
/*******************************************************/
#include<iostream>
#include<cstring>
#include<cstdio>
#include<cctype>
using namespace std;

char letters[55][55];

bool my_strcmp( string s, int row, int col ){

  int index = 1;
  while( index < s.length() && s[index] == letters[row+index][col] ) index++;
  if( index == s.length() ) return true;

  index = 1;
  while( index < s.length() && s[index] == letters[row-index][col] ) index++;
  if( index == s.length() ) return true;

  index = 1;
  while( index < s.length() && s[index] == letters[row][col+index] ) index++;
  if( index == s.length() ) return true;
  index = 1;
  while( index < s.length() && s[index] == letters[row][col-index] ) index++;
  if( index == s.length() ) return true;

  index = 1;
  while( index < s.length() && s[index] == letters[row+index][col+index] ) index++;
  if( index == s.length() ) return true;
  index = 1;
  while( index < s.length() && s[index] == letters[row+index][col-index] ) index++;
  if( index == s.length() ) return true;

  index = 1;
  while( index < s.length() && s[index] == letters[row-index][col+index] ) index++;
  if( index == s.length() ) return true;
  index = 1;
  while( index < s.length() && s[index] == letters[row-index][col-index] ) index++;
  if( index == s.length() ) return true;

  return false;
}

int main(){
  int testcase;
  int m, n, k;
  int ansrow, anscol;
  bool find_answer;
  string s;
  while( scanf( "%d", &testcase ) != EOF ){
    for( int casenum = 0 ; casenum < testcase ; casenum++ ){
      if( casenum ) printf( "\n" );
      scanf( "%d%d", &m, &n );
      getchar();
      memset( letters, 0, sizeof(letters) );
      for( int i = 1 ; i <= m ; i++ ){
        for( int j = 1 ; j <= n ; j++ ){
          letters[i][j] = getchar();
          if( isupper(letters[i][j]) ) letters[i][j] = tolower(letters[i][j]);
        }
        getchar();
      }

      scanf( "%d", &k );
      getchar();
      for( int i = 0 ; i < k ; i++ ){
        getline( cin, s );
        for( int j = 0 ; j < s.length() ; j++ )
          if( isupper(s[j]) ) s[j] = tolower(s[j]);

        find_answer = false;
        for( int row = 1 ; row <= m && !find_answer ; row++ )
          for( int col = 1 ; col <= n && !find_answer ; col++ ){
            if( letters[row][col] == s[0] ) 
              if( my_strcmp( s, row, col ) ){
                ansrow = row;
                anscol = col;
                find_answer = true;
              }
          }
          printf( "%d %d\n", ansrow, anscol );
      }
    }
  }
  return 0;
}
```
