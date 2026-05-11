---
id: 3627
title: '#LeetCode：7. Reverse Integer'
slug: leetcode：7-reverse-integer
date: '2018-09-27T09:55:32+08:00'
lastmod: '2019-05-11T11:10:58+08:00'
draft: false
private: false
categories:
- 02-02 程式解題
tags:
- LeetCode
- LeetCode[1-9]
permalink: /2018/09/27/3627/leetcode%ef%bc%9a7-reverse-integer/
wp_status: publish
wp_type: post
---

利用除法和餘數的方式一位一位將數字移到另外一個變數中即可。判斷 Overflow 的部分要在會 Overflow 的前一刻確定一旦將這位數字移進去會不會 Overflow 即可。

**C++(12ms)**
```cpp
/*******************************************************/
/* LeetCode 7. Reverse Integer                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2018/09/27                                 */
/*******************************************************/
#include <climits>

class Solution {
public:
  int reverse(int x) {
    int reverseX = 0;
    int maxIntDiv10 = INT_MAX / 10;
    int minIntDiv10 = INT_MIN / 10;
    int maxLowestDigit = INT_MAX % 10;
    int minLowestDigit = INT_MIN % 10;

    while(x != 0){
      int digit = x % 10;
      if(reverseX > maxIntDiv10 || (reverseX == maxIntDiv10 && digit > maxLowestDigit)) return 0;
      if(reverseX < minIntDiv10|| (reverseX == minIntDiv10 && digit < minLowestDigit)) return 0;

      reverseX = reverseX * 10 + digit;
      x /= 10;
    }

    return reverseX;
  }
};
```

**Kotlin(120ms)**
```kotlin
/*******************************************************/
/* LeetCode 7. Reverse Integer                         */
/* Author: Maplewing [at] knightzone.studio            */
/* Version: 2019/05/11                                 */
/*******************************************************/
class Solution {
    fun reverse(x: Int): Int {
        val maxIntDiv10 = Int.MAX_VALUE / 10
        val minIntDiv10 = Int.MIN_VALUE / 10
        val maxLowestDigit = Int.MAX_VALUE % 10
        val minLowestDigit = Int.MIN_VALUE % 10

        var temp = x
        var reverseX = 0
        while(temp != 0){
            val digit = temp % 10
            if(reverseX > maxIntDiv10 || (reverseX == maxIntDiv10 && digit > maxLowestDigit)) return 0
            if(reverseX < minIntDiv10 || (reverseX == minIntDiv10 && digit < minLowestDigit)) return 0

            reverseX = reverseX * 10 + digit
            temp /= 10
        }

        return reverseX
    }
}
```
