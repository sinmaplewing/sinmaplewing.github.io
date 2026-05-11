---
id: 2245
title: '#UVa：516－Prime Land'
slug: uva：516－prime-land
date: '2014-10-06T12:00:15+08:00'
lastmod: '2014-12-31T22:50:08+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 5
- UVa
permalink: /2014/10/06/2245/uva%ef%bc%9a516%ef%bc%8dprime-land/
wp_status: publish
wp_type: post
---

直接把數字算出來減一後再分解回來即可。

P.S. pow函式的小數變成整數會有微小的誤差，要記得加個非常小的值修正過來。

**C++(0.032)**
```cpp
/*******************************************************/
/* UVa 516 Prime Land                                  */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2014/10/06                                 */
/*******************************************************/
#include <iostream>
#include <sstream>
#include <cstdio>
#include <cmath>
#include <stack>
#include <utility>
using namespace std;

const double ERROR = 1e-9;
const int MAX_PRIME_NUM = 40000;

int main(){
  bool composite[MAX_PRIME_NUM] = {true, true, false};
  for( int i = 2 ; i < MAX_PRIME_NUM ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j < MAX_PRIME_NUM ; j += i ){
        composite[j] = true;
      }
    }
  }


  string input;
  while( getline(cin, input) ){
    if( input == "0" ) break;
    stringstream ss(input);
    int base, power;
    int number = 1;
    while( ss >> base >> power ){
      number *= (int)( pow( (double)base, (double)power ) + ERROR );
    }

    --number;

    stack< pair<int, int> > output;
    int sqrt_num = (int)(sqrt( (double)number ) + ERROR);
    for( int i = 2 ; i <= sqrt_num ; ++i ){
      if( !composite[i] ){
        int power = 0;
        while( number % i == 0 ){
          ++power;
          number /= i;
        }

        if( power > 0 ){
          output.push(pair<int, int>(i, power));
        }
      }
    }

    bool print_space = false;
    if( number > 1 ){
      printf("%d 1", number);
      print_space = true;
    }

    while( !output.empty() ){
      pair<int, int> answer = output.top();
      if( print_space ) printf(" ");
      printf("%d %d", answer.first, answer.second);
      print_space = true;

      output.pop();
    }

    printf("\n");
  }

  return 0;
}
```
