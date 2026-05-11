---
id: 2651
title: '#UVa：11503－Virtual Friends'
slug: uva：11503－virtual-friends
date: '2015-01-09T14:53:01+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 115
- UVa
permalink: /2015/01/09/2651/uva%ef%bc%9a11503%ef%bc%8dvirtual-friends/
wp_status: publish
wp_type: post
---

照著題目去實作兩個set的union，並將每次union完後set裡的元素個數輸出。

**C++(2.722)**
```cpp
/*******************************************************/
/* UVa 11503 Virtual Friends                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <map>
#include <set>
#include <algorithm>
using namespace std;

const int FRIEND_LIMITS = 100000;

int findSetNumber(map<string, int> &friendToSet, vector< set<string> > &sets, int &setCount, string friendName){
  int setNumber;
  if( friendToSet.find(friendName) == friendToSet.end() ){
    setNumber = setCount++;
    friendToSet[friendName] = setNumber;
    sets[setNumber].insert(friendName);
  }
  else{
    setNumber = friendToSet[friendName];
  }

  return setNumber;
}


int main(){
  int testcase;
  while( scanf("%d", &testcase) != EOF ){
    for( int t = 0 ; t < testcase ; ++t ){
      int F;
      scanf("%d", &F);

      map<string, int> friendToSet;
      vector< set<string> > sets(2*FRIEND_LIMITS+5);
      int setCount = 0;
      for( int i = 0 ; i < F ; ++i ){
        string friend1, friend2;
        cin >> friend1 >> friend2;

        int set1, set2;
        set1 = findSetNumber( friendToSet, sets, setCount, friend1 );
        set2 = findSetNumber( friendToSet, sets, setCount, friend2 );

        int finalSet = min(set1, set2);
        if( set1 != set2 ){
          int removeSet = max(set1, set2);

          for( set<string>::iterator it = sets[removeSet].begin() ; it != sets[removeSet].end() ; ++it ){
            friendToSet[*it] = finalSet;
            sets[finalSet].insert(*it);
          }
        }

        printf("%d\n", sets[finalSet].size());
      }

    }

  }

  return 0;
}
```
