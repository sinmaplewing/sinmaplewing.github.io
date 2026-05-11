---
id: 4280
title: '#LeetCode：52. N-Queens II'
slug: leetcode：52-n-queens-ii
date: '2019-04-16T10:21:07+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/16/4280/leetcode%ef%bc%9a52-n-queens-ii/
wp_status: publish
wp_type: post
---

以 `row` 或 `column` 為主，進行 backtracking 法去放置各個皇后看看是否可以成功放置，這樣即可得解。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 52. N-Queens II                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/16                                 */
/*******************************************************/
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
  int backtrackingGetTotalNQueens(
    int n,
    int row,
    vector<bool> &rowCheck,
    vector<bool> &columnCheck,
    vector<bool> &slashCheck,
    vector<bool> &backslashCheck){

    if(row >= n){
      return 1;
    }

    int total = 0;
    for(int column = 0 ; column < n ; ++column){
      int slashIndex = row + column;
      int backSlashIndex = row - column + n - 1;
      if(!rowCheck[row] && !columnCheck[column] && 
        !slashCheck[slashIndex] && !backslashCheck[backSlashIndex]){
        rowCheck[row] = true;
        columnCheck[column] = true;
        slashCheck[slashIndex] = true;
        backslashCheck[backSlashIndex] = true;
        
        total += backtrackingGetTotalNQueens(n, row+1,
          rowCheck, columnCheck, slashCheck, backslashCheck);

        rowCheck[row] = false;
        columnCheck[column] = false;
        slashCheck[slashIndex] = false;
        backslashCheck[backSlashIndex] = false;
      }
    }

    return total;
  }

  int totalNQueens(int n) {
      vector<bool> rowCheck(n, false);
      vector<bool> columnCheck(n, false);
      vector<bool> slashCheck(2 * n - 1, false);
      vector<bool> backslashCheck(2 * n - 1, false);

      return backtrackingGetTotalNQueens(
        n, 0, rowCheck, columnCheck, slashCheck, backslashCheck);
  }
};
```
