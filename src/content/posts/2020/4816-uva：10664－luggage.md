---
id: 4816
title: '#UVa：10664－Luggage'
slug: uva：10664－luggage
date: '2020-04-16T02:01:26+08:00'
lastmod: '2020-04-16T02:02:24+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2020/04/16/4816/uva%ef%bc%9a10664%ef%bc%8dluggage/
wp_status: publish
wp_type: post
---

利用 0/1 背包問題的解法來解，找出一個行李箱可以裝的所有重量可能性，看看能不能裝出總和重量的一半，如果可以那就是 `YES`，不行就是 `NO`。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10664 Luggage                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <sstream>
#include <vector>
using namespace std;

int main(){
  int m;
  while(scanf("%d ", &m) != EOF){
    for(int caseNumber = 1 ; caseNumber <= m ; ++caseNumber){
      string input;
      getline(cin, input);
      
      stringstream ss(input);
      vector<int> weights;
      int sum = 0;
      
      int weight;
      while(ss >> weight){
        weights.push_back(weight);
        sum += weight;
      }
      
      if(sum % 2 == 1){
        printf("NO\n");
        continue;
      }
      
      vector<bool> isOneBootPossibleLoadWeight(sum + 1, false);
      isOneBootPossibleLoadWeight[0] = true;
      for(int i = 0 ; i < weights.size() ; ++i){
        for(int j = sum ; j >= weights[i] ; --j){
          if(isOneBootPossibleLoadWeight[j - weights[i]]){
            isOneBootPossibleLoadWeight[j] = true;
          }
        }
      }
      
      printf("%s\n", (isOneBootPossibleLoadWeight[sum / 2] ? "YES" : "NO"));
    }
  }
  return 0;
}
```
