---
id: 1465
title: '#UVa：102－Ecological Bin Packing'
slug: uva：102－ecological-bin-packing
date: '2012-03-14T08:00:50+08:00'
lastmod: '2020-08-28T02:18:26+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
- Brute-Force Search
permalink: /2012/03/14/1465/uva%ef%bc%9a102%ef%bc%8decological-bin-packing/
wp_status: publish
wp_type: post
---

## 題目大綱
題目會給予三個桶子中，每個桶子含有棕色（Brown）、綠色（Green）、透明色（Clear）玻璃瓶的數量。現在要搬移這些玻璃瓶，讓每個桶子都只有單一個顏色的玻璃瓶，則最小搬移的次數為何。

## 測試資料

### 輸入資料
```
1 2 3 4 5 6 7 8 9
5 10 5 20 10 5 10 20 10
```

### 輸出資料
```
BCG 30
CBG 50
```

## 題目網址
[UVa Online Judge](https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=38)

## 解法思考

硬爆，把每一種組合都算過比出最小的即可。

## 解法程式碼

### C++ (0.010s)
```cpp
/*******************************************************/
/* UVa 102 Ecological Bin Packing                      */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/14                                 */
/* Modified at 2020/08/27                              */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const string ANSWERS[] = { 
  "BCG", "BGC", "CBG", "CGB", "GBC", "GCB"
};

int main() {
  int brown[5], green[5], clear[5];
  while (scanf("%d", &brown[0]) != EOF) {
    scanf("%d%d%d%d%d%d%d%d", &green[0], &clear[0], 
      &brown[1], &green[1], &clear[1], 
      &brown[2], &green[2], &clear[2]);

    int move[10] = { 0 };
    move[0] = brown[1] + brown[2] + green[0] + green[1] + clear[0] + clear[2];
    move[1] = brown[1] + brown[2] + green[0] + green[2] + clear[0] + clear[1];
    move[2] = brown[0] + brown[2] + green[0] + green[1] + clear[1] + clear[2];
    move[3] = brown[0] + brown[1] + green[0] + green[2] + clear[1] + clear[2];
    move[4] = brown[0] + brown[2] + green[1] + green[2] + clear[0] + clear[1];
    move[5] = brown[0] + brown[1] + green[1] + green[2] + clear[0] + clear[2];

    int minIndex = 0;
    for (int i = 1 ; i < 6 ; i++) {
      if (move[i] < move[minIndex]) {
        minIndex = i;
      }
    }
    printf("%s %d\n", ANSWERS[minIndex].c_str(), move[minIndex]);
  }
  return 0;
}
```
