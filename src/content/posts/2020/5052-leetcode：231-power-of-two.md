---
id: 5052
title: '#LeetCode：231. Power of Two'
slug: leetcode：231-power-of-two
date: '2020-06-08T21:22:02+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/08/5052/leetcode%ef%bc%9a231-power-of-two/
wp_status: publish
wp_type: post
---

此題要求給予的數字是否為二的次方數。

由於要求的為二的次方數，故其如果使用 Bitwise 的表示法去表示該數字時，僅有一位數會為 1，所以只要求該數字與(該數字 - 1)做 AND 運算後，結果沒有任何一位數字留下來的話，即是答案。

**Kotlin(152ms)**
```kotlin
/*******************************************************
 * LeetCode 231. Power of Two                          *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/08                                 *
 *******************************************************/
class Solution {
    fun isPowerOfTwo(n: Int): Boolean =
        (n > 0) && (n and (n - 1) == 0)
}
```
