---
id: 3636
title: '#LeetCode：9. Palindrome Number'
slug: leetcode：9-palindrome-number
date: '2018-09-29T02:18:21+08:00'
lastmod: '2018-10-02T00:57:20+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/29/3636/leetcode%ef%bc%9a9-palindrome-number/
wp_status: publish
wp_type: post
---

簡單的方式是將數字變成字串之後頭尾向內比對即可。在這裡將原本的方法進化一下用不轉字串的方式，這方法就是把一半的數字倒過來後，看看倒過來的數字與原本的數字數值是否一樣。有幾個部分需要注意：

1. 個位數為 0 的數字除了 0 本身以外都直接不符合，因為倒過來的數字不能開頭為 0 ，所以要先篩掉。
2. 由於有可能會有奇數位共用的問題，所以除了相等以外還要將反轉後的數字消掉一位比比看。

**C++(112ms)**
```cpp
/*******************************************************/
/* LeetCode 9. Palindrome Number                       */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/10/01                                 */
/*******************************************************/
class Solution {
public:
  bool isPalindrome(int x) {
    if(x == 0) return true;
    if(x < 0 || x % 10 == 0) return false;

    int reverseX = 0;
    while(x > reverseX){
      reverseX = reverseX * 10 + x % 10;
      x /= 10;
    }

    return x == reverseX || x == reverseX / 10;
  }
};
```
