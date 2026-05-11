---
id: 3087
title: '#UVa：558－Wormholes'
slug: uva：558－wormholes
date: '2016-04-20T08:12:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2016/04/20/3087/uva%ef%bc%9a558%ef%bc%8dwormholes/
wp_status: publish
wp_type: post
---

使用Bellman-Ford演算法去更新最短路徑。令點的個數為n，依照Bellman-Ford演算法只要圖無負環即可在更新n-1次最短路徑之後得到某個點到各個點的最短路徑。倘若這個最短路徑更新到第n次還有辦法繼續更短，就表示圖中有負環，即可得解。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 558 Wormholes                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAX_DISTANCE = 20000000;

struct Edge{
  int from;
  int to;
  int distance;
};

int main(){
  int c;
  while ( scanf("%d", &c) != EOF ) {
    for( int caseNumber = 0 ; caseNumber < c ; ++caseNumber ){
      int n, m;
      scanf("%d%d", &n, &m);

      Edge edges[2005];
      for( int i = 0 ; i < m ; ++i ){
        scanf("%d%d%d", &(edges[i].from), &(edges[i].to), &(edges[i].distance));
      }

      int fromSourceDistance[1005] = {0};
      for( int i = 1 ; i < n ; ++i ){
        fromSourceDistance[i] = MAX_DISTANCE;
      }

      // Bellman-Ford Algorithm
      for( int i = 0 ; i < n-1 ; ++i ){
        for( int j = 0 ; j < m ; ++j ){
          fromSourceDistance[edges[j].to] = min (
            fromSourceDistance[edges[j].from] + edges[j].distance,
            fromSourceDistance[edges[j].to] );
        }
      }

      // one more to find negative cycle
      bool hasNegativeCycle = false;
      for( int j = 0 ; j < m ; ++j ){
        if( fromSourceDistance[edges[j].from] + edges[j].distance < fromSourceDistance[edges[j].to] ){
          printf("possible\n");
          hasNegativeCycle = true;
          break;
        }
      }

      if( !hasNegativeCycle ){
        printf("not possible\n");
      }

    }
  }

  return 0;
}
```
