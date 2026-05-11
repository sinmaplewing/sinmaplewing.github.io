---
id: 3874
title: '#UVa：278－Chess'
slug: uva：278－chess
date: '2018-10-16T00:27:33+08:00'
lastmod: '2018-10-16T00:27:54+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2018/10/16/3874/uva%ef%bc%9a278%ef%bc%8dchess/
wp_status: publish
wp_type: post
---

由於本人也不是很懂西洋棋，所以也是看了很久，找了很多參考才比較能知道公式是什麼。

* Rook(城堡)：可以橫衝和直衝，所以就是看最少的行或列的數量即是能夠擺放的數量。
* Knight(騎士)：可分為最少 1 行、 2 行、 2 行以上去看待， 1 行的話就是另外的長邊多長就可以放多長， 2 行的話就是每一列放完 2 隻後隔著田字空格再放，不過由於本題數量必是 4 行以上則只要考慮最後一種情形就好，放在全部是黑的格子上或是放在全部是白的格子上即是答案。（可以觀察馬放在黑色格子上時，能攻擊的位置都在白色的格子上，反之亦然）
* Queen(皇后)：這個是在 8 皇后問題中知道[latex] n \geq 4 [/latex]時， n 乘 n 的棋盤上最多可以擺放 n 隻皇后不互相攻擊，故公式與車一樣是最少的行或列的數量。
* King(國王)： 8 個方位各能走 1 步，所以就間隔著放。

西洋棋走法參考：[西洋棋規則初級篇（The Rule of Chess, Simple Version） - puzzlez 的部落格](http://blog.udn.com/puzzlez/4342425)

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 278 Chess                                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/16                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int solveChess(char c, int m, int n){
  switch(c){
    case 'r':
      return min(m, n);
      break;

    case 'k':
      return (m * n + 1) / 2;
      break;

    case 'Q':
      return min(m, n);
      break;

    case 'K':
      return ((m+1)/2) * ((n+1)/2);
      break;
  }
}

int main(){
  int caseCount;
  while(scanf("%d", &caseCount) != EOF){
    for(int i = 0 ; i < caseCount ; ++i){
      char c;
      int m, n;
      scanf(" %c %d%d", &c, &m, &n);
      printf("%d\n", solveChess(c, min(m, n), max(m, n)));
    }
  }
  return 0;
}
```
