---
id: 3024
title: '#UVa：12015－Google is Feeling Lucky'
slug: uva：12015－google-is-feeling-lucky
date: '2016-03-14T18:07:46+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 120
- UVa
permalink: /2016/03/14/3024/uva%ef%bc%9a12015%ef%bc%8dgoogle-is-feeling-lucky/
wp_status: publish
wp_type: post
---

每筆測資有十個網址，將十個網址中具有最大值的網址們印出即可。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 12015 Google is Feeling Lucky                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <climits>
#include <string>
#include <vector>
using namespace std;

int main(){
  const int URL_NUMBER = 10;

  int T;
  while( scanf("%d", &T) != EOF ){
    for( int i = 1 ; i <= T ; ++i ){
      vector<string> urls;
      int maxRelevance = INT_MIN;
      
      string url;
      int relevance;
      for( int j = 0 ; j < URL_NUMBER ; ++j ){
        cin >> url;
        scanf("%d", &relevance);

        if( relevance > maxRelevance ){
          maxRelevance = relevance;
          urls.clear();
          urls.push_back(url);
        }
        else if( relevance == maxRelevance ){
          urls.push_back(url);
        }
      }

      printf("Case #%d:\n", i);
      for( int j = 0 ; j < urls.size() ; ++j ){
        printf("%s\n", urls[j].c_str());
      }
    }
  }

  return 0;
}
```
