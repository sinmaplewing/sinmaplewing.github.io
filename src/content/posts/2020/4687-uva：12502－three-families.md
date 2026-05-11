---
id: 4687
title: '#UVa：12502－Three Families'
slug: uva：12502－three-families
date: '2020-01-22T10:05:44+08:00'
lastmod: '2020-01-28T10:34:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 125
permalink: /2020/01/22/4687/uva%ef%bc%9a12502%ef%bc%8dthree-families/
wp_status: publish
wp_type: post
---

此題由於必須要不使用到小數計算來得解，故先透過底下推算來得解：
[latex]
\begin{align\*}
T_a &= \text{A 家族總共花的時間} \\\\
T_b &= \text{B 家族總共花的時間} \\\\
M &= \text{C 家族總共花的錢} \\\\
\\\\
T_{total} &= T_a + T_b \\\\
T_o &= \text{原本一個家族要花的時間} \\\\
&= \frac{T_{total}}{3} \\\\
&= \frac{T_a + T_b}{3}  \\\\
\\\\
T_a' &= \text{A 家族多花的時間} \\\\
&= T_a - T_o \\\\
T_b' &= \text{B 家族多花的時間} \\\\
&= T_b - T_o \\\\
\\\\
M_a &= \text{C 家族必須付給 A 家族的錢} \\\\
&= M \times \frac{T_a'}{T_a' + T_b'} \\\\
&= M \times \frac{T_a - T_o}{(T_a - T_o) + (T_b - T_o)))} \\\\
&= M \times \frac{T_a - \frac{T_a+T_b}{3}}{T_a - \frac{T_a+T_b}{3} + T_b - \frac{T_a+T_b}{3}} \\\\
&= M \times \frac{\frac{2T_a - T_b}{3}}{\frac{T_a+T_b}{3}} \\\\
&= \frac{M(2T_a - T_b)}{T_a + T_b} \\\\
\end{align\*}
[/latex]

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12502 Three Families                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/01/22                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int T;
  while(scanf("%d", &T) != EOF){
    for(int caseNumber = 1 ; caseNumber <= T ; ++caseNumber){
      int x, y, z;
      scanf("%d%d%d", &x, &y, &z);
      printf("%d\n", z * (2*x - y) / (x + y));
    }
  }
  
  return 0;
}
```
