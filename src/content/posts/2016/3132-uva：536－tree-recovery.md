---
id: 3132
title: '#UVa：536－Tree Recovery'
slug: uva：536－tree-recovery
date: '2016-04-28T16:14:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2016/04/28/3132/uva%ef%bc%9a536%ef%bc%8dtree-recovery/
wp_status: publish
wp_type: post
---

由於前序是(中,左,右)，而中序是(左,中,右)，故利用前序前頭遇到的字可以知道在中序中這個字會將以它為root的子樹左右兩側分割開來，藉以知道以此字為root的左右子樹的區段為何，利用這樣的切割即可輸出成後序的格式。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 536 Tree Recovery                               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2016/04/28                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

int postOrder(const string& preord, const string &inord, int preI, int inLow, int inHigh){
  if( inLow >= inHigh ){
    return preI;
  }
  
  for( int i = inLow ; i < inHigh ; ++i ){
    if( inord[i] == preord[preI] ){
      // left, right, mid
      preI = postOrder(preord, inord, preI+1, inLow, i);
      preI = postOrder(preord, inord, preI, i+1, inHigh);
      printf("%c", inord[i]);
      break;
    }
  }
  
  return preI;
}

int main(){
  string preord, inord;
  while( cin >> preord >> inord ){
    postOrder(preord, inord, 0, 0, inord.length());
    printf("\n");
  }
  return 0;
}
```
