---
id: 4238
title: '#UVa：10067－Playing with Wheels'
slug: uva：10067－playing-with-wheels
date: '2019-04-12T01:17:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2019/04/12/4238/uva%ef%bc%9a10067%ef%bc%8dplaying-with-wheels/
wp_status: publish
wp_type: post
---

利用 BFS 搜尋即可。可將每一種四位數的齒輪數字利用一個整數去計算，另外對於已經走過的狀態或是被禁止的狀態可以利用一個布林陣列去紀錄，讓你在 BFS 的過程中可以快速查表剪枝。

**C++(0.080)**
```cpp
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <queue>
using namespace std;

const int WHEEL_COUNT = 4;

struct StateStep{
  int state;
  int step;
};

int inputWheels(){
  int state = 0;
  string temp;
  for(int i = 0 ; i < WHEEL_COUNT ; ++i){
    cin >> temp;
    state = state * 10 + (temp[0] - '0');
  }

  return state;
}

int main(){

  int N;
  while(scanf("%d", &N) != EOF){
    for(int caseNumber = 1 ; caseNumber <= N ; ++caseNumber){
      int initialState = inputWheels();
      int targetState = inputWheels();

      int n;
      vector<bool> forbiddenStates(10000, false);

      scanf("%d", &n);
      for(int i = 0 ; i < n ; ++i){
        forbiddenStates[inputWheels()] = true;
      }
      
      int totalStep = -1;
      queue<StateStep> states;
      states.push(StateStep{initialState, 0});

      while(!states.empty()){
        StateStep currentState = states.front();
        states.pop();

        if(currentState.state == targetState){
          totalStep = currentState.step;
          break;
        }

        int nextStep = 1;
        for(int i = 0 ; i < WHEEL_COUNT ; ++i, nextStep *= 10){
          int currentWheelState = currentState.state % (nextStep * 10) / nextStep;
          int leftWheelState = (currentWheelState - 1 + 10) % 10;
          int rightWheelState = (currentWheelState + 1) % 10;
          int leftRotateState = currentState.state - currentWheelState * nextStep + leftWheelState * nextStep;
          int rightRotateState = currentState.state - currentWheelState * nextStep + rightWheelState * nextStep;

          if(!forbiddenStates[leftRotateState]) states.push(StateStep {leftRotateState, currentState.step + 1});
          if(!forbiddenStates[rightRotateState]) states.push(StateStep {rightRotateState, currentState.step + 1});
          forbiddenStates[leftRotateState] = true;
          forbiddenStates[rightRotateState] = true;
        }
      }

      printf("%d\n", totalStep);
    }
  }
  return 0;
}
```
