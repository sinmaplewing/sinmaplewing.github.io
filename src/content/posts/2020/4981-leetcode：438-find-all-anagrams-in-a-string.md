---
id: 4981
title: '#LeetCode：438. Find All Anagrams in a String'
slug: leetcode：438-find-all-anagrams-in-a-string
date: '2020-05-17T21:33:35+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/17/4981/leetcode%ef%bc%9a438-find-all-anagrams-in-a-string/
wp_status: publish
wp_type: post
---

此題要找出 s 字串中，從哪些位置開始可以得到與 p 字串相同的各種字的字數。

基本上就是先對 s 字串中，從開頭與 p 字串相同長度的這個部分去建立字典紀錄各種字的字數有多少，並與 p 字串建立的字典去比較，如果所有字的字數都相等的話即是其中一個答案，接著利用剔除前一個字、增加後一個字的方式去把所有答案都找出即可。

**Kotlin(316ms)**
```kotlin
/*******************************************************
 * LeetCode 438. Find All Anagrams in a String         *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/17                                 *
 *******************************************************/
class Solution {
    fun getLetterCount(s: String): MutableMap<Char, Int> =
        s.fold(mutableMapOf()) { acc, it -> 
            acc[it] = acc.getOrElse(it, { 0 }) + 1
            acc
        }
    
    fun findAnagrams(s: String, p: String): List<Int> {
        var result = mutableListOf<Int>()
        if (s.length < p.length) return result
        
        val pLetterCount = getLetterCount(p)
        val sLetterCount = getLetterCount(s.substring(0, p.length))
        if (pLetterCount == sLetterCount) {
            result.add(0)
        }
        
        for (i in 1..(s.length - p.length)) {
            val previousCharacter = s[i - 1]
            val currentCharacter = s[i + p.length - 1]
            
            sLetterCount.set(previousCharacter,
                sLetterCount.get(previousCharacter)?.minus(1) ?: 0)
            
            if (sLetterCount.get(previousCharacter) == 0)
                sLetterCount.remove(previousCharacter)
            
            sLetterCount.set(currentCharacter, 
                sLetterCount.getOrElse(currentCharacter, { 0 }) + 1)
            
            if (pLetterCount == sLetterCount) {
                result.add(i)
            }
        }
        
        return result
    }
}
```
