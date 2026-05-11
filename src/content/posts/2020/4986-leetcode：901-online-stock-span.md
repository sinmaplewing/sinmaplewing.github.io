---
id: 4986
title: '#LeetCode：901. Online Stock Span'
slug: leetcode：901-online-stock-span
date: '2020-05-19T23:55:22+08:00'
lastmod: '2020-05-20T00:14:44+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/19/4986/leetcode%ef%bc%9a901-online-stock-span/
wp_status: publish
wp_type: post
---

此題要求出每次加入價格後，從後面算往前連續比其小的數字區段共有多長。

此題需維持一個堆疊，在每次數字輸入時，先將比較小的數字 Pop 出來直到遇到比較大的數字出現為止，再將每個數字當時 Push 進去時算出的長度加總即是此次數字區段的長度，最後再將這次的數字與長度 Push 進去即可。

之所以可以這麼做的原因是，當後面的數字能夠比目前 Push 的數字大的話，那自然就會包含這次算出來的整個數字長度都會比這個後來輸入的數字小；而如果後面的數字比目前 Push 的數字小的話，那自然比到這個數字後就不用再比了。

**Kotlin(772ms)**
```kotlin
/*******************************************************
 * LeetCode 901. Online Stock Span                     *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/19                                 *
 *******************************************************/
class StockSpanner() {
    data class StockData (val price: Int, val span: Int)
    
    private var currentPrices = ArrayDeque<StockData>()
    
    fun next(price: Int): Int {
        var currentStockSpan = 1
        var lastStock = currentPrices.lastOrNull()
        while (lastStock != null && lastStock.price <= price) {
            currentStockSpan += lastStock.span
            currentPrices.removeLast()
            lastStock = currentPrices.lastOrNull()
        }
        
        currentPrices.add(StockData(price, currentStockSpan))
        return currentStockSpan
    }

}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = StockSpanner()
 * var param_1 = obj.next(price)
 */
```
