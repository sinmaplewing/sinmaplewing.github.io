---
id: 4937
title: '#UVa：10190－Divide, But Not Quite Conquer!'
slug: uva：10190－divide-but-not-quite-conquer
date: '2020-05-08T01:33:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2020/05/08/4937/uva%ef%bc%9a10190%ef%bc%8ddivide-but-not-quite-conquer/
wp_status: publish
wp_type: post
---

照題目將整個數列求出來即可。若是中途遇到不能整除，或是 n 或 m 剛開始就小於等於 1 的話，就輸出 `Boring!` 即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10190 Divide, But Not Quite Conquer!            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/08                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <string>
using namespace std;

const string BORING_OUTPUT = "Boring!\n";

int main() {
  int n, m;
  while (scanf("%d%d", &n, &m) != EOF) {
    if (n <= 1 || m <= 1) {
      printf("%s", BORING_OUTPUT.c_str());
      continue;
    }

    vector<int> sequence;
    for (int i = n ; i == 1 || (i > 1 && i % m == 0) ; i /= m) {
      sequence.push_back(i);
    }

    int sequenceSize = sequence.size();
    if (sequenceSize == 0 || sequence[sequenceSize - 1] != 1) {
      printf("%s", BORING_OUTPUT.c_str());
      continue;
    }

    for (int i = 0 ; i < sequenceSize ; ++i) {
      if (i > 0) printf(" "); 
      printf("%d", sequence[i]);
    }
    printf("\n");
  }

  return 0;
}
```
