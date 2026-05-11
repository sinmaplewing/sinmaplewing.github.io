---
id: 5063
title: '#LeetCode：380. Insert Delete GetRandom O(1)'
slug: leetcode：380-insert-delete-getrandom-o1
date: '2020-06-13T01:27:30+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/06/13/5063/leetcode%ef%bc%9a380-insert-delete-getrandom-o1/
wp_status: publish
wp_type: post
---

此題要建立一個資料結構，此資料結構能夠加入元素、刪除元素以及可以從元素裡面隨機挑選一個元素出來，並且所有操作都必須要在 O(1) 的時間完成。

由於必須要盡量在 O(1) 的時間完成，所以會需要一個陣列去紀錄加入的元素，並建立一個 HashMap 去紀錄每個元素的位置以方便 O(1) 時間拿到元素所在的位置，進而在 O(1) 時間拿到元素。

刪除的時候先將要陣列最後面的值蓋掉要刪除掉的值，再將陣列最後面的那個多出來的值砍掉即可，由於砍掉陣列最後面不需要將後面的元素往前擺，所以可以 O(1) 時間完成。

**Kotlin(260ms)**
```kotlin
/*******************************************************/
/* LeetCode 380. Insert Delete GetRandom O(1)          */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2020/06/13                                 */
/*******************************************************/
class RandomizedSet() {

    /** Initialize your data structure here. */
    private val _elementToIndexMap = mutableMapOf<Int, Int>()
    private val _elementList = mutableListOf<Int>()
    private val _random = Random()

    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */
    fun insert(`val`: Int): Boolean {
        if (_elementToIndexMap.containsKey(`val`)) return false
        
        _elementList.add(`val`)
        _elementToIndexMap[`val`] = _elementList.lastIndex
        return true
    }

    /** Removes a value from the set. Returns true if the set contained the specified element. */
    fun remove(`val`: Int): Boolean {
        val removedElementOriginalIndex = _elementToIndexMap[`val`]
        if (removedElementOriginalIndex == null) return false
        
        val listLastElement = _elementList.last()
        val listLastIndex = _elementList.lastIndex
        moveElement(listLastElement, removedElementOriginalIndex)
        _elementList.removeAt(listLastIndex)
        _elementToIndexMap.remove(`val`)
        return true
    }

    /** Get a random element from the set. */
    fun getRandom(): Int {
        val randomIndex = _random.nextInt(_elementList.size)
        return _elementList[randomIndex]
    }

    private fun moveElement(element: Int, toIndex: Int) {
        _elementList[toIndex] = element
        _elementToIndexMap[element] = toIndex
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = RandomizedSet()
 * var param_1 = obj.insert(`val`)
 * var param_2 = obj.remove(`val`)
 * var param_3 = obj.getRandom()
 */
```
