---
id: 4177
title: '#LeetCode：36. Valid Sudoku'
slug: leetcode：36-valid-sudoku
date: '2019-04-01T22:56:01+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/01/4177/leetcode%ef%bc%9a36-valid-sudoku/
wp_status: publish
wp_type: post
---

檢查所給之數獨盤面有沒有已經哪一條規則不符合了即可。

**C++(20ms)**
```cpp
/*******************************************************/
/* LeetCode 36. Valid Sudoku                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/01                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution {
public:
  int getSquareIndex(int row, int column){
    return row / 3 * 3 + column / 3;
  }

  bool isValidSudoku(vector<vector<char>>& board){
    vector<vector<bool>> isRow(9, vector<bool>(10, false));
    vector<vector<bool>> isColumn(9, vector<bool>(10, false));
    vector<vector<bool>> isSquare(9, vector<bool>(10, false));

    for(int i = 0 ; i < board.size() ; ++i){
      for(int j = 0 ; j < board[i].size() ; ++j){
        if(board[i][j] == '.') continue;

        int number = board[i][j] - '0';
        int squareIndex = getSquareIndex(i, j);
        if(isRow[i][number] || isColumn[j][number] || isSquare[squareIndex][number]) return false;
        isRow[i][number] = true;
        isColumn[j][number] = true;
        isSquare[squareIndex][number] = true;
      }
    }

    return true;
  }
};
```
