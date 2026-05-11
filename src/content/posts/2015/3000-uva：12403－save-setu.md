---
id: 3000
title: '#UVa：12403－Save Setu'
slug: uva：12403－save-setu
date: '2015-12-02T15:08:53+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 124
- UVa
permalink: /2015/12/02/3000/uva%ef%bc%9a12403%ef%bc%8dsave-setu/
wp_status: publish
wp_type: post
---

照著題目要求加總donate進來的金額，並在輸入report的時候做輸出。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12403 Save Setu                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/12/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

int main(){
  int T;
  while( scanf("%d", &T) != EOF ){
    int totalMoney = 0;

    for( int i = 0 ; i < T ; ++i ){
      string cmd;
      cin >> cmd;
      if( cmd == "donate" ){
        int money;
        scanf("%d", &money);
        totalMoney += money;
      }
      else if( cmd == "report" ){
        printf("%d\n", totalMoney);
      }
    }
  }
  return 0;
}
```
