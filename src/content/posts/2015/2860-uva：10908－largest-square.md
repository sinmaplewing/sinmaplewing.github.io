---
id: 2860
title: '#UVa：10908－Largest Square'
slug: uva：10908－largest-square
date: '2015-07-22T10:26:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2015/07/22/2860/uva%ef%bc%9a10908%ef%bc%8dlargest-square/
wp_status: publish
wp_type: post
---

從所要的點一直往外擴張正方形，直到無法擴張為止就是答案。

P.S. 可在外圍放一排零會比較好做判斷。

**C++(0.003)**
```cpp
/*******************************************************/
/* UVa 10908 Largest Square                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/22                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

bool check(char map[105][105], char c, int start_row, int end_row, int start_col, int end_col, int inc_row, int inc_col ){
  for( ; start_row <= end_row && start_col <= end_col ; start_row += inc_row, start_col += inc_col ){
    if( map[start_row][start_col] != c ){
      return false;
    }
  }

  return true;
}


int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    int M, N, Q;
    for( int caseCount = 0 ; caseCount < T ; ++caseCount ){
      scanf("%d%d%d", &M, &N, &Q);
      printf("%d %d %d\n", M, N, Q);

      char map[105][105] = {0};
      for( int i = 1 ; i <= M ; ++i ){
        scanf("%s", &map[i][1]);
      }

      int x, y;
      for( int i = 0 ; i < Q ; ++i ){
        scanf("%d%d", &x, &y);
        ++x;
        ++y;

        int size = 1;
        while( true ){
          if( !check(map, map[x][y], x-size, x-size, y-size, y+size, 0, 1 ) ){
            break;
          }

          if( !check(map, map[x][y], x+size, x+size, y-size, y+size, 0, 1 ) ){
            break;
          }

          if( !check(map, map[x][y], x-size, x+size, y-size, y-size, 1, 0 ) ){
            break;
          }

          if( !check(map, map[x][y], x-size, x+size, y+size, y+size, 1, 0 ) ){
            break;
          }

          ++size;
        }
        --size;
        printf("%d\n", size * 2 + 1);
      }
    }
  }

  return 0;
}

```
