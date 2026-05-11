---
id: 4879
title: '#UVa：11716－Digital Fortress'
slug: uva：11716－digital-fortress
date: '2020-05-05T00:29:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2020/05/05/4879/uva%ef%bc%9a11716%ef%bc%8ddigital-fortress/
wp_status: publish
wp_type: post
---

先確認輸入的字串長度是否為某整數的次方數，如果不是的話就是 `INVALID`；如果是的話就接著將該字串當成二維陣列去做巡覽即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11716 Digital Fortress                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/05                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;
const double DOUBLE_ERROR = 1e-9;
const int NOT_INTEGER_ROOT = -1;

bool isEqualWithError(double a, double b) {
  return a < b + DOUBLE_ERROR && a > b - DOUBLE_ERROR;
}

int findRoot(int number) {
  double realRoot = sqrt((double)number);
  int integerRoot = (int)realRoot;
  return isEqualWithError((double)integerRoot, realRoot) ? integerRoot : NOT_INTEGER_ROOT;
}

int main() {
  int T;
  while (scanf("%d ", &T) != EOF) {
    for (int caseNumber = 1 ; caseNumber <= T ; ++caseNumber) {
      string cipherText;
      getline(cin, cipherText);
      int cipherTextLength = cipherText.length();

      int rootNumber = findRoot(cipherTextLength);
      if (rootNumber == NOT_INTEGER_ROOT) {
        printf("INVALID\n");
        continue;
      }

      for (int i = 0 ; i < rootNumber ; ++i) {
        for (int j = 0 ; j < rootNumber ; ++j) {
          printf("%c", cipherText[i + j * rootNumber]);
        }
      }
      printf("\n");
    }
  }
}
```
