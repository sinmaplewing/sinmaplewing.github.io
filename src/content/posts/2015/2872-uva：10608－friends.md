---
id: 2872
title: '#UVa：10608－Friends'
slug: uva：10608－friends
date: '2015-07-26T09:12:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 106
- UVa
permalink: /2015/07/26/2872/uva%ef%bc%9a10608%ef%bc%8dfriends/
wp_status: publish
wp_type: post
---

利用disjoint set去實作這樣的關係即可得解。

P.S. 不得使用while(scanf("%d", &testcase) != EOF){...}，會TLE。

**C++(0.027)**
```cpp
/*******************************************************/
/* UVa 10608 Friends                                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/07/26                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

const int MAX_CITIZEN = 30005;

int findRoot(int group[MAX_CITIZEN], int x){
  if( group[x] == x ) return x;
  return group[x] = findRoot( group, group[x] );
}

void unionGroup(int group[MAX_CITIZEN], int count[MAX_CITIZEN], int A, int B){
  int rootA = findRoot(group, A);
  int rootB = findRoot(group, B);

  if( rootA != rootB ){
    group[rootB] = rootA;
    count[rootA] += count[rootB];
  }
}


int main(){
  int testcase;
  scanf("%d", &testcase);
  for( int caseCount = 0 ; caseCount < testcase ; ++caseCount ){
    int N, M;
    scanf("%d%d", &N, &M);

    int group[MAX_CITIZEN], count[MAX_CITIZEN];
    for( int i = 1 ; i <= N ; ++i ){
      group[i] = i;
      count[i] = 1;
    }

    for( int i = 0 ; i < M ; ++i ){
      int A, B;
      scanf("%d%d", &A, &B);

      unionGroup(group, count, A, B);
    }

    int maxCount = 0;
    for( int i = 1 ; i <= N ; ++i ){
      maxCount = max( maxCount, count[i] );
    }

    printf("%d\n", maxCount);
  }
  return 0;
}

```
