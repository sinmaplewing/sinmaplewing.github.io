---
id: 4963
title: '#UVa：544－Heavy Cargo'
slug: uva：544－heavy-cargo
date: '2020-05-13T02:42:58+08:00'
lastmod: '2020-06-15T00:05:22+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2020/05/13/4963/uva%ef%bc%9a544%ef%bc%8dheavy-cargo/
wp_status: publish
wp_type: post
---

此題要找出從 A 城市到 B 城市最大的承重量為多少，而每次從某城市到另外一個城市的最大承重量為到該起點城市的最大承重量與到另外一個城市的道路承重量取最小值。

利用這樣的特性，可以使用 Dijkstra 最短路徑演算法去變化求解，每次可找更新一次最大承重量的城市中最大的繼續往下找。之所以可以找最大的是因為該城市不會有比目前更大的可能性，因為其他目前有更新的人的值都比它小。若沒有此特性，則無法使用 Dijkstra，就得使用 Bellman-Ford 最短路徑演算法或 SPFA。（要直接使用這兩種演算法亦可）

注意輸入的倒路可能會有重複的起點城市和終點城市的組合，僅留其中最大的承重量的道路即可。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 544 Heavy Cargo                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/13                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
#include <map>
#include <vector>
using namespace std;

const int UNKNOWN_MAX_WEIGHT = -1;

struct City {
  string name;
  map<string, int> edges;
  int maxWeight;
  bool isVisited;
};

int findMaxWeight(
  map<string, City>& roadMap, 
  const string& sourceCityName, 
  const string& targetCityName
) {
  City* currentCity = &(roadMap[sourceCityName]);
  currentCity->maxWeight = INT_MAX;
  do {
    currentCity->isVisited = true;

    City* nextCity = NULL;
    for (
      map<string, City>::iterator it = roadMap.begin() ;
      it != roadMap.end() ;
      ++it
    ) {
      City* city = &(it->second);
      if (currentCity->edges.find(city->name) != currentCity->edges.end()) {
        int edgeMaxWeight = currentCity->edges[city->name];
        int maxWeight = min(currentCity->maxWeight, edgeMaxWeight);

        if (maxWeight > city->maxWeight) {
          city->maxWeight = maxWeight;
        }
      }
      
      if (
        !city->isVisited && 
        (nextCity == NULL || city->maxWeight > nextCity->maxWeight)
      ) {
        nextCity = city;
      }
    }

    currentCity = nextCity;
  } while (currentCity != NULL && currentCity->maxWeight != UNKNOWN_MAX_WEIGHT);

  return roadMap[targetCityName].maxWeight;
}

int main() {
  int n, r;
  int caseNumber = 1;
  while (scanf("%d%d", &n, &r) != EOF && n != 0 && r != 0) {
    map<string, City> roadMap;

    for (int i = 0 ; i < r ; ++i) {
      string sourceCityName, targetCityName;
      int maxWeight;
      cin >> sourceCityName >> targetCityName >> maxWeight;

      if (roadMap.find(sourceCityName) == roadMap.end()) {
        roadMap[sourceCityName] = (City){
          sourceCityName, map<string, int>(), UNKNOWN_MAX_WEIGHT
        };
      }

      if (roadMap.find(targetCityName) == roadMap.end()) {
        roadMap[targetCityName] = (City){
          targetCityName, map<string, int>(), UNKNOWN_MAX_WEIGHT
        };
      }

      int* sourceToTargetMaxWeightPtr = &roadMap[sourceCityName].edges[targetCityName];
      int* targetToSourceMaxWeightPtr = &roadMap[targetCityName].edges[sourceCityName];
      *sourceToTargetMaxWeightPtr = max(*sourceToTargetMaxWeightPtr, maxWeight);
      *targetToSourceMaxWeightPtr = max(*targetToSourceMaxWeightPtr, maxWeight);
    }

    string sourceCityName, targetCityName;
    cin >> sourceCityName >> targetCityName;
    printf(
      "Scenario #%d\n%d tons\n\n", 
      caseNumber++, 
      findMaxWeight(roadMap, sourceCityName, targetCityName)
    );
  }
  return 0;
}
```
