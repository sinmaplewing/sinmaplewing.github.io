---
id: 3115
title: '#UVa：315－Network'
slug: uva：315－network
date: '2016-04-27T21:24:37+08:00'
lastmod: '2016-04-27T21:27:18+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2016/04/27/3115/uva%ef%bc%9a315%ef%bc%8dnetwork/
wp_status: publish
wp_type: post
---

尋找一張圖的critical point有幾個點：利用DFS從第一個開始當作root開始建樹，只要發現連結的點尚未走過就當作自己的child，而如果是有走過的點而且不是自己的parent表示有一條back edge，利用這些自己這個點的back edge和所有自己的children能走到最遠的的祖先去紀錄整體能走到最遠的的祖先到哪裡，則那位祖先只要不是root就是其中一個critical point（因為它的children只要不經過這個點就無法連過去它parent以上的祖先）。而判斷祖先是否為critical point僅要判斷其children是否有兩個以上即可。

參考：[演算法筆記－Cut Vertex](http://www.csie.ntnu.edu.tw/~u91029/Component.html)

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 315 Network                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/27                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <sstream>
using namespace std;

int findCriticalPoint(bool connected[105][105], int travelNumber[], 
                      int connectToParent[], int nowTravel, int i, int parentI, int n){
  int childrenCount = 0;
  bool isCriticalPoint = false;
  int childrenCriticalCount = 0;
  travelNumber[i] = connectToParent[i] = nowTravel;
  
  for( int j = 1 ; j <= n ; ++j ){
    if( connected[i][j] ){
      if( travelNumber[j] > 0 && parentI != j ){ // back edge
        connectToParent[i] = min( connectToParent[i], travelNumber[j] ); 
      }
      else if( travelNumber[j] == 0 ){
        ++childrenCount;
        childrenCriticalCount += findCriticalPoint(connected, travelNumber, connectToParent, nowTravel+1, j, i, n);
        connectToParent[i] = min( connectToParent[i], connectToParent[j] );
        
        if( connectToParent[j] >= travelNumber[i] ){
          isCriticalPoint = true;
        }
      }
    }
  }
  
  if( (parentI == 0 && childrenCount > 1) || ( parentI != 0 && isCriticalPoint ) ){
    return childrenCriticalCount + 1;
  }              
  else {
    return childrenCriticalCount;
  }
}

int main(){
  int N;
  while( scanf("%d ", &N) != EOF && N != 0 ){
    bool connected[105][105] = { false };

    string line;
    while( getline(cin, line) && line != "0" ){
      stringstream ss(line);
      int mainPlace, place;
      ss >> mainPlace;
      while( ss >> place ){
        connected[mainPlace][place] = connected[place][mainPlace] = true;
      }
      
    }

    int travelNumber[105] = {0};
    int connectToParent[105] = {0};
    printf("%d\n", findCriticalPoint(connected, travelNumber, connectToParent, 1, 1, 0, N));
  }
  return 0;
}
```
