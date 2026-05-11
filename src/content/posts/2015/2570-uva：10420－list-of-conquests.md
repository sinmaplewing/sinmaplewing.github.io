---
id: 2570
title: '#UVa：10420－List of Conquests'
slug: uva：10420－list-of-conquests
date: '2015-01-02T23:08:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2015/01/02/2570/uva%ef%bc%9a10420%ef%bc%8dlist-of-conquests/
wp_status: publish
wp_type: post
---

計算國家的數量並照國家的名稱排序輸出即可。

P.S. 女生的名字並沒規定會有幾個字，若假定只有兩個字的話會WA。

**C++(0.022)**
```cpp
/*******************************************************/
/* UVa 10420 List of Conquests                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/02                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <algorithm>
using namespace std;

int main(){
  int n;
  string country[2005];
  while( scanf("%d", &n) != EOF ){

    string name;
    for( int i = 0 ; i < n ; ++i ){
      cin >> country[i];
      getline(cin, name);
    }
  }
 
  sort( country, country+n );

  for( int i = 0 ; i < n ; ++i ){
    printf("%s", country[i].c_str() );

    int count = 0;
    int j;
    for( j = i ; j < n ; ++j ){
      if( country[i] != country[j] ){
        break;
      }

      ++count;
    }

    printf(" %d\n", count);
    i = j-1;
  }

  return 0;
}
```
