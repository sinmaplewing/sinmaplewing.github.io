---
id: 2711
title: '#UVa：11956－Brainfuck'
slug: uva：11956－brainfuck
date: '2015-03-15T01:20:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2015/03/15/2711/uva%ef%bc%9a11956%ef%bc%8dbrainfuck/
wp_status: publish
wp_type: post
---

照著題目要求的去改陣列的值即可，它的陣列指標位置操作是循環的，意思就是說若指標在0的地方，做減一應該會到陣列最尾巴，反之亦然。

**C++(0.498)**
```cpp
/*******************************************************/
/* UVa 11956 Brainfuck                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
  int testcase;
  
  while( scanf("%d", &testcase) != EOF ){
    getchar(); /* for '\n' */
    int caseCount;
    for( caseCount = 1 ; caseCount <= testcase ; ++caseCount ){
      unsigned char array[105] = {0};
      int index = 0;

      char input[100005];
      gets(input);

      int inputLength = strlen(input);
      int i;
      for( i = 0 ; i < inputLength ; ++i ){
        switch(input[i]){
          case '>':
            ++index;
            break;
          case '<':
            --index;
            break;
          case '+':
            ++array[index];
            break;
          case '-':
            --array[index];
            break;
        }

        index = (index + 100) % 100;
      }

      printf("Case %d:", testcase);
      for( i = 0 ; i < 100 ; ++i ){
        printf(" %02X", array[i] );
      }
      printf("\n");
    }
  }
  return 0;
}
```
