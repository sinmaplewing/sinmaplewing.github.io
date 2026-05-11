---
id: 1340
title: '#UVa：271－Simply Syntax'
slug: uva：271－simply-syntax
date: '2012-01-17T22:01:34+08:00'
lastmod: '2014-12-30T12:57:43+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2012/01/17/1340/uva%ef%bc%9a271%ef%bc%8dsimply-syntax/
wp_status: publish
wp_type: post
---

其實將這題目當中的N換成負號，C,D,E,I各換成加減乘除的符號，然後將p~z換成數字後，其實問題就會變成檢驗這個算式是否為一個前序運算式的題目了！

此題可從字串後面開始搜尋，遇到p~z就丟入stack中，遇到N就pop一個值將它加上N再push進去，遇到C,D,E,I就pop兩個值，將他們合併起來再在前頭加上C,D,E或I再push回去。一直這樣做，直到若pop不出值，或是最後stack的size並非1就是有錯誤，其餘情況就是正確的。

**C++(0.188)**
```cpp
/*******************************************************/
/* UVa 271 Simply Syntax                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/01/17                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<stack>
using namespace std;

int main(){
  string s, temp;
  stack<string> stk;
  bool correct = 1;
  while( getline( cin, s ) ){
    while( !stk.empty() ) stk.pop();
    correct = 1;
    for( int i = s.length()-1; i >= 0 ; i-- ){
      if( s[i] <= 'z' && s[i] >= 'p' ){
        temp = s[i];
        stk.push(temp);
      }
      else if( s[i] == 'N' ){
        if( stk.empty() ){
          correct = 0;
          break;
        }
        temp = stk.top();
        stk.pop();
        temp = s[i] + temp;
        stk.push( temp );
      }
      else if( s[i] == 'C' || s[i] == 'D' || s[i] == 'E' || s[i] == 'I' ){
        if( stk.empty() ){
          correct = 0;
          break;
        }
        temp = stk.top();
        stk.pop();
        if( stk.empty() ){
          correct = 0;
          break;
        }
        temp = stk.top() + temp;
        stk.pop();
        temp = s[i] + temp;
        stk.push( temp );
      }
      else{
        correct = 0;
        break;
      }
    }
    if( stk.size() != 1 ) correct = 0;
    printf( ((correct)? "YES\n" : "NO\n" ) );
  }
  return 0;
}
```
