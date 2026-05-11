---
id: 3127
title: '#UVa：10000－Longest Paths'
slug: uva：10000－longest-paths
date: '2016-04-28T02:30:23+08:00'
lastmod: '2016-08-10T08:15:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2016/04/28/3127/uva%ef%bc%9a10000%ef%bc%8dlongest-paths/
wp_status: publish
wp_type: post
---

使用任一種單一起點的最短路徑演算法，將更新的部分改為比較長才更新即可得解。

P.S. 程式碼部分使用的是SPFA演算法。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 10000 Longest Paths                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

int findLongestPath( bool map[105][105], vector<int> &distance, int s, int n ){
  distance[s] = 0;
  queue<int> next;
  vector<bool> inQueue(n+1, false);
  next.push(s);
  
  while( !next.empty() ){
    int current = next.front();
    next.pop();
    inQueue[current] = false;
    
    for( int i = 1 ; i <= n ; ++i ){
      if( map[current][i] && distance[current]+1 > distance[i] ){
        distance[i] = distance[current] + 1;
        if( !inQueue[i] ){
          next.push(i);
          inQueue[i] = true;
        }
      }
    }
  }
  
  int maxIndex = 1;
  for( int i = 2 ; i <= n ; ++i ){
    if( distance[i] > distance[maxIndex] ){
      maxIndex = i;
    }
  }
  
  return maxIndex;
}

int main(){
  int n;
  int caseNumber = 0;
  while( scanf("%d", &n) != EOF && n != 0 ){
    int s;
    scanf("%d", &s);
    
    bool map[105][105] = {false};
    int p, q;
    while( scanf("%d%d", &p, &q) != EOF && p != 0 && q != 0 ){
      map[p][q] = true;
    }
    
    vector<int> distance(n+1, 0);
    int final = findLongestPath(map, distance, s, n);
    printf("Case %d: The longest path from %d has length %d, finishing at %d.\n\n", ++caseNumber, s, distance[final], final);
  }
  
  return 0;
}
```
