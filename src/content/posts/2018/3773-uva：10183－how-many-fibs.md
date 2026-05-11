---
id: 3773
title: '#UVa：10183－How Many Fibs?'
slug: uva：10183－how-many-fibs
date: '2018-10-09T01:03:35+08:00'
lastmod: '2018-10-09T02:02:04+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2018/10/09/3773/uva%ef%bc%9a10183%ef%bc%8dhow-many-fibs/
wp_status: publish
wp_type: post
---

利用「大數加法」將 [latex]10^100[/latex] 以內的費氏數列計算完並記下，最後利用「大數比較」算出區間內有幾個數字。

**C++(0.000)**
```cpp
/*******************************************************/
/* UVa 10183 How Many Fibs?                            */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/09                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <vector>
using namespace std;

class BigNum{
  private:
    vector<int> _number;
  
  public:
    BigNum(const string &number){
      for(int i = number.length() - 1 ; i >= 0 ; --i){
        _number.push_back(number[i] - '0');
      }
    }

    BigNum(const vector<int> &number){
      _number = number;
    }

    BigNum add(const BigNum &bigNum){
      vector<int> result;
      int index = 0;
      int carry = 0;
      int maxDigit = max(_number.size(), bigNum._number.size());
      for(index = 0 ; index < maxDigit ; ++index){
        int sum = carry;
        if(index < _number.size()) sum += _number[index];
        if(index < bigNum._number.size()) sum += bigNum._number[index];
        result.push_back(sum % 10);
        carry = sum / 10;
      }

      if(carry > 0) result.push_back(carry);
      return BigNum(result);
    }

    int compareTo(const BigNum &bigNum){
      if(_number.size() > bigNum._number.size()) return 1;
      if(_number.size() < bigNum._number.size()) return -1;

      for(int i = _number.size() - 1 ; i >= 0 ; --i){
        if(_number[i] > bigNum._number[i]) return 1;
        if(_number[i] < bigNum._number[i]) return -1;
      }

      return 0;
    }

    int getSize(){ return _number.size(); }
};

int main(){
  vector<BigNum> memorize;
  memorize.push_back(BigNum("1"));
  memorize.push_back(BigNum("2"));
  BigNum nextItem("0");
  do{
    nextItem = memorize[memorize.size() - 1].add(memorize[memorize.size() - 2]);
    memorize.push_back(nextItem);
  } while(nextItem.getSize() <= 100);

  const BigNum ZERO("0");
  string a, b;
  while(cin >> a >> b){
    BigNum aNum(a), bNum(b);
    if(aNum.compareTo(ZERO) == 0 && bNum.compareTo(ZERO) == 0) break;

    int total = 0;
    for(int i = 0 ; i < memorize.size() ; ++i){
      int compareA = aNum.compareTo(memorize[i]);
      int compareB = bNum.compareTo(memorize[i]);

      if(compareB < 0) break;
      
      if(compareA <= 0 && compareB >= 0){
        ++total;
      }
    }

    printf("%d\n", total);
  }
  return 0;
}
```
