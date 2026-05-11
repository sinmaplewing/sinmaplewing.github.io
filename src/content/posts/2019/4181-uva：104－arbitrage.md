---
id: 4181
title: '#UVa：104－Arbitrage'
slug: uva：104－arbitrage
date: '2019-04-02T10:39:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2019/04/02/4181/uva%ef%bc%9a104%ef%bc%8darbitrage/
wp_status: publish
wp_type: post
---

利用動態規劃(DP)去建表求解，令 `dp[t][i][j]` 為從第 i 種貨幣經過 t 次轉換換成第 j 種貨幣可得到的匯率，則對於每一次的轉換就從前一次的轉換中間再尋找一種貨幣去經過它再轉過來看看有沒有比較多錢，也就是 `dp[t][i][j] = max(dp[t-1][i][k] * conversion[k][j]), k = 1 ~ n`，接著再從表中找到自己轉自己花最少 t 次且大於原本 10% 的次數是什麼就可以回推得解。

**C++(0.020)**
```cpp
/*******************************************************/
/* UVa 104 Arbitrage                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

void printPath(vector<vector<vector<int>>> &paths, int t, int i, int j){
  if(t == 0){
    printf("%d %d", i + 1, j + 1);
    return;
  }

  printPath(paths, t-1, i, paths[t][i][j]);
  printf(" %d", j + 1);
}

int main(){
  int n;
  while(scanf("%d", &n) != EOF){
    vector<vector<double>> conversionTable(n, vector<double>(n, 0));
    for(int i = 0 ; i < n ; ++i){
      for(int j = 0 ; j < n ; ++j){
        if(i == j){
          conversionTable[i][j] = 1;
          continue;
        }
        scanf("%lf", &conversionTable[i][j]);
      }
    }

    vector<vector<vector<double>>> values(n, vector<vector<double>>(n, vector<double>(n)));
    vector<vector<vector<int>>> paths(n, vector<vector<int>>(n, vector<int>(n, -1)));    
    values[0] = conversionTable;

    int item = -1, itemT = -1;
    for(int t = 1 ; t < n && item == -1 ; ++t){
      for(int i = 0 ; i < n && item == -1 ; ++i){
        for(int j = 0 ; j < n && item == -1 ; ++j){
          values[t][i][j] = -1.0;
          for(int k = 0 ; k < n ; ++k ){
            double newRate = values[t-1][i][k] * conversionTable[k][j];
            if(newRate > values[t][i][j]){
              values[t][i][j] = newRate;
              paths[t][i][j] = k;
            }
          }
        }

        if(values[t][i][i] > 1.01){
          item = i;
          itemT = t;
          break;
        }
      }
    }

    if(item == -1){
      printf("no arbitrage sequence exists\n");
      continue;
    }

    printPath(paths, itemT, item, item);
    printf("\n");
  }
  return 0;
}
```
