---
id: 4922
title: '#UVa：10763－Foreign Exchange'
slug: uva：10763－foreign-exchange
date: '2020-05-07T01:00:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 107
- UVa
permalink: /2020/05/07/4922/uva%ef%bc%9a10763%ef%bc%8dforeign-exchange/
wp_status: publish
wp_type: post
---

建表紀錄兩地之間交換的學生個數，最後確認每個 A 地到 B 地的學生個數和 B 地到 A 地的學生個數相同即可。

**C++(0.230)**
```cpp
/*******************************************************/
/* UVa 10763 Foreign Exchange                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

struct Edge {
  int originalLocation;
  int targetLocation;

  bool operator<(const Edge& edge) const {
    return (originalLocation < edge.originalLocation) ||
      (originalLocation == edge.originalLocation && 
      targetLocation < edge.targetLocation);
  }
};

int main() {
  int n;
  while (scanf("%d", &n) != EOF && n != 0) {
    map<Edge, int> edgeCount;
    for (int i = 0 ; i < n ; ++i) {
      Edge edge;
      scanf("%d%d", &(edge.originalLocation), &(edge.targetLocation));
      ++edgeCount[edge];
    }

    if (n % 2 == 1) {
      printf("NO\n");
      continue;
    }

    bool isValid = true;
    for (
      map<Edge, int>::iterator it = edgeCount.begin() ;
      it != edgeCount.end() ;
      ++it
    ) {
      Edge reverseEdge = { it->first.targetLocation, it->first.originalLocation };
      if (edgeCount[reverseEdge] != it->second) {
        isValid = false;
        break;
      }
    }

    printf("%s\n", isValid ? "YES" : "NO");
  }
  
  return 0;
}
```
