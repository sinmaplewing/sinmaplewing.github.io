---
id: 2715
title: '#UVa：10131－Is Bigger Smarter?'
slug: uva：10131－is-bigger-smarter
date: '2015-03-15T02:52:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2015/03/15/2715/uva%ef%bc%9a10131%ef%bc%8dis-bigger-smarter/
wp_status: publish
wp_type: post
---

先用重量或是IQ對資料做排序，接著再用LIS的技巧對另外一項去做即可得解。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 10131 Is Bigger Smarter?                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/03/15                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

const int NO_MEMBER = -1;

struct Elephant{
  int id;
  int weight;
  int IQ;
};

bool cmpWeight(const Elephant &a, const Elephant &b){
  return a.weight <= b.weight;
}

void printLIS(const vector<Elephant> &elephants,  
              const vector<int> &LISprevious,
              int index ){
  if( LISprevious[index] != NO_MEMBER ) printLIS( elephants, LISprevious, LISprevious[index] );
  printf("%d\n", elephants[index].id);
}

int main(){
  vector<Elephant> elephants;
  Elephant e;
  while( scanf("%d%d", &(e.weight), &(e.IQ)) != EOF ){
    e.id = elephants.size() + 1;
    elephants.push_back(e);
  }

  sort(elephants.begin(), elephants.end(), cmpWeight);

  vector<int> LISlength(elephants.size(), 1);
  vector<int> LISprevious(elephants.size(), NO_MEMBER);

  int maxLength = 0, maxIndex = NO_MEMBER;
  for( int i = 0 ; i < elephants.size() ; ++i ){
    for( int j = i + 1 ; j < elephants.size() ; ++j ){
      if( elephants[i].weight < elephants[j].weight &&
          elephants[i].IQ > elephants[j].IQ ){
        if( LISlength[i] + 1 > LISlength[j] ){
          LISlength[j] = LISlength[i] + 1;
          LISprevious[j] = i;
        }
      }
    }
    if( LISlength[i] > maxLength ){
      maxLength = LISlength[i];
      maxIndex = i;
    }
  }

  printf("%d\n", maxLength);
  printLIS(elephants, LISprevious, maxIndex);

  return 0;
}
```
