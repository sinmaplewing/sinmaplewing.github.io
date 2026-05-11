---
id: 4984
title: '#LeetCode：567. Permutation in String'
slug: leetcode：567-permutation-in-string
date: '2020-05-18T23:30:53+08:00'
lastmod: '2020-05-18T23:31:52+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/18/4984/leetcode%ef%bc%9a567-permutation-in-string/
wp_status: publish
wp_type: post
---

這題要求出 `s2` 字串中，是否有包含 `s1` 字串隨意亂排的其中一種排列組合。

由於是排列組合的其中一種，故只要比較 `s2` 字串中，是否有某一段的各種字母字數跟 `s1` 字串相同。基本上就是先對 `s2` 字串中，從開頭與 `s1` 字串相同長度的這個部分去建立字典紀錄各種字的字數有多少，並與 `s1` 字串建立的字典去比較，如果所有字的字數都相等的話即是其中一個答案，接著利用剔除前一個字、增加後一個字的方式去把所有答案都找出即可。

**Kotlin(228ms)**
```kotlin
/*******************************************************
 * LeetCode 567. Permutation in String                 *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/18                                 *
 *******************************************************/
class Solution {
    fun getLetterCount(s: String): MutableMap<Char, Int> =
        s.fold(mutableMapOf()) { acc, it -> 
            acc.set(it, acc.getOrElse(it, { 0 }) + 1)
            acc
        }
    
    fun checkInclusion(s1: String, s2: String): Boolean {
        if (s1.length > s2.length) return false
        
        val s1LetterCount = getLetterCount(s1)
        val s2LetterCount = getLetterCount(s2.substring(0, s1.length))
        
        if (s1LetterCount == s2LetterCount) return true
        for (index in 1..s2.length - s1.length) {
            val previousCharacter = s2[index - 1]
            val lastCharacter = s2[index + s1.length - 1]
            s2LetterCount.set(previousCharacter, 
                s2LetterCount.get(previousCharacter)?.minus(1) ?: 0)
            if (s2LetterCount.get(previousCharacter)?.equals(0) ?: false)
                s2LetterCount.remove(previousCharacter)
                
            s2LetterCount.set(lastCharacter,
                s2LetterCount.getOrElse(lastCharacter, { 0 }) + 1)
            
            if (s1LetterCount == s2LetterCount) return true
        }
        
        return false
    }
}
```
