---
id: 2664
title: '#UVa：103－Stacking Boxes'
slug: uva：103－stacking-boxes
date: '2015-01-14T19:59:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2015/01/14/2664/uva%ef%bc%9a103%ef%bc%8dstacking-boxes/
wp_status: publish
wp_type: post
---

先對每個Box的長度做排序，再對全部Box的序列做排序，接著用LIS(Longest Increasing Subsequence)的方法即可得解。

**C++(0.016)**
```cpp
/*******************************************************/
/* UVa 103 Stacking Boxes                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
struct Box{
  int id;
  vector<int> length;

  Box(int i = 0, int n = 0, int value = 0){
    id = i;
    length = vector<int>(n, value);
  }
};

bool boxCompare(const Box &a, const Box &b){
  for( int i = 0 ; i < a.length.size() ; ++i ){
    if( a.length[i] < b.length[i] ) return true;
    if( a.length[i] > b.length[i] ) return false;
  }
  return true;
}


bool isBoxContain(const Box &a, const Box &b){
  for( int i = 0 ; i < a.length.size() ; ++i ){
    if( a.length[i] <= b.length[i] ) return false;
  }
  return true;
}

void printNestingBox(const vector<int> &prevNesting, const vector<Box> &boxSequence, int lastbox, bool printSpace){
  if( lastbox == -1 ) return ;

  printNestingBox( prevNesting, boxSequence, prevNesting[lastbox], true );
  printf("%d", boxSequence[lastbox].id);
  if( printSpace ) printf(" ");
}

int main(){
  int k, n;
  while( scanf("%d%d", &k, &n) != EOF ){
    
    vector<Box> boxSequence;
    for( int i = 0 ; i < k ; ++i ){
      Box box(i+1, n, 0);
      for( int j = 0 ; j < n ; ++j ){
        scanf("%d", &(box.length[j]));
      }
      sort( box.length.begin(), box.length.end() );
      boxSequence.push_back(box);
    }
    
    sort( boxSequence.begin(), boxSequence.end(), boxCompare );

    vector<int> maxNesting(k, 1), prevNesting(k, -1);
    int maxlength = 1, lastbox = 0;
    for( int i = 0 ; i < boxSequence.size() ; ++i ){
      for( int j = 0 ; j < i ; ++j ){
        if( isBoxContain(boxSequence[i], boxSequence[j]) ){
          if( maxNesting[j]+1 > maxNesting[i] ){
            maxNesting[i] = maxNesting[j] + 1;
            prevNesting[i] = j;
            if( maxNesting[i] > maxlength ){
              maxlength = maxNesting[i];
              lastbox = i;
            }
          }
        }
      }
    }

    printf("%d\n", maxlength);
    printNestingBox(prevNesting, boxSequence, lastbox, false);
    printf("\n");
  }
  return 0;
}
```
