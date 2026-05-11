---
id: 4973
title: '#UVa：784－Maze Exploration'
slug: uva：784－maze-exploration
date: '2020-05-15T00:46:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 7
- UVa
permalink: /2020/05/15/4973/uva%ef%bc%9a784%ef%bc%8dmaze-exploration/
wp_status: publish
wp_type: post
---

此題就從給予的地圖中，從 `*` 的位置開始進行 Flooding(遞迴、DFS)，將周圍相連的空白通通填上 `#` 即可。

**C++(0.010)**
```cpp
/*******************************************************/
/* UVa 784 Maze Exploration                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

struct Point {
  int row;
  int column;
};

const Point DIRECTIONS[] = {
  {-1, 0}, {1, 0}, {0, -1}, {0, 1}
};

void fillMap(vector<string>& map, int row, int column) {
  map[row][column] = '#';

  for (int i = 0 ; i < sizeof(DIRECTIONS) / sizeof(Point) ; ++i) {
    int nextRow = row + DIRECTIONS[i].row;
    int nextColumn = column + DIRECTIONS[i].column;

    if (nextRow >= 0 && nextRow < map.size() &&
      nextColumn >= 0 && nextColumn < map[nextRow].length() &&
      map[nextRow][nextColumn] == ' '
    ) {
      fillMap(map, nextRow, nextColumn);
    }
  }
}

int main() {
  int n;
  while (scanf("%d ", &n) != EOF) {
    for (int caseNumber = 1 ; caseNumber <= n ; ++caseNumber) {
      vector<string> map;
      string input;
      getline(cin, input);
      while (input[0] != '_') {
        map.push_back(input);
        getline(cin, input);
      }

      string seperator = input;
      Point startPoint;
      for (int i = 0 ; i < map.size() ; ++i) {
        for (int j = 0 ; j < map[i].length() ; ++j) {
          if (map[i][j] == '*') {
            startPoint.row = i;
            startPoint.column = j;
          }
        }
      }

      fillMap(map, startPoint.row, startPoint.column);

      for (int i = 0 ; i < map.size() ; ++i) {
        printf("%s\n", map[i].c_str());
      }
      printf("%s\n", seperator.c_str());
    }
  }
  return 0;
}
```
