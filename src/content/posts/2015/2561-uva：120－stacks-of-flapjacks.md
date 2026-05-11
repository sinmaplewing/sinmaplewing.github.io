---
id: 2561
title: '#UVa：120－Stacks of Flapjacks'
slug: uva：120－stacks-of-flapjacks
date: '2015-01-01T03:04:23+08:00'
lastmod: '2015-01-01T03:07:05+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/01/01/2561/uva%ef%bc%9a120%ef%bc%8dstacks-of-flapjacks/
wp_status: publish
wp_type: post
---

此題就是將數值依序一個一個排到最右邊即可。根據目前所要之最大值之位置可分為三種狀況：

1. 最大值已在最右邊：不做事。
2. 最大值在最左邊：直接flip到所要之位置。
3. 最大值在中間：先flip到最左邊，再flip到所要之位置。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 120 Stacks of Flapjacks                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/01                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
using namespace std;

void flip( int pancakes[], int totalPancakes, int index ){
  for( int i = 0 ; i <= index / 2 ; ++i ){
    swap( pancakes[i], pancakes[index-i] );
  }

  printf("%d", totalPancakes - index);
}

int main(){
  string input;
  while( getline(cin, input) ){
    printf("%s\n", input.c_str());
    stringstream ss(input);
    
    int pancakes[35] = {0};
    int totalPancakes = 0;
    while( ss >> pancakes[totalPancakes] ){
      ++totalPancakes;
    }
    
    bool isPrint = false;
    for(int i = 0 ; i < totalPancakes ; ++i ){
      int maxIndex = 0;
      for( int j = 1 ; j < totalPancakes - i ; ++j ){
        if( pancakes[j] > pancakes[maxIndex] ){
          maxIndex = j;
        }
      }

      if( maxIndex == totalPancakes - i - 1 ){
        continue;
      }
      else{
        if( isPrint ){ printf(" "); }

        if( maxIndex == 0 ){
          flip( pancakes, totalPancakes, totalPancakes - i - 1 );
        }
        else{
          flip( pancakes, totalPancakes, maxIndex );
          printf(" ");
          flip( pancakes, totalPancakes, totalPancakes - i - 1 );
        }

        isPrint = true;
      }
    }

    if( isPrint ) printf(" ");
    printf("0\n");

  }

  return 0;
}
```
