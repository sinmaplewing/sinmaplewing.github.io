---
id: 3638
title: '#UVa：10943－How do you add?'
slug: uva：10943－how-do-you-add
date: '2018-09-29T19:16:24+08:00'
lastmod: '2018-09-29T22:13:12+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2018/09/29/3638/uva%ef%bc%9a10943%ef%bc%8dhow-do-you-add/
wp_status: publish
wp_type: post
---

排列組合的問題，此題可以將它轉換成有 N 個 1 與 (K - 1) 個加號的排序有幾種問題。

舉個例子，如果今天是 `7 3` 的話，就是有 7 個 1 和 2 個加號排序。
1. 假設我這樣排：`111+11+11` 表示的就是 `3+2+2`。
2. 如果我這樣排：`+1111+111` 則表示 `0+4+3`。
3. 如果我這樣排：`11++11111` 則表示 `2+0+5`。

故只要計算這樣排序有幾種可能就會是答案了。想法就是從這 N + (K - 1) 個位置中取 (K - 1) 個位置做為加號(或者你要取 N 個位置為 1 也可以啦XD")，答案就是[latex] C^{N+(K-1)}_{K-1} [/latex]。

P.S. 建議因為題目沒有輸入的數量限制，所以先建好排列組合表去輸出比較快，建法可以用排列組合的 DP 建法(帕斯卡三角形)去建：[latex] C^{i}\_{j} = C^{i-1}\_{j-1} + C^{i-1}\_{j} [/latex]。

**C++(0.000)**
```
/*******************************************************/
/* UVa 10943 How do you add?                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  const long long int LIMIT_NUMBER = 1000000;
  long long int combinationTable[205][205] = {0}; 
  combinationTable[0][0] = 1;
  for(int i = 1 ; i <= 200 ; ++i){
    combinationTable[i][0] = 1;
    for(int j = 1 ; j <= i ; ++j){
      combinationTable[i][j] = (combinationTable[i-1][j-1] + combinationTable[i-1][j]) % LIMIT_NUMBER;
    }
  }

  int N, K;
  while(scanf("%d%d", &N, &K) != EOF && N != 0 && K != 0){
    printf("%lld\n", combinationTable[N + K - 1][K - 1]);
  }
  return 0;
}
```
