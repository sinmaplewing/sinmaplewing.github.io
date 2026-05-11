---
id: 1311
title: '#UVa：541－Error Correction'
slug: uva：541－error-correction
date: '2012-01-16T15:30:39+08:00'
lastmod: '2014-12-31T22:50:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2012/01/16/1311/uva%ef%bc%9a541%ef%bc%8derror-correction/
wp_status: publish
wp_type: post
---

檢查每行與每列的1的個數是否為偶數，如果有某一行與某一列不吻合，則要換的那個位元就是(那行,那列)。如果有多行多列，或是行有問題但是列沒問題，或者反過來，則都沒辦法判斷要換那個位元。如果都吻合，那就OK，沒什麼問題。

**C++(0.048)**
```cpp
/*******************************************************/
/* UVa 541 Error Correction                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/16                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  int n, matrix[105][105] = {0};
  while( scanf( "%d", &n ) != EOF && n ){
    int row[105] = {0}, col[105] = {0};
    int rowans = -1, colans = -1;
    bool corrupt = 0;
    for( int i = 0 ; i < n ; i++ )
      for( int j = 0 ; j < n ; j++ ){
        scanf( "%d", &matrix[i][j] );
        row[i] += matrix[i][j];
        col[j] += matrix[i][j];
      }

    for( int i = 0 ; i < n ; i++ ){
      if( row[i] % 2 ){
        if( rowans != -1 ){
          printf( "Corrupt\n" );
          corrupt = 1;
          break;
        }
        else rowans = i;
      }
      if( col[i] % 2 ){
        if( colans != -1 ){
          printf( "Corrupt\n" );
          corrupt = 1;
          break;
        }
        else colans = i;
      } 
    }
    if( !corrupt ){
      if( (rowans == -1 && colans != -1) || 
          (colans == -1 && rowans != -1) ){
        printf( "Corrupt\n" );
      }
      if( rowans == -1 && colans == -1 )
        printf( "OK\n" );
      else
        printf( "Change bit (%d,%d)\n", rowans+1, colans+1 );
    }
  }
  return 0;
}
```
