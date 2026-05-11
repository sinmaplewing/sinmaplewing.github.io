---
id: 4959
title: '#UVa：437－The Tower of Babylon'
slug: uva：437－the-tower-of-babylon
date: '2020-05-12T00:48:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2020/05/12/4959/uva%ef%bc%9a437%ef%bc%8dthe-tower-of-babylon/
wp_status: publish
wp_type: post
---

由於給予的 Block 可以翻轉，故將每種 Block 的六種可能的排法都找出來放進同一個陣列中，再將其由小到大排好，接著用 LIS(Longest Increasing Subsequence) 的方法改變成找出高度加總最高，且長與寬呈現嚴格遞增的高度為何即可。

P.S. 雖然每一種 Block 都可以不限個數使用，但因為往上疊的時候，長與寬要嚴格遞減的關係，所以每一種 Block 的六種排法裡面，不會有哪一種排法會用到兩次以上，故每一種排法僅要放一個在陣列中即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 437 The Tower of Babylon                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/12                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

struct Block {
  int baseX;
  int baseY;
  int heightZ;
};

bool compare(const Block& a, const Block& b) {
  if (a.baseX < b.baseX) return true;
  if (a.baseX == b.baseX && a.baseY < b.baseY) return true;
  if (a.baseX == b.baseX && a.baseY == b.baseY && a.heightZ < b.heightZ) return true;
  return false;
}

void addAllPermutationBlocks(vector<Block>& blockTypes, const Block& block) {
  int blockEdges[] = { block.baseX, block.baseY, block.heightZ };
  for (int i = 0 ; i < 3 ; ++i ) {
    for (int j = 0 ; j < 3 ; ++j ) {
      if (i == j) continue;

      for (int k = 0 ; k < 3 ; ++k ) {
        if (i == k || j == k) continue;
        
        blockTypes.push_back((Block){ blockEdges[i], blockEdges[j], blockEdges[k] });
      }
    }
  }
}

int main() {
  int caseNumber = 1, n;
  while (scanf("%d", &n) != EOF && n != 0) {
    vector<Block> blockTypes;
    for (int i = 0 ; i < n ; ++i) {
      Block inputBlock;
      scanf("%d%d%d", &(inputBlock.baseX), &(inputBlock.baseY), &(inputBlock.heightZ));
      
      addAllPermutationBlocks(blockTypes, inputBlock);
    }

    sort(blockTypes.begin(), blockTypes.end(), compare);

    int totalBlockTypesCount = blockTypes.size();
    vector<int> lis(totalBlockTypesCount);
    for (int sequenceEndIndex = 0 ; sequenceEndIndex < totalBlockTypesCount ; ++sequenceEndIndex) {
      Block endBlock = blockTypes[sequenceEndIndex];
      lis[sequenceEndIndex] = endBlock.heightZ;

      for (int beforeEndIndex = 0 ; beforeEndIndex < sequenceEndIndex ; ++beforeEndIndex) {
        Block currentBlock = blockTypes[beforeEndIndex];
        if (
          currentBlock.baseX < endBlock.baseX && currentBlock.baseY < endBlock.baseY &&
          lis[beforeEndIndex] + endBlock.heightZ > lis[sequenceEndIndex]
        ) {
          lis[sequenceEndIndex] = lis[beforeEndIndex] + endBlock.heightZ;
        }
      }
    }

    int maxHeight = 0;
    for (int i = 0 ; i < totalBlockTypesCount ; ++i) {
      maxHeight = max(maxHeight, lis[i]);
    }
    printf("Case %d: maximum height = %d\n", caseNumber++, maxHeight);
  }

  return 0;
}
```
