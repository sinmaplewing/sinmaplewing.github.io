---
id: 3566
title: '#LeetCode：3. Longest Substring Without Repeating Characters'
slug: leetcode：3-longest-substring-without-repeating-characters
date: '2018-05-23T01:47:33+08:00'
lastmod: '2020-05-06T17:26:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/05/23/3566/leetcode%ef%bc%9a3-longest-substring-without-repeating-characters/
wp_status: publish
wp_type: post
---

用 Sliding Window 的方式，用前後兩個 index 去紀錄目前所找到的子字串。

每次往後延伸 Window 時，先檢查前面是否有重複出現過該字母，若有就把頭移到重複出現的該字母前一次出現的 index 的後面一位，如果前一次的 index 已經不在所夾住的子字串中則忽略。接著再將目前往後延伸到的字母所在 index 給記錄下來，以利之後的查找。這樣在每次延伸出來的子字串中找出最長的長度即是答案。

**C++(46ms)**
```cpp
/*******************************************************/
/* LeetCode 3. Longest Substring Without Repeating     */
/*             Characters                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/05/23                                 */
/*******************************************************/
class Solution {
public:
  int lengthOfLongestSubstring(string s) {
    map<char, int> currentIndexMap;
    
    int sLength = s.length();
    int maxSubstringLength = 0;
    int head = 0;
    for(int i = 0 ; i < sLength ; ++i){
      if(currentIndexMap.find(s[i]) != currentIndexMap.end()){
        head = max(currentIndexMap[s[i]] + 1, head);
      }
      
      currentIndexMap[s[i]] = i;
      maxSubstringLength = max(maxSubstringLength, i - head + 1);
    }
    
    return maxSubstringLength;      
  }
};
```

**Kotlin(200ms)**
```kotlin
/*******************************************************/
/* LeetCode 3. Longest Substring Without Repeating     */
/*             Characters                              */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/04/30                                 */
/*******************************************************/
class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        var currentIndexMap : MutableMap<Char, Int> = mutableMapOf()

        var maxSubstringLength = 0
        var head = 0
        s.forEachIndexed(fun (index, character) {
            head = maxOf(currentIndexMap[character]?.plus(1) ?: head, head)

            currentIndexMap[character] = index
            maxSubstringLength = maxOf(maxSubstringLength, index - head + 1)
        })

        return maxSubstringLength
    }
}
```
