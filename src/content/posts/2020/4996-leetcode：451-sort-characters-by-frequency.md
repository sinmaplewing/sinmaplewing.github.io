---
id: 4996
title: '#LeetCode：451. Sort Characters By Frequency'
slug: leetcode：451-sort-characters-by-frequency
date: '2020-05-22T17:44:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/22/4996/leetcode%ef%bc%9a451-sort-characters-by-frequency/
wp_status: publish
wp_type: post
---

此題要將給予的字串，依照其各個文字的出現頻率去對這些字母進行由多到少的排序。

將給予的字串先分群紀錄每個字的出現的頻率多寡，並由多到少排序，排完以後再根據每個文字的數量重新組合成新的字串即可。

**Kotlin(268ms)**
```kotlin
/*******************************************************
 * LeetCode 451. Sort Characters By Frequency          *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/22                                 *
 *******************************************************/
class Solution {
    fun frequencySort(s: String): String =
        s.groupingBy({ it }).eachCount().toList()
            .sortedByDescending({ it.second })
            .joinToString("") { 
                it.first.toString().repeat(it.second) 
            }
}
```
