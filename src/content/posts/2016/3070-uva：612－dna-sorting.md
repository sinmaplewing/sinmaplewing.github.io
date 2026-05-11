---
id: 3070
title: '#UVa：612－DNA Sorting'
slug: uva：612－dna-sorting
date: '2016-04-19T22:39:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 6
- UVa
permalink: /2016/04/19/3070/uva%ef%bc%9a612%ef%bc%8ddna-sorting/
wp_status: publish
wp_type: post
---

為每個DNA序列算出其錯位的個數之後，依照錯位個數去排序DNA即可。

**C++(0.090)**
```cpp
/*******************************************************/
/* UVa 612 DNA Sorting                                 */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/19                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct DNA{
  string sequence;
  int inverse;
  int id;

  DNA(string s, int inputID){
    sequence = s;
    inverse = 0;
    id = inputID;

    int count[26] = {0};
    for( int i = 0 ; i < s.length() ; ++i ){
      for( int j = s[i] - 'A' + 1 ; j < 26 ; ++j ){
        inverse += count[j];
      }

      ++count[s[i]-'A'];
    }
  }
};

bool cmpDNA( const DNA &a, const DNA &b ){
  return (a.inverse < b.inverse) || (a.inverse == b.inverse && a.id < b.id);
}

int main(){
  int M;
  while( scanf("%d", &M) != EOF ){
    for( int caseNumber = 0 ; caseNumber < M ; ++caseNumber ){
      if( caseNumber > 0 ){
        printf("\n");
      }

      int n, m;
      scanf("%d%d", &n, &m);

      vector<DNA> DNAs;
      for( int i = 0 ; i < m ; ++i ){
        string input;
        cin >> input;

        DNA dna(input, i);
        DNAs.push_back(dna);
      }

      sort(DNAs.begin(), DNAs.end(), cmpDNA);

      for( int i = 0 ; i < DNAs.size() ; ++i ){
        printf("%s\n", DNAs[i].sequence.c_str());
      }

    }
  }

  return 0;
}
```
