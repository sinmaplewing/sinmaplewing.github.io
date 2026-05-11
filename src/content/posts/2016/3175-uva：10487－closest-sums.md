---
id: 3175
title: '#UVa：10487－Closest Sums'
slug: uva：10487－closest-sums
date: '2016-08-02T08:06:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2016/08/02/3175/uva%ef%bc%9a10487%ef%bc%8dclosest-sums/
wp_status: publish
wp_type: post
---

將數字兩兩相加看看哪對離所求之數字最近即是解。

P.S. 其實最後搜尋部分可用二分搜尋加速，不過這題的數量小可以不用。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 10487 Closest Sums                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/08/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
#include <algorithm>
using namespace std;

int main(){
  int n;
  int testcase = 1;
  while( scanf("%d", &n) != EOF && n != 0 ){
    int num[1005];
    for( int i = 0 ; i < n ; ++i ){
      scanf("%d", &num[i]);
    }
    sort(num, num+n);

    int m;
    scanf("%d", &m);

    printf("Case %d:\n", testcase++);
    int query;
    for( int i = 0 ; i < m ; ++i ){
      scanf("%d", &query);

      int closetSum = num[0] + num[1];
      for( int j = 0 ; j < n ; ++j ){
        for( int k = j+1 ; k < n ; ++k ){
          int sum = num[j] + num[k];
          if( abs( sum - query ) < abs( closetSum - query ) ){
            closetSum = sum;
          }
          else if( sum - query > abs(closetSum - query) ){
            break;
          }
        }
      }

      printf("Closest sum to %d is %d.\n", query, closetSum);
    }


  }

  return 0;
}
```
