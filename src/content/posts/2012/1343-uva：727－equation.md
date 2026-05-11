---
id: 1343
title: '#UVa：727－Equation'
slug: uva：727－equation
date: '2012-01-17T23:33:11+08:00'
lastmod: '2014-12-31T22:53:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2012/01/17/1343/uva%ef%bc%9a727%ef%bc%8dequation/
wp_status: publish
wp_type: post
---

利用Stack將中序運算式換成後序運算式。

**C++(0.056)**
```cpp
/*******************************************************/
/* UVa 727 Equation                                    */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cctype>
#include<stack>
using namespace std;

int main(){
  int n;
  char c;
  stack<char> stk;
  while( scanf( "%d", &n ) != EOF ){
    getchar();
    getchar();
    for( int i = 0 ; i < n ; i++ ){
      if( i ) printf( "\n" );
      while( scanf( "%c", &c ) != EOF && c != '\n'){
        getchar();
        if( isdigit(c) )
          printf( "%c", c );
        else if( c == '(' )
          stk.push(c);
        else if( c == '*' || c == '/' ){
          while( !stk.empty() && (stk.top() == '*' || stk.top() == '/') ){
            printf( "%c", stk.top() );
            stk.pop();
          }
          stk.push(c);
        }
        else if( c == '+' || c == '-' ){
          while( !stk.empty() &&
                 (stk.top() == '*' ||
                  stk.top() == '/' ||
                  stk.top() == '+' ||
                  stk.top() == '-' )){
            printf( "%c", stk.top() );
            stk.pop();
          }
          stk.push(c);
        }
        else if( c == ')' ){
          while( stk.top() != '(' ){
            printf( "%c", stk.top() );
            stk.pop();
          }
          stk.pop();
        }
      }
      while( !stk.empty() ){
        printf( "%c", stk.top() );
        stk.pop();
      }
      printf( "\n" );
    }
  }
  return 0;
}
```
