---
id: 2874
title: '#UVa：10324－Zeros and Ones'
slug: uva：10324－zeros-and-ones
date: '2015-07-26T09:30:38+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2015/07/26/2874/uva%ef%bc%9a10324%ef%bc%8dzeros-and-ones/
wp_status: publish
wp_type: post
---

將每個連續的部分當作一個group，最後看頭尾兩側是否在同一個group即可得解。

**C++(0.176)**
```cpp
/*******************************************************/
/* UVa 10324 Zeros and Ones                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
using namespace std;

const int MAX_LENGTH = 1000005;

int main(){
  string input;
  int caseCount = 1;
  while( cin >> input ){
    printf("Case %d:\n", caseCount++);

    int group[MAX_LENGTH] = {0};
    int groupCount = 0;
    for( int i = 1 ; i < input.length() ; ++i ){
      if( input[i] != input[i-1] ){
        ++groupCount;
      }

      group[i] = groupCount;
    }

    int n;
    scanf("%d", &n);
    for( int i = 0 ; i < n ; ++i ){
      int a, b;
      scanf("%d%d", &a, &b);
      if( group[a] == group[b] ){
        printf("Yes\n");
      }
      else{
        printf("No\n");
      }
    }
  }
  return 0;
}

```
