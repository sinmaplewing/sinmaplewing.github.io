---
id: 3545
title: '#UVa：507－Jill Rides Again'
slug: uva：507－jill-rides-again
date: '2018-05-17T22:40:03+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2018/05/17/3545/uva%ef%bc%9a507%ef%bc%8djill-rides-again/
wp_status: publish
wp_type: post
---

找出最大連續和即可。從頭開始當作範圍的頭去加總，遇到總和變成負數之後將加總歸零再從此處當作範圍的頭開始加總，因為從此處歸零開始選會比包含前面加總的結果更好。整段做完的最後看哪段範圍總和最大、範圍最大且出現在比較前面即是答案。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 507 Jill Rides Again                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  int b;
  while(scanf("%d", &b) != EOF){
    for(int r = 1 ; r <= b ; ++r){
      int s;
      scanf("%d", &s);
      
      vector<int> routes;
      for(int i = 0 ; i < s - 1 ; ++i){
        int n;
        scanf("%d", &n);
        routes.push_back(n);
      }
      
      int i = -1, sum = 0;
      int maxI = -1, maxJ = -1, maxSum = 0;
      for(int j = 0 ; j < s - 1 ; ++j){
        sum += routes[j];
        if(i == -1) i = j;

        if(sum > maxSum || (sum == maxSum && j - i > maxJ - maxI)){
          maxSum = sum;
          maxI = i;
          maxJ = j;
        }
        
        if(sum < 0){
          sum = 0;
          i = -1;
        }
      }
      
      if(maxSum <= 0){
        printf("Route %d has no nice parts\n", r);
      }
      else{
        printf("The nicest part of route %d is between stops %d and %d\n", r, maxI+1, maxJ+2);
      }
    }
  }
  return 0;
}
```
