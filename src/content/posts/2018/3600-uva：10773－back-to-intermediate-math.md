---
id: 3600
title: '#UVa：10773－Back to Intermediate Math'
slug: uva：10773－back-to-intermediate-math
date: '2018-09-24T21:50:55+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 107
- UVa
featured_image: /uploads/2018/09/uva10773.png
permalink: /2018/09/24/3600/uva%ef%bc%9a10773%ef%bc%8dback-to-intermediate-math/
wp_status: publish
wp_type: post
---

此題利用高中物理觀念解決，如下圖所示：![UVa10773](/uploads/2018/09/uva10773.png)

最短路徑的方式即是走直線，而為了走直線，對船加速的速度勢必要去抵銷河流的流速，故為往河流流速與直線的方向所圍成的三角形斜邊方向加速，如圖中紅色部分；而如果要最短時間的方式抵達對面，則就是把所有的速度都往岸邊的方向衝刺即可，如圖中藍色部分。

至於什麼時候會沒辦法分出兩條不同的路徑則有三種情況：
1. 河流沒有流速，則兩條路徑一致。
2. 河流流速大於船能加速的速度，則無法抵銷河流流速，故無法行走最短路徑。
3. 船沒有速度，那連動都不能動。

P.S. 這題不能一直讀取測資到 EOF ，在正式測資的後面還有多餘的輸入。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10773 Back to Intermediate Math                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/24                                 */
/*******************************************************/
#include <cstdio>
#include <cmath>
#include <iostream>
using namespace std;

int main(){
  int caseCount;
  scanf("%d", &caseCount);

  for(int caseNumber = 1 ; caseNumber <= caseCount ; ++caseNumber){
    int d, v, u;
    scanf("%d%d%d", &d, &v, &u);

    printf("Case %d: ", caseNumber);
    if(v == 0 || u <= v || u == 0){
      printf("can't determine\n");
      continue;
    }
    
    double shortestPathTime = (double)d / sqrt(u*u - v*v);
    double shortestTime = (double)d / u;
    printf("%.3lf\n", caseNumber, shortestPathTime - shortestTime);
  }
  
  return 0;
}
```
