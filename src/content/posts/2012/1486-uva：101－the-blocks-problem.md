---
id: 1486
title: '#UVa：101－The Blocks Problem'
slug: uva：101－the-blocks-problem
date: '2012-03-16T21:14:06+08:00'
lastmod: '2020-08-28T02:15:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
- Ad Hoc
permalink: /2012/03/16/1486/uva%ef%bc%9a101%ef%bc%8dthe-blocks-problem/
wp_status: publish
wp_type: post
---

## 題目大綱
給定 `n` 個方塊，個別放在 `n` 個堆上。利用這些方塊去執行題目所要求執行的指令，並在執行完指令後輸出最後每堆上面有哪些方塊。指令有底下幾種可能：

* `move a onto b`：將疊在編號 a 和編號 b 上的方塊放回原位，再將編號 a 的方塊疊在編號 b 的方塊上。
* `move a over b`：將疊在編號 a 上的方塊放回原位，再將編號 a 的方塊疊在編號 b 所在的那堆的最上方。
* `pile a onto b`：將疊在編號 b 上的方塊放回原位，再將連同編號 a 的方塊以及其上方的所有方塊一併疊在編號 b 的方塊上。
* `pile a over b`：將連同編號 a 的方塊以及其上方的所有方塊一併疊在編號 b 所在的那堆的最上方。
* `quit`：指令結束。

## 測試資料

### 輸入資料
```
10
move 9 onto 1
move 8 over 1
move 7 over 1
move 6 over 1
pile 8 over 6
pile 8 over 5
move 2 over 1
move 4 over 9
quit
```

### 輸出資料
```
0: 0
1: 1 9 2 4
2:
3: 3
4:
5: 5 8 7 6
6:
7:
8:
9:
```

## 題目網址
[UVa Online Judge](https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=37)

## 解法思考

這題就照著題目要求的模擬去做即可得解。

我用了一個叫做block的二維陣列去做模擬，其中又用了top的陣列去紀錄每一堆最上層是第幾格，然後還用了position去紀錄每一個格子目前在block當中的位置，這樣很容易就可以得解了！

步驟可以分成：

1. 看看a上面是否要放回去。
2. 看看b上面是否要放回去。
3. a那堆(可能一個，可能很多個)把它放到b那堆。

這樣就算蠻簡化程式碼了XD

P.S. 要記得忽略a和b都放在同一堆的狀況喔！

## 解法程式碼

### C++ (0.000s)

```cpp
/*******************************************************/
/* UVa 101 The Blocks Problem                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/16                                 */
/* Modified at 2020/08/27                              */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstring>
#include <vector>
using namespace std;

int main() {
  int n;
  while (scanf("%d", &n) != EOF) {
     vector<vector<int>> position(n, vector<int>(2));
     vector<vector<int>> block(n, vector<int>(n));
     vector<int> top(n);

    for (int i = 0 ; i < n ; i++) {
      position[i][0] = i;
      position[i][1] = 0;
      block[i][0] = i;
      top[i] = 1;
    }

    string action1, action2;
    while (cin >> action1 && action1 != "quit") {
      int a, b;
      scanf("%d", &a);
      cin >> action2;
      scanf("%d", &b );

      int ax = position[a][0];
      int ay = position[a][1];
      int bx = position[b][0];
      int by = position[b][1];

      if (ax == bx) continue;

      if (action1 == "move") {
        for (int i = ay+1 ; i < top[ax] ; i++) {
          position[block[ax][i]][0] = block[ax][i];
          position[block[ax][i]][1] = top[block[ax][i]];
          block[block[ax][i]][top[block[ax][i]]++] = block[ax][i];
        }
        top[ax] = ay + 1;
      }

      if (action2 == "onto") {
        for (int i = by+1 ; i < top[bx] ; i++) {
          position[block[bx][i]][0] = block[bx][i];
          position[block[bx][i]][1] = top[block[bx][i]];
          block[block[bx][i]][top[block[bx][i]]++] = block[bx][i];
        }
        top[bx] = by + 1;
      }

      for (int i = ay ; i < top[ax] ; i++) {
        position[block[ax][i]][0] = bx;
        position[block[ax][i]][1] = top[bx];
        block[bx][top[bx]++] = block[ax][i];
      }
      top[ax] = ay;
    }

    for (int i = 0 ; i < n ; i++) {
      printf("%d:", i);
      for (int j = 0 ; j < top[i] ; j++) {
        printf(" %d", block[i][j]);
      }
      printf("\n");
    }
  }

  return 0;
}
```
