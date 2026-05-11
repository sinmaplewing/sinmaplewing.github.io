---
id: 4179
title: '#LeetCode：37. Sudoku Solver'
slug: leetcode：37-sudoku-solver
date: '2019-04-01T23:12:18+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/01/4179/leetcode%ef%bc%9a37-sudoku-solver/
wp_status: publish
wp_type: post
---

利用 Backtracking 法將數獨解開即可。

**C++(16ms)**
```cpp
/*******************************************************/
/* LeetCode 37. Sudoku Solver                          */
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

 bool backtrackingSudoku(vector<vector<char>> &board,
    vector<vector<bool>> &isRow,
    vector<vector<bool>> &isColumn,
    vector<vector<bool>> &isSquare,
    int index){
    if(index >= 81) return true;

    int rowIndex = index / 9;
    int columnIndex = index % 9;
    if(board[rowIndex][columnIndex] != '.') return backtrackingSudoku(board, isRow, isColumn, isSquare, index+1);

    int squareIndex = getSquareIndex(rowIndex, columnIndex);
    for(int i = 1 ; i <= 9 ; ++i){
      if(isRow[rowIndex][i] ||
        isColumn[columnIndex][i] ||
        isSquare[squareIndex][i])
        continue;
      
      board[rowIndex][columnIndex] = i + '0';
      isRow[rowIndex][i] = true;
      isColumn[columnIndex][i] = true;
      isSquare[squareIndex][i] = true;

      if(backtrackingSudoku(board, isRow, isColumn, isSquare, index+1)) return true;

      board[rowIndex][columnIndex] = '.';
      isRow[rowIndex][i] = false;
      isColumn[columnIndex][i] = false;
      isSquare[squareIndex][i] = false;
    }

    return false;
  }

  void solveSudoku(vector<vector<char>>& board) {
    vector<vector<bool>> isRow(9, vector<bool>(10, false));
    vector<vector<bool>> isColumn(9, vector<bool>(10, false));
    vector<vector<bool>> isSquare(9, vector<bool>(10, false));

    for(int i = 0 ; i < board.size() ; ++i){
      for(int j = 0 ; j < board[i].size() ; ++j){
        if(board[i][j] == '.') continue;

        int number = board[i][j] - '0';
        isRow[i][number] = true;
        isColumn[j][number] = true;
        isSquare[getSquareIndex(i, j)][number] = true;
      }
    }

    backtrackingSudoku(board, isRow, isColumn, isSquare, 0);
  }
};
```
