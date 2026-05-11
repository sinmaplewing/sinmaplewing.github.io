---
id: 3505
title: '#UVa：821－Page Hopping'
slug: uva：821－page-hopping
date: '2018-05-15T19:41:56+08:00'
lastmod: '2018-05-15T19:58:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 8
- UVa
permalink: /2018/05/15/3505/uva%ef%bc%9a821%ef%bc%8dpage-hopping/
wp_status: publish
wp_type: post
---

利用計算 All-Pairs Shortest Path 的演算法（例如： Floyd-Warshall Algorithm）即可得解。

由於輸入的數字不一定連續，也不一定會從 0 或 1 開始，故要把它們做個編號，編成連續且從 0 開始的數字。

參考：<a href="https://sites.google.com/site/zsgititit/home/jin-jiec-cheng-shi-she-ji/uva-821-pagehopping-floyd">高中資訊科技概論教師黃建庭的教學網站 - uva-821-PageHopping-Floyd</a>

**C++(0.030)**
```cpp
/*******************************************************/
/* UVa 821 Page Hopping                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <algorithm>
#include <map>
using namespace std;

const int MAX_DISTANCE = 1e+6;
const int MAX_NODE = 105;

void addToNumberMap(map<int, int> &numberMap, int x){
  if(numberMap.find(x) == numberMap.end()){
    int size = numberMap.size();
    numberMap[x] = size;
  }
}

void findAllPairsShortestPath(int path[][105], int maxSize){
  for(int k = 0 ; k < maxSize ; ++k){
    for(int i = 0 ; i < maxSize ; ++i ){
      for(int j = 0 ; j < maxSize ; ++j ){
        path[i][j] = min(path[i][j], path[i][k] + path[k][j]);
      }
    }
  }
}

int main(){
  int caseNumber = 1;
  
  while(true){
    map<int, int> numberMap;
    
    int path[MAX_NODE][MAX_NODE] = {0};
    fill_n(&path[0][0], MAX_NODE * MAX_NODE, MAX_DISTANCE);
    for(int i = 0 ; i < MAX_NODE ; ++i ) path[i][i] = 0;
    
    int a, b;
    while(scanf("%d%d", &a, &b) != EOF &&
          a != 0 && b != 0){
      addToNumberMap(numberMap, a);
      addToNumberMap(numberMap, b);
      
      int aNumber = numberMap[a];
      int bNumber = numberMap[b];
      path[aNumber][bNumber] = 1;
    }
    
    if(numberMap.empty()){
      break;
    }
    
    int maxSize = numberMap.size();
    findAllPairsShortestPath(path, maxSize);
    
    int sum = 0;
    for(int i = 0 ; i < maxSize ; ++i){
      for(int j = 0 ; j < maxSize ; ++j ){
        sum += path[i][j];
      }
    }
    
    printf("Case %d: average length between pages = %.3lf clicks\n", caseNumber++, ((double)sum) / (maxSize * (maxSize - 1)));
  }
  
  return 0;
}
```
