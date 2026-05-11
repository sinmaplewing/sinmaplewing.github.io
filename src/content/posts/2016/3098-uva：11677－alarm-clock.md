---
id: 3098
title: '#UVa：11677－Alarm Clock'
slug: uva：11677－alarm-clock
date: '2016-04-20T21:57:27+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 116
- UVa
permalink: /2016/04/20/3098/uva%ef%bc%9a11677%ef%bc%8dalarm-clock/
wp_status: publish
wp_type: post
---

直接算出第二個時間與第一個時間的時間差，若為負數表示其實還相隔了一整天，再加上24個小時即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11677 Alarm Clock                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int H1, M1, H2, M2;
  while( scanf("%d%d%d%d", &H1, &M1, &H2, &M2) != EOF &&
         (H1 != 0 || M1 != 0 || H2 != 0 || M2 != 0 )){
    int minutes = (H2 - H1) * 60 + (M2 - M1);
    if( minutes < 0 ){
      minutes += 24 * 60;
    }

    printf("%d\n", minutes);
  }
  return 0;
}
```
