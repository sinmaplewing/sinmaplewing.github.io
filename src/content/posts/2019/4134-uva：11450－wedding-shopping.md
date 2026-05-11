---
id: 4134
title: '#UVa：11450－Wedding shopping'
slug: uva：11450－wedding-shopping
date: '2019-03-30T17:03:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 114
- UVa
permalink: /2019/03/30/4134/uva%ef%bc%9a11450%ef%bc%8dwedding-shopping/
wp_status: publish
wp_type: post
---

利用 DP 中的背包問題方式變化去解，就是對於每一項本來要放入背包的部分變成每一項有不同重量可以放入，並且要找全部都有放入的情況才是解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11450 Wedding shopping                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int N;
  while(scanf("%d", &N) != EOF){
    for(int caseNumber = 1; caseNumber <= N ; ++caseNumber){
      int M, C;
      scanf("%d%d", &M, &C);

      vector<vector<int>> garmentModels(C + 1);
      for(int i = 1 ; i <= C ; ++i){
        int K;
        scanf("%d", &K);

        garmentModels[i] = vector<int>(K);
        for (int j = 0; j < K; ++j){
          scanf("%d", &garmentModels[i][j]);
        }
      }

      vector<vector<bool>> dp(C + 1, vector<bool>(M + 1, false));
      dp[0][0] = true;
      for (int garmentIndex = 1 ; garmentIndex <= C ; ++garmentIndex){
        for(int space = 0 ; space <= M ; ++space){
          for(int itemIndex = 0 ; itemIndex < garmentModels[garmentIndex].size() ; ++itemIndex){
            if (space - garmentModels[garmentIndex][itemIndex] >= 0 &&
              dp[garmentIndex - 1][space - garmentModels[garmentIndex][itemIndex]]){
              dp[garmentIndex][space] = true;
            }
          }
        }
      }

      bool hasSolution = false;
      for(int space = M ; space >= 0 ; --space){
        if(dp[C][space]){
          printf("%d\n", space);
          hasSolution = true;
          break;
        }
      }

      if(!hasSolution) printf("no solution\n");
    }
  }
  return 0;
}
```
