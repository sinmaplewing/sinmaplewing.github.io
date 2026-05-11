---
id: 3155
title: '#UVa：10409－Die Game'
slug: uva：10409－die-game
date: '2016-07-29T00:38:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 104
- UVa
permalink: /2016/07/29/3155/uva%ef%bc%9a10409%ef%bc%8ddie-game/
wp_status: publish
wp_type: post
---

將骰子的各面狀態記住(上面1，北面2，西面3，每面與其對面和為7)，接著照著指示去轉動即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10409 Die Game                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/07/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

struct Dice{
  int top, bottom;
  int north, south;
  int east, west;

  Dice(){
    top = 1;
    north = 2;
    west = 3;
    bottom = 6;
    south = 5;
    east = 4;
  }

  void rotate(string command){
    if( command == "north" ){
      swap(top, north);
      swap(south, top);
      swap(bottom, south);
    }
    else if( command == "south" ){
      swap(top, south);
      swap(north, top);
      swap(bottom, north);
    }
    else if( command == "west" ){
      swap(top, west);
      swap(east, top);
      swap(bottom, east);
    }
    else if( command == "east" ){
      swap(top, east);
      swap(west, top);
      swap(bottom, west);
    }
  }

};



int main(){
  int commandNumber;
  while( scanf("%d", &commandNumber) != EOF && commandNumber != 0 ){
    Dice dice;
    for( int i = 0 ; i < commandNumber ; ++i ){
      string command;
      cin >> command;
      dice.rotate(command);
    }

    printf("%d\n", dice.top);
  }

  return 0;
}
```
