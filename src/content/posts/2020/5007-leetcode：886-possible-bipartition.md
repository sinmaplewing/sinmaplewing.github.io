---
id: 5007
title: '#LeetCode：886. Possible Bipartition'
slug: leetcode：886-possible-bipartition
date: '2020-05-27T23:14:56+08:00'
lastmod: '2020-05-28T01:31:11+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/27/5007/leetcode%ef%bc%9a886-possible-bipartition/
wp_status: publish
wp_type: post
---

此題給予 N 個人，並且給予 N 個人互相討厭的關係，試求能否將 N 個人分成兩群，且各群裡面的人互相都不討厭對方。

可以將此題轉換成 N 個點，並將互相討厭的關係當作線連起來，這樣題目就可以變成要用兩種顏色塗上這些點，且相鄰的點不可同色，也就變成了著色問題。（可以將顏色想像成群組的編號，而相鄰點不能同色就是因為他們是互相討厭的關係，故不能在同一個群組內）

著色問題的解法就是先找出一個尚未上色的點，將之填上其中一種顏色，接著利用 DFS 的方式將相鄰的點填上另外一種顏色，如果填著填著發現出現了相鄰同色的狀況，則代表無法用兩種顏色來填，也就代表無法將 N 個人分成兩群互相不討厭對方的群組；反之，如果全部的點都可以用這個規則填色，則代表可以用兩種顏色來填，也就代表可以將 N 個人分成兩群互相不討厭對方的群組，即得解。

**Kotlin(404ms)**
```kotlin
/*******************************************************
 * LeetCode 886. Possible Bipartition                  *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/27                                 *
 *******************************************************/
const val NO_COLOR = -1

class Solution {
    fun possibleBipartition(N: Int, dislikes: Array<IntArray>): Boolean {
        val graph = Array<MutableList<Int>>(N + 1, { mutableListOf<Int>() })
        for (dislike in dislikes) {
            graph[dislike[0]].add(dislike[1])
            graph[dislike[1]].add(dislike[0])
        }
        
        val colorNodes = IntArray(N + 1, { NO_COLOR })
        for (i in 1..N) {
            if (colorNodes[i] == NO_COLOR && 
                !colorGraph(colorNodes, graph, i, 0, 1)
            ) {
                return false
            }
        }
        
        return true
    }
    
    fun colorGraph(
        colorNodes: IntArray, 
        graph: Array<MutableList<Int>>, 
        index: Int, 
        color: Int,
        otherColor: Int
    ): Boolean {
        colorNodes[index] = color
        for (nextNodeIndex in graph[index]) {
            if (colorNodes[nextNodeIndex] == color) return false
            if (colorNodes[nextNodeIndex] == NO_COLOR &&
                !colorGraph(colorNodes, graph, nextNodeIndex, otherColor, color)        
            ) {
                return false
            }
        }
        
        return true
    }
}
```
