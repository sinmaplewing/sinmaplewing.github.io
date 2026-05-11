---
id: 5012
title: '#LeetCode：207. Course Schedule'
slug: leetcode：207-course-schedule
date: '2020-05-29T18:07:45+08:00'
lastmod: '2020-05-29T18:08:13+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/29/5012/leetcode%ef%bc%9a207-course-schedule/
wp_status: publish
wp_type: post
---

此題給予要選修的課程以及這些課程的先修關係，求出是否能夠在符合這些課程先修關係下修完所有課程。

如果將這些課程當作點、先修關係當作邊，即可形成一個有向圖，接著題目就會變成要找出該有向圖是否具有 cycle (循環)，如果有 cycle 則答案為無法，沒有 cycle 則答案為可以。而找出這件事情的方法就可以使用 Topological Sort (拓樸排序)去檢查是否有 cycle (或稱是否為一個 DAG (Directed Acyclic Graph / 有向無環圖))，底下的程式碼即是改造了簡單的拓樸排序去進行判斷。

**Kotlin(200ms)**
```kotlin
/*******************************************************
 * LeetCode 207. Course Schedule                       *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/29                                 *
 *******************************************************/
class Solution {
    data class CourseNode(val index: Int) {
        var isVisited = false
        var isTemporaryVisited = false
        val nextCourseIndexes = mutableListOf<Int>()
    }
    
    fun hasCycle(courseGraph: Array<CourseNode>, index: Int): Boolean {
        if (courseGraph[index].isVisited) return false
        if (courseGraph[index].isTemporaryVisited) return true
        
        courseGraph[index].isTemporaryVisited = true
        for (courseIndex in courseGraph[index].nextCourseIndexes) {
            if (hasCycle(courseGraph, courseIndex)) return true
        }
        courseGraph[index].isTemporaryVisited = false
        courseGraph[index].isVisited = true
        
        return false
    }
    
    fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
        val courseGraph = Array<CourseNode>(numCourses, { CourseNode(it) })
        for (prerequisite in prerequisites) {
            courseGraph[prerequisite[1]].nextCourseIndexes.add(prerequisite[0])
        }
        
        for (course in courseGraph) {
            if (course.isVisited) continue
            if (hasCycle(courseGraph, course.index)) return false
        }
        
        return true
    }
}
```
