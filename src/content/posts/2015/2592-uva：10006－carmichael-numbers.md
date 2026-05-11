---
id: 2592
title: '#UVa：10006－Carmichael Numbers'
slug: uva：10006－carmichael-numbers
date: '2015-01-08T12:13:12+08:00'
lastmod: '2015-01-08T13:01:47+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 100
- UVa
permalink: /2015/01/08/2592/uva%ef%bc%9a10006%ef%bc%8dcarmichael-numbers/
wp_status: publish
wp_type: post
---

先確認是否為質數，再去做Carmichael Number的檢查。需要的知道的知識就是底下這個式子：
[latex]
a^d\bmod{n} = \begin{cases}
(a^{d/2}\bmod{n} * a^{d/2}\bmod{n})\bmod{n} & \text{if d is even} \\\\
((a^{\left\lfloor d/2 \right\rfloor}\bmod{n} * a^{\left\lfloor d/2 \right\rfloor}\bmod{n})\bmod{n} * a) \bmod{n} & \text{if d is odd}
\end{cases}
[/latex]

**C++(0.242)**
```cpp
/*******************************************************/
/* UVa 10006  Carmichael Numbers                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2015/01/08                                 */
/*******************************************************/
#include <iostream>
#include <cstdio>
using namespace std;

long long int mod(long long int n, long long int a, long long int maxN){
  if( n == 0 ) return 1;
  if( n == 1 ) return a;
  
  long long int modValue = mod(n/2, a, maxN);
  if( n % 2 == 0 ){
    return (modValue * modValue) % maxN;
  }
  else {
    return ((modValue * modValue) % maxN) * a % maxN;
  }
}

bool checkCarmichael(int n, int a){
  if( mod( (long long int)n, (long long int)a, (long long int)n ) == a ){
    return true;
  }
  else {
    return false;
  }
}

int main(){
  bool composite[65005] = {true, true, false};
  for( int i = 2 ; i <= 65000 ; ++i ){
    if( !composite[i] ){
      for( int j = i+i ; j <= 65000 ; j += i ){
        composite[j] = true;
      }
    }
  }

  int n;
  while( scanf("%d", &n) != EOF && n != 0 ){
    bool isCarmichael = true;
    if( !composite[n] ) {
      isCarmichael = false;
    }

    for( int i = 2 ; i < n && isCarmichael ; ++i ){
      isCarmichael = isCarmichael && checkCarmichael(n, i);  
    }
  
    if( isCarmichael ){ 
      printf("The number %d is a Carmichael number.\n", n);
    }
    else{
      printf("%d is normal.\n", n);
    }
  }
  return 0;
}
```
