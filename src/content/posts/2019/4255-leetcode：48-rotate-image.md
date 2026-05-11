---
id: 4255
title: '#LeetCode：48. Rotate Image'
slug: leetcode：48-rotate-image
date: '2019-04-14T23:17:14+08:00'
lastmod: '2019-04-14T23:17:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
featured_image: /uploads/2019/04/48.png
permalink: /2019/04/14/4255/leetcode%ef%bc%9a48-rotate-image/
wp_status: publish
wp_type: post
---

![LeetCode 48.](/uploads/2019/04/48.png)

可以將這題分解成上圖的樣子，先從外層一層一層往內處理(圖中圈圈的部分)，對於每一層都從四個角落開始向一個方向巡覽並交換其值(圖中三角形的部分)，這樣即可得解。

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 48. Rotate Image                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/14                                 */
/*******************************************************/
#include <vector>
using namespace std;

class Solution {
public:
  void fourSwap(int& a, int& b, int& c, int& d){
    swap(a, b);
    swap(a, c);
    swap(a, d);
  }

  void rotate(vector<vector<int>>& matrix) {
    if(matrix.size() <= 1) return;

    int layer = matrix.size() / 2;
    for(int i = 0 ; i < layer ; ++i){
      int lastIndex = matrix.size() - i - 1;
      for(int j = 0 ; j < lastIndex - i; ++j){
        fourSwap(
          matrix[i][i + j],
          matrix[i + j][lastIndex],
          matrix[lastIndex][lastIndex - j],
          matrix[lastIndex - j][i]
        );
      }
    }
  }
};
```
