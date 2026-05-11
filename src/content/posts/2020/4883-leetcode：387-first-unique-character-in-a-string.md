---
id: 4883
title: '#LeetCode：387. First Unique Character in a String'
slug: leetcode：387-first-unique-character-in-a-string
date: '2020-05-05T21:58:41+08:00'
lastmod: '2020-05-06T17:24:19+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/05/4883/leetcode%ef%bc%9a387-first-unique-character-in-a-string/
wp_status: publish
wp_type: post
---

此題要找出在字串中只有出現過一次的字元其位於字串中的何處。如果有多個字元都只出現過一次，則輸出位置最小的；如果都沒有字元指出現過一次，則輸出 `-1`。

此題就是將字串中的字元一個一個建立與其相對應的 index 表，並將已出現過的字元塞進「已出現過的字元集合」中。如果在建表過程中，某字元已經出現在「已出現過的字元集合」中的話，則略過它並將之從 index 表內刪除。建表完成後，就將 index 表中 index 最小的值拿出來即是答案。如果表內無值的話，則輸出 `-1`。

**Kotlin(240ms)**
```kotlin
/*******************************************************
 * LeetCode 387. First Unique Character in a String    *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/05                                 *
 *******************************************************/
class Solution {
    fun firstUniqChar(s: String): Int {
        var isAppeared = mutableSetOf<Char>()
        var characterToIndexMap = mutableMapOf<Char, Int>()
        
        for ((index, c) in s.withIndex()) {
            if (isAppeared.contains(c)) {
                if (characterToIndexMap.containsKey(c)) {
                    characterToIndexMap.remove(c)
                }
                continue
            }
            
            isAppeared.add(c)
            characterToIndexMap[c] = index
        }
        
        return characterToIndexMap.values.min() ?: -1
    }
}
```
