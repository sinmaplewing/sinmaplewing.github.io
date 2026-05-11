---
id: 4129
title: '#UVa：10114－Loansome Car Buyer'
slug: uva：10114－loansome-car-buyer
date: '2019-03-29T09:10:05+08:00'
lastmod: '2019-04-01T08:55:45+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2019/03/29/4129/uva%ef%bc%9a10114%ef%bc%8dloansome-car-buyer/
wp_status: publish
wp_type: post
---

車子的價值從 `loan + downPayment` 開始算起，每個月依照所給予的 `depreciations` 去降低它的價值；而你的債務從 `loan` 開始，每個月減少 `loan / month` (`month` 為你總共要繳的月份數量)。接著每個月去計算看看到哪個月的時候車子的價值大過於你的債務，則那個月即是答案。

P.S. 0 個月是 `0 months` 不是 `0 month`，這個錯誤害我找了很久......

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10114 Loansome Car Buyer                        */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/03/29                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

struct Depreciation{
  int month;
  double percentage;
};

int main(){
  int month, recordCount;
  double downPayment, loan;
  while(scanf("%d%lf%lf%d", &month, &downPayment, &loan, &recordCount) != EOF &&
    month >= 0 && downPayment >= 0 && loan >= 0 && recordCount >= 0){
    vector<Depreciation> depreciations(recordCount);
    for (int i = 0; i < recordCount; ++i){
      scanf("%d%lf", &(depreciations[i].month), &(depreciations[i].percentage));
    }

    int currentDepreciationIndex = 0;
    double value = loan + downPayment;
    double monthPay = loan / month;
    int currentMonth;
    for (currentMonth = 0; currentMonth < month; ++currentMonth){
      if(currentDepreciationIndex < recordCount - 1 &&
        depreciations[currentDepreciationIndex + 1].month <= currentMonth){
        ++currentDepreciationIndex;
      }

      value *= (1 - depreciations[currentDepreciationIndex].percentage);
      if(value >= loan){
        break;
      }

      loan -= monthPay;
    }

    printf("%d month%s\n", currentMonth, (currentMonth == 1)? "" : "s");
  }

  return 0;
}
```
