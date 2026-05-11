---
id: 3523
title: '#UVa：1185－Big Number'
slug: uva：1185－big-number
date: '2018-05-17T00:28:34+08:00'
lastmod: '2018-05-17T00:58:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- UVa
- Volume 11
permalink: /2018/05/17/3523/uva%ef%bc%9a1185%ef%bc%8dbig-number/
wp_status: publish
wp_type: post
---

對數字取以 10 為底的 log 即可得其位數，故要求 n 階層的位數有多少為：
[latex]
\begin{align}
 GetDigit(n!) & = \lfloor {\log (n!)} \rfloor + 1 \newline
               & = \lfloor {\log (n \times (n-1) \times (n-2) \times \dots 1)} \rfloor + 1 \newline
               & = \lfloor {\log n} + {\log (n-1)} + {\log (n-2)} + \dots + {\log 1} \rfloor + 1 \newline
\end{align}
[/latex]

透過公式了解可以對各項取 Log 再加總後，就利用 DP 解決即可。

**C++(0.330)**
```cpp
/*******************************************************/
/* UVa 1185 Big Number                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  int caseCount;
  scanf("%d", &caseCount);
  
  double logValue[10000005] = {0};
  int maxNumber = 0;
  for(int caseNumber = 0 ; caseNumber < caseCount ; ++caseNumber){
    int n;
    scanf("%d", &n);
    
    if( n > maxNumber ){
      for(int i = maxNumber + 1 ; i <= n ; ++i ){
        logValue[i] = logValue[i-1] + log10(i);
      }
    }
    
    printf("%d\n", (int)logValue[n] + 1);
  }
  
  return 0;
}
```
