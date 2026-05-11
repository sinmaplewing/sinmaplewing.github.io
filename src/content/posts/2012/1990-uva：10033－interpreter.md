---
id: 1990
title: '#UVa：10033－Interpreter'
slug: uva：10033－interpreter
date: '2012-11-10T12:33:39+08:00'
lastmod: '2014-12-31T23:03:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2012/11/10/1990/uva%ef%bc%9a10033%ef%bc%8dinterpreter/
wp_status: publish
wp_type: post
---

照題目要求去做處理即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 10033 Interpreter                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/11/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int n;

  while( scanf( "%d", &n ) != EOF ){
    getchar();
    getchar();
    for( int i = 0 ; i < n ; i++ ){
      int registers[10] = {0}, pointer = 0, RAM[1000] = {0};
      string input;

      while( getline( cin, input ) && input != "" )
        sscanf( input.c_str(), "%d", &RAM[pointer++] );

      int execute = 1, opcode, dest, source;
      pointer = 0;

      while( RAM[pointer] != 100 ){
        opcode = RAM[pointer] / 100;
        dest = RAM[pointer] / 10 % 10;
        source = RAM[pointer] % 10;
        pointer++;
        execute++;

        switch( opcode ){
          case 2:
            registers[dest] = source;
            break;
          case 3:
            registers[dest] += source;
            break;
          case 4:
            registers[dest] *= source;
            break;
          case 5:
            registers[dest] = registers[source];
            break;
          case 6:
            registers[dest] += registers[source];
            break;
          case 7:
            registers[dest] *= registers[source];
            break;
          case 8:
            registers[dest] = RAM[registers[source]];
            break;
          case 9:
            RAM[registers[source]] = registers[dest];
            break;
          case 0:
            if( registers[source] ) pointer = registers[dest];
            break;
          default:
            break;
        } 
        registers[dest] %= 1000;
      }

      if( i ) printf( "\n" );
      printf( "%d\n", execute );
    }
  }

  return 0;
}
```
