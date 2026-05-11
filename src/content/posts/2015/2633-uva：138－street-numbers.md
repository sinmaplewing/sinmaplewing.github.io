---
id: 2633
title: '#UVa：138－Street Numbers'
slug: uva：138－street-numbers
date: '2015-01-08T14:59:37+08:00'
lastmod: '2015-01-08T15:17:48+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/01/08/2633/uva%ef%bc%9a138%ef%bc%8dstreet-numbers/
wp_status: publish
wp_type: post
---

窮舉可能的房屋號碼，對於每一個號碼算出一個可以讓前面總和和後面總和相同的最後號碼，如果最後號碼是整數即是解。最後號碼的算法的推導：
[latex]
\text{the sum of (1 ~ HouseNumber-1)} = \text{the sum of (HouseNumber+1 ~ LastNumber)} \\\\
\Rightarrow \frac{(HouseNumber - 1) \* HouseNumber}{2} = \frac{(HouseNumber+1+LastNumber)\*(LastNumber-HouseNumber)}{2}  \\\\
\Rightarrow LastNumber = \frac{-1+\sqrt{1+8\*HouseNumber^2}}{2}
[/latex]

**C++(0.759)**
```cpp
/*******************************************************/
/* UVa 138 Street Numbers                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/08                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  double houseNumber = 1;
  for( int i = 0 ; i < 10 ; ++i ){
    bool isAnswer = false;
    while( !isAnswer ){
      ++houseNumber;
      double lastNumber = (-1 + sqrt(1.0 + houseNumber * houseNumber * 8)) / 2;
      if( lastNumber == floor(lastNumber) ){
        printf("%10.0lf%10.0lf\n", houseNumber, lastNumber);
        isAnswer = true;
      }
    }
  }
  return 0;
}
```
