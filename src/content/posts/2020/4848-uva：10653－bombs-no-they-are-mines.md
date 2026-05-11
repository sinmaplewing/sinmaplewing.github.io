---
id: 4848
title: '#UVa：10653－Bombs! NO they are Mines!!'
slug: uva：10653－bombs-no-they-are-mines
date: '2020-04-27T00:48:29+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2020/04/27/4848/uva%ef%bc%9a10653%ef%bc%8dbombs-no-they-are-mines/
wp_status: publish
wp_type: post
---

將地圖建立起來後，利用 BFS 即可得解。

**C++(0.140)**
```cpp
/*******************************************************/
/* UVa 10653 Bombs! NO they are Mines!!                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/04/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <queue>
using namespace std;

struct Vector
{
  int x;
  int y;

  bool equals(const Vector& v) {
    return x == v.x && y == v.y;
  }
};

struct BFSData {
  Vector point;
  int distance;
};

const Vector DIRECTIONS[] = {
  { -1, 0 },
  { 1, 0 },
  { 0, -1 },
  { 0, 1 }
};

int main() {
  int R, C;
  while (scanf("%d%d", &R, &C) != EOF && R != 0 && C != 0) {
    vector< vector<bool> > map(R, vector<bool>(C, false));
    
    int rows;
    scanf("%d", &rows);
    for (int i = 0 ; i < rows ; ++i) {
      int row;
      scanf("%d", &row);

      int columns;
      scanf("%d", &columns);
      for (int j = 0 ; j < columns ; ++j) {
        int column;
        scanf("%d", &column);
        map[row][column] = true;  
      }
    }

    Vector start, end;
    scanf("%d%d%d%d", &(start.x), &(start.y), &(end.x), &(end.y));

    int distance = -1;
    queue<BFSData> bfsQueue;
    bfsQueue.push((BFSData){ start, 0 });
    map[start.x][start.y] = true;
    while (!bfsQueue.empty()) {
      BFSData front = bfsQueue.front();
      bfsQueue.pop();
      if (front.point.equals(end)) {
        distance = front.distance;
        break;
      }

      for (int i = 0 ; i < sizeof(DIRECTIONS) / sizeof(Vector) ; ++i) {
        Vector nextPoint = { front.point.x + DIRECTIONS[i].x, front.point.y + DIRECTIONS[i].y };
        if (nextPoint.x >= 0 && nextPoint.x < R &&
            nextPoint.y >= 0 && nextPoint.y < C &&
            !map[nextPoint.x][nextPoint.y]
        ) {
          bfsQueue.push((BFSData){ nextPoint, front.distance + 1 });
          map[nextPoint.x][nextPoint.y] = true;
        }
      }
    }

    printf("%d\n", distance);
  }

  return 0;
}
```
