---
id: 2587
title: '#UVa：573－The Snail'
slug: uva：573－the-snail
date: '2015-01-05T11:49:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2015/01/05/2587/uva%ef%bc%9a573%ef%bc%8dthe-snail/
wp_status: publish
wp_type: post
---

利用模擬算出天數。注意每次上升長度的衰減是減個定值，並非每次去乘上一個比例，並且上升長度小於零時要被侷限在0。

**C++(0.015)**
```cpp
/*******************************************************/
/* UVa 573 The Snail                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/05                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  double H, U, D, F;
  while( scanf("%lf%lf%lf%lf", &H, &U, &D, &F) != EOF && H != 0 ){
    double height = 0;
    int day = 0;

    double fatigue = U * (F / 100);
    do{
      ++day;
      height += U;
      if( height > H ) break;
      
      U = max( 0.0, U - fatigue );
      height -= D;
    } while( height >= 0 );

    if( height > H ){
      printf("success");
    }
    else{
      printf("failure");
    }

    printf(" on day %d\n", day);
  }
  return 0;
}
```
