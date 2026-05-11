---
id: 2461
title: '#UVa：11530－SMS Typing'
slug: uva：11530－sms-typing
date: '2014-12-27T18:42:23+08:00'
lastmod: '2014-12-31T23:20:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2014/12/27/2461/uva%ef%bc%9a11530%ef%bc%8dsms-typing/
wp_status: publish
wp_type: post
---

建表去加上字母的對應次數即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 11530 SMS Typing                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  const int press[] = { 1, 2, 3,
                        1, 2, 3,
                        1, 2, 3,
                        1, 2, 3,
                        1, 2, 3,
                        1, 2, 3, 4,
                        1, 2, 3,
                        1, 2, 3, 4 };
  int T;
  while( scanf("%d", &T) != EOF ){
    string text;
    getline(cin, text); // get \n

    for( int i = 1 ; i <= T; ++i ){
      getline(cin, text);

      int pressCount = 0;
      for( int j = 0 ; j < text.length() ; ++j ){
        if( text[j] == ' ' ){
          ++pressCount;
          continue;
        }
        pressCount += press[(int)(text[j]-'a')];
      }
      
      printf("Case #%d: %d\n", i, pressCount);
    }
  }
  return 0;
}
```
