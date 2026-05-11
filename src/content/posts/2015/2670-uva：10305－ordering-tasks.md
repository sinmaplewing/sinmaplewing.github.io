---
id: 2670
title: '#UVa：10305－Ordering Tasks'
slug: uva：10305－ordering-tasks
date: '2015-01-14T22:55:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2015/01/14/2670/uva%ef%bc%9a10305%ef%bc%8dordering-tasks/
wp_status: publish
wp_type: post
---

做拓樸排序即可。可以先計算每個工作的前置工作有幾個，以及每個工作完成後會影響到可以做哪些工作，接著找出目前前置工作為零的工作找出來輸出，然後將其會影響到地工作的前置工作數減一，重複這個動作即可得解。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 10305 Ordering Tasks                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

struct Task{
  bool isdone;
  int preTaskCount;
  vector<int> afterTasks;

  Task(){
    preTaskCount = 0;
    isdone = false;
  }
};

int main(){
  int n, m;
  while( scanf("%d%d", &n, &m) != EOF ){
    Task tasks[105];

    for( int line = 0 ; line < m ; ++line ){
      int i, j;
      scanf("%d%d", &i, &j);
      ++(tasks[j].preTaskCount);
      tasks[i].afterTasks.push_back(j);
    }

    for( int printedCount = 0 ; printedCount < n ; ){
      if( printedCount > 0 ) printf(" ");

      bool isFindOneJob = false;
      for( int i = 1 ; !isFindOneJob ; i = i % n + 1 ){
        if( !(tasks[i].isdone) && tasks[i].preTaskCount == 0 ){
          printf("%d", i);
          tasks[i].isdone = true;

          for( int j = 0 ; j < tasks[i].afterTasks.size() ; ++j ){
            --(tasks[tasks[i].afterTasks[j]].preTaskCount);
          }
          ++printedCount;
          isFindOneJob = true;
        }
      }
    }
    printf("\n");
  }
  return 0;
}
```
