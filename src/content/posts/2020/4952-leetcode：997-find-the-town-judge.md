---
id: 4952
title: '#LeetCode：997. Find the Town Judge'
slug: leetcode：997-find-the-town-judge
date: '2020-05-10T21:02:23+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/10/4952/leetcode%ef%bc%9a997-find-the-town-judge/
wp_status: publish
wp_type: post
---

此題要找出編號 1 ~ N 的人中，被所有其他人信任，但其不信任任何一位其他人的那一位人的編號是多少。

由於題目本身輸入有做很多限制，故基本上就是先算出每個人信任多少人且被多少人信任，接著找出其中僅有的一位被 N - 1 人信任，但信任別人的人數為 0 的人是誰即可得解。

**Kotlin(440ms)**
```kotlin
/*******************************************************
 * LeetCode 997. Find the Town Judge                   *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/10                                 *
 *******************************************************/
class Solution {
    data class Person(val index: Int) {
        var trustCount = 0
        var beTrustedCount = 0
    }
    
    fun findJudge(N: Int, trust: Array<IntArray>): Int {
        val people = Array<Person>(N) { Person(it) }
        for (trustLine in trust) {
            ++people[trustLine[0] - 1].trustCount
            ++people[trustLine[1] - 1].beTrustedCount
        }
        
        val judges = people.filter { it.trustCount == 0 && it.beTrustedCount == N - 1 }
        return if (judges.size == 1) {
            judges.first().index + 1
        } else {
            -1
        }
    }
}
```
