---
id: 3102
title: '#UVa：10104－Euclid Problem'
slug: uva：10104－euclid-problem
date: '2016-04-24T10:57:58+08:00'
lastmod: '2016-04-24T10:58:50+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2016/04/24/3102/uva%ef%bc%9a10104%ef%bc%8deuclid-problem/
wp_status: publish
wp_type: post
---

利用輾轉相除法的特性即可得解。

如果[latex]A \mod B = 0[/latex]，則[latex]X = 0, Y = 1[/latex]；反之則反。

如果[latex]A \mod B \neq 0, A \ge B[/latex]，則根據遞迴式得知[latex]\gcd(A,B) = \gcd(A - B * \lfloor\frac{A}{B}\rfloor, B)[/latex]，由此式可得[latex]\gcd(A - B * \lfloor\frac{A}{B}\rfloor, B) = (A - B * \lfloor\frac{A}{B}\rfloor) \times X' + B \times Y' = \gcd(A,B) = AX + BY[/latex]，整理整理可得：[latex]AX' - (B * \lfloor\frac{A}{B}\rfloor)X' + BY' = AX' + B(Y' - \lfloor\frac{A}{B}\rfloor X') = AX + BY[/latex]，所以兩相對照之下可得[latex]X = X', Y = (Y' - \lfloor\frac{A}{B}\rfloor X')[/latex]；反之則利用相同方式推導。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 10104 Euclid Problem                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/24                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int gcd(int A, int B, int &X, int &Y){
  if( A % B == 0 ){
    X = 0;
    Y = 1;
    return B;
  }

  if( B % A == 0 ){
    X = 1;
    Y = 0;
    return A;
  }

  if( A >= B ){
    int x, y;
    int value = gcd(A + B * (-A/B), B, x, y);
    X = x;
    Y = y + x * (-A/B);
    return value;
  }
  else {
    int x, y;
    int value = gcd(A, B + A * (-B/A), x, y);
    X = x + (-B/A) * y;
    Y = y;
    return value;
  }
}


int main(){
  int A, B;
  while( scanf("%d%d", &A, &B) != EOF ){
    int X, Y;
    int value = gcd(A, B, X, Y);
    printf("%d %d %d\n", X, Y, value);
  }

  return 0;
}
```
