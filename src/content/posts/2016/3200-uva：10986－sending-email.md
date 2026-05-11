---
id: 3200
title: '#UVa：10986－Sending email'
slug: uva：10986－sending-email
date: '2016-10-16T22:43:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2016/10/16/3200/uva%ef%bc%9a10986%ef%bc%8dsending-email/
wp_status: publish
wp_type: post
---

求一點到另外一點的最短距離，用SPFA即可得解。

P.S. 記得紀錄每個邊可以對點去分群，這樣在更新最短路徑的速度會比較快，如果沒做很容易TLE。

**C++(0.100)**
```cpp
/*******************************************************/
/* UVa 10986 Sending email                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/10/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

const int UNREACHABLE = -1;

struct Edge{
  int from;
  int to;
  int w;

  Edge(){}

  Edge(int _from, int _to, int _w){
    from = _from;
    to = _to;
    w = _w;
  }
};

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    int n, m, S, T;
    for( int testcase = 1 ; testcase <= N ; ++testcase ){
      scanf("%d%d%d%d", &n, &m, &S, &T);

      vector<int> shortestPath(n, UNREACHABLE);
      shortestPath[S] = 0;
      vector< vector<Edge> > nodeEdges = vector< vector<Edge> >(n, vector<Edge>());

      int a, b, w;
      for( int i = 0 ; i < m ; ++i ){
        scanf("%d%d%d", &a, &b, &w);
        nodeEdges[a].push_back( Edge(a, b, w) );
        nodeEdges[b].push_back( Edge(b, a, w) );
      }

      
      queue<int> next;
      vector<bool> inQueue(n, false);
      next.push(S);

      while( !next.empty() ){
        int current = next.front();
        next.pop();
        inQueue[current] = false;

        for( int i = 0 ; i < nodeEdges[current].size() ; ++i ){
          int toNode = nodeEdges[current][i].to;
          if( shortestPath[toNode] == UNREACHABLE || 
              shortestPath[current] + nodeEdges[current][i].w < shortestPath[toNode] ){
            shortestPath[toNode] = shortestPath[current] + nodeEdges[current][i].w;
            if( !inQueue[toNode] ){
              next.push(toNode);
              inQueue[toNode] = true;
            }
          }
        }
      }

      printf("Case #%d: ", testcase);
      if( shortestPath[T] == UNREACHABLE ){
        printf("unreachable\n");
      }
      else{
        printf("%d\n", shortestPath[T]);
      }
    }
  }

  return 0;
}
```
