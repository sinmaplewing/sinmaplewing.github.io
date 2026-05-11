---
id: 3021
title: '#UVa：336－A Node Too Far'
slug: uva：336－a-node-too-far
date: '2016-03-14T16:31:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 3
- UVa
permalink: /2016/03/14/3021/uva%ef%bc%9a336%ef%bc%8da-node-too-far/
wp_status: publish
wp_type: post
---

先將點之間的連線利用資料結構存下來，接著利用BFS去做搜尋即可知道有多少點連不到。

P.S. 如果用DFS的話無法做「探訪過的點不再探訪」的優化，原因是因為不能確保第一次探訪到該點時TTL為最大的值。

**C++(0.059)**
```cpp
/*******************************************************/
/* UVa 336 A Node Too Far                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/14                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <map>
#include <queue>
#include <utility>
using namespace std;

struct Node{
  int value;
  bool isVisited;
  vector<Node *> connectTo;
};

Node *findNode(map<int, Node*> &nodeMap, int value){
  if( nodeMap.find(value) != nodeMap.end() ){
    return nodeMap[value];
  }
  else{
    Node *newNode = new Node;
    newNode->value = value;
    newNode->isVisited = false;
    return nodeMap[value] = newNode;
  }
}

void BFSNode(Node *node, int TTL){
  queue< pair<Node *, int> > flooding;
  flooding.push( pair<Node *, int>(node, TTL) );

  while( !flooding.empty() ){
    pair<Node *, int> floodingPoint = flooding.front();
    flooding.pop();

    Node *nowNode = floodingPoint.first;
    int nowTTL = floodingPoint.second;

    nowNode->isVisited = true;
    if( nowTTL == 0 ){
      continue;
    }

    for( int i = 0 ; i < nowNode->connectTo.size() ; ++i ){
      if( !nowNode->connectTo[i]->isVisited ){
        flooding.push( pair<Node *, int>(nowNode->connectTo[i], nowTTL-1) );
      }
    }
  }
}

int main(){
  int caseNumber = 0;
  int NC;
  while( scanf("%d", &NC) != EOF && NC != 0 ){
    map<int, Node*> nodeMap;

    for( int i = 0 ; i < NC ; ++i ){
      int a, b;
      scanf("%d%d", &a, &b);

      Node *aValue = findNode(nodeMap, a),
           *bValue = findNode(nodeMap, b);
      if( aValue != bValue ){
        aValue->connectTo.push_back(bValue);
        bValue->connectTo.push_back(aValue);
      }
    }

    int nodeValue, TTL;
    while( scanf("%d%d", &nodeValue, &TTL) != EOF &&
           (nodeValue != 0 || TTL != 0) ){
      if( nodeMap.find(nodeValue) != nodeMap.end() ){
        BFSNode(nodeMap[nodeValue], TTL);
      }

      int count = 0;
      for( map<int, Node*>::iterator it = nodeMap.begin() ;
           it != nodeMap.end() ; ++it ){
        if( it->second->isVisited ){
          it->second->isVisited = false;
        }
        else{
          ++count;
        }
      }

      printf("Case %d: %d nodes not reachable from node %d with TTL = %d.\n",
             ++caseNumber, count, nodeValue, TTL );
    }

    for( map<int, Node*>::iterator it = nodeMap.begin() ;
         it != nodeMap.end() ; ++it ){
      delete it->second;
    }
  }

  return 0;
}
```
