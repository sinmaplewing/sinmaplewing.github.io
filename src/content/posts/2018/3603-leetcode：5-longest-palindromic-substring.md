---
id: 3603
title: '#LeetCode：5. Longest Palindromic Substring'
slug: leetcode：5-longest-palindromic-substring
date: '2018-09-25T00:40:22+08:00'
lastmod: '2019-05-01T01:13:31+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/25/3603/leetcode%ef%bc%9a5-longest-palindromic-substring/
wp_status: publish
wp_type: post
---

找出最長迴文子字串。可以將每個字當作是中央去往外擴張，擴張有兩種方式：一種是長度為奇數、另外一種是長度是偶數的狀況，最後找出從哪個字擴張可以得到最大的長度即是答案。

**參考做法：**[LeetCode Solution](https://leetcode.com/submissions/detail/178182835/)

**C++(8ms)**
```cpp
/*******************************************************/
/* LeetCode 5. Longest Palindromic Substring           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/25                                 */
/*******************************************************/
#include <cstdlib>

class Solution {
public:
  string longestPalindrome(string s) {
      if( s.length() < 1 ) return "";
      
      int start = 0, length = 1;
      for(int i = 0 ; i < s.length() ; ++i){
        int oddStringLength = findPalindromeFromCenter(s, i, i);
        int evenStringLength = findPalindromeFromCenter(s, i, i+1);
        int maxLength = max(oddStringLength, evenStringLength);
        if(maxLength > length){
          length = maxLength;
          start = i - (maxLength - 1) / 2;
        }
      }

      return s.substr(start, length);
  }

  int findPalindromeFromCenter(const string& s, int left, int right){
    while(left >= 0 && right < s.length() && s[left] == s[right]) --left, ++right;
    return right - left - 1;
  }
};
```

**Kotlin(192ms)**
```kotlin
/*******************************************************/
/* LeetCode 5. Longest Palindromic Substring           */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/05/01                                 */
/*******************************************************/
class Solution {
    fun longestPalindrome(s: String): String {
        if(s.isNullOrEmpty()) return ""

        var start = 0
        var length = 1
        s.forEachIndexed(fun(index, _){
            val oddStringLength = findPalindromeFromCenter(s, index, index)
            val evenStringLength = findPalindromeFromCenter(s, index, index + 1)
            val maxLength = maxOf(oddStringLength, evenStringLength)
            if(maxLength > length) {
                length = maxLength
                start = index - (maxLength - 1) / 2;
            }
        })

        return s.substring(start until start + length)
    }

    fun findPalindromeFromCenter(s: String, left: Int, right: Int) : Int {
        var leftIndex = left
        var rightIndex = right
        while(leftIndex >= 0 && rightIndex < s.length && s[leftIndex] == s[rightIndex]){
            --leftIndex
            ++rightIndex
        }

        return rightIndex - leftIndex - 1
    }
}
```
