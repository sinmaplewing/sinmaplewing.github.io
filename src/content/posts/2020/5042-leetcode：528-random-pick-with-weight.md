---
id: 5042
title: '#LeetCode：528. Random Pick with Weight'
slug: leetcode：528-random-pick-with-weight
date: '2020-06-05T19:12:36+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/05/5042/leetcode%ef%bc%9a528-random-pick-with-weight/
wp_status: publish
wp_type: post
---

此題要依照所傳入的各數字的權重去進行隨機選取的動作，並回傳其結果。

依照權重進行隨機選取可以使用權重總和去進行隨機生成數字的上界，接著在根據各自的權重，從前到後的去算出相對應的數字會是哪一個數字，例如：權重陣列為 `[2, 3, 4]`，則可利用總和去隨機選數字 `Random(1 ~ 9)`，假設我們選出`4`，就從頭開始減每個數字的權重，可得 `0: 4 - 2 = 2` => `1: 2 - 3 = -1` 得知選取的數字為 1。

那進一步優化，可以將每個數字權重的上限存起來，以上面的例子為例，就可以得到 `[2, 5, 9]` 的陣列，接著就可以將 Random 出來的數字利用二分搜尋去找出第一個大於等於隨機數字的索引在哪裡，即是答案。

**Kotlin(352ms)**
```kotlin
/*******************************************************
 * LeetCode 528. Random Pick with Weight               *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/05                                 *
 *******************************************************/
class Solution(w: IntArray) {
    val sumArray = IntArray(w.size) { 0 }
    val random = Random()
    
    init {
        sumArray[0] = w[0]
        for (i in 1..w.lastIndex) {
            sumArray[i] = sumArray[i - 1] + w[i]
        }
    }
    
    
    fun pickIndex(): Int =
        getUpperBound(
            sumArray,
            random.nextInt(sumArray.last()) + 1,
            0,
            sumArray.lastIndex)
    
    private fun getUpperBound(
        sumArray: IntArray,
        element: Int,
        leftIndex: Int, 
        rightIndex: Int
    ): Int {
        if (leftIndex == rightIndex) return rightIndex

        val mid = pickMid(leftIndex, rightIndex)
        return when {
            sumArray[mid] == element -> mid
            sumArray[mid] < element -> getUpperBound(sumArray, element, mid + 1, rightIndex)
            else -> getUpperBound(sumArray, element, leftIndex, mid)
        }
    }
    
    private fun pickMid(a: Int, b: Int) =
        a + (b - a) / 2
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = Solution(w)
 * var param_1 = obj.pickIndex()
 */
```
