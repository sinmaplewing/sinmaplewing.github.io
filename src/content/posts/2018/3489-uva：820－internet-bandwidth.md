---
id: 3489
title: '#UVa：820－Internet Bandwidth'
slug: uva：820－internet-bandwidth
date: '2018-05-14T01:05:28+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 8
- UVa
permalink: /2018/05/14/3489/uva%ef%bc%9a820%ef%bc%8dinternet-bandwidth/
wp_status: publish
wp_type: post
---

Maximum Flow 的經典題型。可以使用 Maximum Flow 的演算法（像是 Ford-Fulkerson Algorithm 或是 Edmonds-Karp Algorithm）解決。

P.S. 題目中，給予 a 到 b 的 bandwidth 的部分 `a b bandwidth` 有可能會給予好幾組相同的 a, b ，故要全部加總起來去做運算。

參考：[Programming學習筆記 - UVa 820 Network Bandwidth](http://programming-study-notes.blogspot.tw/2014/04/uva-820-network-bandwidth.html)

**C++(0.010)**
```
/*******************************************************/
/* UVa 820 Internet Bandwidth                          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
#include <queue>
using namespace std;

const int FLOW_MAX_VALUE = 10000000;

int getMaxFlow(const vector<vector<int>> &capacity, int s, int t, int n){
  int result = 0;
  vector<vector<int>> flow(n+1, vector<int>(n+1, 0));
   while(true){
     vector<int> bottleneck(n+1, 0);
     bottleneck[s] = FLOW_MAX_VALUE;
     queue<int> bfsQueue;
     bfsQueue.push(s);
     
     vector<int> previousNode(n+1, 0);
     
     while(!bfsQueue.empty() && bottleneck[t] == 0){
       int current = bfsQueue.front();
       bfsQueue.pop();
       for(int next = 1; next <= n ; ++next){
         if(bottleneck[next] == 0 && capacity[current][next] > flow[current][next]){
           bfsQueue.push(next);
           previousNode[next] = current;
           bottleneck[next] = min(bottleneck[current], capacity[current][next] - flow[current][next]);
         }
       }
     }
    
    if(bottleneck[t] == 0) break;   
     for(int current = t; current != s; current = previousNode[current]){
       flow[previousNode[current]][current] += bottleneck[t];
       flow[current][previousNode[current]] -= bottleneck[t];
     }
     
     result += bottleneck[t];
   }
   
   return result;
}

int main(){
  int testcase = 1;
  int n;
  while(scanf("%d", &n) != EOF && n != 0){
    vector<vector<int>> capacity(n+1, vector<int>(n+1, 0));
    
    int s, t, c;
    scanf("%d%d%d", &s, &t, &c);
        
    int a, b, bandwidth;
    for(int i = 0 ; i < c ; ++i){
      scanf("%d%d%d", &a, &b, &bandwidth);
      capacity[a][b] += bandwidth;
      capacity[b][a] += bandwidth;
    }
    
    printf("Network %d\n", testcase++);
    printf("The bandwidth is %d.\n\n", getMaxFlow(capacity, s, t, n));
  }
  
  return 0;
}
```
