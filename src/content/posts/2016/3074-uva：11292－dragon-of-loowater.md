---
id: 3074
title: '#UVa：11292－Dragon of Loowater'
slug: uva：11292－dragon-of-loowater
date: '2016-04-20T02:26:23+08:00'
lastmod: '2016-04-20T02:29:25+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 112
- UVa
permalink: /2016/04/20/3074/uva%ef%bc%9a11292%ef%bc%8ddragon-of-loowater/
wp_status: publish
wp_type: post
---

將龍的頭高和騎士身高從小到大排好，由於一個騎士只能砍一個龍頭，所以就在兩個排序好的數列一個一個對讓龍頭給最矮能夠砍它的騎士砍即是答案。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11292 Dragon of Loowater                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int main(){
  int n, m;
  while( scanf("%d%d", &n, &m) != EOF && n != 0 && m != 0 ){
    vector<int> dragonHeads(n);
    vector<int> knightHeights(m);

    for( int i = 0 ; i < n ; ++i ){
      scanf("%d", &dragonHeads[i]);
    }

    for( int i = 0 ; i < m ; ++i ){
      scanf("%d", &knightHeights[i]);
    }

    sort(dragonHeads.begin(), dragonHeads.end());
    sort(knightHeights.begin(), knightHeights.end());

    int cost = 0;
    int i, j;
    for( i = 0, j = 0 ;
         i < dragonHeads.size() && j < knightHeights.size() ; ){
      if( dragonHeads[i] <= knightHeights[j] ){
        cost += knightHeights[j];
        ++i;
        ++j;
      }
      else {
        ++j;
      }
    }

    if( i != dragonHeads.size() ){
      printf("Loowater is doomed!\n");
    }
    else{
      printf("%d\n", cost);
    }

  }
  return 0;
}
```
