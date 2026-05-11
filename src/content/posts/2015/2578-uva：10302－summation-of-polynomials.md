---
id: 2578
title: '#UVa：10302－Summation of Polynomials'
slug: uva：10302－summation-of-polynomials
date: '2015-01-04T00:45:59+08:00'
lastmod: '2015-01-04T00:46:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2015/01/04/2578/uva%ef%bc%9a10302%ef%bc%8dsummation-of-polynomials/
wp_status: publish
wp_type: post
---

利用公式解即可，注意範圍會超過int的限制。

**C++(0.019)**
```cpp
/*******************************************************/
/* UVa 10302 Summation of Polynomials                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/03                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  long long int x;
  while( scanf("%lld", &x) != EOF ){
    printf("%lld\n", x*x*(x+1)*(x+1)/4 );
  }
  
  return 0;
}
```
