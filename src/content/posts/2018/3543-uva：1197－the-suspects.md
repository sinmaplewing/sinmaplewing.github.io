---
id: 3543
title: '#UVa：1197－The Suspects'
slug: uva：1197－the-suspects
date: '2018-05-17T10:32:57+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 11
permalink: /2018/05/17/3543/uva%ef%bc%9a1197%ef%bc%8dthe-suspects/
wp_status: publish
wp_type: post
---

利用 DFS 檢查從 0 號學生開始可以連到多少學生即可得解。建圖時，每個群組可以將群組裡面的其他學生全部連到群組中的特定學生（例如：第一個學生）即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 1197 The Suspects                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int getDFSNodeCount(const vector<vector<int>> &graph, vector<bool> &isVisited, int startPoint){
  isVisited[startPoint] = true;
  
  int count = 1;
  for(int i = 0 ; i < graph[startPoint].size() ; ++i){
    if(!isVisited[graph[startPoint][i]]){
      count += getDFSNodeCount(graph, isVisited, graph[startPoint][i]);
    }
  }
  
  return count;
}

int main(){
  int n, m;
  while(scanf("%d%d", &n, &m) != EOF &&
        (n != 0 || m != 0)){
    
    vector<vector<int>> studentConnectGraph(n, vector<int>());
    for(int i = 0 ; i < m ; ++i){
      int k;
      scanf("%d", &k);
      
      int rootStudent = 0;
      for(int j = 0 ; j < k ; ++j){
        int currentStudent;
        scanf("%d", &currentStudent);
        
        if(j == 0){
          rootStudent = currentStudent;
          continue;
        }
        studentConnectGraph[rootStudent].push_back(currentStudent);
        studentConnectGraph[currentStudent].push_back(rootStudent);
        rootStudent = currentStudent;
      }
    }
    
    vector<bool> isVisited(n, false);
    printf("%d\n", getDFSNodeCount(studentConnectGraph, isVisited, 0));  
  }
  return 0;
}
```
