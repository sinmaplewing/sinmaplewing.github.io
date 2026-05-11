---
id: 3753
title: '#UVa：594－One Little, Two Little, Three Little Endians'
slug: uva：594－one-little-two-little-three-little-endians
date: '2018-10-06T17:43:07+08:00'
lastmod: '2018-10-06T17:45:39+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2018/10/06/3753/uva%ef%bc%9a594%ef%bc%8done-little-two-little-three-little-endians/
wp_status: publish
wp_type: post
---

首先要先了解 Endian 的概念，可以看[維基上的介紹](https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E5%BA%8F)，基本上這題要做的就是 Big-Endian 和 Little-Endian 之間的轉換。

由於儲存在電腦中的資料被處理的單位是以 Byte 為主，故如果是一個 32bits(4bytes) 整數通常會被分成 4 個部分去處理，那問題就在於這個整數的 4 個部分該怎麼去放。

**例如：1234567890**

* 換成二進位的數值是 01001001 10010110 00000010 11010010 ，將之分成四個 Byte 的部分就是
  1. 01001001
  2. 10010110
  3. 00000010
  4. 11010010
* 以 Big-Endian 來存放，從儲存地址低到高的順序就會是 (1) (2) (3) (4) ，也就是 01001001 10010110 11010010 11010010，與平常閱讀的方式相同。
* 而已 Little-Endian 來存放，從儲存地址低到高的順序就會是 (4) (3) (2) (1) ，也就是 11010010 11010010 10010110 01001001。

知道這個原理後，這題使用位元運算即可得解。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 594 One Little, Two Little, Three Little Endians*/
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/06                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>

int main(){
  const int BYTES_COUNT = 4;
  const int BITS_COUNT = 8;
  const int BYTES_MASK = 255; // 11111111

  int number;
  while(scanf("%d", &number) != EOF){
    printf("%d converts to ", number);

    int oppositeEndianNumber = 0;
    for(int i = 0 ; i < BYTES_COUNT ; ++i){
      oppositeEndianNumber <<= BITS_COUNT;
      oppositeEndianNumber |= (number & BYTES_MASK);
      number >>= BITS_COUNT;
    }

    printf("%d\n", oppositeEndianNumber);
  }
  return 0;
}
```
