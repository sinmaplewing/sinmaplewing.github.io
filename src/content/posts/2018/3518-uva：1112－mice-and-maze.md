---
id: 3518
title: '#UVa：1112－Mice and Maze'
slug: uva：1112－mice-and-maze
date: '2018-05-16T09:38:01+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 11
permalink: /2018/05/16/3518/uva%ef%bc%9a1112%ef%bc%8dmice-and-maze/
wp_status: publish
wp_type: post
---

將輸入的邊反過來，從終點求對每個點的最短路徑（可用 SPFA ），再計算有哪些點所耗費的時間在 T 以內即可得解。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 1112 Mice and Maze                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

const int MAX_DISTANCE = 1e+6;

struct Edge{
  int from;
  int to;
  int timeCost;
};

void getShortestPath(int startPoint, const vector<vector<Edge>> &edges, vector<int> &shortestPath){
  queue<int> checkPoint;
  vector<bool> inQueue(shortestPath.size(), false);
  checkPoint.push(startPoint);
  
  while(!checkPoint.empty()){
    int currentPoint = checkPoint.front();
    checkPoint.pop();
    inQueue[currentPoint] = false;
    
    for(int i = 0 ; i < edges[currentPoint].size() ; ++i){
      Edge edge = edges[currentPoint][i];
      if(shortestPath[edge.from] + edge.timeCost < shortestPath[edge.to]){
        shortestPath[edge.to] = shortestPath[edge.from] + edge.timeCost;
        if(!inQueue[edge.to]){
          checkPoint.push(edge.to);
          inQueue[edge.to] = true;
        }
      }
    }
  }
}

int main(){
  int caseCount;
  while(scanf("%d", &caseCount) != EOF){
    for(int caseNumber = 0 ; caseNumber < caseCount ; ++caseNumber){
      int N, E, T, M;
      scanf("%d%d%d%d", &N, &E, &T, &M);
      
      vector<vector<Edge>> edges(N+5, vector<Edge>());
      for(int i = 0 ; i < M ; ++i){
        Edge edge;
        scanf("%d%d%d", &edge.to, &edge.from, &edge.timeCost);
        edges[edge.from].push_back(edge);
      }
      
      vector<int> shortestPathFromExit(N+5, MAX_DISTANCE);
      shortestPathFromExit[E] = 0;
      getShortestPath(E, edges, shortestPathFromExit);
      
      int mouseCount = 0;
      for(int i = 1 ; i <= N ; ++i){
        if(shortestPathFromExit[i] <= T){
          ++mouseCount;
        }
      }    
      
      if(caseNumber > 0) printf("\n");
      printf("%d\n", mouseCount);
    }
  }
  return 0;
}
```

