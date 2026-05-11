---
id: 2426
title: '#UVa：10392－Factoring Large Numbers'
slug: uva：10392－factoring-large-numbers
date: '2014-12-18T14:10:22+08:00'
lastmod: '2014-12-31T23:06:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 103
- UVa
permalink: /2014/12/18/2426/uva%ef%bc%9a10392%ef%bc%8dfactoring-large-numbers/
wp_status: publish
wp_type: post
---

建質數表去做質數分解即可。要注意的事情是通常是要檢查到根號N，但這題若是直接跑到根號N會超過質數表建的範圍(題目所寫)，所以要在取兩者之最小值以避免超出質數表的陣列取用。

**C++(0.042)**
```cpp
/*******************************************************/
/* UVa 10392 Factoring Large Numbers                   */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/12/18                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cmath>
using namespace std;

const int MAX_PRIME_LIMIT = 1000000;
const double EPSILON = 1e-9;

int main(){
  bool composite[MAX_PRIME_LIMIT+5] = { true, true };
  for( int i = 2 ; i <= MAX_PRIME_LIMIT ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j <= MAX_PRIME_LIMIT ; j += i ){
        composite[j] = true;
      }
    }
  }

  long long int value;
  while( scanf("%lld", &value) != EOF && value >= 0 ){
    long long int sqrt_value = (long long int)(sqrt((double)value) + EPSILON);
    sqrt_value = min(sqrt_value, (long long int)MAX_PRIME_LIMIT);
    
    for( long long int i = 0 ; i <= sqrt_value ; ++i ){
      if( !composite[i] ){
        while( value % i == 0 ){
          printf("    %lld\n", i);
          value /= i;
        }
      }
    }

    if( value > 1 ) printf("    %lld\n", value);
    printf("\n");
  }
  return 0;
}

```
