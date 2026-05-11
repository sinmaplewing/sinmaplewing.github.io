---
id: 4321
title: '#UVa：540－Team Queue'
slug: uva：540－team-queue
date: '2019-04-21T23:43:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2019/04/21/4321/uva%ef%bc%9a540%ef%bc%8dteam-queue/
wp_status: publish
wp_type: post
---

對於每個團隊，各自有一個 Queue 管理各個團隊人員的順序，接著再利用一個 Queue 去決定這些團隊的順序即可。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 540 Team Queue                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/21                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <map>
#include <vector>
#include <queue>
using namespace std;

int main(){
  int t;
  int caseNumber = 1;
  while(scanf("%d", &t) != EOF && t > 0){
    map<int, int> teamIndexMap;

    int n;
    for(int teamIndex = 0 ; teamIndex < t ; ++teamIndex){
      scanf("%d", &n);

      int member; 
      for(int i = 0 ; i < n ; ++i){
        scanf("%d", &member);
        teamIndexMap[member] = teamIndex;
      }
    }

    printf("Scenario #%d\n", caseNumber++);

    vector<queue<int>> individualTeamQueue(t);
    queue<queue<int>*> teamQueue;
    string command;
    int x;
    while(cin >> command && command != "STOP"){
      if(command == "ENQUEUE"){
        scanf("%d", &x);

        int teamIndex = teamIndexMap[x];
        if(individualTeamQueue[teamIndex].empty()){
          teamQueue.push(&individualTeamQueue[teamIndex]);
        }
        individualTeamQueue[teamIndex].push(x);
      }
      else if(command == "DEQUEUE"){
        queue<int>* firstTeamQueue = teamQueue.front();
        printf("%d\n", firstTeamQueue->front());
        firstTeamQueue->pop();

        if(firstTeamQueue->empty()) teamQueue.pop();
      }
    }
    printf("\n");
  }

  return 0;
}
```
