---
id: 2802
title: '#UVa：112－Tree Summing'
slug: uva：112－tree-summing
date: '2015-05-22T16:25:09+08:00'
lastmod: '2015-05-22T16:43:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/05/22/2802/uva%ef%bc%9a112%ef%bc%8dtree-summing/
wp_status: publish
wp_type: post
---

可以利用編譯器最基本的技術去寫這題，一個負責剖析出各個token，一個去確定Grammer是不是對的。藉由剖析的過程中，順便去加總值看是否與目標值相同即可得解。

## Token
* ( : LEFT_BRACKET
* ) : RIGHT_BRACKET
* -?[0-9]+ : NUMBER

## Grammer
* Tree: &lt;Node&gt; | &lt;NullNode&gt;
* Node: LEFT_BRACKET NUMBER &lt;Tree&gt; &lt;Tree&gt; RIGHT_BRACKET
* NullNode: LEFT_BRACKET RIGHT_BRACKET

**C++(0.043)**
```cpp
/*******************************************************/
/* UVa 112 Tree Summing                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/22                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cctype>
using namespace std;

enum Token {
  LEFT_BRACKET, RIGHT_BRACKET,
  NUMBER
};

enum Tree {
  NULLNODE, NODE 
};

Token getToken(int &token){
  int c = getchar();
  while( c == ' ' || c == '\n' ){
    c = getchar();
  }
  
  if( c == '(' ) return LEFT_BRACKET;
  if( c == ')' ) return RIGHT_BRACKET;
  
  int sign = 1;
  if( c == '-' ){
    sign = -1;
    c = getchar();
  }
  
  token = 0;
  while( isdigit(c) ){
    token = token * 10 + (c - '0');
    c = getchar();
  }
  
  token *= sign;
  ungetc(c, stdin);
  
  return NUMBER;
}

Tree parseTree(bool &isMatched, int rootSum, int target){
  int token;
  getToken(token); // '('
  
  if( getToken(token) == RIGHT_BRACKET ){
    return NULLNODE;
  }
  
  rootSum += token;
  
  Tree leftSubTree = parseTree( isMatched, rootSum, target );
  Tree rightSubTree = parseTree( isMatched, rootSum, target );
  
  getToken(token);
  
  if( leftSubTree == NULLNODE && rightSubTree == NULLNODE ){
    if( rootSum == target ){
      isMatched = true;
    }
  }
  
  return NODE;
  
}

int main(){
  int target;
  while( scanf("%d", &target) != EOF ){
    bool isMatched = false;
    parseTree(isMatched, 0, target);
    if( isMatched ){
      printf("yes\n");
    }  
    else {
      printf("no\n");
    }
  }
  return 0;
}
``` 
