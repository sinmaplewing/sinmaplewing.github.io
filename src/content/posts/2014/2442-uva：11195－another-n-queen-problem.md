---
id: 2442
title: '#UVa：11195－Another n-Queen Problem'
slug: uva：11195－another-n-queen-problem
date: '2014-12-25T13:41:31+08:00'
lastmod: '2014-12-31T23:17:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 111
- UVa
permalink: /2014/12/25/2442/uva%ef%bc%9a11195%ef%bc%8danother-n-queen-problem/
wp_status: publish
wp_type: post
---

剛開始直接進行backtracking就TLE了，所以這題要用bitboard的觀念去進行backtracking，底下對bitboard的程式碼進行一下解說：
```cpp
void initBoard(int board[], int n){
  for( int i = 0 ; i < n ; ++i ){
    board[i] = (1 << n) - 1;
  }
}
```
這裡是讓可以放置皇后的位置用1來記錄，不可以放置皇后的位置('*')用0來記錄。board這個陣列是以row(y)來當索引值，然後col的部份用bits來記錄。

```cpp
if( s[j] == '*' ){
  board[i] ^= (1 << j); 
}
```
這裡就是讓*的位置用1來做XOR運算，簡單來說就是把j位置的1改成0。

```cpp
backtracking(board, n, 0, (1 << n) - 1, (1 << (2*n-1)) - 1, (1 << (2*n-1)) - 1 )
```
這邊把記錄x和記錄兩種斜線的bits丟進去backtracking，並且x的n個位數都是1，表示目前都可以擺，而斜線部分的2*n-1個位數也都是1，也表示目前都可以擺。

```cpp
int nowLeftToRightSlash = leftToRightSlash >> y;
int nowRightToLeftSlash = rightToLeftSlash >> (n-y-1);
```
將目前跑到那行row的斜線號碼全部抓出來，例如8皇后的第一個row(row[0])，x+y種類的斜線編號分別是`0+0=0,0+1=1,0+2=2,0+3=3......0+7=7`，也就是說用leftToRightSlash >> 0，這樣即可讓slash1從個位數(2進位)開始的7個位數都剛好對應每一格。

而x-y+(2*n-1)種類的斜線編號分別是`0-0+15=15,0-1+15=14........0-7+15=8`，正好是從高位數(2進位)數過來0位數，那為了推到個位數(2進位)，就變成rightToLeftSlash >> 8-0-1，這樣就可以讓高位數(2進位)的7個位數推到個位數(2進位)來。

```cpp
int canPutQueen = board[y] & x & nowLeftToRightSlash & nowRightToLeftSlash;
```
用&看看每一格是否能夠放置皇后，board[]檢查是否為*，x檢查是否這個col被放置皇后，nowLeftToRightSlash檢查是否這條斜線被放置皇后，nowRightToLeftSlash檢查另外一種斜線是否被放置皇后，如果全部都是1，就表示這格可以放置皇后。

```cpp
while( canPutQueen != 0 ){
  int xPut = canPutQueen & (-canPutQueen);
  numberOfSolution += backtracking( board, n, y+1, x ^ xPut, leftToRightSlash ^ (xPut << y), rightToLeftSlash ^ (xPut << (n-y-1)) );
  canPutQueen ^= xPut;
}
```
第一行自己&負自己，可以得到二進位最低位的1，而我就從這最低位的1開始放置皇后，那麼x就要記錄放置皇后，而leftToRightSlash和rightToLeftSlash也要記錄放置了皇后，最後再將這個1從canPutQueen裡面去除，再繼續把皇后放在下一個1的位置。

**C++(0.978)**
```cpp
/*******************************************************/
/* UVa 11195 Another n-Queen Problem                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/25                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

void initBoard(int board[], int n){
  for( int i = 0 ; i < n ; ++i ){
    board[i] = (1 << n) - 1;
  }
}

int backtracking(int board[], int n, int y, int x, int leftToRightSlash, int rightToLeftSlash ){
  if( y == n ){
    return 1;
  }

  int nowLeftToRightSlash = leftToRightSlash >> y;
  int nowRightToLeftSlash = rightToLeftSlash >> (n-y-1);
  int canPutQueen = board[y] & x & nowLeftToRightSlash & nowRightToLeftSlash;
 
  int numberOfSolution = 0;
  while( canPutQueen != 0 ){
    int xPut = canPutQueen & (-canPutQueen);
    numberOfSolution += backtracking( board, n, y+1, x ^ xPut, leftToRightSlash ^ (xPut << y), rightToLeftSlash ^ (xPut << (n-y-1)) );
    canPutQueen ^= xPut;
  }

  return numberOfSolution;
}

int main(){
  int n;
  int casenumber = 1;
  while( scanf("%d", &n) != EOF && n != 0 ){
    int board[20];
    initBoard( board, n );

    string s;
    getline(cin, s); // Delete \n
    for( int i = 0 ; i < n ; ++i ){
      getline( cin, s );
      
      for( int j = 0 ; j < n ; ++j ){
        if( s[j] == '*' ){
          board[i] ^= (1 << j); 
        }
      }
    }

    printf("Case %d: %d\n", casenumber++, backtracking(board, n, 0, (1 << n) - 1, (1 << (2*n-1)) - 1, (1 << (2*n-1)) - 1 ) );
  }

  return 0;
}
```
