---
id: 4259
title: '#LeetCode：50. Pow(x, n)'
slug: leetcode：50-powx-n
date: '2019-04-14T23:52:59+08:00'
lastmod: '2019-04-14T23:54:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[10-99]
permalink: /2019/04/14/4259/leetcode%ef%bc%9a50-powx-n/
wp_status: publish
wp_type: post
---

可以使用底下這個定義來算出答案：

[latex]
pow(x, n) = \begin{cases}
1 & \text{if n = 0} \\\\
x & \text{if n = 1} \\\\
pow(x, \left\lfloor\frac{n}{2}\right\rfloor) \times pow(x, \left\lfloor\frac{n}{2}\right\rfloor) \times x & \text{if n is odd, n > 0} \\\\
pow(x, \left\lfloor\frac{n}{2}\right\rfloor) \times pow(x, \left\lfloor\frac{n}{2}\right\rfloor) & \text{if n is even, n > 0} \\\\
\frac{1}{pow(x, \left|\lfloor\frac{n}{2}\rfloor\right|) \times pow(x, \left|\lfloor\frac{n}{2}\rfloor\right|) \times x} & \text{if n is odd, n < 0} \\\\
\frac{1}{pow(x, \left|\lfloor\frac{n}{2}\rfloor\right|) \times pow(x, \left|\lfloor\frac{n}{2}\rfloor\right|)} & \text{if n is even, n < 0} \\\\
\end{cases}
[/latex]

**C++(4ms)**
```cpp
/*******************************************************/
/* LeetCode 50. Pow(x, n)                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/14                                 */
/*******************************************************/
#include <cstdlib>

class Solution {
public:
  double myPow(double x, int n) {
    if(n == 0) return 1;
    if(n == 1) return x;

    double halfPow = myPow(x, abs((long long int)n) / 2);
    double value = halfPow * halfPow * ((n % 2 == 0) ? 1 : x);
    return (n < 0)? 1 / value : value;
  }
};
```
