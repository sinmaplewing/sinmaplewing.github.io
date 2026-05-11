---
id: 2797
title: '#UVa：352－The Seasonal War'
slug: uva：352－the-seasonal-war
date: '2015-05-22T10:10:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2015/05/22/2797/uva%ef%bc%9a352%ef%bc%8dthe-seasonal-war/
wp_status: publish
wp_type: post
---

利用DFS將一塊相連區塊的1找出來，並算總共有幾塊即可。

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 352 The Seasonal War                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/05/22                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

void marked(char map[30][30], bool isVisited[30][30], int i, int j){
  if( map[i][j] != '1' || isVisited[i][j] ) return;
  
  const static int direction[8][2] = { {1, 0}, {-1, 0}, 
                                     {0, 1}, {0, -1},
                                     {1, 1}, {-1, -1},
                                     {-1, 1}, {1, -1}};
  isVisited[i][j] = true;
  
  for( int d = 0 ; d < 8 ; ++d ){
    marked(map, isVisited, i + direction[d][0], j + direction[d][1]); 
  }
}

int main(){
  int n;
  int imageNumber = 0;
  while( scanf("%d", &n) != EOF ){
    char map[30][30] = {0};
    for( int i = 1 ; i <= n ; ++i ){
      scanf("%s", &map[i][1]);
    }
    
    int warCount = 0;
    bool isVisited[30][30] = {false};
    for( int i = 1 ; i <= n ; ++i ){
      for( int j = 1 ; j <= n ; ++j ){
        if( map[i][j] == '1' && !isVisited[i][j] ){
          marked(map, isVisited, i, j);
          ++warCount;
        }
      }
    }
    
    printf("Image number %d contains %d war eagles.\n", ++imageNumber, warCount);
  }
  
  
  return 0;
}
```
