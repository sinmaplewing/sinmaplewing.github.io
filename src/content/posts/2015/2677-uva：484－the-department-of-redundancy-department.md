---
id: 2677
title: '#UVa：484－The Department of Redundancy Department'
slug: uva：484－the-department-of-redundancy-department
date: '2015-01-15T01:02:55+08:00'
lastmod: '2015-01-26T23:51:42+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 4
- UVa
permalink: /2015/01/15/2677/uva%ef%bc%9a484%ef%bc%8dthe-department-of-redundancy-department/
wp_status: publish
wp_type: post
---

使用C++中的map去做Hash，sort()去做排序即可。

**C++(0.023)**
```cpp
/*******************************************************/
/* UVa 484 The Department of Redundancy Department     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

struct Value{
  int count;
  int order;

  Value(int c = 0, int o = 0){
    count = c;
    order = o;
  }
};

bool compareByValue( const pair<int, Value> &a, const pair<int, Value> &b ){
  if( a.second.order <= b.second.order ) return true;
  return false;
}

int main(){
  map<int, Value> uniqueIntegers;
  int key, order = 1;
  while( scanf("%d", &key) != EOF ){
    if( uniqueIntegers.find(key) == uniqueIntegers.end() ){
      uniqueIntegers[key] = Value(1, order++);
    }
    else{
      ++(uniqueIntegers[key].count);
    }
  }

  vector< pair<int, Value> > sortedIntegers(uniqueIntegers.begin(), 
                                            uniqueIntegers.end());
  sort( sortedIntegers.begin(), sortedIntegers.end(), compareByValue );

  for( vector< pair<int, Value> >::iterator it = sortedIntegers.begin() ;
       it != sortedIntegers.end() ; 
       ++it ){
    printf("%d %d\n", it->first, it->second.count );
  }
  return 0;
}
```
