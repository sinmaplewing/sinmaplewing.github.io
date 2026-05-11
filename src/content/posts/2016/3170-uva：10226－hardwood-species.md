---
id: 3170
title: '#UVa：10226－Hardwood Species'
slug: uva：10226－hardwood-species
date: '2016-07-30T08:21:25+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 102
- UVa
permalink: /2016/07/30/3170/uva%ef%bc%9a10226%ef%bc%8dhardwood-species/
wp_status: publish
wp_type: post
---

將所有物種的數量記下來算比例即可。

**C++(0.680)**
```cpp
/*******************************************************/
/* UVa 10226 Hardwood Species                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/30                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;

int main(){
  int numTestcase;
  while( scanf("%d", &numTestcase) != EOF ){
    getchar(); // for '\n'

    string input;
    getline(cin, input); // for blank line

    for( int testcase = 0 ; testcase < numTestcase ; ++testcase ){
      if( testcase > 0 ){
        printf("\n");
      }

      map<string, int> numSpecies;
      int total = 0;
      while( getline(cin, input) && input != "" ){
        ++numSpecies[input];
        ++total;
      }

      for( map<string, int>::iterator it = numSpecies.begin();
           it != numSpecies.end() ; ++it ){
        printf("%s %.4f\n", it->first.c_str(), (double)it->second / total * 100);
      }

    }

  }
  return 0;
}
```
