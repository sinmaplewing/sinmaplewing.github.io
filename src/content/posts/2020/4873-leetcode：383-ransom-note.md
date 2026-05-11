---
id: 4873
title: '#LeetCode：383. Ransom Note'
slug: leetcode：383-ransom-note
date: '2020-05-04T09:51:29+08:00'
lastmod: '2020-05-04T11:11:07+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/04/4873/leetcode%ef%bc%9a383-ransom-note/
wp_status: publish
wp_type: post
---

此題要找出在勒索信上所使用到的字是否都可以從雜誌上剪下來貼成。

對兩邊的字串建立一個字數與數量的 `Map`，接著比較從勒索信字串所建立的 `Map`，是否每個字皆在透過雜誌字串所建立的 `Map` 中，且數量皆形成小於或等於的關係即可。

**Kotlin(252ms)**
```kotlin
/*******************************************************
 * LeetCode 383. Ransom Note                           *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/03                                 *
 *******************************************************/
class Solution {
    fun getLetterCountMap(s: String): Map<Char, Int> = 
            s.groupingBy({ it }).eachCount()
            
    fun canConstruct(ransomNote: String, magazine: String): Boolean {
        val magazineLetterCountMap = getLetterCountMap(magazine)
        val ransomNoteLetterCountMap = getLetterCountMap(ransomNote)
        
        for ((c, count) in ransomNoteLetterCountMap) {
            if (!magazineLetterCountMap.containsKey(c)) return false
            
            val magazineCount = magazineLetterCountMap[c] ?: 0
            if (count > magazineCount) return false
        }
        
        return true
    }
}
```
