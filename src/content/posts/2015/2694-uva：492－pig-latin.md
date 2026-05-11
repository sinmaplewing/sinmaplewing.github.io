---
id: 2694
title: '#UVa：492－Pig-Latin'
slug: uva：492－pig-latin
date: '2015-01-26T23:46:37+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/01/26/2694/uva%ef%bc%9a492%ef%bc%8dpig-latin/
wp_status: publish
wp_type: post
---

照著題目要求的去解析字串即可。

**C++(0.089)**
```cpp
/*******************************************************/
/* UVa 492 Pig-Latin                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/26                                 */
/*******************************************************/
#include <iostream>
#include <string>
#include <cstdio>
#include <cctype>
using namespace std;

int main(){
  string line;
  while( getline(cin, line) ){
    bool isWord = false;
    char firstLetter;
    for( int i = 0 ; i < line.length() ; ++i ){
      if( isalpha(line[i]) ){
        if( !isWord ){
          firstLetter = line[i];

          switch( tolower(line[i]) ){
            case 'a': case 'e':
            case 'i': case 'o':
            case 'u':
              firstLetter = '\0';
              printf("%c", line[i]);
              break;
            default:
              firstLetter = line[i];
              break;
          }

          isWord = true;
        }
        else{
          printf("%c", line[i]);
        }
      }
      else {
        if( isWord ){
          if( firstLetter != '\0' ){
            printf("%c", firstLetter);
          }
          printf("ay");
          isWord = false;
        }

        printf("%c", line[i]);
      }
    }
    printf("\n");
  }

  return 0;
}
```
