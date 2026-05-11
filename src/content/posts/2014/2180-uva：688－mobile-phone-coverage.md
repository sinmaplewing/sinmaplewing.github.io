---
id: 2180
title: '#UVa：688－Mobile Phone Coverage'
slug: uva：688－mobile-phone-coverage
date: '2014-09-26T20:07:35+08:00'
lastmod: '2014-12-31T22:51:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2014/09/26/2180/uva%ef%bc%9a688%ef%bc%8dmobile-phone-coverage/
wp_status: publish
wp_type: post
---

可以用這樣的想法來思考，先將整個範圍用一個長方形包起來，接著在每個節點處對於這個長方形畫出其平行於x軸與y軸的兩條線切出長方形，再看看這些長方形有沒有存在於任何一個所給予的長方形內，如果有的話就將之面積加總起來，則就會是答案！

**C++(0.049)**
```cpp
/*******************************************************/
/* UVa 688 Mobile Phone Coverage                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/09/26                                 */
/*******************************************************/
#include <iostream>
#include <algorithm>
#include <cstdio>
using namespace std;

const int N = 105;

int main(){
  int n, seq = 1;
  while( scanf( "%d", &n ) != EOF && n != 0 ){
    double rect[N][3] = {0};
    double x[2*N], y[2*N] = {0};

    for( int i = 0 ; i < n ; ++i ){
      scanf( "%lf%lf%lf", &rect[i][0], &rect[i][1], &rect[i][2] );
      x[i*2] = rect[i][0] - rect[i][2];
      x[i*2+1] = rect[i][0] + rect[i][2];
      y[i*2] = rect[i][1] - rect[i][2];
      y[i*2+1] = rect[i][1] + rect[i][2];
    }

    sort(x, x+2*n);
    sort(y, y+2*n);

    double sum = 0;
    for( int i = 0 ; i < 2*n-1 ; ++i ){
      for( int j = 0 ; j < 2*n-1 ; ++j ){
        for( int k = 0 ; k < n ; ++k ){
          if( rect[k][0] - rect[k][2] <= x[i] && rect[k][0] + rect[k][2] >= x[i+1] && 
              rect[k][1] - rect[k][2] <= y[j] && rect[k][1] + rect[k][2] >= y[j+1] ){
            sum += (x[i+1]-x[i]) * (y[j+1]-y[j]);
            break;
          }
        }
      }
    }

    printf("%d %.2lf\n", seq++, sum);
  }
  return 0;
}
```
