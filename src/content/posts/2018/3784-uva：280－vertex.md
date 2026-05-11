---
id: 3784
title: '#UVa：280－Vertex'
slug: uva：280－vertex
date: '2018-10-10T01:41:57+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2018/10/10/3784/uva%ef%bc%9a280%ef%bc%8dvertex/
wp_status: publish
wp_type: post
---

利用 DFS 遍歷整個圖即可。

P.S. 起始點在剛開始不算可以到的了的點，除非在遍歷中能夠經過它才算數。

**C++(0.090)**
```cpp
/*******************************************************/
/* UVa 280 Vertex                                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/10                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int dfs(const vector<vector<int>> &edges, vector<int> &isVisited, int startVertex){ 
  int visitVertexCount = 0;
  for(int i = 0 ; i < edges[startVertex].size() ; ++i){
    int endVertex = edges[startVertex][i];
    if(!isVisited[endVertex]){
      isVisited[endVertex] = true;
      ++visitVertexCount;
      visitVertexCount += dfs(edges, isVisited, endVertex);
    }
  }
  return visitVertexCount;
}

int main(){
  int n;
  while(scanf("%d", &n) != EOF && n != 0){
    vector<vector<int>> edges(n+1);
    int edgeStartVertex;
    while(scanf("%d", &edgeStartVertex) != EOF && edgeStartVertex != 0){
      int edgeEndVertex;
      while(scanf("%d", &edgeEndVertex) != EOF && edgeEndVertex != 0){
        edges[edgeStartVertex].push_back(edgeEndVertex);
      }
    }

    int startVertexCount;
    scanf("%d", &startVertexCount);
    for(int i = 0 ; i < startVertexCount ; ++i){
      int startVertex;
      scanf("%d", &startVertex);
      vector<int> isVisited(n+1, false);
      int inaccessibleVertexCount = n - dfs(edges, isVisited, startVertex);
      
      printf("%d", inaccessibleVertexCount);
      for(int i = 1 ; i <= n ; ++i){
        if(!isVisited[i]) printf(" %d", i);
      }
      printf("\n");
    }
  }
  return 0;
}
```
