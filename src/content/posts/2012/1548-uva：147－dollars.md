---
id: 1548
title: '#UVa：147－Dollars'
slug: uva：147－dollars
date: '2012-03-28T00:04:51+08:00'
lastmod: '2014-12-30T03:22:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- Volume 1
- UVa
permalink: /2012/03/28/1548/uva%ef%bc%9a147%ef%bc%8ddollars/
wp_status: publish
wp_type: post
---

這題是DP的找零錢問題。

有幾種組合的算法，由於可能會有重覆算到的關係，所以要先加入最小的零錢(此題是5c)進去，看看各個值(小於等於300.00)。假設最後一枚硬幣為此零錢能用幾種方法(其實是dp[該值-加入的零錢價值]種)找出來，接著再把次小的零錢(此題是10c)放進去，看看各個值(小於等於300.00)假設最後一枚硬幣為此零錢能用幾種方法(其實是dp[該值-加入的零錢價值]種)找出來，這樣以此類推到最大的零錢，這樣我在算最後一個零錢是10c的組合的時候，我只會找出5c跟10c的組合，不會找出配上20c啦...50c啦...或是1元之類的組合。等到我在算最後一個零錢是20c的組合的時候，我只會找出5c跟10c跟20c的組合，不會找出配上50c啦...或是1元之類的組合。(如果看不懂以上內容，可以翻閱關於DP找零錢問題的教學文章。)

再來應該要建dp表，我們不可能用小數當索引值，所以我們可以把該值乘上100在對應dp的那格為其答案，但是浮點數乘法再配上轉成整數是避不開誤差的Orz...因此請善用兩個整數來存值XD

**C++(0.012)**
```cpp
/*******************************************************/
/* UVa 147 Dollars                                     */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2012/03/28                                 */
/*******************************************************/
#include<iostream>
#include<cstdio>
using namespace std;

int main(){
  long long dp[30005] = {1};
  int money[] = { 10000, 5000, 2000, 1000, 500,
                  200, 100, 50, 20, 10, 5 };
  int part1, part2;

  for( int i = 10 ; i >= 0 ; i-- )
    for( int j = money[i] ; j <= 30000 ; j++ )
      dp[j] += dp[j-money[i]];

  while( scanf( "%d.%d", &part1, &part2 ) != EOF &&
         !( part1 == 0 && part2 == 0 ) )
    printf( "%3d.%02d%17lld\n", part1, part2, dp[part1*100+part2] );

  return 0;
}
```
