---
id: 3036
title: '#UVa：200－Rare Order'
slug: uva：200－rare-order
date: '2016-03-17T01:48:58+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 2
- UVa
permalink: /2016/03/17/3036/uva%ef%bc%9a200%ef%bc%8drare-order/
wp_status: publish
wp_type: post
---

利用字串之間的關係找出每兩個字元的大小關係，將所有出現字元利用大小關係連成一張圖後利用拓樸排序將大小順序輸出。

P.S. 最後記得換行，我因為沒換行結果吃WA。Orz...

**C++(0.266)**
```cpp
/*******************************************************/
/* UVa 200 Rare Order                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/03/17                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <map>
using namespace std;

struct Character{
  char c;
  map<char, Character *> lessThan;
};

Character *findCharacter(map<char, Character *> &lessGraph, char c){
  if( lessGraph.find(c) != lessGraph.end() ){
    return lessGraph[c];
  }
  else {
    Character *newChar = new Character;
    newChar->c = c;
    return lessGraph[c] = newChar;
  }
}

int main(){
  vector<string> orderedList;
  string input;
  while( cin >> input ){
    if( input != "#" ){
      orderedList.push_back(input);
      continue;
    }

    map<char, Character *> lessGraph;
    for( int i = 0 ; i < orderedList.size() ; ++i ){
      for( int j = i+1 ; j < orderedList.size() ; ++j ){
        int minLength = min(orderedList[i].length(), orderedList[j].length());
        for( int k = 0 ; k < minLength ; ++k ){
          if( orderedList[i][k] != orderedList[j][k] ){
            Character *a = findCharacter(lessGraph, orderedList[i][k]),
                  *b = findCharacter(lessGraph, orderedList[j][k]);
            b->lessThan[a->c] = a;
            break;
          }
        }
      }
    }

    int charTotalCount = lessGraph.size();
    for( int i = 0 ; i < charTotalCount ; ++i ){
      for( map<char, Character *>::iterator it = lessGraph.begin() ; 
         it != lessGraph.end() ; ++it ){
        if( it->second->lessThan.size() == 0 ){
          char c = it->second->c;
          printf("%c", c);
          delete it->second;
          lessGraph.erase(it);
          for( map<char, Character *>::iterator it2 = lessGraph.begin() ; 
             it2 != lessGraph.end() ; ++it2 ){
            it2->second->lessThan.erase(c);
          }
          break;
        }
      } 
    }

    printf("\n");
    orderedList.clear();

  }
  return 0;
}
```
