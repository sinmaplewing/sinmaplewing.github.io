---
id: 4864
title: '#LeetCode：278. First Bad Version'
slug: leetcode-：278-first-bad-version
date: '2020-05-02T11:28:06+08:00'
lastmod: '2020-05-03T11:52:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/02/4864/leetcode-%ef%bc%9a278-first-bad-version/
wp_status: publish
wp_type: post
---

此題要找出版本序列中第一個壞版本是哪一個版本。

直接使用循序搜尋會超過時間，故此題必須使用二分搜尋法來找。要注意的一個重點是，當要透過上下限來切一半的時候，不可以直接使用 `(upper + lower) / 2`，因為 `upper + lower` 有機會會超過 32 位元整數的上限，故要使用下限當作基底，往上加差距的一半的方法：`lower + (upper - lower) / 2`。

**Kotlin(224ms)**
```kotlin
/*******************************************************
 * LeetCode 278. First Bad Version                     *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/02                                 *
 *******************************************************/
/* The isBadVersion API is defined in the parent class VersionControl.
       def isBadVersion(version: Int): Boolean = {} */
class Solution: VersionControl() {    
    override fun firstBadVersion(n: Int) : Int {
        var lowerBound = 1
        var upperBound = n
        
        while (lowerBound <= upperBound) {
            val currentValue = lowerBound + (upperBound - lowerBound) / 2
            val isCurrentBadVersion = isBadVersion(currentValue)
            if (isCurrentBadVersion) {
                upperBound = currentValue - 1
            } else lowerBound = currentValue + 1
        }
        
        return lowerBound
	}
}
```
