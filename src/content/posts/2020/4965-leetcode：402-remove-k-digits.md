---
id: 4965
title: '#LeetCode：402. Remove K Digits'
slug: leetcode：402-remove-k-digits
date: '2020-05-13T23:08:56+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/13/4965/leetcode%ef%bc%9a402-remove-k-digits/
wp_status: publish
wp_type: post
---

此題要找出給予的數字刪除掉 K 個位數的所有組合中，數值最小的數字是多少。

首先先考慮數字中，任意兩個相鄰的位數 `a` 與 `b`之間，根據三一律只有三種關係：

1. `a > b`：則刪除 `a` 可比刪除 `b` 來的小。
2. `a == b`：則刪除 `a` 或 `b` 都一樣。
3. `a < b`：則刪除 `b` 可比刪除 `a` 來的小。

依此從高位開始推下去，則會在遞增的位數最後變小前的那一位數會是最適合刪除的位數。舉例：`1357468931250`，從高位開始推：

1. `1 < 3`，則適合刪除後者，繼續往下推。
2. `3 < 5`，則比起原本找到的 3，5 更適合被刪除，繼續往下推。
3. `5 < 7`，則比起原本找到的 5，7 更適合被刪除，繼續往下推。
4. `7 > 4`，則還是原本找到的 7 更適合被刪除，故刪除 7，以此繼續類推。
5. 記得回頭觀察，變成：`5 > 4`，則是 5 更適合被刪除，故刪除 5，以此繼續類推。
6. 記得回頭觀察，變成：`3 < 4`，則適合刪除後者，繼續往下推。後面可以自己再推推看。
7. 最後刪除完 `a < b` 的狀況後，會得到完全遞增的數列，如果需要繼續刪除的話，根據 `a > b` 的規則，就從低位刪除上來即可。

P.S. 數列中，通常會有多個 `a < b` 的狀況，則先刪除高位可以得到比較小的數字。這個事情其實蠻直覺的，基本直覺就是：高位變小會比低位變小來得更小，實際也可以利用類似的方式簡單證明看看。令數字為 `...ab...cd...`，並 `a < b` 且 `c < d`，刪除其中一位會有四種狀況：

1. `...b...cd...`
2. `...a...cd...`
3. `...ab...c...`
4. `...ab...d...`

則會發現刪除低位的地方其意義上會保留 a 在原本的位置，所以都不會比刪除 a 的狀況來得更小。

**Kotlin(212ms)**
```kotlin
/*******************************************************
 * LeetCode 402. Remove K Digits                       *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/13                                 *
 *******************************************************/
class Solution {
    fun removeKdigits(num: String, k: Int): String {
        val newNumber = mutableListOf<Char>()
        var remainK = k
        for (c in num) {
            if (newNumber.size == 0) {
                newNumber.add(c)
                continue
            }
            
            while (remainK > 0 && newNumber.size > 0 && newNumber.last() > c) {
                newNumber.removeAt(newNumber.lastIndex)
                --remainK
            }
            newNumber.add(c)
        }
        
        while (remainK > 0) {
            newNumber.removeAt(newNumber.lastIndex)
            --remainK
        }
        
        return if (newNumber.size == 0) {
            "0"
        } else {
            val firstNotZeroIndex = newNumber.indexOfFirst { it != '0' }
            
            newNumber.subList(
                if (firstNotZeroIndex == -1) newNumber.lastIndex else firstNotZeroIndex, 
                newNumber.size
            ).joinToString("")
        }
    }
}
```
