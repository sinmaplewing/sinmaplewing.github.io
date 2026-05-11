---
id: 4402
title: '#UVa：11389－The Bus Driver Problem'
slug: uva：11389－the-bus-driver-problem
date: '2019-06-05T10:40:39+08:00'
lastmod: '2019-12-01T23:07:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 113
- UVa
permalink: /2019/06/05/4402/uva%ef%bc%9a11389%ef%bc%8dthe-bus-driver-problem/
wp_status: publish
wp_type: post
---

由於每個司機會超時的時間一樣，所以意味著就是早上路線的長度加上下午路線的長度要盡量越小越好，故即是早上路線由小到大加上下午路線由大到小的組合。

如果不是這樣組合，就會造成有某一項特別大，有某一項特別小，如果都有超時或都沒有超時那就沒差，但一旦大的超時而小的沒超時，就表示要盡量將大的組合多出來的部分補給小的組合，讓小的組合可以把不用超時的餘額減得越小越好，因此即是上述這種排序所組合出來的應該會是最小超時的組合。

**C++(0.060)**
```cpp
/*******************************************************/
/* UVa 11389－The Bus Driver Problem                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/06/05                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

void InputNumbers(vector<int> &array){
  for(int i = 0 ; i < array.size() ; ++i){
    scanf("%d", &array[i]);
  }
}

int main() {
  int n, d, r;
  while(scanf("%d%d%d", &n, &d, &r) != EOF
        && n != 0 && d != 0 && r != 0){
    vector<int> morningRoutes(n, 0);
    vector<int> eveningRoutes(n, 0);
    InputNumbers(morningRoutes);
    InputNumbers(eveningRoutes);
    
    sort(morningRoutes.begin(), morningRoutes.end());
    sort(eveningRoutes.begin(), eveningRoutes.end());
    
    int overtimeAmountLength = 0;
    for(int i = 0 ; i < n ; ++i){
      int driverRouteLength = morningRoutes[i] + eveningRoutes[eveningRoutes.size() - i - 1];
      overtimeAmountLength += (d < driverRouteLength) ? driverRouteLength - d : 0;
    }
    
    printf("%d\n", overtimeAmountLength * r);
  }
  return 0;
}
```
