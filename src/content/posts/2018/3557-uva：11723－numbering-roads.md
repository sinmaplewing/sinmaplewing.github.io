---
id: 3557
title: '#UVa：11723－Numbering Roads'
slug: uva：11723－numbering-roads
date: '2018-05-20T10:41:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2018/05/20/3557/uva%ef%bc%9a11723%ef%bc%8dnumbering-roads/
wp_status: publish
wp_type: post
---

計算有這麼多可以用的數字上，能夠用幾種方式分別所有的道路，如果超過 26 + 1 （ 26 個字母加上不加字母）種的話，就表示不可能。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11723 Numbering Roads                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

int main(){
  int N, R;
  int caseNumber = 1;
  while(scanf("%d%d", &N, &R) != EOF &&
        N != 0 && R != 0){
    int group = (int)ceil((double)N / R);
    
    printf("Case %d: ", caseNumber++);
    if( group > 27 ){
      printf("impossible");
    }
    else{
      printf("%d", group - 1);
    }
    printf("\n");
    
  }
  return 0;
}
```

