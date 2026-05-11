---
id: 4876
title: '#LeetCode：476. Number Complement'
slug: leetcode：476-number-complement
date: '2020-05-04T21:28:40+08:00'
lastmod: '2020-05-04T21:40:22+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/04/4876/leetcode%ef%bc%9a476-number-complement/
wp_status: publish
wp_type: post
---

此題要將整數用二進位表示法列出後，算出從最高位的 1 往最低位去做全部 0 與 1 反轉的結果。

最基本的想法是從二進位的個位數一位一位得出來後，反轉加進一個變數中即可。如果本身語言對數值二進位運算有做優化的話，可以找最高位的 1 在哪裡之後，整個反轉，往前移最高位前面零的個數，再往後移回來並補零即可。

**Kotlin - Basic Solution (132ms)**
```kotlin
/*******************************************************
 * LeetCode 476. Number Complement                     *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/04                                 *
 *******************************************************/
class Solution {
    fun findComplement(num: Int): Int {
        var remainNumber = num
        var value = 0
        var base = 1
        while (remainNumber > 0) {
            value += base * if (remainNumber % 2 == 0) 1 else 0
            
            remainNumber /= 2
            base *= 2
        }
        
        return value
    }
}
```

**Kotlin - Advanced Solution (120ms)**
```kotlin
/*******************************************************
 * LeetCode 476. Number Complement                     *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/04                                 *
 *******************************************************/
class Solution {
    fun findComplement(num: Int): Int {
        /* 
            Next line can be changed with 
            experimental standard library API : num.countLeadingZeroBits()
            when it is stable.
        */
        val leadingZeroCount = Integer.numberOfLeadingZeros(num) 
        return num.inv().shl(leadingZeroCount).shr(leadingZeroCount)
    }
}
```
