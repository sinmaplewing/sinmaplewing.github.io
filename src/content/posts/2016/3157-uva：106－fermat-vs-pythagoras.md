---
id: 3157
title: '#UVa：106－Fermat vs. Pythagoras'
slug: uva：106－fermat-vs-pythagoras
date: '2016-07-29T01:47:01+08:00'
lastmod: '2016-07-29T01:53:51+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2016/07/29/3157/uva%ef%bc%9a106%ef%bc%8dfermat-vs-pythagoras/
wp_status: publish
wp_type: post
---

利用維基百科中的[Pythagorean triple](https://en.wikipedia.org/wiki/Pythagorean_triple)可知要求出每一組primitive triple可用下列公式：[latex]x = a \times a - b \times b,y = 2 \times a \times b,z = a \times a + b \times b[/latex]。而且a與b之間為互質，且必為一奇一偶。

因此可以利用兩層的巢狀迴圈將a與b列舉出來並求出所有的primitive triple有哪些，求出primitive triple後為了要能確定有哪些數字是不會出現在所有的Pythagorean triple中，故必須要將其triple的所有倍數都找過，例如透過a與b可以求出(3,4,5)這個primitive triple，但若要算有哪些數字不會出現在所有的Pythagorean triple中，則要記得檢查它的倍數(6,8,10)、(9,12,15)......等等。

**C++(0.090)**
```cpp
/*******************************************************/
/* UVa 106 Fermat vs. Pythagoras                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <cmath>
using namespace std;

const double ERROR = 1e-9;

int gcd(int a, int b){
  while( (a %= b) && (b %= a) );
  return a+b;
}

int main(){
  int N;
  while( scanf("%d", &N) != EOF ){
    vector<bool> used(N+5, false);
    int numTriples = 0;

    for( int i = 1 ; i <= (int)(sqrt(N)+ERROR) ; ++i ){
      for( int j = i+1 ; ; j += 2 ){
        if( gcd(i, j) != 1 ){
          continue;
        }

        int x, y, z;
        x = j*j - i*i;
        y = 2*j*i;
        z = j*j + i*i;

        if( x > N || y > N || z > N ){
          break;
        }
        
        ++numTriples;
        for( int otherX = x, otherY = y, otherZ = z ; 
            otherX <= N && otherY <= N && otherZ <= N ; 
            otherX += x, otherY += y, otherZ += z ){
          used[otherX] = used[otherY] = used[otherZ] = true;
        }
      }
    }

    int numNotUsed = 0;
    for( int i = 1 ; i <= N ; ++i ){
      if( !used[i] ){
        ++numNotUsed;
      }
    }

    printf("%d %d\n", numTriples, numNotUsed);

  }
  return 0;
}
```
