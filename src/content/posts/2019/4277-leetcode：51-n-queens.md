---
id: 4277
title: '#LeetCode：51. N-Queens'
slug: leetcode：51-n-queens
date: '2019-04-16T10:08:37+08:00'
lastmod: '2019-04-16T10:09:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/16/4277/leetcode%ef%bc%9a51-n-queens/
wp_status: publish
wp_type: post
---

以 `row` 或 `column` 為主，進行 backtracking 法去放置各個皇后看看是否可以成功放置，這樣即可得解。

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 51. N-Queens                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/16                                 */
/*******************************************************/
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
  void backtrackingSolveNQueens(
    int n,
    int row,
    vector<vector<string>> &result,
    vector<string> &answer,
    vector<bool> &rowCheck,
    vector<bool> &columnCheck,
    vector<bool> &slashCheck,
    vector<bool> &backslashCheck){

    if(row >= n){
      result.push_back(answer);
      return;
    }

    for(int column = 0 ; column < n ; ++column){
      int slashIndex = row + column;
      int backSlashIndex = row - column + n - 1;
      if(!rowCheck[row] && !columnCheck[column] && 
        !slashCheck[slashIndex] && !backslashCheck[backSlashIndex]){
        rowCheck[row] = true;
        columnCheck[column] = true;
        slashCheck[slashIndex] = true;
        backslashCheck[backSlashIndex] = true;
        answer[row][column] = 'Q';
        
        backtrackingSolveNQueens(n, row+1, result, answer, 
          rowCheck, columnCheck, slashCheck, backslashCheck);

        rowCheck[row] = false;
        columnCheck[column] = false;
        slashCheck[slashIndex] = false;
        backslashCheck[backSlashIndex] = false;
        answer[row][column] = '.';
      }
    }
  }

  vector<vector<string>> solveNQueens(int n) {
    vector<bool> rowCheck(n, false);
    vector<bool> columnCheck(n, false);
    vector<bool> slashCheck(2 * n - 1, false);
    vector<bool> backslashCheck(2 * n - 1, false);
    vector<string> answer(n, string(n, '.'));
    vector<vector<string>> result;

    backtrackingSolveNQueens(
      n, 0, result, answer, rowCheck, columnCheck, slashCheck, backslashCheck);
    return result;
  }
};
```
