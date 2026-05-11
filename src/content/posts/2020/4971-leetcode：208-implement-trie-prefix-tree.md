---
id: 4971
title: '#LeetCode：208. Implement Trie (Prefix Tree)'
slug: leetcode：208-implement-trie-prefix-tree
date: '2020-05-14T20:14:14+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[100-999]
permalink: /2020/05/14/4971/leetcode%ef%bc%9a208-implement-trie-prefix-tree/
wp_status: publish
wp_type: post
---

此題目要你實作 Trie (字典樹) 這個資料結構。

此結構基本上就是利用樹的結構去表示一堆字串的關係，從根部空字串開始往下，每一條線代表的是要加入哪個字元在後面，就這樣一路走下來到達某個節點就可以拼接出一個字串。

插入字串的時候，就利用上述的規則將線與點加入，加入完後在最後加入的點上記得標記一下，表示這裡是某個曾經加入的字串的結尾，藉以可以在實作搜尋功能時，知道該節點是否曾經是輸入過的字串。而做前綴判斷就不需要去管該點有沒有標記，能夠走到最後停留在點上就是有該前綴的意思。

關於此資料結構的詳細部分可以再查閱[維基百科](https://zh.wikipedia.org/wiki/Trie)，或是其他的演算法書籍或教學網站。

**Kotlin(384ms)**
```kotlin
/*******************************************************
 * LeetCode 208. Implement Trie (Prefix Tree)          *
 * Author: Maplewing [at] knightzone.studio            *
 * Version: 2020/05/14                                 *
 *******************************************************/
class Trie() {

    /** Initialize your data structure here. */
    class Node(var isEnd: Boolean = false) {
        val nextNode = mutableMapOf<Char, Node>()
    }
    
    val root = Node()

    /** Inserts a word into the trie. */
    fun insert(word: String) {
        var currentNode = root
        for (c in word) {
            currentNode = currentNode.nextNode.getOrPut(c, { Node() })
        }
        currentNode.isEnd = true
    }
    
    /** Returns if the word is in the trie. */
    fun search(word: String): Boolean =
        getIsEnd(word) ?: false

    /** Returns if there is any word in the trie that starts with the given prefix. */
    fun startsWith(prefix: String): Boolean =
        if (getIsEnd(prefix) != null) true else false

    private fun getIsEnd(word: String): Boolean? {
        var currentNode: Node? = root
        for (c in word) {
            currentNode = currentNode?.nextNode?.get(c) ?: null
            if (currentNode == null) return null
        }
        
        if (currentNode == null) return null
        return currentNode.isEnd
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```
