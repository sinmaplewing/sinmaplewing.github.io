---
id: 1816
title: '#UVa：114－Simulation Wizardry'
slug: uva：114－simulation-wizardry
date: '2014-08-15T00:52:25+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2014/08/15/1816/uva%ef%bc%9a114%ef%bc%8dsimulation-wizardry/
wp_status: publish
wp_type: post
---

照著題目去模擬即可，規則很多要注意的一題。

**C++(0.046)**
```cpp
/*******************************************************/
/* UVa 114 Simulation Wizardry                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/08/14                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

struct Bumper {
  int x, y;
  int value;
  int cost;
};

struct Ball {
  int x, y;
  int direction;
  int lifetime;
};

int main(){
  int m, n;

  scanf("%d%d", &m, &n );
  int grid[60][60] = {0};

  int wall_cost, p;
  scanf("%d%d", &wall_cost, &p);

  Bumper bumpers[3600];
  for( int i = 1 ; i <= p ; ++i ){
    scanf("%d%d%d%d", &bumpers[i].x, &bumpers[i].y, 
                      &bumpers[i].value, &bumpers[i].cost);
    grid[bumpers[i].y][bumpers[i].x] = i;
  }

  int ball_number = 0;
  Ball balls[3600];
  while( scanf("%d%d%d%d", &balls[ball_number].x, &balls[ball_number].y,
                           &balls[ball_number].direction, &balls[ball_number].lifetime) != EOF ){
    ++ball_number;
  }

  int total_score = 0;
  for( int i = 0 ; i < ball_number ; ++i ){
    int score = 0;

    while( balls[i].lifetime > 0 ){
      int next_position_x = balls[i].x, next_position_y = balls[i].y;
      switch( balls[i].direction ){
        case 0: ++next_position_x; break;
        case 1: ++next_position_y; break;
        case 2: --next_position_x; break;
        case 3: --next_position_y; break;
        default: break;
      }

      bool turn = false;
      if( next_position_x < 1 || next_position_x > m || 
          next_position_y < 1 || next_position_y > n ){
          turn = true;
          balls[i].lifetime -= wall_cost;
      }

      if( grid[next_position_y][next_position_x] != 0 ){
        turn = true;
        balls[i].lifetime -= bumpers[grid[next_position_y][next_position_x]].cost;

        if( balls[i].lifetime > 0 ){
          score += bumpers[grid[next_position_y][next_position_x]].value;
        }
      }

      if( turn ) balls[i].direction = (balls[i].direction + 4 - 1) % 4;
      else {
        balls[i].x = next_position_x;
        balls[i].y = next_position_y;
        --balls[i].lifetime;
      }

      if( balls[i].lifetime <= 0 ){
        total_score += score;
        printf("%d\n", score);
      }
    }
  }

  printf( "%d\n", total_score );

  return 0;
}
```
