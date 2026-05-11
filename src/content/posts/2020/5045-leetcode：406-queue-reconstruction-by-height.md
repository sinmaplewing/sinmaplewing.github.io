---
id: 5045
title: '#LeetCode：406. Queue Reconstruction by Height'
slug: leetcode：406-queue-reconstruction-by-height
date: '2020-06-07T11:22:15+08:00'
lastmod: '2020-06-07T11:23:33+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/07/5045/leetcode%ef%bc%9a406-queue-reconstruction-by-height/
wp_status: publish
wp_type: post
---

此題給予每個人的身高以及排在他前面比他高或同身高的人有幾個，想利用此資訊找出原本大家的排序市長怎樣。

可先從身高最小且排在他前面高的人最多的開始找，身高最小的人排在他前面比他高的人的個數其實就代表他所站的位置，因為所有其他人都比他高。接著將他剔除掉之後，又可以再找下一個身高最小的人，以此類推。最後所有人都找完後，再回推每個人的位置建立起新的排序陣列即可。

**Kotlin(512ms)**
```kotlin
/*******************************************************
 * LeetCode 406. Queue Reconstruction by Height        *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/06/07                                 *
 *******************************************************/
class Solution {
    class PersonComparator: Comparator<IntArray> {
        override fun compare(p1: IntArray, p2: IntArray): Int =
            when {
                p1[0] < p2[0] -> -1
                p1[0] > p2[0] ->  1
                p1[1] > p2[1] -> -1
                p1[1] < p2[1] ->  1
                else -> 0
            }
    }
    
    fun reconstructQueue(people: Array<IntArray>): Array<IntArray> {
        if (people.size <= 1) return people
        
        val sortedPeople = mutableListOf<IntArray>()
        val reAddOrderList = people.sortedWith(PersonComparator()).toTypedArray()
        reAddOrderList.reverse()
        for (person in reAddOrderList) {
            sortedPeople.add(person[1], person)   
        }
        
        return sortedPeople.toTypedArray()
    }
}
```
