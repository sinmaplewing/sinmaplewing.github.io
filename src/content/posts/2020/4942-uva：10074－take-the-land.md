---
id: 4942
title: '#UVa：10074－Take the Land'
slug: uva：10074－take-the-land
date: '2020-05-09T12:31:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2020/05/09/4942/uva%ef%bc%9a10074%ef%bc%8dtake-the-land/
wp_status: publish
wp_type: post
---

為了要找出最大都是零的矩形範圍，我們要找出能夠決定一個矩形的四個參數：左上角的座標`(startRow, startColumn)`和右下角的座標`(endRow, endColumn)`。

首先先固定 `startRow`，讓 `endRow` 從 `startRow` 開始，一步一步往外擴張，這每一步都要做出每一條 column 是否在這個範圍內都是全部是零（即是每一條 column 這次的結果跟上次的結果做 AND 運算，其實這裡就是一個 DP 計算）。而每一步算完之後，都計算一次連續都是零的 column 的面積有多大，取最大的即是答案。

底下用兩個 Code 來描述，一個有將實際的長方形做出來，另外一個是優化成只記必要的資訊即可。

**C++ - Rectangle Solution (0.000)**
```cpp
/*******************************************************/
/* UVa 10074 Take the Land                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

struct Rectangle {
  int startRow;
  int endRow;
  int startColumn;
  int endColumn;
  bool isAllZero;

  int getArea() {
    return (endRow - startRow + 1) * (endColumn - startColumn + 1);
  }
};

int main() {
  int M, N;
  while (scanf("%d%d", &M, &N) != EOF && M != 0 && N != 0) {
    vector< vector<int> > map(M, vector<int>(N));
    for (int i = 0 ; i < M ; ++i) {
      for (int j = 0 ; j < N ; ++j) {
        scanf("%d", &map[i][j]);
      }
    }

    int maxAllZeroArea = 0;
    for (int startRow = 0 ; startRow < M ; ++startRow) {
      vector<Rectangle> sameColumnRectangleDP(N);
      for (int endRow = startRow ; endRow < M ; ++endRow) {
        for (int column = 0 ; column < N ; ++column) {
          if (startRow == endRow) {
            sameColumnRectangleDP[column] = (Rectangle) {
              startRow, endRow, column, column, 
              map[endRow][column] == 0
            };
            continue;
          }

          Rectangle previousRectangle = sameColumnRectangleDP[column];
          sameColumnRectangleDP[column] = (Rectangle) {
            startRow, endRow, column, column, 
            previousRectangle.isAllZero && map[endRow][column] == 0
          };
        }

        /* Enlarge the range of columns */
        Rectangle resultRectangle = sameColumnRectangleDP[0];
        if (resultRectangle.isAllZero) {
          maxAllZeroArea = max(maxAllZeroArea, resultRectangle.getArea());
        }
        for (int column = 1 ; column < N ; ++column) {
          Rectangle currentRectangle = sameColumnRectangleDP[column];
          if (!resultRectangle.isAllZero) {
            resultRectangle = currentRectangle;
          } else {
            resultRectangle = (Rectangle) {
              resultRectangle.startRow,
              resultRectangle.endRow,
              resultRectangle.startColumn,
              currentRectangle.endColumn,
              resultRectangle.isAllZero && currentRectangle.isAllZero
            };
          }

          if (resultRectangle.isAllZero) {
            maxAllZeroArea = max(maxAllZeroArea, resultRectangle.getArea());
          }
        }
      }
    }

    printf("%d\n", maxAllZeroArea);
  }


  return 0;
}
```

**C++ - Memory Optimized Solution (0.000)**
```cpp
/*******************************************************/
/* UVa 10074 Take the Land                             */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

int main() {
  int M, N;
  while (scanf("%d%d", &M, &N) != EOF && M != 0 && N != 0) {
    vector< vector<int> > map(M, vector<int>(N));
    for (int i = 0 ; i < M ; ++i) {
      for (int j = 0 ; j < N ; ++j) {
        scanf("%d", &map[i][j]);
      }
    }

    int maxAllZeroArea = 0;
    for (int startRow = 0 ; startRow < M ; ++startRow) {
      vector<bool> sameColumnIsAllZeroDP(N, true);
      for (int endRow = startRow ; endRow < M ; ++endRow) {
        for (int column = 0 ; column < N ; ++column) {
          sameColumnIsAllZeroDP[column] = 
            (sameColumnIsAllZeroDP[column] && map[endRow][column] == 0);
        }

        /* Enlarge the range of columns */
        bool isAllZeroResult = sameColumnIsAllZeroDP[0];
        int startColumn = 0;
        int endColumn = 0; 
        if (isAllZeroResult) {
          maxAllZeroArea = max(maxAllZeroArea, (endRow - startRow + 1));
        }
        for (int column = 1 ; column < N ; ++column) {
          if (!isAllZeroResult) {
            isAllZeroResult = sameColumnIsAllZeroDP[column];
            startColumn = column;
            endColumn = column;
          } else {
            isAllZeroResult = isAllZeroResult && sameColumnIsAllZeroDP[column];
            endColumn = column;
          }

          if (isAllZeroResult) {
            maxAllZeroArea = max(maxAllZeroArea, 
              (endRow - startRow + 1) * (endColumn - startColumn + 1));
          }
        }
      }
    }

    printf("%d\n", maxAllZeroArea);
  }


  return 0;
}
```
