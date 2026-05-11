---
id: 4164
title: '#UVa：11991－Easy Problem from Rujia Liu?'
slug: uva：11991－easy-problem-from-rujia-liu
date: '2019-04-01T08:43:19+08:00'
lastmod: '2019-04-01T08:44:06+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 119
- UVa
permalink: /2019/04/01/4164/uva%ef%bc%9a11991%ef%bc%8deasy-problem-from-rujia-liu/
wp_status: publish
wp_type: post
---

在輸入數字陣列時就先建表成到時候要查詢時的樣子，接著就是給答案即可。

**C++(0.040)**
```cpp
/*******************************************************/
/* UVa 11991 Easy Problem from Rujia Liu?              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/01                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <map>
#include <vector>
using namespace std;

int main(){
  int n, m;
  while(scanf("%d%d", &n, &m) != EOF){
    map<int, vector<int>> occurrence;
    for(int i = 0 ; i < n ; ++i){
      int number;
      scanf("%d", &number);

      if (occurrence.find(number) == occurrence.end())
      {
        occurrence[number] = vector<int>();
      }
      occurrence[number].push_back(i+1);
    }

    for(int i = 0 ; i < m ; ++i){
      int k, v;
      scanf("%d%d", &k, &v);

      if(occurrence.find(v) == occurrence.end() ||
        occurrence[v].size() < k){
        printf("0\n");
        continue;
      }

      printf("%d\n", occurrence[v][k-1]);
    }
  }
  return 0;
}
```
