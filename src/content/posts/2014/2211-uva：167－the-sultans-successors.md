---
id: 2211
title: '#UVa：167－The Sultan''s Successors'
slug: uva：167－the-sultans-successors
date: '2014-10-01T01:22:29+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2014/10/01/2211/uva%ef%bc%9a167%ef%bc%8dthe-sultans-successors/
wp_status: publish
wp_type: post
---

八皇后問題，利用backtracking即可得解。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 167 The Sultan's Successors                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int backtracking(int sum, int chessboard[][8], 
                 int queen_row, bool queen_col[],
                 bool queen_diagonal1[], bool queen_diagonal2[] ){
  if( queen_row == 8 ){
    return sum;
  }

  int answer = 0;
  for( int i = 0 ; i < 8 ; ++i ){
    if( !queen_col[i] && !queen_diagonal1[(i+queen_row)%15] &&
        !queen_diagonal2[(i-queen_row+15)%15] ){
      queen_col[i] = true;
      queen_diagonal1[(i+queen_row)%15] = true;
      queen_diagonal2[(i-queen_row+15)%15] = true;
      answer = max( backtracking( sum + chessboard[queen_row][i],
                                  chessboard, queen_row+1,
                                  queen_col, queen_diagonal1, queen_diagonal2 ),
                    answer );
      queen_col[i] = false;
      queen_diagonal1[(i+queen_row)%15] = false;
      queen_diagonal2[(i-queen_row+15)%15] = false;
    }
  }

  return answer;
}

int main(){
  int k;
  while( scanf( "%d", &k ) != EOF ){
    for( int testcase = 0 ; testcase < k ; ++testcase ){ 
      int chessboard[8][8] = {0};
      for( int i = 0 ; i < 8 ; ++i ){
        for( int j = 0 ; j < 8 ; ++j ){
          scanf( "%d", &chessboard[i][j] );
        }
      }

      bool queen_col[8] = {0}, 
           queen_diagonal1[15] = {0},
           queen_diagonal2[15] = {0};

      printf( "%5d\n", backtracking(0, chessboard, 0,
                                    queen_col, queen_diagonal1,
                                    queen_diagonal2) );
    }
  }
  return 0;
}
```
