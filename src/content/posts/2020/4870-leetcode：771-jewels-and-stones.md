---
id: 4870
title: '#LeetCode：771. Jewels and Stones'
slug: leetcode：771-jewels-and-stones
date: '2020-05-03T11:56:03+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/03/4870/leetcode%ef%bc%9a771-jewels-and-stones/
wp_status: publish
wp_type: post
---

此題想找出的是 J 字串中的各個字元在 S 字串中出現的次數總和。

將 J 字串的各個字集結起來形成一個 Set，並巡覽 S 字串中的各個字元看有沒有在 J 字串形成的 Set 中出現即可。

**Kotlin(280ms)**
```kotlin
/*******************************************************
 * LeetCode 771. Jewels and Stones                     *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/03                                 *
 *******************************************************/
class Solution {
    fun numJewelsInStones(J: String, S: String): Int {
        val isJewelSet = J.toSet()
        return S.count { isJewelSet.contains(it) }
    }
}
```
