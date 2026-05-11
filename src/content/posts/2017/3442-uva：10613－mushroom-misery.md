---
id: 3442
title: '#UVa：10613－Mushroom Misery'
slug: uva：10613－mushroom-misery
date: '2017-12-29T01:40:00+08:00'
lastmod: '2017-12-29T01:43:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
featured_image: /uploads/2017/12/circle.png
permalink: /2017/12/29/3442/uva%ef%bc%9a10613%ef%bc%8dmushroom-misery/
wp_status: publish
wp_type: post
---

將方格以 y 軸整數窮舉，對於每一個 y 找出每個圓在此 y 上所佔的 x 範圍為多少，得到所有 x 範圍後合併出來並計數即可得到該 y 行方格被佔掉幾格，窮舉完後再加總就可以得到全部所佔的方格數。

至於如何算出該圓對於 y 行方格到底佔了 x 多少，可以利用`圓心離 y 行方格最近的距離`和`半徑`去求得與 x 平行軸所圍成的三角形的 x 部分的長度(如圖)。

![算法圖示](/uploads/2017/12/circle.png)

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 10613 Mushroom Misery                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2017/12/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;

struct Circle{
  double x;
  double y;
  double r;
};

struct Range{
  int min;
  int max;
};

bool cmp(Range a, Range b){
  return a.min < b.min || (a.min == b.min && a.max < b.max);
}

Range getCircleRangeX(Circle c, int y, int size){
  Range r;
  if( y + 1 < c.y && c.y - c.r <= y + 1 ){
    double deltaY = c.y - (y+1);
    double deltaDistance = sqrt( c.r * c.r - deltaY * deltaY );
    
    r.min = max(0, (int)(c.x - deltaDistance));
    r.max = min(size-1, (int)(c.x + deltaDistance));
    return r;
  }
  else if( y > c.y && c.y + c.r >= y ){
    double deltaY = y - c.y;
    double deltaDistance = sqrt( c.r * c.r - deltaY * deltaY );

    r.min = max(0, (int)(c.x - deltaDistance));
    r.max = min(size-1, (int)(c.x + deltaDistance));
    return r;
  }
  else if( c.y >= y && c.y <= y+1 ){
    r.min = max(0, (int)(c.x - c.r));
    r.max = min(size-1, (int)(c.x + c.r));
    return r;
  }
  else{
    r.min = -1;
    r.max = -1;
    return r;
  }
}

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    for( int testCase = 0 ; testCase < N ; ++testCase ){
      int size, n;
      scanf("%d%d", &size, &n);

      vector<Circle> circles;
      for( int i = 0 ; i < n ; ++i ){
        Circle c;
        scanf("%lf%lf%lf", &(c.x), &(c.y), &(c.r));
        circles.push_back(c);
      }

      int totalAffectedSquares = 0;
      for( int i = 0 ; i < size ; ++i ){
        vector<Range> ranges;
        for( int j = 0 ; j < n ; ++j ){
          Range range = getCircleRangeX(circles[j], i, size);
          if( range.min != -1 && range.max != -1 ){
            ranges.push_back(range);
          }
        }

        if( ranges.size() > 0 ){
          sort(ranges.begin(), ranges.end(), cmp);
          Range range = ranges[0];
          for( int j = 1 ; j < ranges.size() ; ++j ){
            if( range.max >= ranges[j].min ){
              range.max = max( range.max, ranges[j].max );
            }
            else{
              totalAffectedSquares += range.max - range.min + 1;
              range = ranges[j];
            }
          }
          totalAffectedSquares += range.max - range.min + 1;
        }
      }

      printf("%d\n", totalAffectedSquares);
    }
  }

  return 0;
}
```
