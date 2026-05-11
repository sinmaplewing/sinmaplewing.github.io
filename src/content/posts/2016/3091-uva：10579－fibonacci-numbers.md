---
id: 3091
title: '#UVa：10579－Fibonacci Numbers'
slug: uva：10579－fibonacci-numbers
date: '2016-04-20T09:17:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 105
- UVa
permalink: /2016/04/20/3091/uva%ef%bc%9a10579%ef%bc%8dfibonacci-numbers/
wp_status: publish
wp_type: post
---

大數加法配合DP加速。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10579 Fibonacci Numbers                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main(){
  vector< vector<int> > dp( 3, vector<int>(1, 0) );
  dp[1][0] = 1;
  dp[2][0] = 1;

  int n;
  while( scanf("%d", &n) != EOF ){
    if( n >= dp.size() ){
      for( int i = dp.size() ; i <= n ; ++i ){
        dp.push_back( vector<int>(dp[i-1].size(), 0) );
        for( int j = 0 ; j < dp[i-2].size() ; ++j ){
          dp[i][j] += dp[i-1][j] + dp[i-2][j];
          if( j + 1 >= dp[i].size() && dp[i][j] / 10 > 0){
            dp[i].push_back(dp[i][j] / 10);
          }
          else if( dp[i][j] / 10 ){
            dp[i][j+1] += dp[i][j] / 10;
          }
          dp[i][j] %= 10;
        }
        if( dp[i-1].size() > dp[i-2].size() ){
          for( int j = dp[i-2].size() ; j < dp[i-1].size() ; ++j ){
            dp[i][j] += dp[i-1][j];
            if( j + 1 >= dp[i].size() && dp[i][j] / 10 > 0){
              dp[i].push_back(dp[i][j] / 10);
            }
            else if( dp[i][j] / 10 ){
              dp[i][j+1] += dp[i][j] / 10;
            }
            dp[i][j] %= 10;
          }
        }
      }
    }

    for( int i = dp[n].size() - 1 ; i >= 0 ; --i ){
      printf("%d", dp[n][i]);
    }
    printf("\n");
  }
  return 0;
}
```
