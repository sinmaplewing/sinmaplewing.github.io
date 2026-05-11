---
id: 4929
title: '#UVa：10179－Irreducable Basic Fractions'
slug: uva：10179－irreducable-basic-fractions
date: '2020-05-07T10:22:44+08:00'
lastmod: '2020-05-07T10:25:41+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 101
- UVa
permalink: /2020/05/07/4929/uva%ef%bc%9a10179%ef%bc%8dirreducable-basic-fractions/
wp_status: publish
wp_type: post
---

此問題即是要找小於 n 並且與 n 互質的數字個數有多少，可以使用[尤拉函數](https://zh.wikipedia.org/zh-tw/%E6%AC%A7%E6%8B%89%E5%87%BD%E6%95%B0)來計算，即爲[latex]\varphi(n) = n \displaystyle\prod_{p \mid n, p \in prime} \left( 1 - \frac{1}{p} \right) = n \displaystyle\prod_{p \mid n, p \in prime} \left( \frac{p - 1}{p} \right)[/latex]。程式流程上大概就是先建質數表，找出 n 的質因數有哪些，然後求出尤拉函數即可。

P.S. 題目中的範例表示會包含 0，但是不包含 1，所以個數剛好與尤拉函數求出來的值還是一樣。

**C++(0.100)**
```cpp
/*******************************************************/
/* UVa 10179 Irreducable Basic Fractions               */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/05/07                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

const int SQRT_INPUT_UPPER_BOUND = 31622;

class PrimeTable {
  private:
    vector<int> _primeNumber;

  public:
    PrimeTable(int size) {
      vector<bool> isPrime(size + 1, true);
      isPrime[0] = false;

      for (int i = 2 ; i <= size ; ++i) {
        if (isPrime[i]) {
          _primeNumber.push_back(i);
          for (int j = i + i ; j <= size ; j += i) {
            isPrime[j] = false;
          }
        }
      }
    }

    int count() const {
      return _primeNumber.size();
    }

    int operator[](int i) const {
      return _primeNumber[i];
    }
};

long long int getEuler(const PrimeTable& primeTable, int n) {
  int number = n;
  long long int result = n;
  int totalPrimeCount = primeTable.count();

  for (int i = 0 ; i < totalPrimeCount ; ++i) {
    int currentPrimeNumber = primeTable[i];
    if (number % currentPrimeNumber == 0) {
      result /= currentPrimeNumber;
      result *= currentPrimeNumber - 1;
      
      while (number % currentPrimeNumber == 0) {
        number /= currentPrimeNumber;
      }
    }
  }

  if (number > 1) {
    result /= number;
    result *= number - 1;
  }

  return result;
}

int main() {
  PrimeTable primeTable(SQRT_INPUT_UPPER_BOUND + 5);

  int n;
  while (scanf("%d", &n) != EOF && n != 0) {
    printf("%lld\n", getEuler(primeTable, n));
  }
  
  return 0;
}
```
