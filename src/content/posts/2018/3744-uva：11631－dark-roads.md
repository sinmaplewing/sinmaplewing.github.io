---
id: 3744
title: '#UVa：11631－Dark roads'
slug: uva：11631－dark-roads
date: '2018-10-04T21:57:49+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2018/10/04/3744/uva%ef%bc%9a11631%ef%bc%8ddark-roads/
wp_status: publish
wp_type: post
---

找出最小生成樹後，將不在最小生成樹上的邊的花費總和即是省下來的錢。

**參考解法：**[演算法筆記](http://www.csie.ntnu.edu.tw/~u91029/SpanningTree.html#2)

**C++(0.130)**
```cpp
/*******************************************************/
/* UVa 11631 Dark roads                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/04                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge{
  int start;
  int end;
  int cost;
};

bool edgeCompare(const Edge& a, const Edge& b){
  return a.cost < b.cost;
}

int findRoot(vector<int>& group, int x){
  if(x == group[x]) return x;
  return group[x] = findRoot(group, group[x]);
}

int main(){
  int m, n;
  while(scanf("%d%d", &m, &n) != EOF && m != 0 && n != 0){
    vector<int> group(m);
    for(int i = 0 ; i < m ; ++i){
      group[i] = i;
    }

    vector<Edge> edges(n);
    for(int i = 0 ; i < n ; ++i){
      scanf("%d%d%d", &(edges[i].start), &(edges[i].end), &(edges[i].cost));
    }

    sort(edges.begin(), edges.end(), edgeCompare);
    int totalSave = 0;
    for(int i = 0 ; i < n ; ++i ){
      if(findRoot(group, edges[i].start) == findRoot(group, edges[i].end)){
        totalSave += edges[i].cost;
        continue;
      }

      group[findRoot(group, edges[i].start)] = findRoot(group, edges[i].end);
    }

    printf("%d\n", totalSave);
  }
  return 0;
}
```
