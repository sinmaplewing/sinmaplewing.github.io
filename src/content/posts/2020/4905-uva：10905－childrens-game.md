---
id: 4905
title: '#UVa：10905－Children''s Game'
slug: uva：10905－childrens-game
date: '2020-05-07T00:24:10+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 109
- UVa
permalink: /2020/05/07/4905/uva%ef%bc%9a10905%ef%bc%8dchildrens-game/
wp_status: publish
wp_type: post
---

將輸入的數字用字串存下來，接著進行排序，兩兩排序方式為兩個字串前後互換接接看，看誰在前面形成的數字比較大的話，就把該字串排前面。排序完成後，全部字串照順序接起來即是答案。

**C++(0.070)**
```cpp
/*******************************************************/
/* UVa 10905 Children's Game                           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

bool compare(const string& a, string& b) {
  return a + b > b + a;
}

int main() {
  int N;
  while (scanf("%d", &N) != EOF && N != 0) {
    vector<string> numbers;
    for (int i = 0 ; i < N ; ++i) {
      string input;
      cin >> input;
      numbers.push_back(input);
    }

    sort(numbers.begin(), numbers.end(), compare);
    string result;
    for (int i = 0 ; i < numbers.size() ; ++i) {
      result += numbers[i];  
    }

    printf("%s\n", result.c_str());
  }

  return 0;
}
```
