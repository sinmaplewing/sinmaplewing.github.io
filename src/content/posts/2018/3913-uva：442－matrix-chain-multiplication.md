---
id: 3913
title: '#UVa：442－Matrix Chain Multiplication'
slug: uva：442－matrix-chain-multiplication
date: '2018-10-18T00:39:15+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2018/10/18/3913/uva%ef%bc%9a442%ef%bc%8dmatrix-chain-multiplication/
wp_status: publish
wp_type: post
---

前面陣列的儲存可建表儲存，後面剖析矩陣乘法算式的部分即用名字查找表格並把矩陣丟入 stack 中，遇到 `)` 就去抓出 stack 最上面兩個矩陣，可以乘的話就乘完再 push 回 stack 即可，不能的話就輸出 `error`。由於每個矩陣乘法都會有括弧括住，故 `(` 可以完全忽略。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 442 Matrix Chain Multiplication                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/18                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <stack>
#include <map>
using namespace std;

struct Matrix{
  int row;
  int column;
};

int main(){
  const int ERROR_COUNT = -1;

  int n;
  scanf("%d", &n);

  map<char, Matrix> matrices;
  for(int i = 0 ; i < n ; ++i){
    char name;
    Matrix matrix;
    scanf(" %c %d%d", &name, &(matrix.row), &(matrix.column));
    matrices[name] = matrix;
  }

  string expression;
  while(cin >> expression){
    int multiplicationCount = 0;
    stack<Matrix> matrixStack;
    for(int i = 0 ; i < expression.length() ; ++i){
      if(expression[i] == '(') continue;
      if(expression[i] != ')'){
        matrixStack.push(matrices[expression[i]]);
        continue;
      }

      Matrix b = matrixStack.top();
      matrixStack.pop();
      Matrix a = matrixStack.top();
      matrixStack.pop();

      if(a.column != b.row){
        multiplicationCount = ERROR_COUNT;
        break;
      }

      multiplicationCount += a.row * b.row * b.column;
      Matrix matrix {a.row, b.column};
      matrixStack.push(matrix);
    }

    if(multiplicationCount == ERROR_COUNT) printf("error\n");
    else printf("%d\n", multiplicationCount);
  }

  return 0;
}
```
