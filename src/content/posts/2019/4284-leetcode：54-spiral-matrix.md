---
id: 4284
title: '#LeetCode：54. Spiral Matrix'
slug: leetcode：54-spiral-matrix
date: '2019-04-17T00:55:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/17/4284/leetcode%ef%bc%9a54-spiral-matrix/
wp_status: publish
wp_type: post
---

將行走路徑從外圈向內圈分成一層一層，再將每一層分成上、右、下、左四個部分去跑即可。

對於如果該層只有一行或一列的，下和左這兩個回頭的巡覽即可略過，因為只有一行或一列的關係，所以在上和右的巡覽中就已經都走過了。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 54. Spiral Matrix                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/17                                 */
/*******************************************************/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if(matrix.size() <= 0 || matrix[0].size() <= 0) return result;

    int totalLayer = min(matrix.size(), matrix[0].size());
    totalLayer = totalLayer / 2 + ((totalLayer % 2) ? 1 : 0);
    for(int layer = 0 ; layer < totalLayer ; ++layer){
      int startRow = layer;
      int startColumn = layer;
      int lastRow = matrix.size() - layer - 1;
      int lastColumn = matrix[layer].size() - layer - 1;

      // top
      for(int column = startColumn ; column <= lastColumn ; ++column){
        result.push_back(matrix[startRow][column]);
      }

      // right
      for(int row = startRow + 1 ; row <= lastRow ; ++row){
        result.push_back(matrix[row][lastColumn]);
      }

      // bottom
      if(startRow < lastRow){
        for(int column = lastColumn - 1 ; column >= startColumn ; --column){
          result.push_back(matrix[lastRow][column]);
        }
      }

      // left
      if(startColumn < lastColumn){
        for(int row = lastRow - 1 ; row > startRow ; --row){
          result.push_back(matrix[row][startColumn]);
        }
      }
    }

    return result;
  }
};
```
