---
id: 1337
title: '#UVa：673－Parentheses Balance'
slug: uva：673－parentheses-balance
date: '2012-01-17T21:40:32+08:00'
lastmod: '2014-12-31T22:51:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2012/01/17/1337/uva%ef%bc%9a673%ef%bc%8dparentheses-balance/
wp_status: publish
wp_type: post
---

利用Stack解括弧匹配的方法解即可。

**C++(0.052)**
```cpp
/*******************************************************/
/* UVa 673 Parentheses Balance                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<stack>
using namespace std;

int main(){
  int n;
  string s;
  stack<char> stk;
  bool correct;
  while( scanf( "%d", &n ) != EOF ){
    getchar();
    for( int i = 0 ; i < n ; i++ ){
      getline( cin, s );
      correct = 1;
      while( !stk.empty() ) stk.pop();
      for( int j = 0 ; j < s.length() ; j++ ){
        if( s[j] == '(' || s[j] == '[' )
          stk.push( s[j] );
        else if( s[j] == ')' ){
          if( stk.empty() || stk.top() != '(' ){
            correct = 0;
            break;
          }
          stk.pop();
        }
        else if( s[j] == ']' ){
          if( stk.empty() || stk.top() != '[' ){
            correct = 0;
            break;
          }
          stk.pop();
        }
      }
      if( !stk.empty() ) correct = 0;
      printf( ((correct)?"Yes\n":"No\n") );
    }
  }
  return 0;
}
```
