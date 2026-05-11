---
id: 4944
title: '#UVa：11286－Conformity'
slug: uva：11286－conformity
date: '2020-05-09T13:25:19+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 112
- UVa
permalink: /2020/05/09/4944/uva%ef%bc%9a11286%ef%bc%8dconformity/
wp_status: publish
wp_type: post
---

由於要找出各種課程組合究竟有多少人選的數量，故可以將五個選課的編號排序完後連接在一起當 key 去做計算，最後找出最大課程組合選修學生數的總共所選修的學生有多少個即可。

P.S. 擁有最大課程組合選修學生數的課程組合可能不只一個，必須將其人數做加總（像是題目範例的第二個，三個課程組合都是選修人數 1，故其答案為三個課程組合的人數總和 3）。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 11286 Conformity                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

const int MAX_COURSE_NUMBER = 5;

string join(const vector<string>& strings) {
  string result;
  for (int i = 0 ; i < strings.size() ; ++i) {
    result += strings[i];
  }
  return result;
}

int main() {
  int n;
  while (scanf("%d", &n) != EOF && n != 0) {
    map<string, int> courseCombinationCount;
    for (int i = 0 ; i < n ; ++i) {
      vector<string> courses(MAX_COURSE_NUMBER);
      for (int j = 0 ; j < MAX_COURSE_NUMBER ; ++j) {
        cin >> courses[j];
      }
      sort(courses.begin(), courses.end());
      ++courseCombinationCount[join(courses)];
    }

    int maxNumberStudents = 0;
    int totalNumberStudents = 0;
    for (
      map<string, int>::iterator it = courseCombinationCount.begin() ;
      it != courseCombinationCount.end() ;
      ++it
    ) {
      if (it->second > maxNumberStudents) {
        maxNumberStudents = it->second;
        totalNumberStudents = it->second;
      } else if (it->second == maxNumberStudents) {
        totalNumberStudents += it->second;
      }
    }

    printf("%d\n", totalNumberStudents);
  }

  return 0;
}
```
