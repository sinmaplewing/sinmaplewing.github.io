---
id: 3100
title: '#UVa：11777－Automate the Grades'
slug: uva：11777－automate-the-grades
date: '2016-04-20T22:35:00+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 117
- UVa
permalink: /2016/04/20/3100/uva%ef%bc%9a11777%ef%bc%8dautomate-the-grades/
wp_status: publish
wp_type: post
---

將成績照著公式算出總和再判斷等第即可得解。

P.S. 最後三科課堂考試成績只取前兩高的分數做平均。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11777 Automate the Grades                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

struct Grade{
  char name;
  int score;
};

int main(){
  const Grade gradeTable[] = { {'A', 90}, {'B', 80}, {'C', 70}, {'D', 60}, {'F', 0}};
  int gradeTableSize = sizeof(gradeTable) / sizeof(Grade);

  int T;
  while( scanf("%d", &T) != EOF ){
    int term1, term2, final, attendence, classTest1, classTest2, classTest3;
    for( int caseNumber = 1 ; caseNumber <= T ; ++caseNumber ){
      scanf("%d%d%d%d%d%d%d", &term1, &term2, &final, &attendence, &classTest1, &classTest2, &classTest3);
      int score = term1 + term2 + final + attendence +
                  ( max( max(classTest1, classTest2), classTest3 ) +
                    max( min(classTest1, classTest2), min( max(classTest1, classTest2), classTest3 ) ) ) / 2;
      for( int i = 0 ; i < gradeTableSize ; ++i ){
        if( score >= gradeTable[i].score ){
          printf("Case %d: %c\n", caseNumber, gradeTable[i].name);
          break;
        }
      }
    }
  }

  return 0;
}
```
