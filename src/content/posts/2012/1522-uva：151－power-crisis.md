---
id: 1522
title: '#UVa：151－Power Crisis'
slug: uva：151－power-crisis
date: '2012-03-25T23:34:49+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/25/1522/uva%ef%bc%9a151%ef%bc%8dpower-crisis/
wp_status: publish
wp_type: post
---

此題為Josephus Problem，不一樣的地方在於剛開始第一個要先砍掉，所以要算N個點可以當作有N-1個點來算，只是原本最後的點13需減1變成12，再來因為編號從0開始編比較好算，所以真正最後的點會變成11。

可用遞迴的方式來想這題，原本有N個人要數m個人來殺，殺完後，以他的下一個為0又重新編號，則表示原本的號碼都被減了m，若比m小的，減完後因為不能為負的，要加回一個N-1。如果要反回去求原本的號碼，那麼就是要加m對N-1取餘數。經過這樣重新編號就會變成N-1個人要數m個人來殺的問題，就這樣一直縮小題目範圍到1個人要數m個人來殺，那麼位移號碼完後的0號一定就是存活者，要推回這個0號是原本N個人的哪一個號碼，就再返回去推出2個人要數m個人來殺的時候它是幾號，那麼根據剛剛推導的，他就是(0+m)%2號，接著再推回3人、4人......一直到N人，即可得解。

**C++(0.008)**
```cpp
/*******************************************************/
/* UVa 151 Power Crisis                                */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/25                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
#include<cstring>
using namespace std;

int main(){
  int N, m, turnoff;

  while( scanf( "%d", &N ) != EOF && N != 0 ){
    N--;
    for( m = 1 ; m < N ; m++ ){
      turnoff = 0;
      for( int i = 1 ; i <= N ; i++ )
        turnoff = (turnoff + m) % i;
      if( turnoff == 11 ) break;
    }
    printf( "%d\n", m );
  }
  return 0;
}
```
