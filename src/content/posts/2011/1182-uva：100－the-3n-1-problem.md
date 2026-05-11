---
id: 1182
title: '#UVa：100－The 3n + 1 problem'
slug: uva：100－the-3n-1-problem
date: '2011-11-24T07:48:54+08:00'
lastmod: '2020-08-28T02:14:55+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
- Ad Hoc
permalink: /2011/11/24/1182/uva%ef%bc%9a100%ef%bc%8dthe-3n-1-problem/
wp_status: publish
wp_type: post
---

## 題目大綱
題目表示有一個演算法在使用者給予一個數字`n`後，會進行下面的步驟：

1. 輸入 `n`。
2. 印出 `n`。
3. 如果 `n = 1`，則循環結束。
4. 如果 `n` 是奇數，那麼下一個循環的 `n` 就會是 `3 * n + 1`。
5. 否則下一個循環 `n` 就會是 `n / 2`。
6. 從第 2 步進入下一次循環。

例如：`22`，根據上述的演算法可得數列：`22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1`

題目會給予`i`與`j`兩個數字，想知道`i`到`j`的區間中，誰代入上面的演算法後可以得到最長的數列。

## 測試資料

### 輸入資料
```
1 10
100 200
201 210
900 1000
```

### 輸出資料
```
1 10 20
100 200 125
201 210 89
900 1000 174
```

## 題目網址
[UVa Online Judge](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=3&page=show_problem&problem=36)

## 解法思考
照著題目所說的去遞迴即可得解。

## 解法程式碼

### C++ (0.310s)
```cpp
/*******************************************************/
/* UVa 100 The 3n+1 problem                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2011/11/23                                 */
/* (Modified at 2020/08/27).                           */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int cyclelength(int n) {
  if (n == 1) {
    return 1;
  }
  else if (n % 2) {
    return 1 + cyclelength(3 * n + 1);
  }
  else {
    return 1 + cyclelength(n / 2);
  }
}

int main() {
  int i, j;
  while (scanf("%d%d", &i, &j) != EOF) {
    int maxLength = 0;
    int minValue = (i < j) ? i : j;
    int maxValue = (i > j) ? i : j;
    
    for (int value = minValue ; minValue <= maxValue; ++minValue) {
      int termLength = cyclelength(minValue);
      maxLength = (termLength > maxLength) ? termLength : maxLength;
    }

    printf("%d %d %d\n", i, j, maxLength);
  }
  return 0;
}
```

## 參考網址
[Lucky貓的 UVA（ACM）園地](http://luckycat.kshs.kh.edu.tw/homework/q100.htm)
