---
id: 3078
title: '#UVa：11877－The Coco-Cola Store'
slug: uva：11877－the-coco-cola-store
date: '2016-04-20T02:48:40+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 118
- UVa
permalink: /2016/04/20/3078/uva%ef%bc%9a11877%ef%bc%8dthe-coco-cola-store/
wp_status: publish
wp_type: post
---

將空瓶每兩兩一組之後，每組各借一個空瓶，剛好都可換一罐可樂，喝完又剛好可以還掉，所以答案即是[latex]\lfloor\frac{\text{空瓶數}}{2}\rfloor[/latex]。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 11877 The Coco-Cola Store                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/20                                 */
/*******************************************************/

#include <iostream>
#include <cstdio>
using namespace std;

int main(){
  int n;
  while( scanf("%d", &n) != EOF && n != 0 ){
      printf("%d\n", n/2);
  }

  return 0;
}
```

