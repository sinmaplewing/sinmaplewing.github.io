---
id: 3494
title: '#UVa：10583－Ubiquitous Religions'
slug: uva：10583－ubiquitous-religions
date: '2018-05-14T20:05:48+08:00'
lastmod: '2018-05-15T19:59:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2018/05/14/3494/uva%ef%bc%9a10583%ef%bc%8dubiquitous-religions/
wp_status: publish
wp_type: post
---

先讓大家每個人各自是不同的 Group ，再透過兩人兩人相同的關係讓他們變成同樣的 Group ，再計算總共有幾個不同的 Group 即可得解。

作法參考：[Programming學習筆記－UVa 10583 Ubiquitous Religions](http://programming-study-notes.blogspot.tw/2014/03/uva-10583-ubiquitous-religions.html)

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 10583 Ubiquitous Religions                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
using namespace std;

int findRootGroup(vector<int> &groups, int x){
  if(x == groups[x]){
    return x;
  }
  
  return groups[x] = findRootGroup(groups, groups[x]);
}

bool unionGroups(vector<int> &groups, int x, int y){
  int rootX = findRootGroup(groups, x);
  int rootY = findRootGroup(groups, y);
  
  if(rootX == rootY){
    return false;
  }
  
  groups[rootX] = groups[rootY];
  return true;
}

int main(){
  int caseNumber = 1;
  int n, m;
  while(scanf("%d%d", &n, &m) != EOF &&
      n != 0 && m != 0){
    vector<int> groups(n+1, 0);
    for(int i = 1 ; i <= n ; ++i){
      groups[i] = i;
    }
    
    int groupCount = n;
    for(int religionCase = 0 ; religionCase < m ; ++religionCase){
      int i, j;
      scanf("%d%d", &i, &j);
      
      if(unionGroups(groups, i, j)) --groupCount;
    }
     
     printf("Case %d: %d\n", caseNumber++, groupCount);
  }
  
  return 0;
}
```
